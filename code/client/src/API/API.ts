// Initialize all the API calls here
import { NewDocument } from "../interfaces/types";
const URL = "http://localhost:3001/api";

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
    fetch(URL + "/document/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //credentials: "include",
      body: JSON.stringify(document),
    })
  );
}

const API = {
  addDocument,
};
export default API;
