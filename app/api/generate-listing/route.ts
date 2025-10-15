import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "https://ai-listing-writer-backend.onrender.com";

  const response = await fetch(`${backendUrl}/generate-listing`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      property_type: body.property_type,
      bedrooms: Number(body.bedrooms),
      bathrooms: Number(body.bathrooms),
      features: body.features,
      temperature: body.temperature,
    }),
  });

  // Stream response text back to frontend
  return new Response(response.body, {
    headers: { "Content-Type": "text/plain" },
  });
}
