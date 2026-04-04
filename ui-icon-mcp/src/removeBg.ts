import { Buffer } from "node:buffer";

/**
 * Removes background from an image buffer using remove.bg API.
 * Uses the native Node 18+ fetch API.
 */
export async function removeBg(imageBuffer: Buffer, apiKey: string): Promise<Buffer> {
  const blob = new Blob([imageBuffer], { type: "image/png" });
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_file", blob);

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": apiKey },
    body: formData as any,
  });

  if (response.ok) {
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } else {
    throw new Error(`Remove.bg API Error - ${response.status}: ${response.statusText}`);
  }
}
