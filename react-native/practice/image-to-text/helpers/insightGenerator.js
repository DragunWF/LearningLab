import { generateText } from "./gemini";
import { prompt, promptTemplates } from "./prompt";

export async function generateGeminiInsights(readText) {
  let modifiedPrompt = prompt;
  modifiedPrompt = modifiedPrompt.replace(promptTemplates.readText, readText);
  const response = await generateText(modifiedPrompt);
  console.log(`
+ ----- AI Modified Prompt ----- +
${modifiedPrompt}
+ ------------------------------ +    
`);
  return response;
}
