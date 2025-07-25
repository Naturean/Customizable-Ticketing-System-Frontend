import { BASE_API_URL } from "@/utils/constUtil.js";

export async function getStaff(id) {
  return id
    ? await fetch(`${BASE_API_URL}/staff/?id=${id}`)
    : await fetch(`${BASE_API_URL}/staff`);
}

export async function createStaff(body_json) {
  return await fetch(`${BASE_API_URL}/staff`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body_json,
  });
}

export async function updateStaff(body_formdata) {
  return await fetch(`${BASE_API_URL}/staff`, {
    method: "PATCH",
    body: body_formdata,
  });
}
