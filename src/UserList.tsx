import React, { useCallback } from "react";
import classNames from "classnames";
import { Link, useHistory } from "react-router-dom";

interface ItemProps {
  isSelected: boolean;
  setUser: (user: LightDMUser) => void;
  user: LightDMUser;
}

const UserListItem: React.FC<ItemProps> = ({ isSelected, setUser, user }) => {
  const history = useHistory();

  const handleSelect = useCallback(() => {
    setUser(user);
    history.push("/greeter/log-in");
  }, [history, setUser, user]);

  return (
    <li
      className={classNames({
        "user-list__item": true,
        "user-list__item--active": isSelected,
      })}
    >
      <button
        className={classNames({
          "user-list__item-btn": true,
          "user-list__item-btn--active": isSelected,
        })}
        onClick={handleSelect}
      >
        <span className="user__username">{user.username}</span>
        <span className="user__separator">/</span>
        <span>{user.display_name}</span>
      </button>
    </li>
  );
};

interface Props {
  setUser: (user: LightDMUser) => void;
  user: null | LightDMUser;
  users: LightDMUser[];
}

const UserList: React.FC<Props> = ({ setUser, user, users }) => {
  return (
    <React.Fragment>
      <h2 className="user-list__title">Select a user:</h2>
      <ul className="user-list">
        {users.map((u) => (
          <UserListItem
            isSelected={user !== null && user.username === u.username}
            key={u.username}
            setUser={setUser}
            user={u}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};

export default UserList;
