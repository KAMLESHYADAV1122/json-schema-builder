import React from "react";
import SchemaBuilder from "./components/SchemaBuilder";
import type { SchemaField } from "./components/SchemaBuilder"; // ✅ Type-only import

interface Props {
  fields: SchemaField[];
  onChange: (fields: SchemaField[]) => void;
}

const App: React.FC<Props> = ({ fields, onChange }) => {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">JSON Schema Builder</h1>
      <SchemaBuilder fields={fields} setFields={onChange} />
    </div>
  );
};

export default App;

