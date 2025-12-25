# Project Controller Documentation

## Overview

The **Project Controller** (`project.controller.ts`) is the central hub for all project-related operations in the TraceKey application. It serves as the business logic layer that coordinates between API routes and database functions, ensuring proper authentication and authorization checks before executing operations.

---

## Table of Contents

1. [Class Overview](#class-overview)
2. [Methods](#methods)
3. [Dependencies](#dependencies)
4. [Architecture](#architecture)
5. [Error Handling](#error-handling)

---

## Class Overview

```typescript
export class ProjectController {
  // All project-related operations
}
export const projectController = new ProjectController();
```

The `ProjectController` is exported as a singleton instance (`projectController`) for use throughout the application.

---

## Methods

### 1. **`createProject()`**

**Signature:**
```typescript
async createProject(
  uuid: string,
  project_name: string,
  api_key: string,
  password: string,
  description: string,
  site_url: string
): Promise<CreateUserProjectResponse>
```

**Purpose:** Creates a new project for a user and adds the user to the project.

**Process:**
1. Calls `createUserProject()` database function with all project details
2. Creates the project record in the database
3. Automatically adds the project creator to the project
4. Returns project details including project ID, API key, creation timestamp, etc.

**Return Value:** `CreateUserProjectResponse` object containing:
- `project_id`: Unique identifier for the project
- `project_name`: Name of the project
- `api_key`: API key for the project
- `created_by`: UUID of the creator
- `created_at`: Timestamp of creation
- `description`: Project description
- `site_url`: Website URL
- `uuid`: User UUID added to project
- `timestamp`: User-project association timestamp

**Related Function:** [`createUserProject()`](src/lib/database/user/projects/createProject.ts)

---

### 2. **`fetchSingleProjectDetailsByID()`**

**Signature:**
```typescript
async fetchSingleProjectDetailsByID(
  id: string,
  auth_key: string
): Promise<SingleProjectDetails>
```

**Purpose:** Retrieves detailed information about a specific project with authentication verification.

**Security:** 
- ✅ Verifies the authentication key is valid
- ✅ Extracts user UUID from auth key
- ✅ Verifies user has access to the project

**Process:**
1. Validates the authentication key using `authController.verifyAuthKey()`
2. Extracts the user's UUID from the auth key
3. Verifies the user has access to the project using `authController.verifyUserProjectAccess()`
4. Fetches project details from the database
5. Returns comprehensive project information

**Return Value:** `SingleProjectDetails` object containing all project metadata

**Related Functions:**
- [`fetchSingleProjectDataByID()`](src/lib/database/user/projects/fetchSingleProjectDetails.ts)
- `authController.verifyAuthKey()`
- `authController.verifyUserProjectAccess()`

---

### 3. **`fetchUserProjects()`**

**Signature:**
```typescript
async fetchUserProjects(auth_key: string): Promise<Project[]>
```

**Purpose:** Fetches all projects associated with a user's authentication key.

**Security:**
- ✅ Requires valid authentication key
- ✅ Throws `AuthenticationError` if no auth key provided

**Process:**
1. Validates that `auth_key` is provided
2. Verifies the authentication key using `authController.verifyAuthKey()`
3. Extracts the user's UUID
4. Fetches all projects associated with the user
5. For each project, retrieves log statistics (total visits, unique visitors)
6. Returns array of projects with analytics data

**Return Value:** Array of `Project` objects containing:
- `id`: Project ID
- `name`: Project name
- `description`: Project description
- `site_link`: Website URL
- `visits`: Total visit count
- `users`: Unique visitor count

**Related Functions:**
- [`fetchProjects()`](src/lib/database/user/projects/fetchProjects.ts)
- `authController.verifyAuthKey()`
- `getProjectLogStatistics()`

---

### 4. **`createUserClientIpRecord()`**

**Signature:**
```typescript
async createUserClientIpRecord(
  api_key: string,
  ip_address: string,
  user_agent: string,
  refferer_url: string,
  _device_information: any,
  _cookies: any,
  device: string,
  location: string,
  additionalDeviceInfo: DeviceInfo = {}
): Promise<void>
```

**Purpose:** Records client request information for analytics and monitoring (IP address, device info, user agent, etc.).

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `api_key` | string | Project's API key for identification |
| `ip_address` | string | Client's IP address |
| `user_agent` | string | Browser user agent string |
| `refferer_url` | string | HTTP referrer URL |
| `_device_information` | object | Device browser/system details |
| `_cookies` | object | HTTP cookies data |
| `device` | string | Device type (desktop, mobile, tablet) |
| `location` | string | Geographic location (region) |
| `additionalDeviceInfo` | DeviceInfo | Additional device metadata |

**Process:**
1. Stringifies device information and cookies for storage
2. Calls database function to insert record
3. Returns void (fire-and-forget pattern)

**Related Function:** [`createUserClientRecord()`](src/lib/database/user/projects/createUserClientipRecord.ts)

---

### 5. **`addUserToProject()`**

**Signature:**
```typescript
async addUserToProject(
  uuid: string,
  projectId: string,
  newUserEmail: string
): Promise<void>
```

**Status:** ⚠️ **In Development** - Currently incomplete

**Purpose:** Add a new user to an existing project.

**Planned Workflow:**
1. ✅ Verify the requesting user is the project owner (implemented)
2. ⏳ Check if the email belongs to a registered user
3. ⏳ Add the user to the project with appropriate permissions

**Security:**
- ✅ Verifies project ownership before allowing access

**Related Function:** [`verifyUserProjectOwnerShip()`](src/lib/database/user/projects/verifyUserProjectOwnerShip.ts)

---

### 6. **`getProjectIpLogs()`**

**Signature:**
```typescript
async getProjectIpLogs(
  id: string,
  page?: number
): Promise<LogActivity[]>
```

**Purpose:** Retrieves paginated IP and client activity logs for a project.

**⚠️ Security Note:** This is an internal function - **verify user authorization before calling**.

**Parameters:**
- `id`: Project ID
- `page` (optional): Page number for pagination (default: 1, shows 10 records per page)

**Return Value:** Array of `LogActivity` objects containing:
- `ip`: Client IP address
- `time`: Formatted timestamp of the visit
- `device`: Device type
- `region`: Geographic region
- `interactionID`: Unique interaction identifier
- `userAgent`: Browser user agent
- `referrerUrl`: HTTP referrer
- `cookies`: Cookie data
- `additionalDeviceInfo`: Extra device metadata

**Related Function:** [`getProjectLogs()`](src/lib/database/user/projects/logs/getProjectLogs.ts)

---

### 7. **`getProjectLogStatistics()`**

**Signature:**
```typescript
async getProjectLogStatistics(id: string): Promise<LogActivityStaticsInterface>
```

**Purpose:** Fetches aggregated analytics for a project.

**⚠️ Security Note:** This is an internal function - **verify user authorization before calling**.

**Return Value:** `LogActivityStaticsInterface` object containing:
- `uniqueVisitors`: Total count of unique visitors
- `totalVisits`: Total number of visits/interactions

**Related Function:** [`getLogStatics()`](src/lib/database/user/projects/logs/getLogStatics.ts)

---

### 8. **`getTopRegionOfProject()`**

**Signature:**
```typescript
async getTopRegionOfProject(id: string): Promise<string>
```

**Purpose:** Returns the geographic region with the most visits to a project.

**⚠️ Security Note:** This is an internal function - **verify user authorization before calling**.

**Return Value:** Region name as a string (e.g., "United States", "India") or "Unknown"

**Related Function:** [`getTopRegion()`](src/lib/database/user/projects/logs/getTopRegion.ts)

---

## Dependencies

### Imported Modules

| Import | Path | Purpose |
|--------|------|---------|
| `createUserProject` | `database/user/projects/createProject.ts` | Creates new project in database |
| `createUserClientRecord` | `database/user/projects/createUserClientipRecord.ts` | Records client IP/device info |
| `fetchProjects` | `database/user/projects/fetchProjects.ts` | Retrieves user's projects |
| `fetchSingleProjectDataByID` | `database/user/projects/fetchSingleProjectDetails.ts` | Retrieves single project details |
| `getProjectLogs` | `database/user/projects/logs/getProjectLogs.ts` | Fetches activity logs |
| `getLogStatics` | `database/user/projects/logs/getLogStatics.ts` | Fetches analytics statistics |
| `getTopRegion` | `database/user/projects/logs/getTopRegion.ts` | Retrieves top region by visits |
| `verifyUserProjectOwnerShip` | `database/user/projects/verifyUserProjectOwnerShip.ts` | Verifies project ownership |
| `authController` | `controllers/auth.controller.ts` | Handles authentication/authorization |

### Error Types

- **`AuthenticationError`**: Thrown when authentication key is invalid or missing

---

## Architecture

### Layered Design

```
API Routes (Next.js)
    ↓
Project Controller (Business Logic)
    ↓
Database Functions (Data Access)
    ↓
Database (PostgreSQL)
```

### Authentication Flow

```
User provides auth_key
    ↓
authController.verifyAuthKey() → extracts UUID
    ↓
authController.verifyUserProjectAccess() → checks permissions
    ↓
Project operation proceeds
```

---

## Error Handling

The Project Controller relies on the **centralized error handler** to catch and process errors:

### Error Types

| Error | When Thrown | Handling |
|-------|------------|----------|
| `AuthenticationError` | No auth key provided or verification fails | Centralized handler returns 401 |
| `AuthorizationError` | User lacks permissions to access project | Centralized handler returns 403 |
| `DatabaseError` | Database query fails | Centralized handler returns 500 |
| `ResourceNotFoundError` | Project doesn't exist | Centralized handler returns 404 |

### Error Flow

```
Project Controller Method
    ↓
Database Function
    ↓
Error Thrown
    ↓
Centralized Error Handler
    ↓
HTTP Response (with appropriate status code)
```

---

## Usage Examples

### Creating a Project

```typescript
const response = await projectController.createProject(
  'user-uuid-123',
  'My Analytics Project',
  'api_key_xyz',
  'secure_password',
  'Track website visitors',
  'https://example.com'
);
```

### Fetching User's Projects

```typescript
const projects = await projectController.fetchUserProjects('auth_key_xyz');
// Returns array of projects with visit statistics
```

### Recording a Client Visit

```typescript
await projectController.createUserClientIpRecord(
  'api_key_xyz',
  '192.168.1.1',
  'Mozilla/5.0...',
  'https://referrer.com',
  { browser: 'Chrome', os: 'Windows' },
  { sessionId: 'abc123' },
  'desktop',
  'United States'
);
```

### Fetching Project Analytics

```typescript
const stats = await projectController.getProjectLogStatistics('project-id-123');
// { uniqueVisitors: "1,234", totalVisits: "5,678" }

const topRegion = await projectController.getTopRegionOfProject('project-id-123');
// "India"
```

---

## Notes

- All database functions are async and must be awaited
- The controller enforces authentication and authorization checks before database operations
- Internal analytics functions (`getProjectLogs`, `getLogStatistics`, `getTopRegion`) are designed to be called after user verification
- The singleton pattern ensures a single instance of the controller throughout the application
- Error messages are propagated through the centralized error handler for consistent API responses

