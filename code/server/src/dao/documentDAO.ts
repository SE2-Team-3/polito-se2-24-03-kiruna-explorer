import db from "../db/db";

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
                const areaIdSql = "SELECT MAX(areaId) AS areaId FROM Area";
                const createDocumentSql = 
                    "INSERT INTO Document (documentId, title, description, documentType, scale, nodeType, stakeholders, issuanceDate, language, pages, areaId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                const createAreaSql = "INSERT INTO Area (areaId, polygon) VALUES (?, ?)";

                let documentId = 1;
                const area = georeference ? JSON.stringify(georeference) : null;
                let areaId = georeference ? 1 : null;
                const stakeholdersString = stakeholders.join(", ");
                
                db.get(documentIdSql, [], (err: Error | null, row: any) => {
                    if (err) return reject(err);
                    if (row.documentId) documentId = row.documentId + 1;
                    db.get(areaIdSql, [], (err: Error | null, row: any) => {
                        if (err) return reject(err);
                        if (row.areaId) areaId = area ? row.areaId + 1 : null;
                        db.run(createDocumentSql, [documentId, title, description, documentType, scale, nodeType, stakeholdersString, issuanceDate, language, pages, areaId], (err: Error | null) => {
                            if (err) return reject(err);
                            if (area) {
                                db.run(createAreaSql, [areaId, area], (err: Error | null) => {
                                    if (err) return reject(err);
                                    return resolve({ 
                                        status: 201,
                                        documentId: documentId,
                                        message: "Document created successfully"
                                    });
                                });
                            } else {
                                return resolve({ 
                                    status: 201,
                                    documentId: documentId,
                                    message: "Document created successfully"
                                });
                            }
                        });
                    });
                });

            } catch (error) {
                return reject(error);
            }
        });
    }
}

export default DocumentDAO;
