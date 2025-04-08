import axios from "axios";

type Props = {
  text: string;
};

export default async function ApiHandler({ text }: Props) {
  const Backend_url = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL;
  console.log(Backend_url)
   try {
     const response = await axios.post(`${Backend_url}`, {
       text: text,
     });

     const imageUrl = response.data
     //for checking
     console.log(imageUrl);

     return imageUrl;
   } catch (error) {
     console.error("Error fetching image:", error);
     return (
     console.log("An error occurred"
   )
     )
    }}
