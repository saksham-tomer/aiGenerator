import S3ConfigSingleton from "@/lib/s3";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const s3Instance = S3ConfigSingleton.getInstance();
  const { imageData, imageKey, contentType } = await req.json();
  try {
    // Convert base64 to buffer
    const imageBuffer = Buffer.from(imageData, "base64");

    const imageUrl = await s3Instance.uploadToS3(
      imageBuffer,
      imageKey,
      contentType
    );
    if (imageUrl) {
      return NextResponse.json({ success: true, imageUrl }, { status: 200 });
    } else {
      return NextResponse.json({ success: false }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 400 }
    );
  }
}
