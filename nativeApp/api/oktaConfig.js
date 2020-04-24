import { CLIENT_ID, REDIRECT_URI } from "react-native-dotenv";
export default {
  clientId: CLIENT_ID,
  // For usage in bare and standalone
  redirectUri: REDIRECT_URI,
  scopes: ["openid", "profile"],
};
