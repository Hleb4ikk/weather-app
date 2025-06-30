import { ApiResponse } from "@/entities/apiResponse";
import { Forecast } from "@/entities/forecast";

export async function uploadMeme(joke: string, category: string) {
  const response = await fetch("http://localhost:8080/memes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ joke, category }),
  });

  const data: ApiResponse<null> = await response.json();

  return data;
}
