import axios from "axios";
import { CreateUserOrLogin, GetUserInfo } from "../types";

export const createNewAccount = async ({
  username,
  plainPassword,
}: CreateUserOrLogin): Promise<GetUserInfo> => {
  try {
    const response = await axios.post(`api/user/signup`, {
      username,
      plainPassword,
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    return error;
  }
};
export const loginUser = async ({
  username,
  plainPassword,
}: CreateUserOrLogin): Promise<GetUserInfo> => {
  try {
    const response = await axios.post(`api/user/login`, {
      username,
      plainPassword,
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    return error;
  }
};
