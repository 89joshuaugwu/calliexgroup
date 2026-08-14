"use client";

import { GripVertical, Plus, Trash2 } from "lucide-react";
import type { FieldSchema, ObjectRepeaterFieldSchema, StringRepeaterFieldSchema, TextFieldSchema } from "@/lib/cms/schema";
import { getByPath, setByPath } from "@/lib/utils";
import { ImageUploadField } from "./ImageUploadField";

interface SchemaFieldProps {
  field: FieldSchema;
  data: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
}

export function SchemaField({ field, data, onChange }: SchemaFieldProps) {
  if (field.type === "repeater-object") return <ObjectRepeater field={field} data={data} onChange={onChange} />;
  if (field.type === "repeater-string") return <StringRepeater field={field} data={data} onChange={onChange} />;
  return <SimpleField field={field} data={data} onChange={onChange} />;
}

function SimpleField({ field, data, onChange }: { field: TextFieldSchema; data: Record<string, unknown>; onChange: (n: Record<string, unknown>) => void }) {
  const value = (getByPath(data, field.key) as string) ?? "";
  const set = (v: string) => onChange(setByPath(data, field.key, v));

  if (field.type === "image") {
    return <ImageUploadField label={field.label} value={value} onChange={set} />;
  }

  return (
    <div className="cx-field">
      <label className="cx-field__label">{field.label}</label>
      {field.type === "textarea" || field.type === "richtext" ? (
        <textarea
          className="cx-input cx-input--area"
          rows={field.type === "richtext" ? 6 : 3}
          value={value}
          onChange={(e) => set(e.target.value)}
        />
      ) : field.type === "color" ? (
        <div className="cx-color-field">
          <input type="color" value={value || "#0033ff"} onChange={(e) => set(e.target.value)} />
          <input type="text" className="cx-input" value={value} onChange={(e) => set(e.target.value)} />
        </div>
      ) : (
        <input
          type={field.type === "url" ? "url" : "text"}
          className="cx-input"
          value={value}
          onChange={(e) => set(e.target.value)}
        />
      )}
      {field.hint && <p className="cx-field__hint">{field.hint}</p>}
      {field.type === "richtext" && value && (
        <div className="cx-richtext-preview" dangerouslySetInnerHTML={{ __html: value }} />
      )}
    </div>
  );
}

function ObjectRepeater({
  field,
  data,
  onChange,
}: {
  field: ObjectRepeaterFieldSchema;
  data: Record<string, unknown>;
  onChange: (n: Record<string, unknown>) => void;
}) {
  const items = ((getByPath(data, field.key) as Record<string, unknown>[]) ?? []).slice();
  const commit = (next: Record<string, unknown>[]) => onChange(setByPath(data, field.key, next));

  const updateItem = (index: number, next: Record<string, unknown>) => {
    const copy = items.slice();
    copy[index] = next;
    commit(copy);
  };
  const removeItem = (index: number) => commit(items.filter((_, i) => i !== index));
  const addItem = () => commit([...items, { ...field.emptyItem(), order: items.length }]);
  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const copy = items.slice();
    [copy[index], copy[target]] = [copy[target]!, copy[index]!];
    commit(copy.map((it, i) => ("order" in it ? { ...it, order: i } : it)));
  };

  return (
    <div className="cx-field">
      <div className="cx-repeater__head">
        <label className="cx-field__label">{field.label}</label>
        <button type="button" className="cx-btn-ghost" onClick={addItem}>
          <Plus size={14} /> Add
        </button>
      </div>
      {field.hint && <p className="cx-field__hint">{field.hint}</p>}

      <div className="cx-repeater">
        {items.length === 0 && <p className="cx-field__hint">No items yet \u2014 click Add to create the first one.</p>}
        {items.map((item, index) => (
          <details key={index} className="cx-repeater__item" open={items.length <= 3}>
            <summary>
              <GripVertical size={14} className="cx-repeater__grip" />
              <span>{field.itemTitle(item, index)}</span>
              <span className="cx-repeater__actions" onClick={(e) => e.stopPropagation()}>
                <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Move up">
                  \u2191
                </button>
                <button type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1} aria-label="Move down">
                  \u2193
                </button>
                <button type="button" className="cx-repeater__remove" onClick={() => removeItem(index)} aria-label="Remove">
                  <Trash2 size={14} />
                </button>
              </span>
            </summary>
            <div className="cx-repeater__item-body">
              {field.fields.map((sub) => (
                <SimpleField key={sub.key} field={sub} data={item} onChange={(next) => updateItem(index, next)} />
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

function StringRepeater({
  field,
  data,
  onChange,
}: {
  field: StringRepeaterFieldSchema;
  data: Record<string, unknown>;
  onChange: (n: Record<string, unknown>) => void;
}) {
  const items = ((getByPath(data, field.key) as string[]) ?? []).slice();
  const commit = (next: string[]) => onChange(setByPath(data, field.key, next));

  return (
    <div className="cx-field">
      <div className="cx-repeater__head">
        <label className="cx-field__label">{field.label}</label>
        <button type="button" className="cx-btn-ghost" onClick={() => commit([...items, ""])}>
          <Plus size={14} /> Add
        </button>
      </div>
      <div className="cx-repeater cx-repeater--string">
        {items.map((value, index) => (
          <div key={index} className="cx-repeater__string-row">
            <input
              type="text"
              className="cx-input"
              placeholder={`${field.itemLabel} ${index + 1}`}
              value={value}
              onChange={(e) => {
                const copy = items.slice();
                copy[index] = e.target.value;
                commit(copy);
              }}
            />
            <button type="button" className="cx-repeater__remove" onClick={() => commit(items.filter((_, i) => i !== index))}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
