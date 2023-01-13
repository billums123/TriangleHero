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
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.delete(`api/user/login`);
    if (response.status === 204) {
      return true;
    }
  } catch (error: any) {
    return error;
  }
};

export const checkForUserSession = async () => {
  try {
    const response = await axios(`api/user/login`);
    return response.data;
  } catch (error: any) {
    return error;
  }
};
