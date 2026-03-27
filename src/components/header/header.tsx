import "./header.scss";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        {/* Лого */}
        <div className="logo">
          <div className="logo-icon">
            <img src="./logo-sign.png" alt="@" />
          </div>
          <span className="logo-text">
            <span className="logo-light">at</span>
            <span className="logo-bold">-work</span>
          </span>
        </div>

        {/* Правая часть */}
        <div className="header-right">
          <div className="icons">
            <span className="icon">
              <FavoriteBorderIcon className="icon" sx={{ fontSize: "20px" }} />
            </span>
            <span className="icon">
              <NotificationsNoneIcon
                className="icon"
                sx={{ fontSize: "20px" }}
              />
            </span>
          </div>

          <div className="user">
            <div className="avatar" />
            <span className="name">Ivan1234</span>
          </div>
        </div>
      </div>
    </header>
  );
}
