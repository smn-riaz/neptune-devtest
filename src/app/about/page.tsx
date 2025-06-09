"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-6">
        🐾 About Dog Grooming Search Synthesizer
      </h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>What is this?</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-2">
          <p>
            The <strong>Dog Grooming Search Synthesizer</strong> is an intelligent API powered by Google Gemini AI that transforms unstructured scraped data into clean, structured JSON.
          </p>
          <p>
            It makes it easy for apps and websites to present clear, trustworthy information about local dog groomers.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-2">
          <ul className="list-disc list-inside space-y-1">
            <li>Synthesized natural-language answer</li>
            <li>Structured fields: name, rating, reviews, priceRange, booking, address, Neptune Score</li>
            <li>Strict JSON output with schema validation</li>
            <li>Neptune Score helps compare options at a glance</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-2">
          <p>
            The API ingests unstructured descriptions of dog groomers and synthesizes them using the Gemini 2.0 Flash model.
          </p>
          <p>
            It computes a <strong>Neptune Score</strong> based on rating and review volume, helping users quickly compare services.
          </p>
          <p>
            Responses are clean JSON, perfect for powering apps, websites, and conversational agents.
          </p>
        </CardContent>
      </Card>

  

      <Card>
        <CardHeader>
          <CardTitle>Why This Matters</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-2">
          <p>
            Pet owners often struggle to compare grooming options because of inconsistent online data.
          </p>
          <p>
            This API helps apps and services present trustworthy, clear grooming data — improving user experience and transparency.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
