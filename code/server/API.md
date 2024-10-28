# Kiruna Explorer Full API Specifications

This document lists all the expected behaviors for the APIs that compose the Kiruna Explorer application.

Request parameters, request body content, and optional query parameters must be validated when handling a request; this can be done in two ways:

- in the different functions inside the `controllers` module
  Example:
  ```javascript
     async createUser(username: string, name: string, surname: string, password: string, role: string): Promise<boolean> {
        if(!username || !name || !surname || !password || !role) throw new WrongParametersError() //example error with the correct error code
        if(username.length === 0 || name.length === 0 || surname.length === 0 || password.length === 0 || role.length === 0) throw new WrongParametersError()
        if(role !== "UrbanPlanner") thow new WrongParametersError()
        const ret: any = await this.dao.createUser(username, name, surname, password, role)
        return ret
    }
  ```
- using middlewares directly when calling the routes in the `routers` module (preferred option for simplicity)
  Example:
  ```javascript
  this.router.post(
    "/",
    body("username").isString().isLength({ min: 1 }), //the request body must contain an attribute named "username", the attribute must be a non-empty string
    body("surname").isString().isLength({ min: 1 }), //the request body must contain an attribute named "surname", the attribute must be a non-empty string
    body("name").isString().isLength({ min: 1 }), //the request body must contain an attribute named "name", the attribute must be a non-empty string
    body("password").isString().isLength({ min: 1 }), //the request body must contain an attribute named "password", the attribute must be a non-empty string
    body("role").isString().isIn(["UrbanPlanner"]), //the request body must contain an attribute named "role", the attribute must be a string and its value must be one of the two allowed options
    this.errorHandler.validateRequest, //middleware defined in `helper.ts`, checks the result of all the evaluations performed above and returns a 422 error if at least one fails or continues if there are no issues
    (req: any, res: any, next: any) =>
      this.controller
        .createUser(
          req.body.username,
          req.body.name,
          req.body.surname,
          req.body.password,
          req.body.role
        )
        .then(() => res.status(200).end())
        .catch((err) => {
          next(err);
        })
  );
  ```

The different middlewares that can be used when calling a route are:

- The validators defined by [express-validator](https://express-validator.github.io/docs): these validators can check the body of a request, its request parameters, its cookies, its header, and its optional query parameters. It is possible to check whether an attribute is an integer, an email, a string, a numeric value, and more.
- The function `ErrorHandler.validateRequest()` defined inside `helper.ts`. This function can be placed after a chain of validators to return an error code in case at least one constraint is not respected.
- The function `isLoggedIn()` defined inside `routers/auth.ts`. This function can be used to define a route that requires authentication: if the route is accessed without setting cookies that correspond to a logged in user it returns a 401 error.
- The functions `isUrbanPlanner()`, etc. defined inside `routers/auth.ts`. These functions check whether a logged in user has a specific role, returning 401 if a user with a different role tries to access a route.

## API List

For all constraints on request parameters and request body content, always assume a 422 error in case one constraint is not satisfied.
For all access constraints, always assume a 401 error in case the access rule is not satisfied.
For all success scenarios, always assume a 200 status code for the API response.
Specific error scenarios will have their corresponding error code.

### Access APIs

#### POST `api/sessions`

Allows login for a user with the provided credentials.

- Request Parameters: None
- Request Body Content: An object having as attributes:
  - `username`: a string that must not be empty
  - `password`: a string that must not be empty
  - Example: `{username: "MarioRossi", password: "MarioRossi"}`
- Response Body Content: A **User** object that represents the logged in user
  - Example: `{username: "Mario Rossi", name: "Mario", surname: "Rossi", role: "UrbanPlanner"}`
- Access Constraints: None
- Additional Constraints:
  - Returns a 401 error if the username does not exist
  - Returns a 401 error if the password provided does not match the one in the database
