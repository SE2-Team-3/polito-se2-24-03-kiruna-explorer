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
                const createGeoreferenceSql = "INSERT INTO Georeference (georeferenceId, coordinates) VALUES (?, ?)";

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
                        db.run(createDocumentSql, [documentId, title, description, documentType, scale, nodeType, stakeholdersString, issuanceDate, language, pages, georeferenceId], (err: Error | null) => {
                            if (err) return reject(err);
                            if (georeference) {
                                db.run(createGeoreferenceSql, [georeferenceId, coordinates], (err: Error | null) => {
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

    linkDocuments(documentId1:number,documentId2:number,linkType:string): Promise<boolean> {
        return new Promise<boolean>((resolve,reject)=>{
            try {
                const sql='INSERT INTO DocumentConnections VALUES (?,?,?)'
                db.run(sql,[documentId1,documentId2,linkType],(err:any)=>{
                    if (err) {
                        if (err.errno===19) reject(new DuplicateLinkError)
                        else reject(err)
                    }
                    else resolve(true)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    georeferenceDocument(documentId:number,georeference:string): Promise<boolean> {
        return new Promise<boolean>((resolve,reject)=>{
            try {
                const georeferenceIdSql = "SELECT MAX(georeferenceId) AS georeferenceId FROM Georeference";
                const updateDocumentSql =
                    "UPDATE Document SET georeference=? WHERE documentId=?";
                const createGeoreferenceSql = "INSERT INTO Georeference VALUES (?, ?)";
                db.get(georeferenceIdSql,(err:Error|null,row:any)=>{
                    if (err) return reject(err)
                    const georeferenceId=row.georeferenceId
                    db.run(createGeoreferenceSql,[georeferenceId,georeference],(err:Error|null)=>{
                        if(err) return reject(err)
                        db.run(updateDocumentSql,[georeferenceId,documentId],(err:Error|null)=>{
                            if(err) reject(err)
                            else resolve(true)
                        })
                    })
                })
            } catch (error) {
                reject(error)
            }
        })
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
    findGeoreference(georeference:string): Promise<boolean> {
        return new Promise<boolean>((resolve,reject)=>{
            try {
                const georeferenceIdSql = "SELECT georeferenceId FROM Georeference WHERE coordinates=?";
                db.get(georeferenceIdSql,[georeference],(err:Error|null,row:any)=>{
                    if (err) return reject(err)
                    resolve(row.georeferenceId)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    /**
     * Algorithm for clockwise check
     * It may not work in some situations, it's not mathematically proven
     */
    clockwiseCheck(coordinates:string): boolean {
        let count=0, i=0
        let angles:number[]
        const coordinateArray:number[][]=JSON.parse(coordinates)
        const newOrigin=coordinateArray[0]
        for (const coord of coordinateArray.slice(1,-1)) {
            let newCoord:number[]=[]
            newCoord[0]=coord[0]-newOrigin[0]
            newCoord[1]=coord[1]-newOrigin[1]
            angles[i++]=Math.atan2(newCoord[0],newCoord[1]) //This fails when crossing 0° need to find a fix
        }
        for (i=1;i<angles.length;i++) {
            if (angles[i]<angles[i-1]) count++
            else count--
        }
        return count>0
    }

}

export default DocumentDAO;
