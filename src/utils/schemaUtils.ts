export interface Field {
  name: string;
  type: string;
  subfields?: Field[];
}

export const generateSchema = (fields: Field[]): any => {
  const schema: any = {
    type: "object",
    properties: {},
  };

  fields.forEach((field) => {
    schema.properties[field.name] = buildField(field);
  });

  return schema;
};

const buildField = (field: Field): any => {
  const base: any = {
    type: field.type,
  };

  if (field.type === "object" && field.subfields?.length) {
    base.properties = {};
    field.subfields.forEach((sub) => {
      base.properties[sub.name] = buildField(sub);
    });
  }

  if (field.type === "array") {
    base.items = field.subfields?.length
      ? buildField(field.subfields[0])
      : { type: "string" };
  }

  return base;
};
