# 🇸🇪 kiruna-explorer
This document lists all APIs and database scheme that compose the Kiruna Explorer application.
# 📚 Table of Contents
- [🔐 Access APIs](#🔐-access-apis)
- [🧑‍💻 User APIs](#🧑‍💻-user-apis)
- [📑 Document APIs](#📑-document-apis)
- [🗄️ Database Scheme](#🗄️-database-scheme)

## API Server
### 🔐 Access APIs

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

### 🧑‍💻 User APIs

##### POST `api/users`
* Purpose: Creates a new user with the provided information.
* Request parameters: None
* 200 Ok: User is created.
* 409 error: username is exists.

### 📑 Document APIs

##### POST `api/documents`
* Purpose: Creates a new document.
* Request parameters:None
* Request body Content:
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
* Request parameters: None
* Request body Content:
  * `documentId1` (integer > 0, required)
  * `documentId2` (integer > 0, required)
  * `linkType` (string, required, one of: "direct consequence", "collateral consequence", "prevision", "update")
* 201 Created: Documents linked successfully.

##### GET `api/documents`
* Purpose: Retrieve all documents.
* Request parameters: None
* 200 OK: List of documents.

##### PATCH `api/documents/:documentId`
* Purpose: Update the georeference of a document.
* Request parameters: 
  * `documentId` (integer > 0)
* Request body Content:
  * `georeference` [array of coordinates]
* 201 Created: Georeference updated successfully.

##### POST `api/documents/:documentId/upload-resource`
* Purpose: Upload resources to a specific document.
* Request parameters: 
  * `documentId` (integer > 0)
* Request body Content:
  * `files` (multipart/form-data)
* 201 Created: Resources uploaded successfully.

##### GET `api/documents/resource/:resourceId`
* Purpose: Retrieve a specific resource by its ID.
* Request parameters: 
  * `resourceId` (integer > 0)
* 200 OK : Resource details.

##### GET `api/documents/:documentId/resources`
* Purpose: Retrieve all resources for a document.
* Request parameters: 
  * `documentId` (integer > 0)
* 200 OK : List of resources.

##### GET `api/documents/filtered`
* Purpose: Retrieve documents filtered by query parameters.
* Query Parameters (Optional):
  * `title` (string)
  * `description` (string)
  * `documentType` (string)
  * `nodeType` (string)
  * `stakeholders` [array]
  * `issuanceDateStart` (string: YYYY, YYYY-MM, or YYYY-MM-DD)
  * `issuanceDateEnd` (string: YYYY, YYYY-MM, or YYYY-MM-DD)
  * `language` [array]
* 200 OK : List of filtered documents.

##### GET `api/documents/connections`
* Purpose: Retrieve all connections.
* Request Parameters :None
* 200 OK : List of connections.

##### GET `api/documents/georeferences`
* Purpose: Retrieve georeferences.
* Request Parameters :None
* Query Parameters : `isArea` (boolean, optional)
* 200 OK : List of georeferences.

##### GET `api/documents/:documentId/connections`
* Purpose: Retrieve connections for a specific document.
* Request Parameters : `documentId`(integer > 0)
* 200 OK : List of document connections.

##### GET `api/documents/:documentId`
* Purpose: Retrieve details of a specific document.
* Request Parameters : `documentId`(integer > 0)
* 200 OK : Document details.

##### POST `api/documents/with-existing-georeference`
* Purpose: Create a document with an existing georeference.
* Request Parameters : None
* Request body Content:
  * `title` (string, required)
  * `description` (string, required)
  * `documentType` (string, required)
  * `scale` (string, required)
  * `nodeType` (string, required)
  * `stakeholders` [array, required]
  * `issuanceDate` (string: YYYY, YYYY-MM, or YYYY-MM-DD , optional)
  * `language` [array, optional]
  * `pages`(string, optional)
  * `georeferenceId` (integer > 0, optional)
* 201 Created : Document created successfully.

##### PATCH `api/documents/:documentId/existing-georeference`
* Purpose: Update an existing georeference for a document.
* Request Parameters : 
  * `documentId` (integer > 0)
* Request body Content:
  * `georeferenceId` (integer > 0, required)
* 200 OK : Georeference updated successfully.

##### POST `api/documents/types/document-types`
* Purpose: Create a new document type.
* Request Parameters : None
* Request body Content:
  * `documentType` (string, required)
* 201 Created : Document type created successfully.

##### GET `api/documents/types/document-types`
* Purpose: Retrieve all document types.
* Request Parameters : None
* 20O OK : List of document types.

##### POST `api/documents/types/node-types`
* Purpose: Create a new node type.
* Request Parameters : None
* Request body Content:
  * `nodeType` (string, required)
* 201 Created : Node type created successfully.

##### GET `api/documents/types/node-types`
* Purpose: Retrieve all node types.
* Request Parameters : None
* 20O OK : List of node types.

##### POST `api/documents/types/stakeholders`
* Purpose: Create a new stakeholder.
* Request Parameters : None
* Request body Content:
  * `stakeholder` (string, required)
* 201 Created : Stakeholder created successfully.

##### GET `api/documents/types/stakeholders`
* Purpose: Retrieve all stakeholders.
* Request Parameters : None
* 20O OK : List of stakeholders.

##### DELETE `api/documents/links`
* Purpose: Delete a connection between two documents.
* Request Parameters : None
* Request body Content:
  * `documentId1` (integer > 0, required)
  * `documentId2` (integer > 0, required)
  * `linkType` (string, required)
* 200 OK: Connection deleted successfully.
* 404 Not Found: Connection not found.

##### POST `api/documents/:documentId/upload-attachment`
* Purpose: Upload attachments to a specific document.
* Request Parameters :
  * `documentId` (integer > 0)
* Request body Content:
  * `files` (multipart/form-data, required)
* 201 Created : Attachments uploaded successfully.

##### GET `api/documents/attachment/:attachmentId`
* Purpose: Retrieve a specific attachment by its ID.
* Request Parameters : 
  * `attachmentId` (integer > 0)
* 20O OK : Attachment details.

##### GET `api/documents/:documentId/attachments`
* Purpose: Retrieve all attachments for a document.
* Request Parameters : 
  * `documentId` (integer > 0)
* 20O OK :  List of attachments.


# 🗄️ Database Scheme

| SQL Table | Columns |
| --- | --- |
| Document | documentId, title, description, documentTypeId, scale, nodeTypeId, issuanceDate, language, pages, georeferenceId|
| Georeference| georeferenceId, coordinates, georeferenceName, isArea |
| DocumentConnections  | documentId1, documentId2, connection|
| Resources | resourceId, data|
| DocumentResources | documentId, resourceId, fileType, fileName|
| Attachment | attachmentId, data|
| DocumentAttachments | documentId, attachmentId, fileType, fileName|
| DocumentStakeholders | documentId, stakeholderId|
| DocumentType | documentTypeId, documentTypeName|
| NodeType | nodeTypeId, nodeTypeName|
| Stakeholder | stakeholderId, stakeholderName|
| Users | username, name, surname, role, password, address, birthdate|




