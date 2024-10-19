export interface IFile {
  url: string;
  public_id: string;
  message: string;
}

export interface IFileResponse {
  statusCode: number;
  data: IFile;
}
