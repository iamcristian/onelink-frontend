import api from "@/config/axios";
import { isAxiosError } from "axios";

export async function searchByHandle(handle: string) {
  try {
    const { data } = await api.post<string>("/api/user/search", { handle });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);
  }
}