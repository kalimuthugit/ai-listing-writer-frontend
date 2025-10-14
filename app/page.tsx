"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [propertyType, setPropertyType] = useState<string>("House");
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [features, setFeatures] = useState<string>("");
  const [listing, setListing] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const generateListing = async () => {
    setLoading(true);
    try {
      const res = await axios.post("https://ai-listing-api.onrender.com/generate-listing", {
        property_type: propertyType,
        bedrooms,
        bathrooms,
        features,
      });
      setListing(res.data.listing);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">
        🏡 AI Listing Writer
      </h1>
      <div className="bg-white p-6 rounded-2xl shadow w-full max-w-md">
        <label>Property Type</label>
        <input
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <div className="flex justify-between gap-4">
          <div>
            <label>Bedrooms</label>
            <input
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(Number(e.target.value))}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Bathrooms</label>
            <input
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(Number(e.target.value))}
              className="border p-2 w-full"
            />
          </div>
        </div>

        <label className="mt-3 block">Key Features</label>
        <textarea
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <button
          onClick={generateListing}
          className="bg-teal-600 text-white py-2 px-4 rounded w-full"
          disabled={loading}
        >
          {loading ? "Generating..." : "✨ Generate Listing"}
        </button>
      </div>

      {listing && (
        <div className="bg-white mt-6 p-6 rounded-2xl shadow max-w-md w-full">
          <h2 className="text-xl font-semibold text-teal-600 mb-2">
            Generated Listing:
          </h2>
          <p>{listing}</p>
        </div>
      )}
    </main>
  );
}
