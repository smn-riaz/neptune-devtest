/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

export async function POST(req: Request) {
  try {
    const { query } = await req.json();


    const source1 = `
Doggie Spa: 4.7 stars, 150 reviews, $40-$60, booking via phone (555-1234), 123 Main St.
`;
    const source2 = `
Grooming Express: 4.5 stars, 200 reviews, $70-$75, online booking, 456 Elm St.
`;
    const source3 = `
Paws & Relax: 4.9 stars, 80 reviews, $90-$120, walk-in only, 789 Oak St.
`;

    const contents = `
You are a professional search synthesizer. Based on the following data about dog groomers, write a clear synthesized answer and output ONLY the following JSON format exactly:

{
  "synthesizedAnswer": "string summary",
  "results": [
    {
      "name": "",
      "rating": number,
      "reviews": number,
      "priceRange": "",
      "booking": "",
      "address": "",
      "neptuneScore": number
    }
  ]
}

### User Query:
"${query}"

### Sources:
Source 1:
${source1}

Source 2:
${source2}

Source 3:
${source3}

### Instructions:
- The priceRange field must exactly match the dollar-sign symbols ($, $$, $$$, $$$$) provided in the source. Do not convert it to words or phrases.
- Calculate Neptune Score = rating * log(reviews).
- Scale Neptune Scores proportionally so the highest score is 100, others scaled accordingly.
- Use reasonable assumptions if any data is missing.
- Return ONLY valid JSON, no explanations or extra text.
`;

    // Call Gemini model with strict JSON response schema
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            synthesizedAnswer: { type: Type.STRING },
            results: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  rating: { type: Type.NUMBER },
                  reviews: { type: Type.NUMBER },
                  priceRange: { type: Type.STRING },
                  booking: { type: Type.STRING },
                  address: { type: Type.STRING },
                  neptuneScore: { type: Type.NUMBER },
                },
                required: [
                  "name",
                  "rating",
                  "reviews",
                  "priceRange",
                  "booking",
                  "address",
                  "neptuneScore",
                ],
                propertyOrdering: [
                  "name",
                  "rating",
                  "reviews",
                  "priceRange",
                  "booking",
                  "address",
                  "neptuneScore",
                ],
              },
            },
          },
          required: ["synthesizedAnswer", "results"],
          propertyOrdering: ["synthesizedAnswer", "results"],
        },
      },
    });

    console.log("Gemini raw response:", response.text);


    const resultJson = JSON.parse(response.text ?? "{}");

    return NextResponse.json(resultJson);
    
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Failed to process search request." });
  }
}
