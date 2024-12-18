import request from "supertest";
import { app } from "../../index";
import db from "../../src/db/db";

const routePath = "/api";

const postUser = async (userInfo: any) => {
    await request(app).post(`${routePath}/users`).send(userInfo).expect(200);
};

const postDocument = async (documentInfo: any, cookie: string) => {
    const response = await request(app)
        .post(`${routePath}/documents`)
        .send(documentInfo)
        .set("Cookie", cookie)
        .expect(201);
    return response.body.documentId;
};

const linkDocuments = async (docId1: number, docId2: number, linkType: string, cookie: string) => {
    await request(app)
        .post(`${routePath}/documents/link`)
        .send({
            documentId1: docId1,
            documentId2: docId2,
            linkType: linkType,
        })
        .set("Cookie", cookie)
        .expect(201);
};

const postTypes = async () => {
    const insertDocumentTypes = `INSERT INTO DocumentType (documentTypeName) VALUES ("Text")`;
    const insertNodeTypes = `INSERT INTO NodeType (nodeTypeName) VALUES ("Design document")`;
    const insertStakeholders = `INSERT INTO Stakeholder (stakeholderName) VALUES ("LKAB")`;
    const insertStakeholders2 = `INSERT INTO Stakeholder (stakeholderName) VALUES ("Municipality")`;
    db.run(insertDocumentTypes, [], (err) => {
        if (err) console.log(err);
        db.run(insertNodeTypes, [], (err) => {
            if (err) console.log(err);
            db.run(insertStakeholders, [], (err) => {
                if (err) console.log(err);
                db.run(insertStakeholders2, [], (err) => {
                    if (err) console.log(err);
                });
            });
        });
    });
};

const login = async (userInfo: any) => {
    return new Promise<string>((resolve, reject) => {
        request(app)
            .post(`${routePath}/sessions`)
            .send(userInfo)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res.header["set-cookie"][0]);
            });
    });
};

export {
    postUser,
    postDocument,
    linkDocuments,
    postTypes,
    login,
    routePath,
};
