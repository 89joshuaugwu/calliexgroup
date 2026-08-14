"use client";

import { ImageOff, Loader2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";

export function ImageUploadField({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (url: string) => void;
  label: string;
}) {
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [broken, setBroken] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    setProgress(0);
    try {
      const result = await uploadToCloudinary(file, {
        folder: "callie-x-group",
        onProgress: setProgress,
      });
      onChange(result.secureUrl);
      setBroken(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setProgress(null);
    }
  }

  return (
    <div className="cx-field">
      <label className="cx-field__label">{label}</label>
      <div className="cx-image-field">
        <div className="cx-image-field__preview">
          {value && !broken ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" onError={() => setBroken(true)} />
          ) : (
            <ImageOff size={20} strokeWidth={1.5} />
          )}
        </div>
        <div className="cx-image-field__controls">
          <input
            type="text"
            className="cx-input"
            placeholder="https:// or upload below"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setBroken(false);
            }}
          />
          <button
            type="button"
            className="cx-btn-ghost"
            onClick={() => inputRef.current?.click()}
            disabled={progress !== null}
          >
            {progress !== null ? (
              <>
                <Loader2 size={14} className="cx-spin" /> {progress}%
              </>
            ) : (
              <>
                <Upload size={14} /> Upload to Cloudinary
              </>
            )}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            hidden
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>
      </div>
      {error && <p className="cx-field__error">{error}</p>}
    </div>
  );
}
