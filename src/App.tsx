import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter, HashRouter, Route } from "react-router-dom";
import Background from "./Background";
import Clock from "./Clock";
import Greeter from "./Greeter";
import SplashScreen from "./SplashScreen";
import useLightDM from "./useLightDM";

interface Props {
  initialLightDM: LightDM;
}

const App: React.FC<Props> = ({ initialLightDM }) => {
  const lightDM = useLightDM(initialLightDM);

  const handleLogIn = useCallback(() => {
    lightDM.authenticate("chathan");
  }, [lightDM]);

  return (
    <HashRouter>
      <Background source="some/dummy/image">
        <Route exact path="/">
          <SplashScreen>
            <Clock />
          </SplashScreen>
        </Route>
        <Route path="/greeter">
          <Greeter
            currentPassword={lightDM.password}
            isSubmitting={lightDM.isAuthenticating}
            onLogIn={handleLogIn}
            onPasswordChange={lightDM.setPassword}
          />
        </Route>
      </Background>
    </HashRouter>
  );
};

export default App;
