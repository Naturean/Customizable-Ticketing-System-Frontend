import { BASE_API_URL } from "@/utils/constUtil.js";

export async function loginApi(body) {
  return await fetch(`${BASE_API_URL}/auth`, {
    method: "POST",
    body: new URLSearchParams(body),
  });
}
