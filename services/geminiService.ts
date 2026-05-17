import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Safely initialize the AI client
const ai = new GoogleGenAI({ apiKey });

export const generateMascotConcept = async (
  brandName: string,
  industry: string,
  vibe: string
): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please configure the environment.");
  }

  try {
    const prompt = `
      Act as a world-class mascot branding specialist.
      Generate a creative, bold, and unique mascot character concept for a brand with the following details:
      
      Brand Name: ${brandName}
      Industry: ${industry}
      Desired Vibe: ${vibe}

      Output format:
      Return a single paragraph (approx 80-100 words).
      Describe the mascot's species/object, physical appearance (colors, clothing, props), and personality traits. 
      Focus on how it visually represents the brand. 
      Do not include intro/outro fluff. 
      Keep the tone energetic and professional.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.8, // Slightly creative
        maxOutputTokens: 200,
      }
    });

    return response.text || "Could not generate a concept at this time.";
  } catch (error) {
    console.error("Error generating mascot concept:", error);
    throw new Error("Failed to generate concept. Please try again.");
  }
};