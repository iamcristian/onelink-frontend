import api from "@/config/axios";
import { User } from "@/types/user";
import { isAxiosError } from "axios";

export async function searchByHandle(handle: string) {
  try {
    const { data } = await api.post<string>("/api/user/search", { handle });
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);
  }
}

export async function getUser() {
  try {
    const { data } = await api.get<User>("/api/user");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);
  }
}
