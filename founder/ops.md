# Operations: RizqPure

How the business runs day to day, and what each step really costs. Costs marked EST are estimates to replace with real quotes. They feed `numbers.json`.

## 1. The daily cycle (✱ = the customer sees it)

1. Orders in from Shopify (one-off, subscription renewals, trial packs).
2. Pick and pack: pouch or trial sachets, scoop, insert card (how to mix, certificate QR code, meals-funded line). ✱
3. Label and post (Royal Mail Click & Drop, tracked for pouches, letterbox for trials).
4. Dispatch email with tracking. ✱
5. Day 5 after a trial arrives: "How did it mix?" email with a one-tap credit to the first pouch. ✱ **This email decides trial → pouch conversion. Measure it.**
6. Day 21 after a pouch: reorder or subscribe nudge. ✱
7. Support inbox and WhatsApp Business: halal questions, delivery, returns. ✱
8. Weekly: stock count, reorder trigger, batch log (which batch went to which order, for recalls).

## 2. Suppliers

| input | options to quote | what to ask |
| --- | --- | --- |
| Halal bovine collagen peptides | Your current manufacturer (first). Then 2 UK contract manufacturers/packers of halal-certified powders. Ask each for its halal certificate scope **before** price. | Certifier and scope (raw material + plant), bovine source country, stunned or unstunned, MOQ, price per kg at 100/250/500 kg, lead time, CoA per batch |
| Trial sachets (7 x 10g) | Your packer, or a sachet-filling contract packer | MOQ (sachet runs often start at 5-10k units: check), price per sachet, lead time |
| Pouches with the certifier logo and allowed claims | Your current pouch printer | Reprint cost, MOQ, digital-print short runs |
| Independent lab testing | A UKAS-accredited food testing lab | Heavy metals, microbiology, porcine DNA (PCR), price per batch |
| Postage | Royal Mail Click & Drop business account | Large Letter vs Small Parcel by packed weight. A 300g pouch + mailer is near the large-letter weight limit: weigh it. |

Not done yet: **real quotes.** When they're in, update `numbers.json` and re-run the CFO.

## 3. Halal certification: the most important supplier

The panel's top objection (14 of 19 passes) was "who certified it?" Buyers named bodies themselves, and asked whether stunned slaughter is accepted. UK bodies differ on exactly this:

- **HMC (Halal Monitoring Committee)**: prohibits all pre-slaughter stunning; hand slaughter by a Muslim slaughterman. ([halalhmc.org/about](https://halalhmc.org/about/))
- **HFA (Halal Food Authority)**: permits reversible electrical stunning if the animal is alive before the cut. ([comparison](https://halalspy.com/halal-knowledge/certification/hmc-vs-hfa/))
- Others active in the UK: Halal Certification Europe (HCE), UKIM, EHDA ([overview](https://halalspy.com/halal-knowledge/certification/halal-certifying-bodies-uk/)). Imported collagen is often certified abroad (for example JAKIM, MUI, IFANCA). Check whether your buyers recognise yours.

Actions:
1. Find out exactly which body certifies your collagen raw material and your packing plant, and what the certificate covers (source animal, slaughter, processing, packing).
2. If it is a body this audience distrusts, or it covers the plant but not the raw material, that is the first thing to fix in this whole pack.
3. Publish it: logo and number on the pouch, the certificate PDF on the product page, and an FAQ that answers "stunned or not?" plainly.

## 4. People

Assumed: the founder alone, unpaid (CFO assumption). At the plan volume of 20 pouches a day (about 600 a month plus trials), packing takes 1-2 hours a day.

| when | who | hours/week |
| --- | --- | ---: |
| Slow months (6-10/day) | Founder | 5-8 packing, 5 support/content |
| Plan (20/day) | Founder + part-time packer, or a 3PL | 10-14 packing |

Above about 25 orders a day, quote a UK 3PL (pick, pack and post per order) against a part-time packer at the National Living Wage ([gov.uk rates](https://www.gov.uk/national-minimum-wage-rates)). Employer costs (NI, pension) are extra: ask your accountant.

## 5. Routines (SOPs)

**Pack an order:** check the batch number on the pouch → pouch + scoop + insert → seal → Click & Drop label → scan → log the batch against the order.
**Halal question from a customer:** reply within 4 hours with the certificate PDF, the certifier's name, the scope (source + plant), and a plain answer on stunning. Never guess. If unsure, say you'll check with the certifier and come back.
**Complaint or return (60-day guarantee):** refund first, ask why second, log the reason. No return of the pouch needed under £20.
**Weekly reorder:** stock ÷ last 4 weeks' daily sales = days of cover. Reorder when cover < lead time + 14 days.
**Recall drill (once a year):** given a batch number, list every order it went to within 30 minutes.

## 6. Tools

| job | tool | cost |
| --- | --- | --- |
| Store | Shopify (current) | your plan |
| Subscriptions | a Shopify subscription app (Recharge, Appstle, Seal or similar) | free to ~£50/mo (EST) |
| Independent reviews | Trustpilot (free tier) or Judge.me / Reviews.io with verified buyers | free to ~£30/mo (EST) |
| Email/SMS flows | Klaviyo or Shopify Email | free to ~£40/mo at this size (EST) |
| Postage | Royal Mail Click & Drop | per item |
| Support | WhatsApp Business app | free |
| Books | Xero / FreeAgent / QuickBooks | ~£15-35/mo (EST) |

## 7. Licences, rules and insurance (check each, not legal advice)

- **Food business registration** with your local council at least 28 days before trading, if not already done. Supplements sellers count as food businesses. ([gov.uk](https://www.gov.uk/food-business-registration))
- **Food supplement rules:** labelling (name, ingredient amounts per daily dose, recommended daily dose, "do not exceed", "not a substitute for a varied diet", "keep out of reach of children"), and vitamin C and biotin amounts listed with %NRV. Your page currently doesn't show the vitamin C and biotin amounts. ([FSA food supplements guidance](https://www.food.gov.uk/business-guidance/food-supplements))
- **Health claims:** only authorised wording from the GB NHC register. ([gov.uk register](https://www.gov.uk/government/publications/great-britain-nutrition-and-health-claims-nhc-register)) See `marketing.md`.
- **Advertising:** CAP Code section 15 (food, supplements and health claims) applies to the site, social posts and creator content. ([CAP guidance](https://www.asa.org.uk/static/0f018b1a-ae1f-44e4-ba06708a5248b1bd/cc4a3cc7-9461-4e86-a6cf4e273413372a/The-CAP-Code-Food-food-supplements-and-associated-health-or-nutrition-claims.pdf))
- **Consumer law:** online subscription and cancellation terms, the 14-day cancellation right, and clear terms for the 60-day guarantee.
- **Charity giving:** if you say "part of every sale funds meals", the amount or share and the partner must be clear and true. If you partner with a registered charity, check whether you need a commercial participator agreement. ([Charity Commission / Fundraising Regulator guidance](https://www.fundraisingregulator.org.uk/))
- **Insurance:** product liability and public liability (EST £40/month in the CFO's numbers).
- **VAT:** register once taxable turnover passes the threshold. Supplements are usually standard-rated; check with an accountant.

## 8. Risk register

| risk | likelihood | impact | plan |
| --- | --- | --- | --- |
| Customer or creator publicly questions the halal status | medium | **severe** | Certificate published before anyone asks; 4-hour reply SOP; certifier contact ready to confirm |
| ASA or Trading Standards complaint about claims | medium (claims are non-compliant today) | high | Rewrite claims now (`marketing.md`) |
| Supplier runs out or raises price | medium | high | Second quoted supplier with the same certifier; 6 weeks' cover |
| Batch fails a lab test | low | severe | Test before release; don't ship until the CoA is in |
| Trial buyers don't convert to pouches | **high** | high | Day 5 email; credit the trial; measure weekly; kill the trial if conversion < 15% (launch.md) |
| Paid ad cost per pouch rises above £6 | high | high | CFO what-if shows break-even; cap ad spend; shift to creators paid per sale and referrals |
| Big brand launches a certified halal collagen | medium | high | Community, creators, certifier trust and subscribers locked in first |
| Subscription cancellations spike after month 2 | medium | high | Cancellation survey; skip instead of cancel; 2-pouch family plan |
| Royal Mail disruption | low-medium | medium | Second carrier account (Evri/DPD) set up and tested |
| Founder unwell / away (Hajj, Umrah, family) | medium | medium | Written SOPs; a backup packer; or a 3PL |
