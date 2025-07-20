import { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import type { SchemaField } from "./components/SchemaBuilder";

const Main = () => {
  const [fields, setFields] = useState<SchemaField[]>([]);

  return <App fields={fields} onChange={setFields} />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);