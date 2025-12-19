Here's the document with fixed markdown formatting:

---

## 🧩 Tech Stack Overview

This project uses a simple yet powerful stack. It's a **monolithic application** built using **Next.js**, with a **PostgreSQL** database hosted on `hackclub.app`.

* **Framework:** Next.js
* **Database:** PostgreSQL

---

## ⚙️ Extended Error Classes

To ensure robust error handling and clean debugging, several custom error classes have been defined:

* **`ResourceNotFoundError`** → Thrown when a database query executes successfully but returns an empty result set.
* **`ValidationError`** → Raised when invalid input is provided or an operation cannot be completed due to input-related issues (although the code ensures these are rare).
* **`AuthenticationError`** → Triggered when database credentials are invalid or the requesting user is not authenticated.
* **`AuthorizationError`** → Occurs when a user lacks the necessary permissions to access a given resource.
* **`DatabaseError`** → Used when a query fails due to connectivity issues, invalid credentials, or a downed database server.

---

## 🗃️ Database Connection and Handling

We use the **`pg`** module to establish a **pooled connection** to the PostgreSQL database. This logic is implemented in [`db.ts`](https://github.com/joel909/TraceKey/blob/master/src/lib/database/config/db.ts).

A custom `query` function takes three parameters — `purpose`, `text`, and `params` — and executes the query using `pool.query`.

It then proceeds to run a [`validateDatabaseResult`](https://github.com/joel909/TraceKey/blob/master/src/lib/database/config/databaseResultValidator.ts). This validates the result based on the requested source and makes sure the query contains appropriate information needed and it is correct, else it throws relevant errors.

On success, the result row is returned. Otherwise, it goes into the catch block if there is an error, which then goes into the centralized error handler. It tries to decode and elaborate the error, then throws the error which gets passed on to the main function.

---

## 🧠 Centralized Error Handler

All errors, whether from the database or application logic, flow through a **centralized error handler**. This handler determines whether an error is **known** (custom-defined) or **unknown**, and returns a structured response containing detailed error information. This approach ensures consistent and meaningful error reporting across the entire application.

---

## 🔐 Auth Controller 

The **Auth Controller** [`auth.controller.ts`](https://github.com/joel909/TraceKey/blob/master/src/lib/controllers/auth.controller.ts) is responsible for user management and authentication logic. It provides functions to create, edit, and manage user accounts, validate authentication keys, and verify user authorization levels.

**Core Functions:**

* **`createUser(data: UserCreationRequestInterface)`** → Creates a new user with a default project and sets authentication cookies.
  - **Parameters**: `data` - User creation request containing email, username, and password
  - Returns a plain JSON object conforming to the `AccountCreationResponse` interface, containing details such as the user ID, email, and creation timestamp. Additionally creates a default project for the user and sets authentication cookies (`auth_key`, `username`, `email`). If the operation fails, an appropriate error is thrown and handled centrally.
  - Returns the data used to create the user if the operation is successful.

* **`verifyAuthKey(authKey?: string)`** → Verifies the provided authentication key and returns user information.
  - **Parameters**: `authKey` (optional) - The authentication key to verify
  - Returns a plain JSON object conforming to the `UserInfoInterface`, containing user details associated with the authentication key.

* **`verifyUserProjectAccess(uuid: string, projectId: string)`** → Verifies that a user has access rights to a specific project.
  - **Parameters:**
    - `uuid` - User's unique identifier
    - `projectId` - The unique project identifier to verify access for
  - Does not return any value. This method performs access verification and throws an authorization error if the user does not have access rights to the specified project. If verification succeeds, the method completes without returning data. If verification fails or an error occurs during the process, an appropriate error is thrown and handled centrally.

* **`verifyApiKey(apiKey?: string)`** → Verifies the provided API key. This is the API key of indivigual projects and not the users API Key.
  - **Parameters**: `apiKey` (optional) - The API key to verify
  - Does not return any value. This method performs API key verification and throws an `AuthorizationError` if the API KEY provided is invalid. If verification succeeds, the method completes without returning data. If verification fails or an error occurs during the process, an appropriate error is thrown and handled centrally.

---

## 🗂️ Project Controller 

The **Project Controller** [`project.controller.ts`](https://github.com/joel909/TraceKey/blob/master/src/lib/controllers/project.controller.ts) is responsible for project management operations. It provides functions to create projects, fetch project details, and retrieve user-specific projects with proper authentication.

**Core Functions:**

* **`createProject(uuid: string, project_name: string, api_key: string, password: string, description: string, site_url: string)`** → Creates a new project for a user.
  - **Parameters**: 
    - `uuid` - User's unique identifier
    - `project_name` - Name of the project
    - `api_key` - API key for the project
    - `password` - Password for project access
    - `description` - Project description
    - `site_url` - URL of the project site
  - Returns a plain JSON object conforming to the `CreateUserProjectResponse` interface, containing the newly created project details. If the operation fails, an appropriate error is thrown and handled centrally.

* **`fetchSingleProjectDetailsByID(id: string)`** → Retrieves detailed information for a specific project by its ID.
  - **Parameters**: `id` - The unique project identifier
  - Returns project details as a plain JSON object containing comprehensive information about the specified project. Logs project details to console for debugging purposes. If the project is not found or operation fails, an appropriate error is thrown and handled centrally.

* **`fetchUserProjects(auth_key: string)`** → Fetches all projects associated with a user's authentication key.
  - **Parameters**: `auth_key` - The user's authentication key
  - Returns an array of Project objects conforming to the `Project` interface, containing all projects owned by the authenticated user. First verifies the authentication key to obtain the user's UUID, then retrieves all associated projects. If no auth key is provided, an `AuthenticationError` is thrown. If verification or retrieval fails, an appropriate error is thrown and handled centrally.
 

* **`createUserClientIpRecord(api_key: string, ip_address: string, user_agent: string, refferer_url: string, _device_information: any, _cookies: any, device: string, location: string, additionalDeviceInfo: DeviceInfo = {})`** → Creates a record of a client request with detailed information about the user and their device.
  - **Parameters**:
    - `api_key` - The API key of the project for which the request is being recorded
    - `ip_address` - The client's IP address
    - `user_agent` - The client's user agent string
    - `refferer_url` - The referrer URL of the request
    - `_device_information` - Device information object containing browser and system details
    - `_cookies` - The cookies sent with the request
    - `device` - The type of device (e.g., desktop, mobile, tablet)
    - `location` - The geographic location of the client
    - `additionalDeviceInfo` (optional) - Additional device metadata conforming to the `DeviceInfo` interface
  - Does not return any value. This method records the client request information to the database for analytics and monitoring purposes. If the operation fails, an appropriate error is thrown and handled centrally.
  - TODO : Adding indivigual input parsing to prevent XXS and unwanted data also make sure data sizes of everything is limited to prevent abuse
---
