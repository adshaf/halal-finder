import imageCompression from "browser-image-compression";

function toWebpName(filename: string): string {
  return filename.replace(/\.[^.]+$/, ".webp");
}

export async function compressBanner(file: File): Promise<File> {
  const compressed = await imageCompression(file, {
    maxSizeMB: 0.8,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: "image/webp",
  });
  return new File([compressed], toWebpName(file.name), { type: "image/webp" });
}

export async function compressGallery(file: File): Promise<File> {
  const compressed = await imageCompression(file, {
    maxSizeMB: 0.4,
    maxWidthOrHeight: 1200,
    useWebWorker: true,
    fileType: "image/webp",
  });
  return new File([compressed], toWebpName(file.name), { type: "image/webp" });
}
