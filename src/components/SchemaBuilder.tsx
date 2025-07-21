import { useState } from "react";

// Define field types
export type FieldType = "" | "string" | "number" | "objectId" | "float" | "boolean" | "nested";

// Field interface
export interface SchemaField {
  name: string;
  type: FieldType;
  required: boolean;
  nestedFields?: SchemaField[];
}

// Props for main SchemaBuilder
interface SchemaBuilderProps {
  fields: SchemaField[];
  setFields: (fields: SchemaField[]) => void;
  isRoot?: boolean;
}

// Default field object
const defaultField: SchemaField = {
  name: "",
  type: "",
  required: false,
};

// Single field row component
const FieldRow = ({
  field,
  onChange,
  onRemove,
}: {
  field: SchemaField;
  onChange: (updated: SchemaField) => void;
  onRemove: () => void;
}) => {
  const handleNestedChange = (nested: SchemaField[]) => {
    onChange({ ...field, nestedFields: nested });
  };

  return (
    <div className="ml-4 border-l-4 border-gray-400 pl-4 mb-4">
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <input
          className="border px-2 py-1 rounded w-40 border-gray-400"
          placeholder="Field Name"
          value={field.name}
          onChange={(e) => onChange({ ...field, name: e.target.value })}
        />

        <select
          className="border px-2 py-1 rounded w-40 border-gray-400"
          value={field.type}
          onChange={(e) => onChange({ ...field, type: e.target.value as FieldType })}
        >
          <option value="" disabled hidden>Field type</option>
          <option value="nested">nested</option>
          <option value="string">string</option>
          <option value="number">number</option>
          <option value="objectId">objectId</option>
          <option value="float">float</option>
          <option value="boolean">boolean</option>
        </select>

        <label className="flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => onChange({ ...field, required: e.target.checked })}
          />
          Required
        </label>

        <button
          onClick={onRemove}
          className="text-red-500 text-xl font-bold hover:text-red-700"
        >
          &times;
        </button>
      </div>

      {field.type === "nested" && (
        <SchemaBuilder
          fields={field.nestedFields || []}
          setFields={handleNestedChange}
          isRoot={false}
        />
      )}
    </div>
  );
};

const SchemaBuilder = ({ fields, setFields }: SchemaBuilderProps) => {
  const addField = () => {
    setFields([...fields, { ...defaultField }]);
  };

  const updateField = (index: number, updated: SchemaField) => {
    const newFields = [...fields];
    newFields[index] = updated;
    setFields(newFields);
  };

  const removeField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  return (
    <div className="p-4">
      {fields.map((field, index) => (
        <FieldRow
          key={index}
          field={field}
          onChange={(updated) => updateField(index, updated)}
          onRemove={() => removeField(index)}
        />
      ))}

      <button
        onClick={addField}
        type="button"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg my-2"
      >
        + Add Item
      </button>
    </div>
  );
};

// ✅ Export schema generator
export const generateSchema = (fields: SchemaField[]): Record<string, any> => {
  const schema: Record<string, any> = {};
  fields.forEach((field) => {
    if (field.type === "nested" && field.nestedFields) {
      schema[field.name] = generateSchema(field.nestedFields);
    } else {
      schema[field.name] = field.type.toUpperCase();
    }
  });
  return schema;
};

export default SchemaBuilder;

