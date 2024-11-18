import db from "../db/db";
import { DuplicateLinkError } from "../errors/documentError";
import { Utility } from "../utilities";

class DocumentDAO {
  async createDocument(
    title: string,
    description: string,
    documentType: string,
    scale: string,
    nodeType: string,
    stakeholders: string[],
    issuanceDate: string | null,
    language: string | null,
    pages: string | null,
    georeference: string[] | null
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        const documentIdSql =
          "SELECT MAX(documentId) AS documentId FROM Document";
        const georeferenceIdSql =
          "SELECT MAX(georeferenceId) AS georeferenceId FROM Georeference";
        const createDocumentSql =
          "INSERT INTO Document (documentId, title, description, documentType, scale, nodeType, stakeholders, issuanceDate, language, pages, georeferenceId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const createGeoreferenceSql =
          "INSERT INTO Georeference (georeferenceId, coordinates) VALUES (?, ?)";

        let documentId = 1;
        const coordinates = JSON.stringify(georeference);
        let georeferenceId = georeference ? 1 : null;
        const stakeholdersString = JSON.stringify(stakeholders);

        db.get(documentIdSql, [], (err: Error | null, row: any) => {
          if (err) return reject(err);
          if (row.documentId) documentId = row.documentId + 1;
          db.get(georeferenceIdSql, [], (err: Error | null, row: any) => {
            if (err) return reject(err);
            if (row.georeferenceId)
              georeferenceId = georeference ? row.georeferenceId + 1 : null;
            db.run(
              createDocumentSql,
              [
                documentId,
                title,
                description,
                documentType,
                scale,
                nodeType,
                stakeholdersString,
                issuanceDate,
                language,
                pages,
                georeferenceId,
              ],
              (err: Error | null) => {
                if (err) return reject(err);
                if (georeference) {
                  db.run(
                    createGeoreferenceSql,
                    [georeferenceId, coordinates],
                    (err: Error | null) => {
                      if (err) return reject(err);
                      return resolve({
                        status: 201,
                        documentId: documentId,
                        message: "Document created successfully",
                      });
                    }
                  );
                } else {
                  return resolve({
                    status: 201,
                    documentId: documentId,
                    message: "Document created successfully",
                  });
                }
              }
            );
          });
        });
      } catch (error) {
        return reject(error);
      }
    });
  }

  linkDocuments(
    documentId1: number,
    documentId2: number,
    linkType: string
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const sql = "INSERT INTO DocumentConnections VALUES (?,?,?)";

        linkType = Utility.emptyFixer(linkType)

        db.run(sql, [documentId1, documentId2, linkType], (err: any) => {
          if (err) {
            if (err.errno === 19) reject(new DuplicateLinkError());
            else reject(err);
          } else resolve(true);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getDocuments(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        const sql = `SELECT * FROM Document`;
        db.all(sql, (err: Error | null, rows: any) => {
          if (err) return reject(err);
          resolve(rows);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  georeferenceDocument(
    documentId: number,
    georeference: string[]
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const georeferenceIdSql =
          "SELECT MAX(georeferenceId) AS georeferenceId FROM Georeference";
        const updateDocumentSql =
          "UPDATE Document SET georeferenceId=? WHERE documentId=?";
        const createGeoreferenceSql = "INSERT INTO Georeference VALUES (?, ?)";
        db.get(georeferenceIdSql, (err: Error | null, row: any) => {
          if (err) return reject(err);
          const georeferenceId = row.georeferenceId
            ? row.georeferenceId + 1
            : 1;
          db.run(
            createGeoreferenceSql,
            [georeferenceId, JSON.stringify(georeference)],
            (err: Error | null) => {
              if (err) return reject(err);
              db.run(
                updateDocumentSql,
                [georeferenceId, documentId],
                (err: Error | null) => {
                  if (err) reject(err);
                  else resolve(true);
                }
              );
            }
          );
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Solution for duplicates in Georeference table
   * Sort coordinates list for areas before inserting in table
   * Check for already existing georeference in table with findGeoreference (sort coordinate list before search)
   * If match is found reuse the returned georeferenceId
   * If match is not found insert new georeference
   *
   * Possibly add counter to Georeference table to keep track of number of documents using each georeference
   * If one record reaches 0 documents can be deleted
   */
  findGeoreference(georeference: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const georeferenceIdSql =
          "SELECT georeferenceId FROM Georeference WHERE coordinates=?";
        db.get(
          georeferenceIdSql,
          [georeference],
          (err: Error | null, row: any) => {
            if (err) return reject(err);
            resolve(row.georeferenceId);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Algorithm for clockwise check
   * It may not work in some situations, it's not mathematically proven
   */
  clockwiseCheck(coordinates: string): boolean {
    let count = 0,
      i = 0;
    let angles: number[];
    const coordinateArray: number[][] = JSON.parse(coordinates);
    const newOrigin = coordinateArray[0];
    for (const coord of coordinateArray.slice(1, -1)) {
      let newCoord: number[] = [];
      newCoord[0] = coord[0] - newOrigin[0];
      newCoord[1] = coord[1] - newOrigin[1];
      angles[i++] = Math.atan2(newCoord[0], newCoord[1]); //This fails when crossing 0° need to find a fix
    }
    for (i = 1; i < angles.length; i++) {
      if (angles[i] < angles[i - 1]) count++;
      else count--;
    }
    return count > 0;
  }

  async uploadResource(documentId: number, files: Express.Multer.File[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        const checkDocumentSql = "SELECT 1 FROM Document WHERE documentId = ?";
        const insertResourceSql = "INSERT INTO Resource (data) VALUES (?)";
        const insertDocResSql = "INSERT INTO DocumentResources (documentId, resourceId, fileType, fileName) VALUES (?, ?, ?, ?)";

        if (!files || files.length === 0) return reject(new Error("No file uploaded"));

        db.get(checkDocumentSql, [documentId], (err: Error | null, row: any) => {
          if (err) return reject(err);
          if (!row) return reject(new Error("Document not found"));

          const uploadPromises = files.map(file => {
            return new Promise<any>((res, rej) => {
              db.run(insertResourceSql, [file.buffer], function (err: Error | null) {
                if (err) return rej(err);
                const resourceId = this.lastID;
                db.run(insertDocResSql, [documentId, resourceId, file.mimetype, file.originalname], (err: Error | null) => {
                  if (err) return rej(err);
                  res({
                    resourceId: resourceId,
                    fileName: file.originalname,
                    fileType: file.mimetype,
                    message: "Resource uploaded successfully",
                  });
                });
              });
            });
          });

          Promise.all(uploadPromises)
            .then(results => resolve({
              status: 201,
              resources: results,
              message: "All resources uploaded successfully",
            }))
            .catch(error => reject(error));
        });

      } catch (error) {
        console.error("Unexpected error in uploadResource:", error);
        reject(error);
      }
    });
  }

  async getResourceById(resourceId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const sql = `
        SELECT DocumentResources.fileName, DocumentResources.fileType, Resource.data
        FROM Resource
        JOIN DocumentResources ON Resource.resourceId = DocumentResources.resourceId
        WHERE Resource.resourceId = ?
      `;
      db.get(sql, [resourceId], (err: Error | null, row: any) => {
        if (err) return reject(err);
        if (row) resolve(row);
        else reject(new Error("Resource not found"));
      });
    });
  }

  async getResourcesByDocumentId(documentId: number): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const sql = `
        SELECT Resource.resourceId, DocumentResources.fileType, DocumentResources.fileName, Resource.data
        FROM Resource
        JOIN DocumentResources ON Resource.resourceId = DocumentResources.resourceId
        WHERE DocumentResources.documentId = ?
      `;
      db.all(sql, [documentId], (err: Error | null, rows: any[]) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
}

export default DocumentDAO;
