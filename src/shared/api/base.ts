import { API_URL } from "@shared/config";
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

class ApiInstance {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async get<T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axios.get(
        endpoint,
        options
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async post<T>(
    endpoint: string,
    data: any,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axios.post(
        endpoint,
        data,
        options
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async put<T>(
    endpoint: string,
    data: any,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axios.put(
        endpoint,
        data,
        options
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async delete<T>(
    endpoint: string,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axios.delete(
        endpoint,
        options
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const apiInstance = new ApiInstance();
