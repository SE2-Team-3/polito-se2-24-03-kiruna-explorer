import db from "../db/db";
import Document from "../components/document";
import { DuplicateError } from "../utilities";

class DocumentDAO {

    linkDocuments(documentId1:number,documentId2:number,linkType:string): Promise<boolean> {
        return new Promise<boolean>((resolve,reject)=>{
            try {
                const sql='INSERT INTO DocumentConnetions VALUES (?,?,?)'
                db.run(sql,[documentId1,documentId2,linkType],(err)=>{
                    if (err) {
                        // insert a check on error number
                        reject(new DuplicateError)
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