# CFO's note

**The pouch cost is real (£6.00 delivered to you, from the founder on 2026-10-07). Every other cost is still an estimate (marked EST) until you replace it.** Add your postage, Shopify fees and ad spend to `founder/numbers.json`, then re-run: `python3 .claude/skills/founder-cfo/unit_economics.py founder/numbers.json --out founder/cfo.md`.

**Price used:** a blended **£16.65** a pouch, half at £18 one-off and half at £15.30 on subscription (15% off, see `pricing.md`). The 50/50 mix is an assumption.

- **The margin.** Each pouch leaves **£4.03 (24%)** after its own costs, including an estimated £3 of marketing per pouch. At 20 pouches a day, the profit margin is **18%** and year 1 makes **£12,869** on £82,917 of revenue. Break-even is **5 pouches a day**.
- **Today's subscription price barely works.** At £14.40 (20% off), each pouch leaves only **£1.78 (12%)**, break-even is **12 a day**, and year 1 makes **£1,664**. At £15.30 (15% off) each pouch leaves **£2.68**. At £18 one-off it leaves **£5.38**. Every subscriber you add at 20% off earns almost nothing once postage and marketing are paid.
- **The line to watch is marketing cost per pouch.** At £6 per pouch instead of £3, contribution falls to **£1.03 (6%)**, break-even rises to **20 a day** (your whole plan), and year 1 **loses £2,071**. The pouch cost leaves no room for expensive ads.
- **Unit costs are now the second line to watch.** If unit costs rise 15%, the margin at plan falls from 18% to **7%** and year 1 makes **£3,442**. Get a second supplier quote at the same certifier, and ask your supplier what price you'd pay at a higher order quantity.
- **Cash.** You need **£5,000** for the one-off spend (pack reprint, lab test, trial sachets, claims review, a launch push). On these numbers it is earned back in **month 8**. At half the planned volume, year 1 makes £2,835 and the spend is not earned back in year 1.
- **The £4.95 trial pack is not in these numbers.** At £6 a pouch, collagen costs £0.20 per 10g, so 7 sachets cost about £1.40, plus packing (about £0.60) and postage (about £1.20, EST), roughly **£3.20**. It breaks even before marketing and pays only if trial buyers go on to buy pouches.

## Three ways to improve the margin (each one run, not guessed)

1. **Subscription at 15% off, not 20%.** Already in the plan: each subscription pouch goes from £1.78 to £2.68. Consider **10% off (£16.20) with free delivery and the subscription that respects you**. Competitors' subscribers pay £24 or more (`competitors.md`).
2. **Test £20 one-off.** At £20 for every pouch, each pouch leaves **£7.38** and year 1 makes **£29,552** (`--price 20`). Halal-claiming competitors charge a median of £27.50 per 30 × 10g. Run the test in `pricing.md` before changing the price.
3. **Cut the pouch cost or marketing per pouch.** Each £1 off either one is worth about £7,300 a year at the plan volume. On marketing: creators paid per sale, referrals, sampling at mosques and community events. On the pouch: a volume price, or a second quote.

## The board's money conditions

- Unit economics at each price: **done. The pouch cost is real; the other costs are estimates.**
- Customer lifetime value pays back the cost of winning a customer: **open.** Needs your real repeat rate and cost per customer. At today's £14.40 subscription it is unlikely.
- Guarantee cost: 60 days at a 5% claim rate costs about £0.83 per pouch. That's affordable only if marketing stays near £3 a pouch and the subscription is £15.30 or more.

Not financial or tax advice. An accountant should check VAT and how the business is set up before money moves. Supplements are usually standard-rated, so check whether your £18 includes VAT; if it does, revenue per pouch after VAT is £15.

---

# Unit economics: RizqPure Halal Collagen (pouch cost from founder; other costs ESTIMATES)

Every number below comes from the input file. Nothing is looked up or guessed.

## One pouch

| line | per pouch |
| --- | ---: |
| Price | £16.65 |
| Filled pouch, delivered to RizqPure (founder, 2026-10-07) | -£6.00 |
| Mailer + scoop + insert (EST) | -£0.45 |
| Royal Mail postage, blended (EST) | -£2.10 |
| Card fees ~2% + 25p (EST) | -£0.57 |
| Meals donation (EST) | -£0.50 |
| Blended marketing per pouch sold (EST) | -£3.00 |
| **Contribution** (what each pouch leaves to pay the fixed costs) | **£4.03** (24%) |

## The margin that matters

Fixed costs: £600 a month (Shopify plan + apps (subscriptions, reviews, email) (EST) £120, Product liability insurance (EST) £40, Halal certification + lab testing, monthly share (EST) £80, Content, samples, creator gifting (EST) £300, Accounting + bookkeeping (EST) £60).

- **Break-even: 5 pouchs a day.** Below that you lose money every month.
- **Profit margin at your plan** (20 a day): **18%** of every sale, after every cost.

## Year 1, month by month

| month | pouchs a day | revenue | profit | cumulative (after £5,000 startup) |
| ---: | ---: | ---: | ---: | ---: |
| 1 | 6 | £2,997 | £125 | -£4,875 |
| 2 | 8 | £3,996 | £367 | -£4,507 |
| 3 | 10 | £4,995 | £609 | -£3,898 |
| 4 | 11 | £5,494 | £730 | -£3,169 |
| 5 | 12 | £5,994 | £851 | -£2,318 |
| 6 | 14 | £6,993 | £1,093 | -£1,225 |
| 7 | 15 | £7,492 | £1,213 | -£12 |
| 8 | 16 | £7,992 | £1,334 | £1,323 |
| 9 | 17 | £8,492 | £1,455 | £2,778 |
| 10 | 18 | £8,991 | £1,576 | £4,354 |
| 11 | 19 | £9,490 | £1,697 | £6,051 |
| 12 | 20 | £9,990 | £1,818 | £7,869 |

- **Year 1 operating profit: £12,869** on £82,917 of revenue.
- After the £5,000 startup spend: £7,869.
- Startup money earned back: month 8.
- Cash you need before it pays for itself: **£5,000**.

## What if

| scenario | margin at plan | break-even a day | year 1 profit |
| --- | ---: | ---: | ---: |
| Base plan | 18% | 5 | £12,869 |
| Price -10% | 9% | 9 | £4,578 |
| Volume -20% | 17% | 5 | £8,856 |
| Unit costs +15% | 7% | 10 | £3,442 |

No red flags in these numbers. They are only as good as the inputs: check every cost against a real quote.
