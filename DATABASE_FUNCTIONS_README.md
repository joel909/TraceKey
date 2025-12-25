# Project Controller - Database Functions Documentation

## Overview

This document describes all the database layer functions used by the Project Controller, showing what each function does and what dependencies they have.

---

## Database Functions Summary

| Function | File | Purpose | Dependencies |
|----------|------|---------|--------------|
| `createUserProject()` | `createProject.ts` | Creates a new project | `query()` |
| `createUserClientRecord()` | `createUserClientipRecord.ts` | Records client request info | `query()` |
| `fetchProjects()` | `fetchProjects.ts` | Fetches user's projects | `query()`, `projectController.getProjectLogStatistics()` |
| `fetchSingleProjectDataByID()` | `fetchSingleProjectDetails.ts` | Fetches single project | `query()` |
| `getProjectLogs()` | `logs/getProjectLogs.ts` | Fetches activity logs | `query()` |
| `getLogStatics()` | `logs/getLogStatics.ts` | Fetches analytics stats | `query()` |
| `getTopRegion()` | `logs/getTopRegion.ts` | Gets top region by visits | `query()` |
| `verifyUserProjectOwnerShip()` | `verifyUserProjectOwnerShip.ts` | Verifies project ownership | `query()` |
| `checkUserExistsByEmail()` | `checkUserExistsByEmail.ts` | Checks if user exists by email | `query()` |

---

## Detailed Function Documentation

### 1. `createUserProject()`

**File:** `src/lib/database/user/projects/createProject.ts`

**Signature:**
```typescript
async function createUserProject(
  uuid: string,
  project_name: string,
  api_key: string,
  password: string,
  description: string,
  site_url: string
): Promise<CreateUserProjectResponse>
```

**Purpose:** Creates a new project and adds the creator as a user to the project.

**Process:**
1. Executes `query("CREATE_PROJECT", createProject, [...])`
   - Inserts new project into database with all project details
   - Returns project information including `project_id`
2. Executes `query("ADD_USER_TO_PROJECT", AddUserToProjectQuery, [...])`
   - Associates the creator (uuid) with the newly created project
   - Returns user-project association info

**Database Dependencies:**
- `query()` - Core database query execution function
- **Queries Used:**
  - `createProject` - SQL for project creation
  - `AddUserToProjectQuery` - SQL for adding user to project

**Return Value:**
```typescript
{
  project_id: string;
  created_by: string;
  project_name: string;
  api_key: string;
  created_at: Date;
  description: string;
  site_url: string;
  uuid: string;
  timestamp: Date;
}
```

---

### 2. `createUserClientRecord()`

**File:** `src/lib/database/user/projects/createUserClientipRecord.ts`

**Signature:**
```typescript
async function createUserClientRecord(
  api_key: string,
  ip_address: string,
  user_agent: string,
  refferer_url: string,
  device_information: DeviceInfoInterface,
  _cookies: any,
  device: string,
  location: string,
  additionalDeviceInfo: DeviceInfo = {}
): Promise<void>
```

**Purpose:** Records a client visit/request for analytics tracking.

**Process:**
1. Stringifies object parameters:
   - `device_information` → JSON string
   - `_cookies` → JSON string
   - `additionalDeviceInfo` → JSON string
2. Executes `query("CREATE_USER_IP_RECORD", createUserClientIPRecordQuery, [...])`
   - Inserts record into database with all client info

**Database Dependencies:**
- `query()` - Core database query execution function
- **Queries Used:**
  - `createUserClientIPRecordQuery` - SQL for inserting IP records

**Data Stored:**
- IP address
- User agent string
- Referrer URL
- Device type (desktop, mobile, tablet)
- Geographic location/region
- Device information (browser, OS, etc.)
- Cookies data
- Additional device metadata

---

### 3. `fetchProjects()`

**File:** `src/lib/database/user/projects/fetchProjects.ts`

**Signature:**
```typescript
async function fetchProjects(uuid: string): Promise<Project[]>
```

**Purpose:** Fetches all projects owned by a user with analytics statistics.

**Process:**
1. Executes `query("FETCH USER ASSOCIATED PROJECTS", fetchUserAssociatedProjects, [uuid])`
   - Retrieves all projects where user is associated
   - Returns array of project records from database
2. **For each project returned:**
   - Calls `projectController.getProjectLogStatistics(project_item.project_id)`
     - Gets unique visitor count and total visits
   - Maps database result to `Project` interface with:
     - Project name
     - Description
     - Site link
     - Visit statistics
     - Unique visitor count
3. Returns array of enriched `Project` objects

**Database Dependencies:**
- `query()` - Core database query execution function
- `projectController.getProjectLogStatistics()` - Fetches analytics for each project
- **Queries Used:**
  - `fetchUserAssociatedProjects` - SQL for fetching user's projects

**Return Value:**
```typescript
[
  {
    id: string;
    name: string;
    description: string;
    site_link: string;
    visits: number | string;
    users: number | string;
  }
]
```

**Note:** This function creates a circular dependency with the ProjectController. It calls `projectController.getProjectLogStatistics()` to enrich project data.

---

### 4. `fetchSingleProjectDataByID()`

**File:** `src/lib/database/user/projects/fetchSingleProjectDetails.ts`

**Signature:**
```typescript
async function fetchSingleProjectDataByID(id: string): Promise<SingleProjectDetails>
```

**Purpose:** Retrieves complete details for a single project by ID.

**Process:**
1. Executes `query("FETCH_PROJECT_DETAILS_BY_ID", fetchSingleProjectDataByIDQuery, [id])`
   - Queries database for project with matching ID
   - Returns array of results
2. Returns first result object (`requestDetails[0]`)
3. Logs results to console for debugging

**Database Dependencies:**
- `query()` - Core database query execution function
- **Queries Used:**
  - `fetchSingleProjectDataByIDQuery` - SQL for fetching project details

**Error Handling:**
- Catches errors and re-throws them (logged to console)

**Return Value:** `SingleProjectDetails` object containing all project metadata

---

### 5. `getProjectLogs()`

**File:** `src/lib/database/user/projects/logs/getProjectLogs.ts`

**Signature:**
```typescript
async function getProjectLogs(
  projectId: string,
  page?: number
): Promise<LogActivity[]>
```

**Purpose:** Retrieves paginated client activity logs for a project.

**Process:**
1. Calculates database offset from page number:
   - `offset = (page - 1) * 10` (10 records per page)
2. Executes `query("FETCH_PROJECT_LOGS", fetchSingleProjectNIpLogsQuery, [projectId, 10, offset])`
   - Retrieves 10 log records from given offset
   - Returns array of raw log records
3. **For each log record:**
   - Maps database fields to `LogActivity` interface:
     - IP address (or "Unknown")
     - Timestamp formatted as locale string
     - Device type (or "Unknown")
     - Region/location (or "Unknown")
     - Interaction ID
     - User agent
     - Referrer URL (or "Direct Visit")
     - Cookies data
     - Additional device info (JSON stringified)
4. Returns array of mapped `LogActivity` objects

**Database Dependencies:**
- `query()` - Core database query execution function
- **Queries Used:**
  - `fetchSingleProjectNIpLogsQuery` - SQL for fetching paginated logs

**Return Value:**
```typescript
[
  {
    ip: string;
    time: string;
    device: string;
    region: string;
    interactionID: string;
    userAgent: string;
    referrerUrl: string;
    cookies: string;
    additionalDeviceInfo: string;
  }
]
```

**Pagination:** Supports page-based pagination (10 items per page)

---

### 6. `getLogStatics()`

**File:** `src/lib/database/user/projects/logs/getLogStatics.ts`

**Signature:**
```typescript
async function getLogStatics(projectId: string): Promise<LogActivityStaticsInterface>
```

**Purpose:** Fetches aggregated analytics/statistics for a project's logs.

**Process:**
1. Executes `query("FETCH_PROJECT_LOG_STATICS", projectLogStatics, [projectId])`
   - Queries database for aggregated statistics
   - Returns array with single record containing counts
2. Extracts values from result:
   - `unique_visitors` → converted to string
   - `total_visits` → converted to string
3. Returns with fallback to "Failed to fetch" if data unavailable

**Database Dependencies:**
- `query()` - Core database query execution function
- **Queries Used:**
  - `projectLogStatics` - SQL for fetching aggregated statistics

**Return Value:**
```typescript
{
  uniqueVisitors: string;
  totalVisits: string;
}
```

---

### 7. `getTopRegion()`

**File:** `src/lib/database/user/projects/logs/getTopRegion.ts`

**Signature:**
```typescript
async function getTopRegion(projectId: string): Promise<string>
```

**Purpose:** Retrieves the geographic region with the most visits to a project.

**Process:**
1. Executes `query("FETCH_TOP_REGION", fetchTopRegion, [projectId])`
   - Queries database to find region with highest visit count
   - Returns array with single record
2. Extracts region name from result
3. Returns region string or "Unknown" if not found

**Database Dependencies:**
- `query()` - Core database query execution function
- **Queries Used:**
  - `fetchTopRegion` - SQL for finding top region

**Return Value:** Region name as string (e.g., "India", "United States") or "Unknown"

---

### 8. `verifyUserProjectOwnerShip()`

**File:** `src/lib/database/user/projects/verifyUserProjectOwnerShip.ts`

**Signature:**
```typescript
async function verifyUserProjectOwnerShip(
  uuid: string,
  projectId: string
): Promise<void>
```

**Purpose:** Verifies that a user is the owner/creator of a project.

**Process:**
1. Executes `query("VERIFY_USER_PROJECT_OWNERSHIP", fetchProjectOwnerQuery, [projectId, uuid])`
   - Queries database to verify user is project owner
   - Passes both projectId and uuid to query
   - Returns project owner verification result
2. Does not return any value

**Database Dependencies:**
- `query()` - Core database query execution function
- **Queries Used:**
  - `fetchProjectOwnerQuery` - SQL for verifying project ownership

**Return Value:** `void` - Returns nothing, throws error if verification fails

**Error Handling:** If verification fails, an `AuthorizationError` is thrown through the centralized error handler.

---

### 9. `checkUserExistsByEmail()`

**File:** `src/lib/database/user/projects/checkUserExistsByEmail.ts`

**Signature:**
```typescript
async function checkUserExistsByEmail(email: string): Promise<void>
```

**Purpose:** Checks if a user with the given email address exists in the database.

**Process:**
1. Executes `query("CHECK_USER_EXISTS_BY_EMAIL", checkUserExistsByEmailQuery, [email])`
   - Queries database to find user with matching email
   - Returns result (user exists or not)
2. Does not return any value

**Database Dependencies:**
- `query()` - Core database query execution function
- **Queries Used:**
  - `checkUserExistsByEmailQuery` - SQL for checking user existence by email

**Return Value:** `void` - Returns nothing

**Error Handling:** If user is not found, `ResourceNotFoundError` is thrown. Any database errors are passed to the centralized error handler.

**Use Case:** Typically used in user signup flow to prevent duplicate email registration.

---

## Core Dependency: `query()` Function

**File:** `src/lib/database/config/db.ts`

**Signature:**
```typescript
async function query(
  purpose: string,
  text: string,
  params: any[]
): Promise<any>
```

**Purpose:** Executes SQL queries against the PostgreSQL database using a connection pool.

**Process:**
1. Executes query using `pool.query(text, params)`
2. Validates result using `validateDatabaseResult()` function
3. On success: Returns result rows
4. On error: Throws error to centralized error handler

**Dependencies:**
- `pg` module - PostgreSQL client library
- `validateDatabaseResult()` - Result validation function
- Centralized error handler - For error processing

**Parameters:**
- `purpose`: Description of query purpose (for logging/debugging)
- `text`: SQL query string
- `params`: Query parameters (prevents SQL injection)

**Error Handling:**
- Database errors are caught and passed to centralized error handler
- Throws appropriate error types: `DatabaseError`, `ResourceNotFoundError`, etc.

---

## All Available Queries

These are imported from `src/lib/database/config/queries.ts`:

| Query Variable | Used By | Purpose |
|----------------|---------|---------|
| `createProject` | `createUserProject()` | Insert new project |
| `AddUserToProjectQuery` | `createUserProject()` | Associate user with project |
| `createUserClientIPRecordQuery` | `createUserClientRecord()` | Insert client visit record |
| `fetchUserAssociatedProjects` | `fetchProjects()` | Get user's projects |
| `fetchSingleProjectDataByIDQuery` | `fetchSingleProjectDataByID()` | Get single project details |
| `fetchSingleProjectNIpLogsQuery` | `getProjectLogs()` | Get paginated activity logs |
| `projectLogStatics` | `getLogStatics()` | Get analytics statistics |
| `fetchTopRegion` | `getTopRegion()` | Get top region by visits |
| `fetchProjectOwnerQuery` | `verifyUserProjectOwnerShip()` | Verify project ownership |
| `checkUserExistsByEmailQuery` | `checkUserExistsByEmail()` | Check user existence by email |

---

## Function Dependency Tree

```
ProjectController Methods
│
├── createProject()
│   └── createUserProject()
│       └── query()
│           ├── createProject query
│           └── AddUserToProjectQuery
│
├── fetchUserProjects()
│   └── fetchProjects()
│       ├── query()
│       │   └── fetchUserAssociatedProjects query
│       └── getProjectLogStatistics()
│           └── query()
│               └── projectLogStatics query
│
├── fetchSingleProjectDetailsByID()
│   └── fetchSingleProjectDataByID()
│       └── query()
│           └── fetchSingleProjectDataByIDQuery
│
├── createUserClientIpRecord()
│   └── createUserClientRecord()
│       └── query()
│           └── createUserClientIPRecordQuery
│
├── getProjectIpLogs()
│   └── getProjectLogs()
│       └── query()
│           └── fetchSingleProjectNIpLogsQuery
│
├── getProjectLogStatistics()
│   └── getLogStatics()
│       └── query()
│           └── projectLogStatics query
│
├── getTopRegionOfProject()
│   └── getTopRegion()
│       └── query()
│           └── fetchTopRegion query
│
└── addUserToProject() [IN DEVELOPMENT]
    └── verifyUserProjectOwnerShip()
        └── query()
            └── fetchProjectOwnerQuery
```

---

## Data Flow Examples

### Creating a Project with Client Record

```
User creates project
    ↓
projectController.createProject()
    ↓
createUserProject()
    ├─ query(createProject) → Creates project, gets project_id
    └─ query(AddUserToProjectQuery) → Associates user with project
    ↓
Project created, returns response

User makes request to tracking script
    ↓
projectController.createUserClientIpRecord()
    ↓
createUserClientRecord()
    ↓
query(createUserClientIPRecordQuery) → Inserts visit record
    ↓
Activity logged
```

### Viewing Project Analytics

```
User requests project analytics
    ↓
projectController.fetchUserProjects()
    ↓
fetchProjects()
    ├─ query(fetchUserAssociatedProjects) → Gets projects
    └─ For each project:
        └─ getProjectLogStatistics()
            ├─ query(projectLogStatics) → Gets counts
            └─ Maps to Project object
    ↓
Returns projects array with statistics
```

---

## Database Result Validation

All `query()` function results are validated by `validateDatabaseResult()` which:
- Checks if result exists
- Validates result structure
- Throws appropriate errors:
  - `ResourceNotFoundError` - Empty result set
  - `ValidationError` - Invalid data structure
  - `DatabaseError` - Query execution failed

---

## Error Handling Across Functions

All database functions ultimately rely on the same error handling:

```
Database Error
    ↓
query() function catches it
    ↓
validateDatabaseResult() processes it
    ↓
Centralized Error Handler
    ├─ Determines error type
    ├─ Logs error details
    └─ Returns structured error response
    ↓
API Route returns HTTP error response
```

---

## Performance Considerations

1. **Connection Pooling**: All queries use PostgreSQL connection pool via `pg` module
2. **Pagination**: `getProjectLogs()` uses pagination (10 items per page) to limit data transfer
3. **Denormalization**: `fetchProjects()` calls analytics for each project (N+1 query pattern) - potential optimization area
4. **Caching**: No caching layer currently implemented (could be added for analytics data)

---

## Testing Functions Individually

### Test `createUserClientRecord()`
```bash
npx tsx --eval "
import createUserClientRecord from './src/lib/database/user/projects/createUserClientipRecord.js';

await createUserClientRecord(
  'api_key_xyz',
  '192.168.1.1',
  'Mozilla/5.0...',
  'https://example.com',
  { browser: 'Chrome' },
  { sessionId: 'abc123' },
  'desktop',
  'United States'
);
console.log('Record created');
"
```

### Test `fetchProjects()`
```bash
npx tsx --eval "
import fetchProjects from './src/lib/database/user/projects/fetchProjects.js';

const projects = await fetchProjects('user-uuid-123');
console.log('Projects:', projects);
"
```

### Test `getProjectLogs()`
```bash
npx tsx --eval "
import getProjectLogs from './src/lib/database/user/projects/logs/getProjectLogs.js';

const logs = await getProjectLogs('project-id-123', 1);
console.log('Logs:', logs);
"
```

