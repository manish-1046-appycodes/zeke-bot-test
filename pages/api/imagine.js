import axios from "axios";

export default async function handler(req, res) {
  console.log(process.env)
  const MODEL_INPUT = {
    prompt: req.query.q
  }
  const response = await axios.post(process.env.IMG_API_URL, {
    apiKey: process.env.IMG_API_KEY,
    modelKey: process.env.IMG_MODEL_KEY,
    modelInputs: MODEL_INPUT
  });
  res.status(200).json({ ...response.data })
}
