import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUsersStore } from "../../features/store";
import type { User } from "../../features/types";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "../usercard/usecart.scss";

interface Props {
  user: User;
  isArchived?: boolean;
}

export default function UserCard({ user, isArchived = false }: Props) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { archiveUser, unarchiveUser, hideUser } = useUsersStore();

  const avatarUrl = user.avatar;

  // Закрытие дропдауна при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEdit = () => {
    setIsDropdownOpen(false);
    navigate(`/edit/${user.id}`);
  };

  const handleArchive = () => {
    setIsDropdownOpen(false);
    archiveUser(user.id);
  };

  const handleUnarchive = () => {
    setIsDropdownOpen(false);
    unarchiveUser(user.id);
  };

  const handleHide = () => {
    setIsDropdownOpen(false);
    hideUser(user.id);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="user-card">
      <img src={avatarUrl} alt={user.username} className="avatar" />

      <div className="info">
        <h3 className="name">{user.username}</h3>
        <p className="company">{user.company.name}</p>
        <p className="city">{user.address.city}</p>
      </div>

      <div className="actions" ref={dropdownRef}>
        <div className="menu-button" onClick={toggleDropdown}>
          <MoreVertIcon sx={{ fontSize: "20px" }} />
        </div>

        {isDropdownOpen && (
          <div className="dropdown">
            {!isArchived ? (
              <>
                <button onClick={handleEdit} className="edit">
                  Редактировать
                </button>
                <button onClick={handleArchive} className="archive">
                  Архивировать
                </button>
                <div className="divider" />
                <button onClick={handleHide} className="hide">
                  <VisibilityOffIcon sx={{ fontSize: "18px" }} />
                  Скрыть
                </button>
              </>
            ) : (
              <button onClick={handleUnarchive} className="unarchive">
                Активировать
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}