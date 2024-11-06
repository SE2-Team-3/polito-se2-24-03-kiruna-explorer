import { describe, test, expect, jest } from "@jest/globals";
import DocumentDAO from "../../dao/documentDAO";
import db from "../../db/db";
import { Database } from "sqlite3";
import { DuplicateLinkError } from "../../errors/documentError";

describe("Document DAO kx2", () => {

    let documentDAO: DocumentDAO;

    beforeEach(() => {
        documentDAO = new DocumentDAO();
        jest.mock("../../db/db");
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("linkDocuments", () => {

        test("should resolve true", async () => {
            const mockDBRun = jest
                .spyOn(db, "run")
                .mockImplementation((sql, [], callback) => {
                    callback(null);
                    return {} as Database;
                });
            
            const result = await documentDAO.linkDocuments(1, 2, "direct consequence");

            expect(db.run).toHaveBeenCalledTimes(1);
            expect(db.run).toHaveBeenCalledWith(
                "INSERT INTO DocumentConnections VALUES (?,?,?)",
                [1, 2, "direct consequence"],
                expect.any(Function)
              );
            expect(result).toBe(true);

            mockDBRun.mockRestore();
        });

        test("should throw DuplicateLinkError", async () => {
            const duplicateError = { errno: 19 };
            const mockDBRun = jest
                .spyOn(db, "run")
                .mockImplementation((sql, [], callback) => {
                    callback(duplicateError);
                    return {} as Database;
                });
            
            await expect(documentDAO.linkDocuments(1, 2, "direct consequence")).rejects.toThrow(DuplicateLinkError);

            expect(db.run).toHaveBeenCalledTimes(1);
            expect(db.run).toHaveBeenCalledWith(
                "INSERT INTO DocumentConnections VALUES (?,?,?)",
                [1, 2, "direct consequence"],
                expect.any(Function)
              );

            mockDBRun.mockRestore();
        });

    });

});