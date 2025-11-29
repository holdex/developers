# Leave Policy

## Introduction

Every team member (the Member) benefits from our "paid time off" allowance
described below or directly in the signed agreement.

> [!IMPORTANT]
> In case of conflict between the signed agreement and scheduler, the signed
agreement terms prevail.

## Year of Service

The Year of Service is 365 calendar days starting from the date of signing the
agreement.

## Minimum Service Period

The Minimum Service Period is 6 months since the date of signing the agreement.

## Leave Request

### Submit Request

2 weeks in advance (except for sick leave) the Member can submit the Leave
Request by creating a new GitHub issue in HR repository and providing:

- start and end dates, and
- leave reason.

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
