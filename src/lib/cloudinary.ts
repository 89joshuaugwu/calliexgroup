"use client";

/**
 * Cloudinary uploads via direct fetch() to the unsigned upload endpoint —
 * intentionally NOT the cloudinary SDK (matches the pattern used across
 * every other Joshuazaza project: fewer bytes shipped to the client, no
 * SDK version drift, works identically in the browser and edge runtimes).
 *
 * Requires an UNSIGNED upload preset (NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
 * created in Cloudinary → Settings → Upload → Upload presets, scoped to
 * folder "callie-x-group" so admin uploads can't collide with anything else
 * on the account.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dgxxhrwxm";
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "calliexgroup_uploads";

export interface CloudinaryUploadResult {
  secureUrl: string;
  publicId: string;
  width: number;
  height: number;
  resourceType: string;
}

export async function uploadToCloudinary(
  file: File,
  opts: { folder?: string; onProgress?: (pct: number) => void } = {}
): Promise<CloudinaryUploadResult> {
  const isVideo = file.type.startsWith("video/");
  const resourceType = isVideo ? "video" : "image";
  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", opts.folder ?? "callie-x-group");

  // Use XHR (not fetch) only because it's the one API that gives real
  // upload-progress events for the admin's progress bar.
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && opts.onProgress) {
        opts.onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        reject(new Error(`Cloudinary upload failed (${xhr.status}): ${xhr.responseText}`));
        return;
      }
      const data = JSON.parse(xhr.responseText);
      resolve({
        secureUrl: data.secure_url,
        publicId: data.public_id,
        width: data.width,
        height: data.height,
        resourceType: data.resource_type,
      });
    };

    xhr.onerror = () => reject(new Error("Network error during Cloudinary upload."));
    xhr.send(formData);
  });
}
