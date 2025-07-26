// Prompt template IDs to prevent prompt injection
export const promptTemplates = {
  readText: "&A*$JAD",
};

export const prompt = `
Please give your insights and comments about this text scanned from a book:
${promptTemplates.readText}
`;
