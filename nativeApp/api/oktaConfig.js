import * as AuthSession from "expo-auth-session";
import { CLIENT_ID, REDIRECT_URI } from "react-native-dotenv";
export default {
  clientId: CLIENT_ID,
  // For usage in managed apps using the proxy
  redirectUri: AuthSession.getRedirectUrl(),
  scopes: ["openid", "profile"],
};
