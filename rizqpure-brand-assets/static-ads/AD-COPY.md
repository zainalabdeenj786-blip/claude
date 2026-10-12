# RizqPure – Static Ads (Meta / Instagram)

Three pain-point angles × two treatments × two sizes = 12 ads (PNG + JPG).

- **teaser**: soft-focus pouch behind the text, styled like the "coming soon" reference. Best for cold audiences and pattern-interrupt.
- **product**: the pouch is shown sharp under the CTA. Best for retargeting and conversion campaigns.
- **feed-1080x1350** (4:5, Facebook/Instagram feed) · **story-1080x1920** (9:16, Stories/Reels). Story layouts keep
  text and product out of the top 250 px and bottom 330 px, where the platform UI sits.

Claims only use wording from the pack ("supports skin, hair & nail vitality", "100% hydrolysed halal bovine
collagen peptides", flavourless, hot or cold drinks, 10% of profits to charity). If you have a halal certificate,
naming the certifier in the primary text ("Certified by …") usually lifts trust further.

---

## Angle 1: Halal certainty (`ad-halal-label-*`)
**On image:** STILL CHECKING EVERY LABEL? · CTA: Shop halal collagen

| Field | Copy | Chars |
|---|---|---|
| Primary text | Tired of reading the small print to find out where your collagen comes from? RizqPure is 100% hydrolysed halal bovine collagen peptides, so there's nothing to second-guess. | 172 (hook in first 125) |
| Headline | Halal Collagen, No Guesswork | 28 |
| Description | 100% halal bovine peptides | 26 |

## Angle 2: Visible results (`ad-brittle-nails-*`)
**On image:** BRITTLE NAILS? DULL SKIN? · CTA: Start your routine

| Field | Copy | Chars |
|---|---|---|
| Primary text | Brittle nails and dull skin? One flavourless scoop of RizqPure Halal Collagen a day supports skin, hair & nail vitality. Just stir it into your morning drink. | 158 (hook in first 125) |
| Headline | Your Daily Halal Collagen Scoop | 31 |
| Description | Supports skin, hair & nails | 27 |

## Angle 3: Taste and routine (`ad-no-chalky-taste-*`)
**On image:** HATE CHALKY SUPPLEMENTS? · CTA: Shop now

| Field | Copy | Chars |
|---|---|---|
| Primary text | If chalky powders put you off supplements, this one won't. RizqPure is flavourless and dissolves into coffee, tea or smoothies, hot or cold. And 10% of profits go to charity. | 174 (hook in first 125) |
| Headline | Flavourless Halal Collagen | 26 |
| Description | Mixes into any drink | 20 |

---

## Suggested test
Run all three angles as **teaser** creative in one ad set for about 1,000+ impressions each, then compare CTR.
Move the winning angle's **product** version into retargeting. Change one variable per round (angle first, then treatment).

Regenerate or edit: `_source/ads.js` (copy is in the `ADS` array); `node ads.js out`.

---

# "…is calling" ads (`calling-ads/`)

Your pouch floats on a soft rose-violet silk background with phone-style **Decline / Accept** buttons. It plays on
the instinct to answer a call, and the "Accept" makes the ad feel like a choice. Sizes: square 1080×1080
(the reference format), feed 1080×1350, story 1080×1920.

| File | On image | Primary text (suggested) | Headline |
|---|---|---|---|
| `ad-calling-halal-glow-up-*` | Your halal glow-up is calling... | Your glow-up is on line one. RizqPure is 100% hydrolysed halal bovine collagen that supports skin, hair & nail vitality. Will you pick up? | Answer With RizqPure |
| `ad-calling-stronger-hair-nails-*` | Stronger hair & nails are calling... | One flavourless scoop a day, stirred into your coffee or tea. Halal collagen that supports hair & nail vitality. Don't leave them on hold. | Halal Collagen, Daily |
| `ad-calling-collagen-you-can-trust-*` | Collagen you can trust is calling... | No more guessing what's in your collagen. 100% hydrolysed halal bovine peptides, and 10% of profits go to charity. | Collagen You Can Trust |

Source: `_source/calling.js` (headlines in the `ADS` array), pouch cut-out `_source/pouch.png`.

---

# Proven-format remixes (`proven-formats/`)

| File | Based on | Psychological lever | Primary text (suggested) | Headline |
|---|---|---|---|---|
| `ad-dont-be-a-mug-1080x1350` | Hismile "Don't Be An IDIOT." | **Pattern interrupt + loss aversion.** A giant cheeky word stops the scroll, and paying full price becomes the "foolish" choice. "Mug" is British slang for a fool *and* where your collagen goes. | Don't be a mug. Put RizqPure in one instead 😉 Buy 3 pouches for £51 and save £9. That's about 11 weeks of your daily halal collagen ritual. | Buy 3, Save £9 |
| `ad-face-the-facts-1080x1080` | Dr. Squatch "Face the Facts" | **Specific numbers + confident brevity.** "Enough said..." signals there's nothing to argue with. Every number is a verifiable product fact, not an invented survey. | 100% halal. 0 g sugar. 10% of profits to Islamic Relief. 80p a day. Enough said. | Halal Collagen, Facts Only |
| `ad-collagen-tier-list-1080x1080` | Hershey's tier list | **Native meme + debate bait.** It looks like content, not an ad, and people comment to disagree, which boosts reach. Ranks generic categories only (no named competitors). | We ranked collagen so you don't have to. Where does yours sit? 👇 | The Halal Collagen Tier List |
| `ad-1-scoop-does-both-1080x1350` | Dog is Human Venn | **Two pains, one simple fix.** The Venn diagram makes "one product, two benefits" obvious at a glance. Uses "supports" + the authorised Vitamin C claim. | Glowing skin and comfortable joints for every sujood. One unflavoured scoop in your chai or coffee. | One Scoop. Skin + Joints. |
| `ad-zero-stars-1080x1350` | Bible App "Zero stars – Satan" | **Inverted testimonial.** A "bad review" from your coffee is funny *and* proves the product is tasteless. | Our harshest critic? Your morning coffee. It couldn't even taste us. Unflavoured halal collagen that disappears into any drink. | Your Coffee Hates Us |

Before running: confirm the Vitamin C amount is ≥ 12 mg per 10 g scoop (needed for the claim line), confirm "10% of profits"
vs "10% of every purchase" (site and pack differ), and confirm the £20 / £51 prices.

## Round 2

| File | Based on | Psychological lever | Primary text (suggested) | Headline |
|---|---|---|---|---|
| `ad-what-your-body-needs-daily-1080x1350` | Sunbase 4-circle Venn | **Editorial "system" framing.** The product sits where every daily need overlaps; the calm, minimal look signals a premium brand. | Halal you can trust, skin that glows, joints for prayer, and one scoop instead of ten pills. Nourishment, made simple. | Your Daily Halal Collagen |
| `ad-5-signs-wrong-collagen-1080x1350` | Goodnight Tape "5 signs" | **Self-diagnosis checklist.** Viewers mentally tick each sign against their current brand, which creates doubt and the urge to switch. | How many of these does your collagen tick? If it's even one, it's time to switch to certified halal collagen that disappears into any drink. | Switch to Halal Collagen |
| `ad-search-bar-1080x1080` | Altiva search bar | **Mirrors the viewer's own search.** The ad looks like the answer to a question they've already typed. | Searched for "halal collagen that doesn't taste of anything"? Found it. Unflavoured, halal, mixes hot or cold. | The Halal Collagen You Searched For |
| `ad-whiteboard-collagen-decline-1080x1080` | AgeMate whiteboard | **Hand-drawn "lesson" + a decline graph.** It feels like education, not advertising, and the falling line creates gentle urgency. | Your body makes less collagen every year from your mid-20s. Give it the building blocks: one scoop of halal collagen with Vitamin C, daily. | Support Your Collagen Formation |
| `ad-same-collagen-different-receipt-1080x1350` | "Same smell, different receipt" | **Receipt comparison.** Turns an abstract discount into a physical, side-by-side saving, pushing buyers to the 3-pack and a bigger basket. | Same three pouches. £9 less. The 3-pack is the smartest way to start your 11-week halal collagen ritual. | 3-Pack: Save £9 |

Notes: "about 1% a year from your mid-20s" is a widely cited general estimate of natural collagen decline. Keep the "about"
and don't present it as a RizqPure result. The receipt ad compares your *own* prices only (3 singles vs the 3-pack),
which avoids competitor-comparison rules.
