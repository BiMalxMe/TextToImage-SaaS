import axios from "axios";

type Props = {
  text: string;
};

export default async function ApiHandler({ text }: Props) {
  const Backend_url = process.env.LOCAL_BACKEND_URL;

  try {
    const response = await axios.post(`${Backend_url}`, {
      text: text,
    });

    const imageUrl = response.data.image_url;

    return imageUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    return (
    console.log("An error occurred")
  )
  }
}
