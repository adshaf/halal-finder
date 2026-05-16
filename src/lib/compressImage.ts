import imageCompression from "browser-image-compression";

export async function compressBanner(file: File): Promise<File> {
  return imageCompression(file, {
    maxSizeMB: 0.8,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  });
}

export async function compressGallery(file: File): Promise<File> {
  return imageCompression(file, {
    maxSizeMB: 0.4,
    maxWidthOrHeight: 1200,
    useWebWorker: true,
  });
}
