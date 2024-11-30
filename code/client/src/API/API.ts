// Initialize all the API calls here
import { NewDocument } from "../modules/UrbanPlanner/AddDocumentForm/interfaces/types";
import Document from "../models/document";

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
            .catch((err: any) => reject({ error: "Cannot parse server response" }));
        } else {
          response
            .json()
            .then((obj: any) => reject(obj))
            .catch((err: any) => reject({ error: "Cannot parse server response" }));
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

/**
 * This function creates a link between 2 documents in db.
 */
function linkDocuments(documentId1: number, documentId2: number, linkType: string) {
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
function updateDocumentGeoreference(documentId: number, georeference: [[number, number]]) {
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

const API = {
  login,
  logOut,
  getUserInfo,
  addDocument,
  linkDocuments,
  getDocuments,
  uploadResources,
  updateDocumentGeoreference,
  getFilteredDocuments,
};

export default API;
