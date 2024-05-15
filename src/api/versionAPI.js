import { API, handleApiError } from "@/api/Utils";

export const versionApiCheck = async () => {
  try {
    const res = await API.post("/v1/version/fetch-latest");
    return { error: null, res: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};