import React, { useCallback } from "react";

interface Props {
  onSelect: (user: LightDMUser) => void;
  user: LightDMUser;
}

const UserDisplay: React.FC<Props> = ({ onSelect, user }) => {
  const handleSelect = useCallback(() => onSelect(user), [onSelect, user]);

  return (
    <button className="user-list__item-btn" onClick={handleSelect}>
      <span className="user__username">{user.username}</span>
      <span className="user__separator">/</span>
      <span>{user.display_name}</span>
    </button>
  );
};

export default UserDisplay;
