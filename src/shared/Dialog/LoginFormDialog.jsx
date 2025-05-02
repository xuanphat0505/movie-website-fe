import { useContext, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { FaTimes } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

import { BASE_URL } from "../../config/utils";
import { toastSuccess, toastError } from "../Toastify";
import { loginStart, loginSuccess, loginFailure } from "../../redux/authSlice";
import { OpenContext } from "../../contexts/OpenContext";
import Loader from "../Loader";

import "./Dialog.css";
function LoginFormDialog() {
  const { setFormDialog, formDialog } = useContext(OpenContext);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [reCapcha, setReCapcha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const recaptchaRef = useRef(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const onCaptchaChange = (value) => {
    setReCapcha(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(loginStart());
    if (reCapcha === "" || reCapcha === null) {
      setIsLoading(false);
      dispatch(loginFailure());
      return toastError("Please verify captcha");
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/login`,
        JSON.stringify({ ...formData }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success) {
        setIsLoading(false);
        toastSuccess(result.message);
        dispatch(loginSuccess(result.data));
        setReCapcha("");
        recaptchaRef.current.reset();
        setTimeout(() => {
          setFormData({ email: "", password: "" });
          window.location.reload();
        }, 2000); // Adjust the delay as needed
      }
    } catch (error) {
      dispatch(loginFailure());
      setIsLoading(false);
      setReCapcha("");
      setFormData({ ...formData, password: "" });
      recaptchaRef.current.reset();
      return toastError(error.response.data.message);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      console.log(credentialResponse);

      dispatch(loginStart());
      setGoogleLoading(true);
      try {
        const res = await axios.post(
          `${BASE_URL}/auth/google-login`,
          {
            code: credentialResponse.code,
          },
          { withCredentials: true }
        );
        const result = res.data;
        if (result.success) {
          dispatch(loginSuccess(result.data));
          toastSuccess(result.message);
          setGoogleLoading(false);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      } catch (error) {
        dispatch(loginFailure());
        setGoogleLoading(false);
        return toastError(error.response?.data?.message);
      }
    },
    onError: (error) => {
      return toastError(error);
    },
    flow: "auth-code",
  });

  return (
    <div
      className={`dialog modal-form ${formDialog === "login" ? "show" : ""}`}
      onClick={() => setFormDialog("")}
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // Ngăn sự kiện click lan ra .dialog
              setFormDialog("");
            }}
            className="close-dialog"
          >
            <i>
              <FaTimes size={16} />
            </i>
          </button>
          <div className="form-header">
            <h4 className="heading-sm mb-0">Đăng nhập</h4>
          </div>
          <div>
            <p className="mb-6 text-text-base">
              Nếu bạn chưa có tài khoản,{" "}
              <span
                className="text-primary-color cursor-pointer"
                onClick={() => setFormDialog("register")}
              >
                đăng ký ngay
              </span>
            </p>
            <form onSubmit={handleSubmit}>
              <div className="input-box mb-2">
                <input
                  onChange={handleChange}
                  value={formData.email}
                  id="email"
                  type="email"
                  placeholder="Email"
                ></input>
              </div>
              <div className="input-box mb-6">
                <input
                  onChange={handleChange}
                  value={formData.password}
                  id="password"
                  type="password"
                  placeholder="Password"
                ></input>
              </div>
              <div>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LfOkvsqAAAAAJzOJy7tFlk0Lj9ZOJrbvhuYaDEE"
                  onChange={onCaptchaChange}
                />
              </div>
              <div className="input-box my-6">
                <button className="btn d-block btn-primary">
                  {isLoading ? <Loader isloading={isLoading} /> : "Đăng nhập"}
                </button>
              </div>

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-white-color">Or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <div className="input-box mb-4">
                <button
                  type="button"
                  onClick={googleLogin}
                  className="btn w-full flex items-center justify-center gap-2 btn-primary"
                >
                  {googleLoading ? (
                    <Loader isloading={googleLoading} />
                  ) : (
                    <>
                      <img
                        src="https://res.cloudinary.com/djmeybzjk/image/upload/v1745254438/google-icon_ax7kfe.png"
                        alt="Google"
                        className="w-6 h-6"
                      />
                      Đăng nhập với Google
                    </>
                  )}
                </button>
              </div>

              <div className="text-center">
                <span
                  onClick={() => setFormDialog("forget")}
                  className="text-[0.875em] cursor-pointer text-white-color hover:text-primary-color"
                >
                  Quên mật khẩu
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginFormDialog;
