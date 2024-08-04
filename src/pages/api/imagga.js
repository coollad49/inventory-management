import got from "got";
import FormData from "form-data";
import formidable from "formidable";
import fs from "fs-extra";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const apiKey = "acc_1f6f182e9a7b165";
const apiSecret = "47d9245688f6897ba730ef502e77aa5b";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), "public", "images");
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: "Error parsing form data" });
    }

    const filePath = files.image.path;
    const fileName = path.basename(filePath);
    const imageUrl = `/images/${fileName}`;

    const formData = new FormData();
    formData.append("image", fs.createReadStream(filePath));

    try {
      const response = await got.post("https://api.imagga.com/v2/tags", {
        body: formData,
        username: apiKey,
        password: apiSecret,
      });

      return res.status(200).json({
        ...JSON.parse(response.body),
        imageUrl,
      });
    } catch (error) {
      return res.status(500).json({ message: "Error processing image" });
    }
  });
};

export default handler;
