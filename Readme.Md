@@ -5,9 +5,20 @@ This will provide readers a good understanding of the flow of code and each comp
This project uses a rather simple stack. The project is a monolith made in next.js which uses a backend database as postgres SQL which is hosted at hackclub.app
--> Framework used : Next.js
--> Database used  : Postgres
------------------------
## Extended Error Classes 
- **ResourceNotFoundError** → when a query executes and the result is an empty array
- **ValidationError**       → when Invalid input has been provided or the operation cant be executed due the provided inputs due to which the operation failed (the code makes sure that this case does not occur) 
- **AuthenticationError**   → can either occur when the database credentials were wrong or the user which requested the resource is not authenticated
- **AuthorizationError**    → called when the user does not have the required permissions to access the resource


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Database Connection
We are using the module pg to establish a pooled connection to the Database. This has been done here [db.ts](https://github.com/joel909/TraceKey/blob/master/src/lib/database/config/db.ts). I then went on to Create a function called query to which we pass purpose,text,params which then uses pool.query to make the query, once the query executes, then it checks if the purpose of the query is *FETCH_PROJECT_DETAILS_BY_ID*  and if the result.rows is empty or not if the result is empty then it raises a custom error called *ResourceNotFoundError* which then executes the catch block. there are a few sets of error classes which are thrown if it is a known error. below are a list of the pre-defined errors
-ResourceNotFoundError -> when a query executes and the result is an empty array
-ValidationError       -> when Invalid input has been provided or the operation cant be executed due the provided inputs due to which the operation failed (the code makes sure that this case does not occur) 
-AuthenticationError   -> can either occur when the database credentials were wrong or the user which requested the resource is not authenticated
- ResourceNotFoundError → when a query executes and the result is an empty array
- ValidationError       → when Invalid input has been provided or the operation cant be executed due the provided inputs due to which the operation failed (the code makes sure that this case does not occur) 
- AuthenticationError   → can either occur when the database credentials were wrong or the user which requested the resource is not authenticated
- **AuthorizationError**    → called when the user does not have the required permissions to access the resource
- **DatabaseError**    → called when the query failed as it was unable to establish connection to the database this could be from the server down to incorrect Credentials
