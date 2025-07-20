import React from "react";
import type { Field } from "../utils/schemaUtils";

interface Props {
  fields: Field[];
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
}

const FieldBuilder: React.FC<Props> = ({ fields, setFields }) => {
  const addField = () => {
    setFields([
      ...fields,
      {
        name: "",
        type: "",
        subfields: [],
      },
    ]);
  };

  const updateField = (index: number, key: keyof Field, value: any) => {
    const updated = [...fields];
    (updated[index] as any)[key] = value;
    setFields(updated);
  };

  const addSubfield = (index: number) => {
    const updated = [...fields];
    updated[index].subfields?.push({
      name: "",
      type: "",
      subfields: [],
    });
    setFields(updated);
  };

  return (
    <div>
      {fields.map((field, idx) => (
        <div key={idx} className="mb-4 border-b pb-4">
          <input
            type="text"
            value={field.name}
            onChange={(e) => updateField(idx, "name", e.target.value)}
            placeholder="Field Name"
            className="mr-2 p-2 border rounded"
          />
          <select
            value={field.type}
            onChange={(e) => updateField(idx, "type", e.target.value)}
            className="p-2 border rounded"
          >
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="object">Object</option>
            <option value="array">Array</option>
          </select>
          {["object", "array"].includes(field.type) && (
            <button
              onClick={() => addSubfield(idx)}
              className="ml-2 px-2 py-1 bg-green-600 text-white rounded"
            >
              + Subfield
            </button>
          )}
          {field.subfields && field.subfields.length > 0 && (
            <div className="ml-6 mt-2">
              <FieldBuilder
                fields={field.subfields}
                setFields={(newSubfields) => {
                  const updated = [...fields];
                  updated[idx].subfields =
                    typeof newSubfields === "function"
                      ? newSubfields(updated[idx].subfields || [])
                      : newSubfields;
                  setFields(updated);
                }}
              />
            </div>
          )}
        </div>
      ))}
      <button
        onClick={addField}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        + Add Field
      </button>
    </div>
  );
};

export default FieldBuilder;
