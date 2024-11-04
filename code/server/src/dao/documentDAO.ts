import db from "../db/db";
import Document from "../components/document";
import { DuplicateLinkError } from "../errors/documentError";

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
        const documentIdSql = "SELECT MAX(documentId) AS documentId FROM Document";
        const georeferenceIdSql = "SELECT MAX(georeferenceId) AS georeferenceId FROM Georeference";
        const createDocumentSql =
          "INSERT INTO Document (documentId, title, description, documentType, scale, nodeType, stakeholders, issuanceDate, language, pages, georeferenceId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const createGeoreferenceSql =
          "INSERT INTO Georeference (georeferenceId, coordinates) VALUES (?, ?)";

        let documentId = 1;
        const coordinates = georeference ? JSON.stringify(georeference) : null;
        let georeferenceId = georeference ? 1 : null;
        const stakeholdersString = JSON.stringify(stakeholders);

        db.get(documentIdSql, [], (err: Error | null, row: any) => {
          if (err) return reject(err);
          if (row.documentId) documentId = row.documentId + 1;
          db.get(georeferenceIdSql, [], (err: Error | null, row: any) => {
            if (err) return reject(err);
            if (row.georeferenceId) georeferenceId = georeference ? row.georeferenceId + 1 : null;
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

  linkDocuments(documentId1: number, documentId2: number, linkType: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const sql = "INSERT INTO DocumentConnections VALUES (?,?,?)";
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
}

export default DocumentDAO;
