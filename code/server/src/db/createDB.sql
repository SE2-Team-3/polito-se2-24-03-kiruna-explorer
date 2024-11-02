-- database: db.db
DROP TABLE IF EXISTS Document;
DROP TABLE IF EXISTS Area;
DROP TABLE IF EXISTS DocumentConnections;
DROP TABLE IF EXISTS Resouces;
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
    issuanceDate DATE DEFAULT NULL,
    language TEXT DEFAULT NULL,
	pages TEXT DEFAULT NULL,
	areaId INTEGER DEFAULT NULL
);

CREATE TABLE Area (
	areaId INTEGER PRIMARY KEY,
	polygon TEXT NOT NULL
);

CREATE TABLE DocumentConnections (
	documentId1 INTEGER,
	documentId2 INTEGER,
	connection TEXT NOT NULL,
	PRIMARY KEY (documentId1, documentId2)
);

CREATE TABLE Resouces (
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
