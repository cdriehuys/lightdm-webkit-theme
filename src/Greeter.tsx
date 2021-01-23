import React, { useCallback, useEffect } from "react";
import { Redirect, Route, useHistory, useRouteMatch } from "react-router-dom";
import LogInForm from "./LogInForm";
import UserDisplay from "./UserDisplay";
import UserList from "./UserList";

interface Props {
  currentPassword: string;
  isSubmitting: boolean;
  onLogIn: () => void;
  onPasswordChange: (newPassword: string) => void;
  onUserSelect: (user: LightDMUser) => void;
  user: null | LightDMUser;
  users: LightDMUser[];
}

const Greeter: React.FC<Props> = ({
  currentPassword,
  isSubmitting,
  onPasswordChange,
  onLogIn,
  onUserSelect,
  user,
  users,
}) => {
  const history = useHistory();
  const match = useRouteMatch();

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        e.preventDefault();
        history.push("/");
      }
    },
    [history]
  );

  const handleOpenUsers = useCallback(() => {
    history.push(`${match.path}/users`);
  }, [history]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  });

  return (
    <div className="greeter">
      <div className="greeter__content">
        <Route path={`${match.path}/log-in`}>
          {user === null ? (
            <Redirect to={`${match.url}/users`} />
          ) : (
            <React.Fragment>
              <div style={{ marginBottom: "1em", marginRight: "auto" }}>
                <UserDisplay onSelect={handleOpenUsers} user={user} />
              </div>
              <LogInForm
                currentPassword={currentPassword}
                isSubmitting={isSubmitting}
                onPasswordChange={onPasswordChange}
                onSubmit={onLogIn}
              />
            </React.Fragment>
          )}
        </Route>
        <Route path={`${match.path}/users`}>
          <UserList setUser={onUserSelect} user={user} users={users} />
        </Route>
      </div>
    </div>
  );
};

export default Greeter;
