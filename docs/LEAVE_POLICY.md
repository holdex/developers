# Leave Policy

## Introduction

Every team member (the Member) benefits from our "paid time off" allowance
described below or directly in the signed agreement.

> [!IMPORTANT]
> In case of conflict between the signed agreement and scheduler, the signed
agreement terms prevail.

## Summary of Leave Entitlements

| Eligibility                  | Paid Leave per Year of Service | Can Carry Over | Can Be Paid Out on Termination | Unpaid Leave Allowed? |
|------------------------------|--------------------------------|----------------|--------------------------------|-----------------------|
| < 6 months service           | 0 days                         | No             | No                             | Yes (deducted)        |
| ≥ 6 months service           | 14 days (includes public holidays, sick, personal) | Max 3 days | Max 5 unused days              | Yes (deducted)        |

> [!NOTE]
> 1 Year of Service = 365 calendar days from your agreement start date.

## Year of Service

The Year of Service is 365 calendar days starting from the date of signing the
agreement.

## Minimum Service Period

The Minimum Service Period is 6 months since the date of signing the agreement.

## Leave Request

### Submit Request

**Submit your request at least 14 days in advance** (except for genuine sick
leave or emergencies). Create a **new GitHub issue** in the **HR repository**
using this exact title format:  
   `Leave Request: FirstName LastName – YYYY-MM-DD to YYYY-MM-DD`

- Start date: YYYY-MM-DD
- End date: YYYY-MM-DD (inclusive)
- Total working days requested: X
- Type: Paid / Sick / Unpaid
- Reason (short): e.g., Vacation in Italy / Family event / Medical appointment
- Backup person (who covers your duties): @github-username

### Approve or Reject Request

HR Manager must consult with relevant Partner and approve leave request by
merging a pull request (PR) in PR Tracker repository or reject the Leave Request
by providing a detailed explanation and closing the issue with "Close as not
planned" option.

## Leave Allowance

### Paid Leave

Members with the [Minimum Service Period](#minimum-service-period) are granted
14 days paid time off allowance (including holidays, sick leave, personal
leave).

### Reimbursable Leave

1. In case of the agreement termination after 9 up to 5 unused Paid Leave days
   can be compensated based on the following formula:

   ```js
    compensation = monthlyRate / 30 * reimbersableDays
    ```
1. Member can carry over 3 unused Paid Leave days into the following
   [Year of Service](#year-of-service).

#### Unpaid Leave

The Unpaid Leave is deducted from the monthly payout. The deduction is
calculated with the following formula:

```js
deduction = monthlyRate / 30 * requestedDaysOff
```
