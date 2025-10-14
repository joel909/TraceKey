// PostgreSQL error code mappings

export interface PgErrorCodeMap {
  [code: string]: {
    type: string;
    subtype?: string;
    message: string;
  };
}

export const PG_ERROR_CODES: PgErrorCodeMap = {
  // Connection errors
  "3D000": { 
    type: "connection",
    subtype: "database_not_found", 
    message: "Database does not exist" 
  },
  "28000": { 
    type: "connection", 
    subtype: "auth_failed", 
    message: "Invalid authorization specification" 
  },
  "28P01": { 
    type: "connection", 
    subtype: "auth_failed", 
    message: "Invalid password" 
  },
  "53300": { 
    type: "connection", 
    subtype: "limit_exceeded", 
    message: "Too many connections" 
  },
  "08000": { 
    type: "connection", 
    message: "Connection exception" 
  },
  "08003": { 
    type: "connection", 
    message: "Connection does not exist" 
  },
  "08006": { 
    type: "connection", 
    message: "Connection failure" 
  },
  "57P01": { 
    type: "connection", 
    message: "Admin shutdown" 
  },
  "57P02": { 
    type: "connection", 
    message: "Crash shutdown" 
  },
  "57P03": { 
    type: "connection", 
    message: "Cannot connect now" 
  },
  "ECONNREFUSED": { 
    type: "connection", 
    message: "Connection refused" 
  },
  "ENOTFOUND": { 
    type: "connection", 
    message: "Host not found" 
  },
  "ETIMEDOUT": { 
    type: "connection", 
    message: "Connection timeout" 
  },
  "ECONNRESET": { 
    type: "connection", 
    message: "Connection reset by peer" 
  },

  // Query errors
  "42601": { 
    type: "query", 
    subtype: "syntax_error", 
    message: "Syntax error" 
  },
  "42P01": { 
    type: "query", 
    subtype: "undefined_table", 
    message: "Undefined table" 
  },
  "42703": { 
    type: "query", 
    subtype: "undefined_column", 
    message: "Undefined column" 
  },
  "42883": { 
    type: "query", 
    subtype: "undefined_function", 
    message: "Undefined function" 
  },
  "22P02": { 
    type: "query", 
    subtype: "invalid_input", 
    message: "Invalid text representation" 
  },
  "22003": { 
    type: "query", 
    subtype: "numeric_out_of_range", 
    message: "Numeric value out of range" 
  },

  // Constraint violations
  "23000": { 
    type: "constraint", 
    message: "Integrity constraint violation" 
  },
  "23505": { 
    type: "constraint", 
    subtype: "unique_violation", 
    message: "Unique constraint violation" 
  },
  "23503": { 
    type: "constraint", 
    subtype: "foreign_key_violation", 
    message: "Foreign key constraint violation" 
  },
  "23502": { 
    type: "constraint", 
    subtype: "not_null_violation", 
    message: "Not null constraint violation" 
  },
  "23514": { 
    type: "constraint", 
    subtype: "check_violation", 
    message: "Check constraint violation" 
  },
  
  // Transaction errors
  "40001": { 
    type: "transaction", 
    subtype: "serialization_failure", 
    message: "Serialization failure" 
  },
  "40P01": { 
    type: "transaction", 
    subtype: "deadlock_detected", 
    message: "Deadlock detected" 
  },
  "40000": { 
    type: "transaction", 
    subtype: "rollback", 
    message: "Transaction rollback" 
  },
  
  // Resource errors
  "53000": { 
    type: "resource", 
    message: "Insufficient resources" 
  },
  "53100": { 
    type: "resource", 
    message: "Disk full" 
  },
  "53200": { 
    type: "resource", 
    message: "Out of memory" 
  },
  "57014": { 
    type: "resource", 
    subtype: "query_canceled", 
    message: "Query canceled" 
  },
  
  // System errors
  "58000": { 
    type: "system", 
    message: "System error" 
  },
  "XX000": { 
    type: "system", 
    subtype: "internal_error", 
    message: "Internal error" 
  }
};