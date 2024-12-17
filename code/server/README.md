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

### Document APIs

##### POST `api/documents`
* Purpose: Creates a new document.
* Request parameters: 
  * `title` (string, required)
  * `description` (string, required)
  * `documentType` (string, required)
  * `scale` (string, required)
  * `nodeType` (string, required)
  * `stakeholders` (array, required)
  * `issuanceDate` (string, optional)
  * `language` (string, optional)
  * `pages` (string, optional)
  * `georeference` (array, optional, nullable)
  * `georeferenceName` (string, optional)
  * `areaColor` (string, optional)
* 201 Created: Document created successfully.

##### POST `api/documents/link`
* Purpose: Link two documents together.
* Request parameters: 
  * `documentId1` (integer > 0, required)
  * `documentId2` (integer > 0, required)
  * `linkType` (string, required, one of: "direct consequence", "collateral consequence", "prevision", "update")
* 201 Created: Document created successfully.

##### GET `api/documents`
* Purpose: Retrieve all documents.
* Request parameters: None
* 200 OK: List of documents.

##### PATCH `api/documents/:documentId`
* Purpose: Update the georeference of a document.
* Request parameters: 
  * `documentId` (integer > 0, path parameter)
  * `georeference` (body parameter)
* 201 Created: Georeference updated successfully.

##### POST `api/documents/:documentId/upload-resource`
* Purpose: Upload resources to a specific document.
* Request parameters: 
  * `documentId` (integer > 0, path parameter)
  * `files` (multipart/form-data, required)
* 201 Created: Resources uploaded successfully.

##### GET `api/documents/resource/:resourceId`
* Purpose: Retrieve a specific resource by its ID.
* Request parameters: 
  * `resourceId` (integer > 0, path parameter)
* 200 OK : Resource details.

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

