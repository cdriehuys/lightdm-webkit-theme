import { useCallback, useEffect, useState } from "react";

const useLightDM = (initialLightDM: LightDM) => {
  const [isAuthenticating, setAuthenticating] = useState(
    initialLightDM.in_authentication
  );
  const [password, setPassword] = useState("");

  const refreshFromLightDM = useCallback(() => {
    setAuthenticating(window.lightdm.in_authentication);
  }, [setAuthenticating]);

  const authenticate = useCallback(
    (username: string) => {
      window.lightdm.authenticate(username);
      refreshFromLightDM();
    },
    [refreshFromLightDM]
  );

  const cancelAuthentication = useCallback(() => {
    window.lightdm.cancel_authentication();
    refreshFromLightDM();
  }, [refreshFromLightDM]);

  const respondToPrompt = useCallback(
    (text: string) => {
      window.lightdm.respond(text);
      refreshFromLightDM();
    },
    [refreshFromLightDM]
  );

  useEffect(() => {
    window.authentication_complete = () => {
      if (window.lightdm.is_authenticated) {
        window.lightdm.start_session_sync("i3");
      } else {
        alert("Authentication failed!");
      }

      refreshFromLightDM();
    };

    return () => {
      window.authentication_complete = () => {};
    };
  }, [refreshFromLightDM]);

  useEffect(() => {
    window.autologin_timer_expired = () => {
      cancelAuthentication();
    };

    return () => {
      window.autologin_timer_expired = () => {};
    };
  }, [cancelAuthentication]);

  useEffect(() => {
    window.show_message = (text, type) => {
      alert(type.toUpperCase() + ": " + text);
    };

    return () => {
      window.show_message = () => {};
    };
  });

  useEffect(() => {
    window.show_prompt = (text, type) => {
      if (type === "password") {
        respondToPrompt(password);
      } else {
        respondToPrompt(prompt(text) || "");
      }
    };

    return () => {
      window.show_prompt = () => {};
    };
  }, [password, respondToPrompt]);

  return {
    authenticate,
    cancelAuthentication,
    isAuthenticating,
    password,
    setPassword,
  };
};

export default useLightDM;
