export type UploadRequest = {
  url: string;
  file: File;
};

export type Progress = {
  percentage: number;
  uploaded: number;
  totalSize: number;
  estimateTime: string;
};
