import { useContext } from "react";
import { FaTimes } from "react-icons/fa";

import { dialogIcons } from "../../assets/data/data";
import { OpenContext } from "../../contexts/OpenContext";

import "./Dialog.css";
function ShareDialog() {
  const { openShareDialog, setOpenShareDialog } = useContext(OpenContext);
  return (
    <div
      className={`dialog ${openShareDialog ? "show" : ""}`}
      onClick={() => setOpenShareDialog(false)}
    >
      <div className={`modal-sm modal-dialog`}>
        <div className="modal-content">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); 
              setOpenShareDialog(false);
            }}
            className="close-dialog"
          >
            <i>
              <FaTimes size={16} />
            </i>
          </button>
          <div className="mb-4">
            <h4 className="heading-sm text-center ">Chia sẻ</h4>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-[10px]">
            {dialogIcons.map((dialog, index) => (
              <div
                className="dialog-item"
                key={index}
                style={{ backgroundColor: dialog.color }}
              >
                <img src={dialog.icon}></img>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareDialog;
