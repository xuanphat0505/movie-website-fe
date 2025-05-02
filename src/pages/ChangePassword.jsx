import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "../config/utils";
import Loader from "../shared/Loader";
import { toastSuccess, toastError } from "../shared/Toastify";

function ChangePassword() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const resetToken = searchParams.get("token");

  const [formData, setFormData] = useState({
    token: resetToken,
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [tokenStatus, setTokenStatus] = useState({
    isValid: true,
    checked: false,
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Kiểm tra sự tồn tại của token ngay khi component được tải
  useEffect(() => {
    const handleVerifyToken = async () => {
      try {
        const res = await axios.post(
          `${BASE_URL}/user/verify-token`,
          JSON.stringify({ token: resetToken }),
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        const result = res.data;
        if (result.success) {
          setTokenStatus({
            isValid: true,
            checked: true,
            message: result.message,
          });
        }
      } catch (error) {
        setTokenStatus({
          isValid: false,
          checked: true,
          message: error.response.data.message,
        });
      }
    };
    handleVerifyToken();
  }, [resetToken]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/user/change-password`,
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success) {
        setIsLoading(false);
        toastSuccess(result.message);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (error) {
      setIsLoading(false);
      toastError(error.response.data.message);
      if (error.response.data.message.includes("hết hạn")) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  };

  return (
    <section className="section-page">
      <main>
        <div className="pt-[5rem]">
          <div className="flex flex-col gap-[50px]">
            <div className="change-form relative w-full max-w-[800px] my-0 mx-auto py-0 px-[50px]">
              <div className="change-form__header flex items-center justify-start gap-4 min-h-[44px] mb-[1.2rem]">
                <h3 className="category-name">Thiết lập lại mật khẩu</h3>
              </div>

              {tokenStatus.checked && !tokenStatus.isValid ? (
                <div className="w-full p-4 mb-4 text-alert-color bg-alert-bg border border-alert-border-color rounded-[0.375rem]">
                  {tokenStatus.message}
                </div>
              ) : (
                <div className="change-form__body">
                  <form
                    onSubmit={handleSubmit}
                    className="max-w-[500px] my-[2rem] mx-auto"
                  >
                    <div className="input-box mb-2">
                      <input
                        onChange={handleChange}
                        type="password"
                        placeholder="Mật khẩu mới"
                        id="password"
                        value={formData.password}
                      />
                    </div>
                    <div className="input-box mb-2">
                      <input
                        onChange={handleChange}
                        type="password"
                        placeholder="Xác nhận mật khẩu mới"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                      />
                    </div>
                    <div className="input-box mt-12">
                      <button className="btn btn-primary">
                        {isLoading ? <Loader /> : "Đổi mật khẩu"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

export default ChangePassword;
