import { test, expect, jest, describe } from "@jest/globals";
import DocumentController from "../../controllers/documentController";
import DocumentDAO from "../../dao/documentDAO";
import { InvalidCoordinatesError } from "../../errors/georeferenceError";

describe("Document Controller old", () => {

    let documentController: DocumentController;

    beforeEach(() => {
        documentController = new DocumentController();
        jest.mock("../../dao/documentDAO");
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("georeferenceDocument", () => {

        test("should successfully georeference a document", async () => {
            const documentId = 1;
            const georeference = ["[1.1,1.1]", "[2.2,2.2]", "[3.3,3.3]"];

            jest.spyOn(DocumentDAO.prototype, "georeferenceDocument").mockResolvedValueOnce(true);

            const result = await documentController.georeferenceDocument(documentId, georeference);

            expect(DocumentDAO.prototype.georeferenceDocument).toHaveBeenCalledWith(documentId, georeference);
            expect(result).toBe(true);
        });

        test("should throw InvalidCoordinatesError when georeference is null", async () => {
            const documentId = 1;

            await expect(documentController.georeferenceDocument(documentId, null))
                .rejects
                .toThrow(InvalidCoordinatesError);
        });

        test("should propagate errors from documentDAO.georeferenceDocument", async () => {
            const documentId = 1;
            const georeference = ["[1.1,1.1]"];
            const mockError = new Error("DB error");

            jest.spyOn(DocumentDAO.prototype, "georeferenceDocument").mockRejectedValueOnce(mockError);

            await expect(documentController.georeferenceDocument(documentId, georeference))
                .rejects
                .toThrow("DB error");

            expect(DocumentDAO.prototype.georeferenceDocument).toHaveBeenCalledWith(documentId, georeference);
        });
    });

    describe("getConnections", () => {

        test("should successfully retrieve connections", async () => {
            const mockConnections = [
                { documentId1: 1, documentId2: 2, connection: "update" },
                { documentId1: 3, documentId2: 4, connection: "update" }
            ];

            jest.spyOn(DocumentDAO.prototype, "getConnections").mockResolvedValueOnce(mockConnections);

            const result = await documentController.getConnections();

            expect(DocumentDAO.prototype.getConnections).toHaveBeenCalled();
            expect(result).toEqual(mockConnections);
        });

        test("should propagate errors from documentDAO.getConnections", async () => {
            const mockError = new Error("DB error");

            jest.spyOn(DocumentDAO.prototype, "getConnections").mockRejectedValueOnce(mockError);

            await expect(documentController.getConnections()).rejects.toThrow("DB error");

            expect(DocumentDAO.prototype.getConnections).toHaveBeenCalled();
        });
    });

    describe("getConnectionsById", () => {

        test("should successfully retrieve connections for a given documentId", async () => {
            const documentId = 1;
            const mockConnections = [
                { documentId1: 1, documentId2: 2, connection: "linked" },
                { documentId1: 3, documentId2: 4, connection: "related" }
            ];

            jest.spyOn(DocumentDAO.prototype, "getConnectionsById").mockResolvedValueOnce(mockConnections);

            const result = await documentController.getConnectionsById(documentId);

            expect(DocumentDAO.prototype.getConnectionsById).toHaveBeenCalledWith(documentId);
            expect(result).toEqual(mockConnections);
        });

        test("should propagate errors from documentDAO.getConnectionsById", async () => {
            const documentId = 1;
            const mockError = new Error("DB error");

            jest.spyOn(DocumentDAO.prototype, "getConnectionsById").mockRejectedValueOnce(mockError);

            await expect(documentController.getConnectionsById(documentId)).rejects.toThrow("DB error");

            expect(DocumentDAO.prototype.getConnectionsById).toHaveBeenCalledWith(documentId);
        });
    });

    describe("getGeoreferences", () => {

        test("should successfully retrieve all georeferences when isArea is undefined", async () => {
            const mockGeoreferences = [
                { georeferenceId: 1, coordinates: "[1.1,1.1]", georeferenceName: "Geo1", isArea: 1, areaColor: "red" },
                { georeferenceId: 2, coordinates: "[2.2,2.2]", georeferenceName: "Geo2", isArea: 0, areaColor: "blue" }
            ];

            jest.spyOn(DocumentDAO.prototype, "getGeoreferences").mockResolvedValueOnce(mockGeoreferences);

            const result = await documentController.getGeoreferences();

            expect(DocumentDAO.prototype.getGeoreferences).toHaveBeenCalledWith(undefined);
            expect(result).toEqual(mockGeoreferences);
        });

        test("should successfully retrieve area georeferences when isArea is true", async () => {
            const mockGeoreferences = [
                { georeferenceId: 1, coordinates: "[1.1,1.1]", georeferenceName: "Geo1", isArea: 1, areaColor: "red" }
            ];

            jest.spyOn(DocumentDAO.prototype, "getGeoreferences").mockResolvedValueOnce(mockGeoreferences);

            const result = await documentController.getGeoreferences(true);

            expect(DocumentDAO.prototype.getGeoreferences).toHaveBeenCalledWith(true);
            expect(result).toEqual(mockGeoreferences);
        });

        test("should successfully retrieve non-area georeferences when isArea is false", async () => {
            const mockGeoreferences = [
                { georeferenceId: 2, coordinates: "[2.2,2.2]", georeferenceName: "Geo2", isArea: 0, areaColor: "blue" }
            ];

            jest.spyOn(DocumentDAO.prototype, "getGeoreferences").mockResolvedValueOnce(mockGeoreferences);

            const result = await documentController.getGeoreferences(false);

            expect(DocumentDAO.prototype.getGeoreferences).toHaveBeenCalledWith(false);
            expect(result).toEqual(mockGeoreferences);
        });

        test("should propagate errors from documentDAO.getGeoreferences", async () => {
            const mockError = new Error("DB error");

            jest.spyOn(DocumentDAO.prototype, "getGeoreferences").mockRejectedValueOnce(mockError);

            await expect(documentController.getGeoreferences()).rejects.toThrow("DB error");

            expect(DocumentDAO.prototype.getGeoreferences).toHaveBeenCalledWith(undefined);
        });
    });

    describe("updateGeoreferenceId", () => {

        test("should successfully update georeferenceId", async () => {
            jest.spyOn(DocumentDAO.prototype, "updateGeoreferenceId").mockResolvedValueOnce(true);

            const result = await documentController.updateGeoreferenceId(1, 2);

            expect(DocumentDAO.prototype.updateGeoreferenceId).toHaveBeenCalledWith(1, 2);
            expect(result).toBe(true);
        });

        test("should propagate errors from documentDAO.updateGeoreferenceId", async () => {
            const mockError = new Error("DB error");

            jest.spyOn(DocumentDAO.prototype, "updateGeoreferenceId").mockRejectedValueOnce(mockError);

            await expect(documentController.updateGeoreferenceId(1, 2)).rejects.toThrow("DB error");

            expect(DocumentDAO.prototype.updateGeoreferenceId).toHaveBeenCalledWith(1, 2);
        });
    });

});
