import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";

const SplashScreen: React.FC = ({ children }) => {
  const history = useHistory();

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (e.button === 0) {
        history.push("/greeter");
      }
    },
    [history]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Enter" || e.code === "Space") {
        e.preventDefault();
        history.push("/greeter");
      }
    },
    [history]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mouseup", handleClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mouseup", handleClick);
    };
  }, [handleKeyDown]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default SplashScreen;
