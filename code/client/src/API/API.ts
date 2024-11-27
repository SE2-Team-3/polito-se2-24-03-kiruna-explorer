// Initialize all the API calls here
import Document from "../models/document";
import Connection from "../models/Connection";

async function getDocuments() {
    const response = await fetch("http://localhost:3001/api/documents", {
        credentials: "include",
    });
    if (response.ok) {
        const documents: Document[] = await response.json();
        return documents;
    } else {
        const errDetail = await response.json();
        if (errDetail.error) throw errDetail.error;
        if (errDetail.message) throw errDetail.message;
        throw new Error("Error. Please reload the page");
    }
}

async function getConnections() {
    const response = await fetch("http://localhost:3001/api/documents/connections", {
        credentials: "include",
    });
    if (response.ok) {
        const connections: Connection[] = await response.json();
        return connections;
    } else {
        const errDetail = await response.json();
        if (errDetail.error) throw errDetail.error;
        if (errDetail.message) throw errDetail.message;
        throw new Error("Error. Please reload the page");
    }
}

export {getDocuments, getConnections}