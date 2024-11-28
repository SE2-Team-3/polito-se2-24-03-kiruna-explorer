# Kiruna Explorer Full API Specifications

This document lists all the expected behaviors for the APIs that compose the Kiruna Explorer application.

## API List

For all constraints on request parameters and request body content, always assume a 422 error in case one constraint is not satisfied.
For all access constraints, always assume a 401 error in case the access rule is not satisfied.
For all success scenarios, always assume a 200 status code for the API response.
Specific error scenarios will have their corresponding error code.

### Access APIs

### Authentication APIs

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

#### DELETE `api/sessions/current`

Performs logout for the currently logged in user.

- Request Parameters: None
- Request Body Content: None
- Response Body Content: None
- Access Constraints: Can only be called by a logged in User

#### GET `api/sessions/current`

Retrieves information about the currently logged in user.

- Request Parameters: None
- Request Body Content: None
- Response Body Content: A **User** object that represents the logged in user
  - Example: `{username: "Mario Rossi", name: "Mario", surname: "Rossi", role: "UrbanPlanner"}`
- Access Constraints: Can only be called by a logged in User

### User APIs

#### POST `api/users`

Creates a new user with the provided information.

- Request Parameters: None
- Request Body Content: An object with the following attributes:
  - `username`: a string that must not be empty
  - `name`: a string that must not be empty
  - `surname`: a string that must not be empty
  - `password`: a string that must not be empty
  - `role`: a string whose value can only be one of ["UrbanPlanner", "Admin"]
- Response Body Content: None
- Access Constraints: None
- Additional Constraints:
  - It should return a 409 error when `username` represents a user that is already in the database
