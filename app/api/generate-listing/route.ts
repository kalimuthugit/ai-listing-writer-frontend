import { NextRequest } from "next/server";

export const runtime = "edge"; // optional: faster cold start

export async function POST(req: NextRequest) {
  const body = await req.json();

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "https://ai-listing-writer-backend.onrender.com";

  const response = await fetch(`${backendUrl}/generate-listing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // ✅ Convert the object into a real JSON string
    body: JSON.stringify({
      property_type: body.property_type || "",
      bedrooms: Number(body.bedrooms) || 0,
      bathrooms: Number(body.bathrooms) || 0,
      features: body.features || "",
      temperature: body.temperature ?? 0.3,
    }),
  });

  // ✅ Pass the streamed response directly to frontend
  return new Response(response.body, {
    headers: { "Content-Type": "text/plain" },
  });
}
