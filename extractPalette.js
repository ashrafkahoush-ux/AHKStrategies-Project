import fs from "fs";
import getColors from "get-image-colors";

const images = [
  "vision.png",
  "opening image.png",
  "MENA region export business.png",
];

const options = { count: 6, type: "image/png" };

const run = async () => {
  const palette = {};
  for (const img of images) {
    const colors = await getColors(img, options);
    palette[img] = colors.map(c => c.hex());
  }

  fs.writeFileSync(
    "brand-palette.json",
    JSON.stringify(palette, null, 2)
  );

  console.log("âœ… Saved palette â†’ brand-palette.json");
};

run();


