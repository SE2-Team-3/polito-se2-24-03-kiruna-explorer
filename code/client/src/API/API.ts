// Initialize all the API calls here
import { NewDocument } from "../modules/UrbanPlanner/AddDocumentForm/interfaces/types";

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
  // server API always return JSON, in case of error the format is the following { error: <message> }
  return new Promise((resolve, reject) => {
    httpResponsePromise
      .then((response: Response) => {
        if (response.ok) {
          // the server always returns a JSON, even empty {}. Never null or non json, otherwise the method will fail
          response
            .json()
            .then((json: any) => resolve(json))
            .catch((err: any) =>
              reject({ error: "Cannot parse server response" })
            );
        } else {
          // analyzing the cause of error
          response
            .json()
            .then((obj: any) => reject(obj)) // error msg in the response body
            .catch((err: any) =>
              reject({ error: "Cannot parse server response" })
            ); // something else
        }
      })
      .catch((err: any) => reject({ error: "Cannot communicate" })); // connection error
  });
}
/**
 * This funciton adds a new page in db.
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

const API = {
  login,
  logOut,
  getUserInfo,
  addDocument,
};

export default API;
