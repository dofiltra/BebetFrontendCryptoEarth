import { apiInstance } from "@shared/api";

const BASE_URL = "/confirmation/ForgotPasswordRef";

export type ResetPasswordParams = {
  email: string;
};

export const resetPassword = (
  params: ResetPasswordParams
) => {
  return apiInstance.post(BASE_URL, { ...params });
};
