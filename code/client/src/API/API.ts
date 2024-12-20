import { NewDocument } from "../modules/UrbanPlanner/AddDocumentForm/interfaces/types";
import Document from "../models/document";
import DocumentDetail from "../models/documentDetail";
import Connection from "../models/Connection";
import Georeference from "../models/georeference";

const baseURL = "http://localhost:3001/api/";

/** ------------------- Access APIs ------------------------ */

async function login(username: string, password: string) {
  let response = await fetch(baseURL + "sessions", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    const errDetail = await response.json();
    if (errDetail.error) throw errDetail.error;
    if (errDetail.message) throw errDetail.message;

    throw new Error("Something went wrong");
  }
}

async function logOut() {
  await fetch(baseURL + "sessions/current", {
    method: "DELETE",
    credentials: "include",
  });
}

async function getUserInfo() {
  const response = await fetch(baseURL + "sessions/current", {
    credentials: "include",
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    const errDetail = await response.json();
    if (errDetail.error) throw errDetail.error;
    if (errDetail.message) throw errDetail.message;
    throw new Error("Error. Please reload the page");
  }
}

/**
 * A utility function for parsing the HTTP response.
 */
function getJson(httpResponsePromise: Promise<Response>): Promise<any> {
  return new Promise((resolve, reject) => {
    httpResponsePromise
      .then((response: Response) => {
        if (response.ok) {
          response
            .json()
            .then((json: any) => resolve(json))
            .catch((err: any) =>
              reject({ error: "Cannot parse server response" })
            );
        } else {
          response
            .json()
            .then((obj: any) => reject(obj))
            .catch((err: any) =>
              reject({ error: "Cannot parse server response" })
            );
        }
      })
      .catch((err: any) => reject({ error: "Cannot communicate" }));
  });
}

/**
 * This function adds a new page in db.
 */
function addDocument(document: NewDocument) {
  return getJson(
    fetch(baseURL + "documents/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(document),
    })
  );
}

async function getDocuments() {
  const response = await fetch(baseURL + "documents/", {
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

async function getDocumentById(documentId: number): Promise<DocumentDetail> {
  const response = await fetch(`${baseURL}documents/${documentId}`, {
    credentials: "include",
  });

  if (response.ok) {
    const document: DocumentDetail = await response.json();
    if (typeof document.stakeholders === "string") {
      document.stakeholders = JSON.parse(document.stakeholders);
    }
    if (typeof document.coordinates === "string") {
      document.coordinates = JSON.parse(document.coordinates);
    }
    return document;
  } else {
    const errDetail = await response.json();
    if (errDetail.error) throw new Error(errDetail.error);
    if (errDetail.message) throw new Error(errDetail.message);
    throw new Error("Error fetching document. Please reload the page.");
  }
}

async function getConnections() {
  const response = await fetch(
    "http://localhost:3001/api/documents/connections",
    {
      credentials: "include",
    }
  );
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

/**
 * This function creates a link between 2 documents in db.
 */
function linkDocuments(
  documentId1: number,
  documentId2: number,
  linkType: string
) {
  return getJson(
    fetch(baseURL + "documents/link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        documentId1: documentId1,
        documentId2: documentId2,
        linkType: linkType,
      }),
    })
  );
}

/**
 * This function updates the georeference of a document in the database.
 */
function updateDocumentGeoreference(
  documentId: number,
  georeference: [[number, number]]
) {
  return fetch(`${baseURL}documents/${documentId}`, {
    method: "PATCH", // Correct HTTP method
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ georeference }), // Use "georeference" as per the expected payload
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to update georeference");
    }
    return response.json();
  });
}

async function uploadResources(documentId: number, resources: File[]) {
  const data = new FormData();
  for (const res of resources) {
    data.append("files", res);
  }
  await fetch(baseURL + "documents/" + documentId + "/upload-resource", {
    method: "POST",
    credentials: "include",
    body: data,
  });
}

function getFilteredDocuments(filters: {
  documentType?: string;
  nodeType?: string;
  stakeholders?: string | string[];
  issuanceDateStart?: string;
  issuanceDateEnd?: string;
  language?: string;
}) {
  const queryParams = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== "") {
      // Gestisce valori multipli come array (es. stakeholders)
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, v));
      } else {
        queryParams.append(key, value);
      }
    }
  }
  console.log(queryParams.toString());

  // Effettua la richiesta GET
  return fetch(`${baseURL}documents/filtered?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Opzionale, utile se serve inviare cookie/sessione
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch filtered documents");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching filtered documents:", error);
      throw error;
    });
}

async function getGeoreferences(isArea?: boolean) {
  const params = new URLSearchParams();
  if (isArea !== undefined) {
    params.append("isArea", isArea.toString());
  }
  const response = await fetch(baseURL + "documents/georeferences?" + params, {
    credentials: "include",
  });
  if (response.ok) {
    const georeferences: Georeference[] = await response.json();
    return georeferences;
  } else {
    const errDetail = await response.json();
    if (errDetail.error) throw errDetail.error;
    if (errDetail.message) throw errDetail.message;
    throw new Error("Error. Please reload the page");
  }
}

/**
 * This function deletes a link between 2 documents in db.
 */
function unlinkDocuments(
  documentId1: number,
  documentId2: number,
  linkType: string
) {
  return getJson(
    fetch(baseURL + "documents/link", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        documentId1: documentId1,
        documentId2: documentId2,
        linkType: linkType,
      }),
    })
  );
}

async function uploadAttachments(documentId: number, attachments: File[]) {
  const data = new FormData();
  for (const att of attachments) {
    data.append("files", att);
  }
  await fetch(baseURL + "documents/" + documentId + "/upload-attachment", {
    method: "POST",
    credentials: "include",
    body: data,
  });
}

async function getStakeholders() {
  const response = await fetch(baseURL + "documents/types/stakeholders", {
    credentials: "include",
  });
  if (response.ok) {
    const stakeholders: any = await response.json();
    return stakeholders.map((s: any) => s.stakeholderName);
  } else {
    const errDetail = await response.json();
    if (errDetail.error) throw errDetail.error;
    if (errDetail.message) throw errDetail.message;
    throw new Error("Error. Please reload the page");
  }
}

async function addStakeholder(stakeholder: string) {
  await fetch(baseURL + "documents/types/stakeholders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ stakeholder: stakeholder }),
  });
}

async function getScales() {
  const response = await fetch(baseURL + "documents/types/document-types", {
    credentials: "include",
  });
  if (response.ok) {
    const scales: any = await response.json();
    return scales.map((d: any) => d.documentTypeName);
  } else {
    const errDetail = await response.json();
    if (errDetail.error) throw errDetail.error;
    if (errDetail.message) throw errDetail.message;
    throw new Error("Error. Please reload the page");
  }
}

async function addScale(documentType: string) {
  await fetch(baseURL + "documents/types/document-types", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ documentType: documentType }),
  });
}

async function getNodeTypes() {
  const response = await fetch(baseURL + "documents/types/node-types", {
    credentials: "include",
  });
  if (response.ok) {
    const nodeTypes: any = await response.json();
    return nodeTypes.map((n: any) => n.nodeTypeName);
  } else {
    const errDetail = await response.json();
    if (errDetail.error) throw errDetail.error;
    if (errDetail.message) throw errDetail.message;
    throw new Error("Error. Please reload the page");
  }
}

async function addNodeType(nodeType: string) {
  await fetch(baseURL + "documents/types/node-types", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ nodeType: nodeType }),
  });
}

const API = {
  login,
  logOut,
  getUserInfo,
  addDocument,
  linkDocuments,
  getDocuments,
  getDocumentById,
  uploadResources,
  updateDocumentGeoreference, // Added the new function here
  getConnections,
  getFilteredDocuments,
  getGeoreferences,
  unlinkDocuments,
  uploadAttachments,
  getStakeholders,
  addStakeholder,
  getScales,
  addScale,
  getNodeTypes,
  addNodeType,
};

export default API;
