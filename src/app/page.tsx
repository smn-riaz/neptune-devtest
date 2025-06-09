"use client";

import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dog from '../assets/dog-grooming.jpg';

type SearchResult = {
  synthesizedAnswer: string;
  results: {
    name: string;
    rating: number;
    reviews: number;
    priceRange: string;
    booking: string;
    address: string;
    neptuneScore: number;
  }[];
};

type ErrorResult = { error: string };

type ResponseType = SearchResult | ErrorResult | null;

type FormData = {
  query: string;
};

const faqs = [
  "What are the names of the best dog grooming services available?",
  "Which Dog Groomers Have the Highest Ratings?",
  "How many reviews does each dog grooming service have?",
  "Which dog grooming service scores highest on the Neptune Score (considering rating and review count)?",
  "Provide the addresses of the dog groomers mentioned.",
  "Can I get a $80 dog grooming service?",
];

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const [response, setResponse] = React.useState<ResponseType>(null);
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (response) {
      const element = document.getElementById("results-section");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  }, [response]);

  async function onSubmit(data: FormData) {
    setResponse(null);
    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: data.query }),
      });
      const result = await res.json();
      setResponse(result);
      reset();
    } catch {
      setResponse({ error: "Failed to fetch" });
    }
  }

  function isError(response: ResponseType): response is ErrorResult {
    return (response as ErrorResult)?.error !== undefined;
  }

  function isSearchResult(response: ResponseType): response is SearchResult {
    return (response as SearchResult)?.synthesizedAnswer !== undefined;
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <main
      className="
      px-4 py-8
        min-h-screen
        bg-gradient-to-tr
        from-indigo-400 via-[#daacda] to-pink-300

        flex flex-col items-center
        font-sans
        text-indigo-900
      "
    >
      {/* Hero Section with Image */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full md:px-18 flex flex-col items-center mb-10"
      >
        <h1 className="text-5xl font-extrabold mb-4 text-center drop-shadow-lg select-none tracking-wide">
          Find the Best Dog Groomers
        </h1>
        <p className="text-2xl text-purple-900 mb-8 select-none">
          Powered by AI Insights
        </p>

        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* Left side: Image */}
         <div className="flex-1 rounded-xl overflow-hidden shadow-2xl relative aspect-video md:aspect-auto md:h-auto w-full">
  <Image
    src={dog}
    alt="Dog Grooming"
    fill
    className="rounded-xl object-cover"
    sizes="(max-width: 768px) 100vw, 50vw"
    priority
  />
</div>


          {/* Right side: FAQs */}
          <div className="flex-1 bg-indigo-50 p-6 rounded-xl shadow-lg">
            <h2 className="text-3xl font-extrabold text-indigo-900 mb-6">
              Frequently Asked Questions
            </h2>
            <ul className="list-disc list-inside space-y-4 text-indigo-800 text-lg">
              {faqs.map((faq, index) => (
                <li
                title="Click to COPY"
                  key={index}
                  role="button"
                  tabIndex={0}
                  aria-label={`Copy question: ${faq}`}
                  onClick={() => copyToClipboard(faq, index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      copyToClipboard(faq, index);
                    }
                  }}
                  className="relative bg-[#b7d1e98f] p-2 rounded-lg hover:text-purple-700 cursor-pointer transition-colors duration-300 select-text"
                >
                  {faq}
                  <span
                    aria-hidden="true"
                    className={`absolute left-full ml-2 top-1/2 transform -translate-y-1/2 whitespace-nowrap rounded bg-purple-700 px-2 py-1 text-xs font-semibold text-white opacity-0 pointer-events-none transition-opacity duration-300
                      ${copiedIndex === index ? "opacity-100" : "group-hover:opacity-100"}
                    `}
                  >
                    {copiedIndex === index ? "Copied!" : "Copy question"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full max-w-xl flex flex-col gap-1 mt-4"
          noValidate
        >
          <Textarea
            placeholder="Enter your query here..."
            {...register("query", { required: "Query is required" })}
            rows={5}
            className={`
              resize-none
              border-2
              ${errors.query
                ? "border-red-500 focus:ring-red-500 focus:border-red-600"
                : "border-indigo-600 focus:ring-indigo-600 focus:border-indigo-700"}
              shadow-lg
              rounded-lg
              text-2xl
              text-indigo-900
              bg-white
              placeholder-indigo-400
              transition
              duration-300
            `}
            aria-invalid={errors.query ? "true" : "false"}
          />
          {errors.query && (
            <p className="text-red-600 text-sm font-medium">{errors.query.message}</p>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="
              self-end
              bg-gradient-to-r from-indigo-700 to-purple-700
              text-white
              shadow-lg
              rounded-lg
              px-8
              py-3
              text-lg
              font-semibold
              transition
              duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            size="lg"
          >
            {isSubmitting ? "Searching..." : "Search"}
          </Button>

          {isSubmitting && (
            <div className="mt-4 flex justify-center" aria-label="Loading">
              <svg
                className="animate-spin h-8 w-8 text-indigo-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            </div>
          )}
        </motion.form>
      </motion.div>

      {/* Results Section */}
      <AnimatePresence>
        {response && (
          <motion.section
            id="results-section"
            aria-live="polite"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-6xl mt-4 px-2 sm:px-0"
          >
            {/* Existing results and error handling */}
            {isError(response) && (
              <p className="text-center text-red-700 font-semibold text-lg bg-red-100 rounded-md p-4 mt-2">
                {response.error}
              </p>
            )}

            {isSearchResult(response) && (
              <>
                <Card className="bg-indigo-50 border-indigo-300 shadow-xl rounded-xl mt-4">
                  <CardHeader>
                    <CardTitle className="text-indigo-900 font-extrabold text-2xl tracking-wide">
                      Synthesized Answer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="whitespace-pre-wrap text-indigo-900 text-lg ">
                      {response.synthesizedAnswer}
                    </pre>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10">
                  {response.results.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(139, 92, 246, 0.3)" }}
                      layout
                      className="bg-white rounded-xl shadow-md p-6 text-indigo-900 cursor-default select-text"
                    >
                      <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                      <p className="mb-1">
                        Rating: <span className="font-bold">{item.rating.toFixed(1)}</span> / 5
                        ({item.reviews} reviews)
                      </p>
                      <p className="mb-1">Price Range: {item.priceRange}</p>
                      <p className="mb-1">Booking: {item.booking}</p>
                      <p className="mb-1">Address: {item.address}</p>
                      <p>
                        Neptune Score:{" "}
                        <span className="font-semibold text-purple-700">{item.neptuneScore}</span>
                      </p>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
