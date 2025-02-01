import { useApi } from "@/composables/useApi";

const { request } = useApi("users");

export const addUser = async (newUser) => {
  return await request("/create", "POST", newUser);
};