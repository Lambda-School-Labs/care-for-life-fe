import * as AuthSession from "expo-auth-session";
import { CLIENT_ID } from "react-native-dotenv";

export default {
  clientId: CLIENT_ID,
  redirectUri: AuthSession.makeRedirectUri({
    native: "com.okta.dev-815303:/callback",
    useProxy: true,
  }),
  scopes: ["openid", "profile"],
  responseType: "token id_token",
  extraParams: {
    nonce: Math.random().toString(36).substring(7),
  },
};
