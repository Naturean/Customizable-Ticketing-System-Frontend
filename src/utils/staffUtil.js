import { BASE_API_URL } from "./constUtil.js";

export async function fetchStaffInfoBatch(staffIds) {
  if (!staffIds.length) return {};

  try {
    const response = await fetch(
      `${BASE_API_URL}/staff?id=[${staffIds.join(",")}]`
    );
    const result = await response.json();

    if (!response.ok || result.status !== "success") {
      return {};
    }

    return result.data.reduce((map, staff) => {
      map[staff.id] = staff.staffName;
      return map;
    }, {});
  } catch (error) {
    throw new Error(error.message);
  }
}
