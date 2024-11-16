-- database: db.db
DROP TABLE IF EXISTS Document;
DROP TABLE IF EXISTS Georeference;
DROP TABLE IF EXISTS DocumentConnections;
DROP TABLE IF EXISTS Resource;
DROP TABLE IF EXISTS DocumentResources;
DROP TABLE IF EXISTS Attachment;
DROP TABLE IF EXISTS DocumentAttachments;

CREATE TABLE Document (
    documentId INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    documentType TEXT NOT NULL,
    scale TEXT NOT NULL,
    nodeType TEXT NOT NULL,
    stakeholders TEXT NOT NULL,
    issuanceDate TEXT DEFAULT NULL,
    language TEXT DEFAULT NULL,
	pages TEXT DEFAULT NULL,
	georeferenceId INTEGER DEFAULT NULL
);

CREATE TABLE Georeference (
	georeferenceId INTEGER PRIMARY KEY,
	coordinates TEXT NOT NULL
);

CREATE TABLE DocumentConnections (
	documentId1 INTEGER,
	documentId2 INTEGER,
	connection TEXT NOT NULL,
	PRIMARY KEY (documentId1, documentId2, connection)
);

CREATE TABLE Resource (
	resourceId INTEGER PRIMARY KEY,
	data BLOB
);

CREATE TABLE DocumentResources (
	documentId INTEGER,
	resourceId INTEGER,
	fileType TEXT NOT NULL,
	PRIMARY KEY (documentId, resourceId)
);

CREATE TABLE Attachment (
	attachmentId INTEGER PRIMARY KEY,
	data BLOB
);

CREATE TABLE DocumentAttachments (
	documentId INTEGER,
	attachmentId INTEGER,
	fileType TEXT NOT NULL,
	PRIMARY KEY (documentId, attachmentId)
);
