## 🗃️ Database Connection and Handling

We use the **`pg`** module to establish a **pooled connection** to the PostgreSQL database.
This logic is implemented in [`db.ts`](https://github.com/joel909/TraceKey/blob/master/src/lib/database/config/db.ts).

### Query Execution Flow

1. A custom `query` function accepts three parameters: `purpose`, `text`, and `params`
2. The query is executed using `pool.query`
3. Results are validated using [`validateDatabaseResult`](https://github.com/joel909/TraceKey/blob/master/src/lib/database/config/databaseResultValidator.ts), which:
   - Checks if the query returned appropriate data based on the requested operation
   - Ensures the result structure is correct
   - Throws relevant errors if validation fails
4. **On success:** The result rows are returned to the caller
5. **On error:** Exceptions are caught and passed to the centralized error handler, which decodes and elaborates the error before throwing it back to the calling function

---

## 🧠 Centralized Error Handler

All errors—whether originating from the database or application logic—flow through a **centralized error handler**.

This handler:
- Distinguishes between **known errors** (custom-defined) and **unknown errors**
- Returns a structured response with detailed error information
- Ensures consistent and meaningful error reporting across the entire application
