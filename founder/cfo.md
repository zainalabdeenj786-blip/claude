# CFO's note

**Every cost in this file is an estimate (marked EST).** You haven't given me real costs yet. Replace them in `founder/numbers.json` with your supplier invoice, postage, Shopify fees and ad spend, then re-run: `python3 .claude/skills/founder-cfo/unit_economics.py founder/numbers.json --out founder/cfo.md`.

- **The margin.** At a blended £16.20 a pouch (half one-off at £18, half subscription at £14.40), each pouch leaves **£4.38 (27%)** after its own costs, including an estimated £3 of marketing per pouch. At 20 pouches a day, the profit margin is **21%** and year 1 makes **£14,612** on £80,676 revenue (tool output). Break-even is **5 pouches a day**.
- **The line to watch is marketing cost per pouch, not price.** If winning customers costs £6 per pouch sold instead of £3, contribution falls to **£1.38 (9%)**, break-even jumps to **15 a day**, and year 1 loses **£328** (what-if run). Nothing else in the file moves the result as much. Supplement brands that live on paid social usually sit closer to £6 than £3, so measure your real number first.
- **The subscription price is thin.** At £14.40 a pouch, contribution is **£2.58 (18%)** and year 1 makes only **£5,648** (`--price 14.40`). At £18 it is **£6.18 (34%)** and **£23,576** (`--price 18`). A 20% subscription discount only pays if subscribers stay much longer and cost less to win than one-off buyers. You need your retention numbers to know.
- **Cash.** With these estimates, the £5,000 one-off spend (pack reprint, lab test, trial sachets, claims review, a launch push) is earned back in **month 7**. If volume comes in at half the plan, it is not earned back in year 1 (`--volume 0.5`: year 1 £3,706).

## Three ways to improve the margin (each one run, not guessed)

1. **Make the subscription discount 15%, not 20%** (£15.30). Blended price is about £16.65 instead of £16.20. Run `--price 16.65` once your mix is known.
2. **Cut marketing cost per pouch** by moving spend from paid ads to referrals, creators paid per sale, mosque and community partners, and WhatsApp sharing. Every £1 saved per pouch adds £1 of contribution. At 20 a day, that is about £7,300 a year.
3. **Raise order value so postage is spread over more pouches.** A 2-pouch subscription (£28.80, about 60 servings) or a 3-pack at £45 pays postage once. Saving about £1 of postage per pouch is worth about £7,300 a year at plan.

## Board conditions about money

- Unit economics for the £18 and £14.40 prices: **done, on estimates**. Not met until real costs are in.
- Customer lifetime value pays back the cost of winning a customer: **open**. This needs your real repeat rate, subscriber retention and cost per customer.
- Guarantee cost: a 60-day guarantee at a 5% claim rate costs about £0.81 a pouch at £16.20 (5% × £16.20). That's affordable only if marketing cost per pouch stays near £3.

Not financial or tax advice. An accountant should check VAT and the structure before money moves. Food supplements are usually standard-rated for VAT, so check whether £18 includes VAT; if it does, revenue per pouch after VAT is £15.

---

# Unit economics: RizqPure Halal Collagen (ESTIMATES: replace with real costs)

Every number below comes from the input file. Nothing is looked up or guessed.

## One pouch

| line | per pouch |
| --- | ---: |
| Price | £16.20 |
| Collagen 300g + vit C + biotin, filled & sealed pouch (EST) | -£5.20 |
| Mailer + scoop + insert (EST) | -£0.45 |
| Royal Mail postage, blended (EST) | -£2.10 |
| Card fees ~2% + 25p (EST) | -£0.57 |
| Meals donation (EST) | -£0.50 |
| Blended marketing per pouch sold (EST) | -£3.00 |
| **Contribution** (what each pouch leaves to pay the fixed costs) | **£4.38** (27%) |

## The margin that matters

Fixed costs: £600 a month (Shopify plan + apps (subscriptions, reviews, email) (EST) £120, Product liability insurance (EST) £40, Halal certification + lab testing, monthly share (EST) £80, Content, samples, creator gifting (EST) £300, Accounting + bookkeeping (EST) £60).

- **Break-even: 5 pouchs a day.** Below that you lose money every month.
- **Profit margin at your plan** (20 a day): **21%** of every sale, after every cost.

## Year 1, month by month

| month | pouchs a day | revenue | profit | cumulative (after £5,000 startup) |
| ---: | ---: | ---: | ---: | ---: |
| 1 | 6 | £2,916 | £188 | -£4,812 |
| 2 | 8 | £3,888 | £451 | -£4,360 |
| 3 | 10 | £4,860 | £714 | -£3,646 |
| 4 | 11 | £5,346 | £845 | -£2,801 |
| 5 | 12 | £5,832 | £977 | -£1,824 |
| 6 | 14 | £6,804 | £1,240 | -£585 |
| 7 | 15 | £7,290 | £1,371 | £786 |
| 8 | 16 | £7,776 | £1,502 | £2,289 |
| 9 | 17 | £8,262 | £1,634 | £3,923 |
| 10 | 18 | £8,748 | £1,765 | £5,688 |
| 11 | 19 | £9,234 | £1,897 | £7,584 |
| 12 | 20 | £9,720 | £2,028 | £9,612 |

- **Year 1 operating profit: £14,612** on £80,676 of revenue.
- After the £5,000 startup spend: £9,612.
- Startup money earned back: month 7.
- Cash you need before it pays for itself: **£5,000**.

## What if

| scenario | margin at plan | break-even a day | year 1 profit |
| --- | ---: | ---: | ---: |
| Base plan | 21% | 5 | £14,612 |
| Price -10% | 12% | 8 | £6,545 |
| Volume -20% | 19% | 5 | £10,250 |
| Unit costs +15% | 10% | 8 | £5,783 |

No red flags in these numbers. They are only as good as the inputs: check every cost against a real quote.
