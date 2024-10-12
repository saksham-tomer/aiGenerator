import { S3 } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

class S3ConfigSingleton {
  private static instance: S3ConfigSingleton;
  private s3: S3;
  private bucketName: string;

  private constructor() {
    const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
    const region = process.env.NEXT_PUBLIC_AWS_REGION;
    this.bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;

    if (!accessKeyId || !secretAccessKey || !region || !this.bucketName) {
      throw new Error("Missing required AWS configuration");
    }

    this.s3 = new S3({
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region,
    });
  }

  public static getInstance(): S3ConfigSingleton {
    if (!S3ConfigSingleton.instance) {
      S3ConfigSingleton.instance = new S3ConfigSingleton();
    }

    return S3ConfigSingleton.instance;
  }

  public getS3(): S3 {
    return this.s3;
  }

  public async uploadToS3(
    file: File | Buffer,
    key: string,
    contentType?: string
  ): Promise<string> {
    const upload = new Upload({
      client: this.s3,
      params: {
        Bucket: this.bucketName,
        Key: key,
        Body: file,
        ContentType: contentType,
        // ACL: "public-read",
      },
    });

    try {
      const result = await upload.done();
      return result.Location;
    } catch (error) {
      console.error("Error uploading to S3:", error);
      throw error;
    }
  }
}

export default S3ConfigSingleton;
