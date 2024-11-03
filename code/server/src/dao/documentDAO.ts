import db from "../db/db";
import Document from "../components/document";
import { DuplicateLinkError } from "../errors/documentError";

class DocumentDAO {

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
}

export default DocumentDAO;