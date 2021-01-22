import { faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback } from "react";

interface Props {
  currentPassword: string;
  isSubmitting: boolean;
  onPasswordChange: (newPassword: string) => void;
  onSubmit: () => void;
}

const LogInForm: React.FC<Props> = ({
  currentPassword,
  isSubmitting,
  onPasswordChange,
  onSubmit,
}) => {
  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onPasswordChange(e.target.value),
    [onPasswordChange]
  );
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      onSubmit();
    },
    [onSubmit]
  );

  return (
    <div
      style={{
        background: "rgba(0, 0, 0, .5)",
        color: "#efefef",
        fontFamily: "Lato",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "30rem",
        padding: "4rem",
      }}
    >
      <form onSubmit={handleSubmit}>
        <label className="password-label" htmlFor="password">
          Password
        </label>
        <div className="password">
          <input
            autoFocus={true}
            className="password-input"
            disabled={isSubmitting}
            id="password"
            name="password"
            onChange={handlePasswordChange}
            type="password"
            value={currentPassword}
          />
          <button
            className="log-in-button"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <FontAwesomeIcon icon={faSpinner} size="2x" spin={true} />
            ) : (
              <FontAwesomeIcon icon={faArrowRight} size="2x" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogInForm;
