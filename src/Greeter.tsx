import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import LogInForm from "./LogInForm";

interface Props {
  currentPassword: string;
  isSubmitting: boolean;
  onLogIn: () => void;
  onPasswordChange: (newPassword: string) => void;
}

const Greeter: React.FC<Props> = ({
  currentPassword,
  isSubmitting,
  onPasswordChange,
  onLogIn,
}) => {
  const history = useHistory();

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        e.preventDefault();
        history.push("/");
      }
    },
    [history]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  });

  return (
    <div
      style={{
        backdropFilter: "blur(10px)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <LogInForm
        currentPassword={currentPassword}
        isSubmitting={isSubmitting}
        onPasswordChange={onPasswordChange}
        onSubmit={onLogIn}
      />
    </div>
  );
};

export default Greeter;
