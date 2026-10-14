"""RizqPure treadmill pause-challenge scene (Blender bpy).
usage: python scene.py <hdri> <pouch_png> <out_dir> <mode> [frame_start frame_end] [scale%] [samples]
mode: still | anim | mask
"""
import sys, math, bpy, bmesh
from mathutils import Vector
import numpy as np

HDRI, POUCH_PNG, OUT, MODE = sys.argv[1:5]
FS = int(sys.argv[5]) if len(sys.argv) > 5 else 1
FE = int(sys.argv[6]) if len(sys.argv) > 6 else FS
SCALE = int(sys.argv[7]) if len(sys.argv) > 7 else 100
SAMPLES = int(sys.argv[8]) if len(sys.argv) > 8 else 48

FPS = 30
N = 135                 # 4.5 s clip
SPEED = 6.5             # belt speed, m/s
CATCH = 101             # frame where the pouch fills the outline
CATCH_Y = 0.36          # pouch y at catch frame
BELT_W, BELT_Z = 0.50, 0.22
BELT_Y0, BELT_Y1 = 0.0, 30.0
WORLD_ROT = math.radians(float(__import__("os").environ.get("WROT", "0")))

def pouch_y(f):  # pouch rides the belt toward the camera (-Y)
    return CATCH_Y + (CATCH - f) * SPEED / FPS

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.engine = "CYCLES"
sc.cycles.device = "CPU"
sc.cycles.samples = SAMPLES
sc.cycles.use_denoising = True
sc.cycles.use_adaptive_sampling = True
sc.render.resolution_x, sc.render.resolution_y = 1080, 1920
sc.render.resolution_percentage = SCALE
sc.render.fps = FPS
sc.frame_start, sc.frame_end = 1, N
sc.view_settings.view_transform = "AgX"
sc.view_settings.look = "AgX - Medium High Contrast"
sc.view_settings.exposure = 0.35
sc.render.use_motion_blur = MODE != "mask"
sc.render.motion_blur_shutter = 0.05      # ~1/600 s bright-light phone shutter
sc.render.image_settings.file_format = "PNG"

# ---------- world ----------
w = bpy.data.worlds.new("W"); sc.world = w; w.use_nodes = True
nt = w.node_tree; nt.nodes.clear()
tc = nt.nodes.new("ShaderNodeTexCoord"); mp = nt.nodes.new("ShaderNodeMapping")
env = nt.nodes.new("ShaderNodeTexEnvironment"); env.image = bpy.data.images.load(HDRI)
bg = nt.nodes.new("ShaderNodeBackground"); bg.inputs[1].default_value = 1.0
out = nt.nodes.new("ShaderNodeOutputWorld")
mp.inputs["Rotation"].default_value[2] = WORLD_ROT
nt.links.new(tc.outputs["Generated"], mp.inputs[0]); nt.links.new(mp.outputs[0], env.inputs[0])
nt.links.new(env.outputs[0], bg.inputs[0]); nt.links.new(bg.outputs[0], out.inputs[0])

def mat(name, color, rough=0.5, metal=0.0):
    m = bpy.data.materials.new(name); m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (*color, 1); b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = metal
    return m

def box(name, size, loc, material):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    o = bpy.context.object; o.name = name; o.scale = size
    bpy.ops.object.transform_apply(scale=True)
    bev = o.modifiers.new("bev", "BEVEL"); bev.width = 0.006; bev.segments = 2
    o.data.materials.append(material); return o

# ---------- floor: shadow catcher over the HDRI turf ----------
bpy.ops.mesh.primitive_plane_add(size=200, location=(0, 0, 0))
floor = bpy.context.object; floor.is_shadow_catcher = True
floor.data.materials.append(mat("floor", (0.1, 0.3, 0.1), 0.9))

# ---------- treadmill ----------
L = BELT_Y1 - BELT_Y0; cy = (BELT_Y0 + BELT_Y1) / 2
body = mat("body", (0.02, 0.02, 0.022), 0.45)
alu = mat("alu", (0.75, 0.76, 0.78), 0.28, 1.0)
rail_rubber = mat("railrubber", (0.05, 0.05, 0.05), 0.8)
box("deck", (BELT_W + 0.04, L, BELT_Z - 0.03), (0, cy, (BELT_Z - 0.03) / 2), body)
for s in (-1, 1):
    x = s * (BELT_W / 2 + 0.07)
    box(f"side{s}", (0.10, L, BELT_Z + 0.015), (x, cy, (BELT_Z + 0.015) / 2), alu)
    box(f"foot{s}", (0.09, L, 0.008), (x, cy, BELT_Z + 0.019), rail_rubber)
for y in np.arange(BELT_Y0 + 0.5, BELT_Y1, 3.0):        # support feet
    box(f"leg{y}", (BELT_W + 0.26, 0.08, 0.03), (0, y, 0.015), body)
# end roller hood near camera
box("hood", (BELT_W + 0.24, 0.30, BELT_Z + 0.05), (0, BELT_Y0 - 0.15, (BELT_Z + 0.05) / 2), body)

# belt surface with moving texture (offset driven by frame)
bpy.ops.mesh.primitive_plane_add(size=1, location=(0, cy, BELT_Z + 0.001))
belt = bpy.context.object; belt.scale = (BELT_W, L, 1); bpy.ops.object.transform_apply(scale=True)
bm_ = bpy.data.materials.new("belt"); bm_.use_nodes = True; n = bm_.node_tree.nodes; lk = bm_.node_tree.links
bsdf = n["Principled BSDF"]; bsdf.inputs["Roughness"].default_value = 0.62
tco = n.new("ShaderNodeTexCoord"); mpp = n.new("ShaderNodeMapping"); mpp.vector_type = "POINT"
lk.new(tco.outputs["Object"], mpp.inputs[0])
d = mpp.inputs["Location"].driver_add("default_value", 1).driver
d.expression = f"frame*{SPEED / FPS}"
# fine lengthwise grain + cross ribs + a splice seam every 4 m
noise = n.new("ShaderNodeTexNoise"); noise.inputs["Scale"].default_value = 900
lk.new(mpp.outputs[0], noise.inputs[0])
sep = n.new("ShaderNodeSeparateXYZ"); lk.new(mpp.outputs[0], sep.inputs[0])
rib = n.new("ShaderNodeMath"); rib.operation = "MULTIPLY"; rib.inputs[1].default_value = 260
lk.new(sep.outputs[1], rib.inputs[0])
sin = n.new("ShaderNodeMath"); sin.operation = "SINE"; lk.new(rib.outputs[0], sin.inputs[0])
seam = n.new("ShaderNodeMath"); seam.operation = "PINGPONG"; seam.inputs[1].default_value = 2.0
lk.new(sep.outputs[1], seam.inputs[0])
seam2 = n.new("ShaderNodeMath"); seam2.operation = "LESS_THAN"; seam2.inputs[1].default_value = 0.012
lk.new(seam.outputs[0], seam2.inputs[0])
c1 = n.new("ShaderNodeMath"); c1.operation = "MULTIPLY_ADD"; c1.inputs[1].default_value = 0.012; c1.inputs[2].default_value = 0.028
lk.new(noise.outputs["Fac"], c1.inputs[0])
c2 = n.new("ShaderNodeMath"); c2.operation = "MULTIPLY_ADD"; c2.inputs[1].default_value = 0.004
lk.new(sin.outputs[0], c2.inputs[0]); lk.new(c1.outputs[0], c2.inputs[2])
c3 = n.new("ShaderNodeMath"); c3.operation = "MULTIPLY_ADD"; c3.inputs[1].default_value = 0.05
lk.new(seam2.outputs[0], c3.inputs[0]); lk.new(c2.outputs[0], c3.inputs[2])
crgb = n.new("ShaderNodeCombineColor"); [lk.new(c3.outputs[0], crgb.inputs[i]) for i in range(3)]
lk.new(crgb.outputs[0], bsdf.inputs["Base Color"])
bump = n.new("ShaderNodeBump"); bump.inputs["Strength"].default_value = 0.25
lk.new(sin.outputs[0], bump.inputs["Height"]); lk.new(bump.outputs[0], bsdf.inputs["Normal"])
belt.data.materials.append(bm_)

# ---------- pouch (puffy stand-up pouch) ----------
PW, PH = 0.170, 0.170 * 930 / 649
NX, NY = 36, 52
bmp = bmesh.new(); uvl = bmp.loops.layers.uv.new()
def thick(u, v):  # half-thickness: fat gusset bottom, flat heat-seal top
    T = 0.034 * (1 - v) ** 1.3 + 0.004
    return T * max(0.0, 1 - abs(2 * u - 1) ** 6) ** 0.5
verts = {}
for side in (1, -1):
    for j in range(NY + 1):
        for i in range(NX + 1):
            u, v = i / NX, j / NY
            verts[side, i, j] = bmp.verts.new(((u - 0.5) * PW, -side * thick(u, v), v * PH))
def face(vs, uvs):
    f = bmp.faces.new(vs)
    for l, uv in zip(f.loops, uvs): l[uvl].uv = uv
    return f
for side in (1, -1):
    for j in range(NY):
        for i in range(NX):
            a, b, c, d_ = verts[side, i, j], verts[side, i + 1, j], verts[side, i + 1, j + 1], verts[side, i, j + 1]
            uvs = [(i / NX, j / NY), ((i + 1) / NX, j / NY), ((i + 1) / NX, (j + 1) / NY), (i / NX, (j + 1) / NY)]
            if side == -1:  # back: mirror so it reads correctly from behind
                uvs = [(1 - x, y) for x, y in uvs]
            f = face([d_, c, b, a] if side == 1 else [a, b, c, d_], uvs[::-1] if side == 1 else uvs)
            f.material_index = 0 if side == 1 else 1
for i in range(NX):  # gusset bottom
    f = face([verts[1, i, 0], verts[1, i + 1, 0], verts[-1, i + 1, 0], verts[-1, i, 0]], [(0.5, 0.01)] * 4)
    f.material_index = 1
bmesh.ops.remove_doubles(bmp, verts=bmp.verts[:], dist=1e-5)
me = bpy.data.meshes.new("pouch"); bmp.to_mesh(me); bmp.free()
pouch = bpy.data.objects.new("pouch", me); sc.collection.objects.link(pouch)
for poly in me.polygons: poly.use_smooth = True
img = bpy.data.images.load(POUCH_PNG)
def pouch_mat(name, back):
    m = bpy.data.materials.new(name); m.use_nodes = True; n = m.node_tree.nodes; lk = m.node_tree.links
    b = n["Principled BSDF"]; b.inputs["Roughness"].default_value = 0.32
    b.inputs["Coat Weight"].default_value = 0.35; b.inputs["Coat Roughness"].default_value = 0.12
    t = n.new("ShaderNodeTexImage"); t.image = img; t.interpolation = "Cubic"
    if back:  # plain navy back, same die-cut silhouette
        b.inputs["Base Color"].default_value = (0.012, 0.022, 0.07, 1)
    else:
        lk.new(t.outputs["Color"], b.inputs["Base Color"])
    lk.new(t.outputs["Alpha"], b.inputs["Alpha"])
    return m
me.materials.append(pouch_mat("front", False)); me.materials.append(pouch_mat("back", True))
pouch.location = (0.0, pouch_y(1), BELT_Z + 0.002)
for f in range(1, N + 1):
    y = pouch_y(f); z = BELT_Z + 0.002; tilt = 0.6 * math.sin(f * 1.7)
    if y < BELT_Y0 + 0.04:          # ran off the end: ballistic drop + forward tumble
        t = (BELT_Y0 + 0.04 - y) / SPEED
        z -= 0.5 * 9.81 * t * t; tilt = -math.degrees(9.0 * t)
    pouch.location = (0.0, y, z)
    pouch.rotation_euler = (math.radians(tilt), 0, math.radians(1.2 * math.sin(f * 0.9)))
    pouch.keyframe_insert("location", frame=f); pouch.keyframe_insert("rotation_euler", frame=f)
for fc in pouch.animation_data.action.fcurves if hasattr(pouch.animation_data.action, "fcurves") else []:
    for k in fc.keyframe_points: k.interpolation = "LINEAR"

# ---------- camera: low, beside the belt, phone-like lens ----------
cam_d = bpy.data.cameras.new("cam"); cam_d.sensor_fit = "VERTICAL"; cam_d.sensor_height = 36; cam_d.lens = 34
cam = bpy.data.objects.new("cam", cam_d); sc.collection.objects.link(cam); sc.camera = cam
CAM_LOC = Vector((0.06, -0.48, 0.47)); AIM = Vector((0.0, 8.0, 0.10))
cam.location = CAM_LOC
base_rot = (AIM - CAM_LOC).to_track_quat("-Z", "Y").to_euler()
rng = np.random.RandomState(3)
pts = rng.uniform(-1, 1, (N // 10 + 4, 3))
for f in range(1, N + 1):  # subtle handheld drift
    k = np.array([np.interp(f / 10, np.arange(len(pts)), pts[:, i]) for i in range(3)])
    cam.rotation_euler = (base_rot.x + math.radians(0.25) * k[0], base_rot.y + math.radians(0.15) * k[1],
                          base_rot.z + math.radians(0.3) * k[2])
    cam.keyframe_insert("rotation_euler", frame=f)

if MODE == "mask":
    # pouch-only white silhouette at the catch frame, no shake → used to draw the outline
    for o in sc.objects:
        if o not in (pouch, cam): o.hide_render = True
    bg.inputs[1].default_value = 0.0
    em = bpy.data.materials.new("em"); em.use_nodes = True; n = em.node_tree.nodes; lk = em.node_tree.links
    n.remove(n["Principled BSDF"]); e = n.new("ShaderNodeEmission"); e.inputs[1].default_value = 1
    t = n.new("ShaderNodeTexImage"); t.image = img; tr = n.new("ShaderNodeBsdfTransparent"); mx = n.new("ShaderNodeMixShader")
    lk.new(t.outputs["Alpha"], mx.inputs[0]); lk.new(tr.outputs[0], mx.inputs[1]); lk.new(e.outputs[0], mx.inputs[2])
    lk.new(mx.outputs[0], n["Material Output"].inputs[0])
    me.materials[0] = em; me.materials[1] = em
    sc.view_settings.view_transform = "Standard"; sc.cycles.samples = 16
    sc.frame_set(CATCH); sc.render.filepath = f"{OUT}/mask.png"; bpy.ops.render.render(write_still=True)
elif MODE == "still":
    for f in ([int(x) for x in __import__("os").environ["FRAMES"].split(",")] if "FRAMES" in __import__("os").environ else range(FS, FE + 1)):
        sc.frame_set(f); sc.render.filepath = f"{OUT}/still_{f:03d}.png"; bpy.ops.render.render(write_still=True)
else:
    sc.frame_start, sc.frame_end = FS, FE
    sc.render.filepath = f"{OUT}/f_"; bpy.ops.render.render(animation=True)
