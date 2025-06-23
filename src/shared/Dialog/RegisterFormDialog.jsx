import { useDispatch } from "react-redux";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

import { BASE_URL } from "../../config/utils";
import { OpenContext } from "../../contexts/OpenContext";
import {
  registerStart,
  registerSuccess,
  registerFailure,
} from "../../redux/authSlice";
import Loader from "../Loader";

import "./Dialog.css";
function RegisterFormDialog() {
  const dispatch = useDispatch();
  const { setFormDialog, formDialog } = useContext(OpenContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [reCapcha, setReCapcha] = useState("");
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
    dispatch(registerStart());
    setIsLoading(true);
    if (reCapcha === "" || reCapcha === null) {
      setIsLoading(false);
      dispatch(registerFailure());
      return alert("Please verify captcha");
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/register`,
        JSON.stringify({ ...formData }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success) {
        dispatch(registerSuccess());
        setIsLoading(false);
        setFormDialog("login");
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          username: "",
        });
        setReCapcha("");
        recaptchaRef.current.reset();
      }
    } catch (error) {
      dispatch(registerFailure());
      setIsLoading(false);
      setFormData({ ...formData, password: "", confirmPassword: "" });
      setReCapcha("");
      recaptchaRef.current.reset();
      return alert(error.response.data.message);
    }
  };
  return (
    <div
      className={`dialog modal-form ${formDialog === "register" ? "show" : ""}`}
      onClick={() => setFormDialog("")}
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <button
            type="button"
            className="close-dialog"
            onClick={(e) => {
              e.stopPropagation();
              setFormDialog("");
            }}
          >
            <i>
              <FaTimes size={16} />
            </i>
          </button>
          <div className="form-header">
            <h4 className="heading-sm mb-0">Tạo tài khoản mới</h4>
          </div>
          <div>
            <p className="mb-6 text-text-base">
              Nếu bạn đã có tài khoản,{" "}
              <span
                className="text-primary-color cursor-pointer"
                onClick={() => setFormDialog("login")}
              >
                đăng nhập
              </span>
            </p>
            <form onSubmit={handleSubmit}>
              <div className="input-box mb-2">
                <input
                  onChange={handleChange}
                  id="username"
                  type="text"
                  placeholder="Tên hiển thị"
                  value={formData.username}
                ></input>
              </div>
              <div className="input-box mb-2">
                <input
                  onChange={handleChange}
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                ></input>
              </div>
              <div className="input-box mb-2 relative">
                <input
                  onChange={handleChange}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  value={formData.password}
                ></input>
                {formData.password.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                )}
              </div>
              <div className="input-box mb-6 relative">
                <input
                  onChange={handleChange}
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                ></input>
                {formData.confirmPassword.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                )}
              </div>
              <div>
                <ReCAPTCHA
                  sitekey="6LfOkvsqAAAAAJzOJy7tFlk0Lj9ZOJrbvhuYaDEE"
                  onChange={onCaptchaChange}
                  ref={recaptchaRef}
                />
              </div>
              <div className="my-6">
                <button className="btn d-block bg-primary-color text-primary-button-text border-primary-color">
                  {isLoading ? <Loader /> : "Đăng ký"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterFormDialog;
