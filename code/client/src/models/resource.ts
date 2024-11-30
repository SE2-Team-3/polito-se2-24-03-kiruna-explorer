class Resource {
  resourceId: number;
  fileType: string;
  fileName: string;
  data: any;

  constructor(
    resourceId: number,
    fileType: string,
    fileName: string,
    data: any
  ) {
    this.resourceId = resourceId;
    this.fileType = fileType;
    this.fileName = fileName;
    this.data = data;
  }

  static fromDatabaseRow(row: any): Resource {
    return new Resource(row.resourceId, row.fileType, row.fileName, row.data);
  }

  toJSON(): object {
    return {
      resourceId: this.resourceId,
      fileType: this.fileType,
      fileName: this.fileName,
      data: this.data,
    };
  }
}

export default Resource;
