import { FaTimes } from "react-icons/fa";
import { useContext, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

import { BASE_URL } from "../../config/utils";
import Loader from "../../shared/Loader";
import { toastError, toastSuccess } from "../../shared/Toastify";
import { OpenContext } from "../../contexts/OpenContext";

import "./Dialog.css";
function ForgetFormDialog() {
  const { formDialog, setFormDialog } = useContext(OpenContext);
  const [formData, setFormData] = useState({
    email: "",
  });
  const [reCapcha, setReCapcha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    if (reCapcha === "" || reCapcha === null) {
      setIsLoading(false);
      return toastError("Please verify captcha");
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/user/forget-password`,
        JSON.stringify(formData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const result = res.data;
      if (result.success) {
        setIsLoading(false);
        toastSuccess(result.message);
        setReCapcha("");
        recaptchaRef.current.reset();
        setTimeout(() => {
          setFormData({ email: "" });
          setFormDialog("");
        }, 2000);
      }
    } catch (error) {
      setIsLoading(false);
      setFormDialog("");
      setReCapcha("");
      setFormData({ email: "" });
      recaptchaRef.current.reset();
      return toastError(error.response.data.message);
    }
  };
  return (
    <div
      className={`dialog modal-form ${formDialog === "forget" ? "show" : ""}`}
      onClick={() => setFormDialog("")}
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <button
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
            <h4 className="heading-sm mb-0">Quên mật khẩu</h4>
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
              <div className="input-box mb-6">
                <input
                  id="email"
                  onChange={handleChange}
                  type="email"
                  placeholder="Email đăng ký"
                  value={formData.email}
                ></input>
              </div>
              <div>
                <ReCAPTCHA
                  sitekey="6LfOkvsqAAAAAJzOJy7tFlk0Lj9ZOJrbvhuYaDEE"
                  onChange={onCaptchaChange}
                  ref={recaptchaRef}
                />
              </div>
              <div className="input-box my-6">
                <button className="btn btn-primary">
                  {isLoading ? <Loader isloading={isLoading} /> : "Gửi yêu cầu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetFormDialog;
