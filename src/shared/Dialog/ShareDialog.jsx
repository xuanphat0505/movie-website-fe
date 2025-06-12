import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";

import { dialogIcons } from "../../assets/data/data";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  RedditShareButton,
  FacebookMessengerShareButton,
} from "react-share";
import { OpenContext } from "../../contexts/OpenContext";

import "./Dialog.css";

function ShareDialog({ url = window.location.href, title = "Movie Website" }) {
  const { openShareDialog, setOpenShareDialog } = useContext(OpenContext);

  // Map icon index to corresponding share button component
  const shareButtons = {
    0: FacebookShareButton,
    1: TwitterShareButton,
    2: TelegramShareButton,
    3: RedditShareButton,
    4: FacebookMessengerShareButton,
  };

  const renderShareButton = (dialog, index) => {
    const ShareButton = shareButtons[index];

    if (ShareButton) {
      return (
        <ShareButton url={url} title={title}>
          <div
            className="dialog-item"
            style={{ backgroundColor: dialog.color }}
          >
            <img src={dialog.icon} alt={`share-${index}`} />
          </div>
        </ShareButton>
      );
    }

    // For other icons or ShareThis button
    return (
      <div
        className="dialog-item"
        style={{ backgroundColor: dialog.color }}
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: title,
              url: url,
            });
          }
        }}
      >
        <img src={dialog.icon} alt={`share-${index}`} />
      </div>
    );
  };

  return (
    <div
      className={`dialog ${openShareDialog ? "show" : ""}`}
      onClick={() => setOpenShareDialog(false)}
    >
      <div
        className={`modal-sm modal-dialog`}
        onClick={(e) => e.stopPropagation()}
      >
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
            <h4 className="heading-sm text-center">Chia sẻ</h4>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-[10px]">
            {dialogIcons.map((dialog, index) => (
              <div key={index}>
                {renderShareButton(dialog, index)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

ShareDialog.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
};

export default ShareDialog;
