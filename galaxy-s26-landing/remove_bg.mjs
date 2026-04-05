import fs from "node:fs";

async function removeBg(blob) {
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_file", blob);

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": "9YtST5hyx8e67buke4ADuuKK" },
    body: formData,
  });

  if (response.ok) {
    return await response.arrayBuffer();
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
}

const inputPath = "images/hero_new.jpg";
const fileBlob = await fs.openAsBlob(inputPath);
const rbgResultData = await removeBg(fileBlob);
fs.writeFileSync("images/hero_no_bg.png", Buffer.from(rbgResultData));
console.log("Background removal complete! Saved as images/hero_no_bg.png");
