import { BASE_URL } from "../config/utils";

// Gửi báo cáo lỗi phim lên server
export const submitReport = async (axiosJWT, accessToken, reportData) => {
  const response = await axiosJWT.post(`${BASE_URL}/report`, reportData, {
    headers: { Authorization: `Bearer ${accessToken}` },
    withCredentials: true,
  });
  return response.data;
};
