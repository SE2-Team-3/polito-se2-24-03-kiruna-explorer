class Connection {
    documentId1:number
    documentId2:number
    connection:string

    constructor(documentId1:number,documentId2:number,connection:string) {
        this.documentId1=documentId1
        this.documentId2=documentId2
        this.connection=connection
    }
}

export default Connection