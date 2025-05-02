import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";

function TopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="top-button fixed z-[99] right-[1rem] bottom-[1rem] flex justify-center items-center flex-col gap-[4px] w-[56px] h-[56px] rounded-[25%] bg-white-color text-black cursor-pointer"
      >
        <i className="text-[14px]">
          <FaArrowUp />
        </i>
        <div className="text-[10px] leading-[1.1] font-semibold uppercase">
          đầu trang
        </div>
      </button>
    )
  );
}

export default TopButton;
