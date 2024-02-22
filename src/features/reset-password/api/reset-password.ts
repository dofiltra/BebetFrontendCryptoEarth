import { apiInstance } from "@/shared/api";

const BASE_URL = "/api/v1/confirmation/ForgotPasswordRef";

export type ResetPasswordParams = {
  email: string;
};

export const resetPassword = (
  params: ResetPasswordParams
) => {
  return apiInstance.post(BASE_URL, { ...params });
};
