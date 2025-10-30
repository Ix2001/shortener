import Keycloak, { type KeycloakOnLoad } from 'keycloak-js'
import { setToken } from './api'

type InitialOptionsKeyCloack = {
  url: string
  realm: string
  clientId: string
  onLoad: KeycloakOnLoad
}

const initOptions: InitialOptionsKeyCloack = {
  url: "https://auth.dev.hr.alabuga.space/",
  realm: 'Alabuga',
  clientId: 'alb-url-shortener',
  onLoad: 'login-required',
}



const keycloak = new Keycloak(initOptions);

type TypeCalBack = () => void;

const setTokensToLS = () => {
  const token = keycloak.token ?? "";
  const refreshToken = keycloak.refreshToken ?? "";

  localStorage.setItem("access_token", token);
  localStorage.setItem("refresh_token", refreshToken);
  // also wire axios default header
  setToken(token || null);
};

export const keycloakAuth = (callBack: TypeCalBack) => {
  keycloak
      .init({
        onLoad: initOptions.onLoad as KeycloakOnLoad,
        pkceMethod: 'S256',
        checkLoginIframe: true,

      })
      .then((auth: boolean) => {
        console.log("auth", auth)
        if (!auth) {
          setTimeout(() => {
            window.location.href = "https://auth.dev.hr.alabuga.space/";
          });
        } else {
          setTokensToLS();

          if (keycloak.tokenParsed) {
            const tokenParsed = keycloak.tokenParsed.sub ?? "";
            localStorage.setItem("user_uid", tokenParsed);
          }

          let alreadyStartApp = false;

          const checkRefresh = () => {
            keycloak
                .updateToken(70)
                .then((refreshed: boolean) => {
                  if (refreshed) {
                    if (localStorage.getItem('access_token')) {
                      setTokensToLS();
                    }
                    if (keycloak.tokenParsed) {
                      const tokenParsed = keycloak.tokenParsed.sub ?? "";
                      localStorage.setItem("user_uid", tokenParsed);
                    }
                  } else {
                    // even if not refreshed, ensure axios has the latest token
                    setToken(keycloak.token || null);
                  }
                  if (!alreadyStartApp) {
                    callBack();
                    alreadyStartApp = true;
                  }
                })
                .catch(() => {
                  setToken(null);
                  if (!alreadyStartApp) {
                    callBack();
                    alreadyStartApp = true;
                  }
                });
          };

          if (!alreadyStartApp) {
            callBack();
            alreadyStartApp = true;
          }

          setInterval(() => {
            checkRefresh();
          }, 10000);
        }
      })
      .catch(() => {
        // startApp()
      });
};

export const onLogOutKeycloak = () => {
  keycloak.logout();
};


