import { useCallback, useEffect, useState } from "react";

const findDefaultUser = (lightDM: LightDM): null | LightDMUser => {
  const defaultUsername = lightDM.select_user;
  if (!defaultUsername) {
    return null;
  }

  const user = lightDM.users.find((u) => u.username === defaultUsername);
  if (!user) {
    return null;
  }

  return user;
};

const useLightDM = (initialLightDM: LightDM) => {
  const [isAuthenticating, setAuthenticating] = useState(
    initialLightDM.in_authentication
  );
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(findDefaultUser(initialLightDM));
  const [users, setUsers] = useState(initialLightDM.users);

  const refreshFromLightDM = useCallback(() => {
    setAuthenticating(window.lightdm.in_authentication);
    setUsers(window.lightdm.users);
  }, [setAuthenticating]);

  const authenticate = useCallback(() => {
    if (user !== null) {
      window.lightdm.authenticate(user.username);
      refreshFromLightDM();
    }
  }, [refreshFromLightDM, user]);

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
    setUser,
    user,
    users,
  };
};

export default useLightDM;
