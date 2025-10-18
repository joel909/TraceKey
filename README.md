Absolutely — this README section is solid in content, but it’s a bit hard to follow due to grammar, repetition, and inconsistent tone. I’ll rewrite it to make it sound **clean, professional, and developer-friendly**, while keeping your voice and all the details intact.

Here’s an improved version of your section 👇

---

## 🧩 Tech Stack Overview

This project uses a simple yet powerful stack. It’s a **monolithic application** built using **Next.js**, with a **PostgreSQL** database hosted on `hackclub.app`.

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

## 🗃️ Database Connection

We use the **`pg`** module to establish a **pooled connection** to the PostgreSQL database.
This logic is implemented in [`db.ts`](https://github.com/joel909/TraceKey/blob/master/src/lib/database/config/db.ts).

A custom `query` function takes three parameters — `purpose`, `text`, and `params` — and executes the query using `pool.query`.

If the `purpose` is `FETCH_PROJECT_DETAILS_BY_ID` and `result.rows` is empty, it throws a `ResourceNotFoundError`.
This error is then caught and passed to the `createDatabaseError` function, which transforms it into a consistent, centralized error format.

---

## 🧠 Centralized Error Handler

All errors, whether from the database or application logic, flow through a **centralized error handler**.
This handler determines whether an error is **known** (custom-defined) or **unknown**, and returns a structured response containing detailed error information.
This approach ensures consistent and meaningful error reporting across the entire application.

---

## 🔐 Auth Controller

The **Auth Controller** is responsible for user management and authentication logic.
It provides functions to create, edit, and manage user accounts, validate authentication keys, and verify user authorization levels.

**Core Functions:**

* **`createUser(data: UserCreationRequestInterface)`** → Creates a new user and Returns a plain JSON object conforming to the AccountCreationResponse interface, containing details such as the user ID, email, and creation timestamp..
  If the operation fails, an appropriate error is thrown and handled centrally.

---
