import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const apiKey = process.env.STABILITY_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }

  // Stability AI API endpoint
  const stabilityUrl =
    "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";

  try {
    // Make a request to Stability AI to generate an image
    const response = await axios.post(
      stabilityUrl,
      {
        text_prompts: [{ text: prompt }],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        steps: 30,
        samples: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const image = response.data.artifacts[0].base64;

    // Return the image data as a JSON response
    return NextResponse.json({ image });
  } catch (error: any) {
    console.error(
      "Error generating image:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: error.response?.data?.message || error.message },
      { status: error.response?.status || 500 }
    );
  }
}
