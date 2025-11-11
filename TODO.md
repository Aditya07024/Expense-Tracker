# TODO: Modify Transaction Logic and Backend Integration

## Backend Changes

- [ ] Update `backend/src/controllers/transactionsController.js`:
  - Modify `createTransaction` to accept `source` and `category` in request body, insert into `source` and `category` columns.
  - Update `getSummaryByUserId` to use `source` column for determining income/expense in balance, income, and expenses calculations.
  - Ensure `getTransactionsByUserId` selects the new columns correctly.

## Frontend Changes

- [ ] Update `mobile/app/(root)/create.jsx`:
  - Modify `handleCreate` to determine `source` and `category` based on `selectedCategory`:
    - If `selectedCategory === "Income"`, set `source: "income"`, `category: "Income"`.
    - Otherwise, set `source: "expense"`, `category: selectedCategory`.
  - Change amount to always be positive: `amount: Math.abs(parseFloat(amount))`.
  - Update the fetch body to send `source` and `category` instead of `category`.

## Database Schema Assumption

- Assume the database has been updated: `category` column renamed to `source`, new `category` column added.
- If migration is needed, run appropriate SQL commands (e.g., ALTER TABLE transactions RENAME COLUMN category TO source; ALTER TABLE transactions ADD COLUMN category VARCHAR(255);).

## Testing

- [ ] Test creating transactions for income and expenses.
- [ ] Verify summary calculations (balance, income, expenses) are correct.
- [ ] Ensure transaction fetching works with new columns.
- [ ] Check UI remains unchanged.
