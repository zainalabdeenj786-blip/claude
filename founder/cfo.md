# CFO's note

**Every cost here is an estimate (marked EST) until you replace it.** I don't have your real costs yet. Put your supplier invoice, postage, Shopify fees and ad spend into `founder/numbers.json`, then re-run: `python3 .claude/skills/founder-cfo/unit_economics.py founder/numbers.json --out founder/cfo.md`.

**Price used:** a blended **£16.65** a pouch, half at £18 one-off and half at £15.30 on subscription (15% off, per `pricing.md`). The 50/50 mix is an assumption.

- **The margin.** Each pouch leaves **£4.83 (29%)** after its own costs, including an estimated £3 of marketing per pouch. At 20 pouches a day, the profit margin is **23%** and year 1 makes **£16,853** on £82,917 of revenue. Break-even is **5 pouches a day**.
- **The line to watch is marketing cost per pouch.** At £6 per pouch instead of £3, contribution falls to **£1.83 (11%)**, break-even rises to **11 a day**, and year 1 makes only **£1,913**, with the £5,000 one-off spend not earned back. No other input moves the result this much.
- **Subscription discount.** At 20% off (£14.40), each pouch leaves **£2.58**. At 15% off (£15.30), it leaves **£3.48**. Ask every price question with your real retention numbers to hand.
- **Cash.** You need **£5,000** for the one-off spend (pack reprint, lab test, trial sachets, claims review, launch push). On these estimates it is earned back in **month 6**. At half the planned volume, year 1 makes £4,827 and the spend is not earned back in year 1.
- **The trial pack (£4.95) is not in these numbers.** It costs about £3.10 (ESTIMATE, `offer.md`), so it roughly breaks even before marketing. What it's worth depends on how many trial buyers go on to buy a pouch. Track that from day one, and add it to `numbers.json` once you have a real conversion rate.

## Three ways to improve the margin (each one was run, not guessed)

1. **Subscription at 15% off instead of 20%** is already in the plan. Year 1 goes from £14,612 at a blended £16.20 to **£16,853** at £16.65.
2. **Bring marketing cost per pouch down** with creators paid per sale, referrals and sampling at mosques and events. Each £1 saved per pouch is worth about £7,300 a year at the planned volume.
3. **Test £20 one-off.** At £20 for every pouch, contribution is £8.18 and year 1 makes £33,536 (`--price 20`). Competitors that claim halal charge a median of £27.50 for 30 × 10g (`competitors.md`), and the panel's "getting expensive" median is £20. Test £20 one-off against £18 (see `pricing.md`) before changing it for everyone.

## The board's money conditions

- Unit economics for each price: **done on estimates.** Not met until real costs are in.
- Lifetime value pays back the cost of winning a customer: **open.** Needs your real repeat rate and cost per customer.
- Guarantee cost: a 60-day guarantee with a 5% claim rate costs about £0.83 per pouch (5% of £16.65). That's affordable only if marketing stays near £3 a pouch.

Not financial or tax advice. Have an accountant check VAT and how the business is set up before money moves. Food supplements are usually standard-rated, so check whether your £18 includes VAT. If it does, revenue per pouch after VAT is £15.

---

# Unit economics: RizqPure Halal Collagen (ESTIMATES: replace with real costs)

Every number below comes from the input file. Nothing is looked up or guessed.

## One pouch

| line | per pouch |
| --- | ---: |
| Price | £16.65 |
| Collagen 300g + vit C + biotin, filled & sealed pouch (EST) | -£5.20 |
| Mailer + scoop + insert (EST) | -£0.45 |
| Royal Mail postage, blended (EST) | -£2.10 |
| Card fees ~2% + 25p (EST) | -£0.57 |
| Meals donation (EST) | -£0.50 |
| Blended marketing per pouch sold (EST) | -£3.00 |
| **Contribution** (what each pouch leaves to pay the fixed costs) | **£4.83** (29%) |

## The margin that matters

Fixed costs: £600 a month (Shopify plan + apps (subscriptions, reviews, email) (EST) £120, Product liability insurance (EST) £40, Halal certification + lab testing, monthly share (EST) £80, Content, samples, creator gifting (EST) £300, Accounting + bookkeeping (EST) £60).

- **Break-even: 5 pouchs a day.** Below that you lose money every month.
- **Profit margin at your plan** (20 a day): **23%** of every sale, after every cost.

## Year 1, month by month

| month | pouchs a day | revenue | profit | cumulative (after £5,000 startup) |
| ---: | ---: | ---: | ---: | ---: |
| 1 | 6 | £2,997 | £269 | -£4,731 |
| 2 | 8 | £3,996 | £559 | -£4,171 |
| 3 | 10 | £4,995 | £849 | -£3,322 |
| 4 | 11 | £5,494 | £994 | -£2,329 |
| 5 | 12 | £5,994 | £1,139 | -£1,190 |
| 6 | 14 | £6,993 | £1,429 | £239 |
| 7 | 15 | £7,492 | £1,573 | £1,812 |
| 8 | 16 | £7,992 | £1,718 | £3,531 |
| 9 | 17 | £8,492 | £1,863 | £5,394 |
| 10 | 18 | £8,991 | £2,008 | £7,402 |
| 11 | 19 | £9,490 | £2,153 | £9,555 |
| 12 | 20 | £9,990 | £2,298 | £11,853 |

- **Year 1 operating profit: £16,853** on £82,917 of revenue.
- After the £5,000 startup spend: £11,853.
- Startup money earned back: month 6.
- Cash you need before it pays for itself: **£5,000**.

## What if

| scenario | margin at plan | break-even a day | year 1 profit |
| --- | ---: | ---: | ---: |
| Base plan | 23% | 5 | £16,853 |
| Price -10% | 14% | 7 | £8,562 |
| Volume -20% | 22% | 5 | £12,043 |
| Unit costs +15% | 12% | 7 | £8,024 |

No red flags in these numbers. They are only as good as the inputs: check every cost against a real quote.
