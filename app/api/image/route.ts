import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export async function GET() {
  try {
    const response = await client.images.generate({
      model: "dall-e-3",
      prompt: "super saiyan goku",
      n: 1,
      quality: "hd",
      size: "1792x1024",
    });

    return NextResponse.json({ url: response.data[0].url }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
