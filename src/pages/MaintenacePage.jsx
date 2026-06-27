import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import maintenanceAnimation from "../assets/data/Under Maintenance.json";
import axios from "axios";
import { BASE_URL } from "../config/utils";

// Component hiển thị giao diện trang bảo trì hệ thống và thông tin liên hệ hỗ trợ
export default function MaintenancePage() {
  const [config, setConfig] = useState({
    hotline: "1900 6789",
    facebookUrl: "https://facebook.com/streamlab.vn",
  });

  // Tải cấu hình khẩn cấp từ máy chủ để hiển thị hotline và trang facebook
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/setting`);
        const data = res.data;
        if (data.success && data.data) {
          setConfig({
            hotline: data.data.hotline || "1900 6789",
            facebookUrl:
              data.data.facebookUrl || "https://facebook.com/streamlab.vn",
          });
        }
      } catch (err) {
        console.error("Lỗi khi tải hotline/facebook từ server:", err);
      }
    };
    fetchSettings();
  }, []);

  const hasAnimation =
    maintenanceAnimation && Object.keys(maintenanceAnimation).length > 0;

  return (
    <div className="relative min-h-screen bg-[#07070a] flex flex-col items-center justify-center overflow-hidden font-sans text-slate-200 px-4">
      {/* Vòng sáng trang trí nền */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#ff8300]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Hoạt ảnh Lottie trung tâm */}
      <div className="w-[320px] h-[320px] flex items-center justify-center">
        <Lottie
          animationData={maintenanceAnimation}
          loop={true}
          className="w-full h-full"
        />
      </div>

      {/* Nội dung thông báo bảo trì */}
      <div className="text-center space-y-2.5 max-w-md relative z-10">
        <h1 className="text-xl sm:text-2xl font-black tracking-wide text-white uppercase">
          Hệ thống đang bảo trì
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Chúng tôi đang cập nhật một số tính năng mới để nâng cao chất lượng
          trải nghiệm xem phim. Vui lòng quay lại sau!
        </p>

        {/* Thông tin liên hệ hỗ trợ kỹ thuật */}
        <div className="flex items-center justify-center gap-3 pt-4 text-[11px] text-slate-500">
          <span>
            Hotline:{" "}
            <a
              href={`tel:${config.hotline}`}
              className="text-[#ff8300] font-bold hover:!underline"
            >
              {config.hotline}
            </a>
          </span>
          <span className="w-[1px] h-3 bg-slate-800" />
          <a
            href={config.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors underline decoration-slate-700 hover:decoration-white"
          >
            Facebook Hỗ trợ
          </a>
        </div>
      </div>
    </div>
  );
}
