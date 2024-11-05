# kiruna-explorer
This document lists all APIs and database scheme that compose the Kiruna Explorer application.
# Table of Contents
- [Access APIs](#access-apis)
- [User APIs](#user-apis)
- [Database Scheme](#database-scheme)

## API Server
### Access APIs

##### POST `api/sessions`
* Purpose: Authenticate a user with username and password.
* Request parameters: None
* 200 Ok: Successful login.
* 401 Unauthorized: Incorrect username or password.

##### DELETE `api/sessions/current`
* Purpose: Performs logout for the currently logged in user.
* Request parameters: None
* 200 Ok: Successful logout.

##### GET `api/sessions/current`
* Purpose: Retrieves information about the currently logged in user.
* Request parameters: None
* 200 Ok: show user info.

### User APIs

##### POST `api/users`
* Purpose: Creates a new user with the provided information.
* Request parameters: None
* 200 Ok: User is created.
* 409 error: username is exists.

# Database Scheme

| SQL Table | Columns |
| --- | --- |
| Document | documentId, title, description, documentType, scale, nodeType, stakeholders, issuanceDate, language, pages, georeferenceId|
| Georeference| georeferenceId, coordinates |
| DocumentConnections  | documentId1, documentId2, connection|
| Resources | resourceId, data|
| DocumentResources | documentId, resourceId, fileType |
| Attachment | attachmentId, data|
| DocumentAttachments | documentId, attachmentId, fileType|
