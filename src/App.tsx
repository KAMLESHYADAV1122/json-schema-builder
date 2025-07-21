import React, { useState } from "react";
import SchemaBuilder, { SchemaField, generateSchema } from "./components/SchemaBuilder";

const App: React.FC = () => {
  const [fields, setFields] = useState<SchemaField[]>([]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">JSON Schema Builder</h1>

      <div className="flex gap-6">
        {/* Left column: Builder */}
        <div className="flex-1 border rounded shadow p-4">
          <SchemaBuilder fields={fields} setFields={setFields} />
        </div>

        {/* Right column: JSON output */}
        <div className="w-1/2 border rounded shadow p-4 bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">Schema Output</h2>
          <pre className="text-sm whitespace-pre-wrap break-words">
            {JSON.stringify(generateSchema(fields), null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default App;
