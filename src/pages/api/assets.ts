import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const dir = path.join(process.cwd(), "public/assets/ai_videos");
  if (!fs.existsSync(dir)) return res.status(200).json([]);

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mp4"));
  const latest = files[files.length - 1];
  res.status(200).json([{ path: `/assets/ai_videos/${latest}` }]);
}


