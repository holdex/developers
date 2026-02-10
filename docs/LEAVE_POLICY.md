# Leave Policy

Every team member (the Member) benefits from our "paid time off" allowance
described below or directly in the signed agreement.

> [!IMPORTANT]
> In case of conflict between the signed agreement and scheduler, the signed
agreement terms prevail.

## How Many Days Do You Get?

| Your Service Time       | Paid Days per Year | Can Carry Over | Can Get Paid When Leaving |
|-------------------------|--------------------|----------------|---------------------------|
| 0 – 6 months            | 0 days             | –              | –                         |
| 6 months and more       | 14 days            | Max 3 days     | Max 5 days                |

These 14 days cover **everything**: vacation, personal days, sick days, and
public holidays.

## When Does Your Year Start?

Your personal leave year = **365 days from the date you signed your agreement**.

## How to Request Leave?

1. **Go to your HR repository** (e.g., `holdex/hr-member-yourname`)
1. **Create a new issue and branch** for your leave request

   - Issue Title Example: `Leave Request: William Rusdyputra - Holiday`
   - Branch example: `leave/william-rusdyputra`
   - You can define which days you are requesting on the issue description, even if the days are separated like 12th, 14th, etc.

1. **Edit the `leave.yaml` file** and add your leave dates:
   - For future leave: add under `daysOff.scheduled`
   - For past days: add under `daysOff.taken`

   Example:

   ```yaml
   daysOff:
     taken:
       - date: 2025-12-25
         type: holiday
     scheduled:
       - date: 2026-01-15
         type: vacation
         notes: Family trip
   ```

1. **Create a Pull Request** with your changes
1. **Wait for approval** - HR will review it by D-1 at the latest and merge your
   PR if it’s approved
1. **After merge** - your leave is recorded and will appear in the automated
   summary

### Valid Leave Types

- `vacation` - Planned time off
- `sick` - Sick leave
- `personal` - Personal days
- `holiday` - Public/company holidays
- `unpaid` - Unpaid leave (deducted from salary)

### Date Ranges

You can use ranges for multi-day leave:

```yaml
- date: 2026-02-10 to 2026-02-15
  type: vacation
```

or for multi-day but separated, you can simply add more items on 1 PR:

```yaml
- date: 2026-02-10
  type: vacation
- date: 2026-02-12
  type: personal
- date: 2026-02-15 to 2026-02-17
  type: personal
```

## Automated Leave Summary

Every day at midnight UTC, the system automatically:

- Calculates your leave balance (days remaining/committed)
- Shows carry-over from previous year (max 3 days)
- Updates your HR issue with a detailed leave summary
- Calculates unpaid leave deductions per month

## Money Rules – Super Simple

| Situation                         | What You Get / Lose                                                                 |
|-----------------------------------|--------------------------------------------------------------------------------------|
| You leave the company             | Up to 5 unused paid days are paid out → `monthly rate ÷ 30 × days`                  |
| You have leftover days at year end| Max 3 paid days move to next year. The rest disappear.                              |
| You take unpaid leave             | Money is deducted → `monthly rate ÷ 30 × unpaid days`                               |
