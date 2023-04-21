import { getAxiosInstance } from './axiosInstance';

/** @deprecated - please instantiate the axios instance instead so that your app can use Types.LocalizedError for explicit error handling */
export default async function sendAxiosPostRequest(
  path: string,
  data?: object,
  headers?: { [x: string]: string }
) {
  const axiosInstance = getAxiosInstance();
  const config = {
    headers: {
      Accept: 'application/json',
      ...headers,
    },
  };
  return axiosInstance.post(path, data, config);
}