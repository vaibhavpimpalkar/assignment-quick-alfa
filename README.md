
### proper Readme file that includes instructions on how to set up and run the backend server.
### - Include information about the API routes, request/response formats, and any additional configuration required.




# assignment-quick-alfa




### To create a REST API backend server using Node.js and a MongoDB database  follow these steps:

Step 1: Set up Node.js and MongoDB
- Install Node.js on machine and set up a project directory.
- Install MongoDB and make sure it is running locally or accessible.

Step 2: Create the API Routes
- Create a file named `index .js` to serve as the entry point of your backend server.
- Use a framework like Express.js to handle API routing.
- Define the required routes mentioned in the task description: login, signup, user profile editing, user deletion, getting articles, commenting on articles, and going premium.

Step 3: Connect to the MongoDB Database
- Use a MongoDB driver (e.g., mongoose) to connect  backend server to the MongoDB database.
- Create a database schema to define the structure of the required collections: User, Article, and Comment.
- Implement the necessary CRUD operations (create, read, update, delete) for each collection using the database driver.

Step 4: Implement the API Handlers
- Inside each route handler, access the MongoDB collections and use the defined CRUD operations to fulfill the requested functionality.
- For example, in the signup route handler, create a new user document in the User collection based on the provided information.

Step 5: Secure Premium Articles and User Actions
- Implement authentication middleware to verify if a user is logged in and authorized to access premium articles or perform certain actions.
- By checking the `premiumuser` field in the User document, determine if a user has a premium account or not.
- If a user tries to access a premium article or perform a premium action without being a premium user, respond with an appropriate error message.

Step 6: Create Sample Articles
- In  server startup or initialization code, insert the sample articles described in the task description into the Article collection using the defined CRUD operations.

