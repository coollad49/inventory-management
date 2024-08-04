import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey:
    "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",
  defaultHeaders: {
    "HTTP-Referer": "managemyinventory.vercel.app", // Optional, for including your app on openrouter.ai rankings.
    "X-Title": "ManagemyInventory", // Optional. Shows in rankings on openrouter.ai.
  },
});
async function main() {
  const completion = await openai.chat.completions.create({
    model: "meta-llama/llama-3.1-8b-instruct:free",
    messages: [
      {
        role: "user",
        content:
          "can i give you a base64 encoded string of the taken image of a product to get the product name, description, you will choose a category for the product, and quantities depending of the number of same products in image..",
      },
    ],
  });

  console.log(completion.choices[0].message);
}
main();
