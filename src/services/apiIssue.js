import { BASE_API_URL } from "@/utils/constUtil.js";

export async function getIssue({ id, staffId } = {}) {
  const url = new URL(`${BASE_API_URL}/issue`);

  if (id) url.searchParams.set("id", id);
  if (staffId) url.searchParams.set("staffId", staffId);

  return await fetch(url);
}

export async function createIssue(body_formdata) {
  return await fetch(`${BASE_API_URL}/issue`, {
    method: "POST",
    body: body_formdata,
  });
}

export async function updateIssue(body) {
  return await fetch(`${BASE_API_URL}/issue`, {
    method: "PATCH",
    body: new URLSearchParams(body),
  });
}
