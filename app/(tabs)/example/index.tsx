import { supabase } from "@/hooks/supabase";
import { Platform, View } from "react-native";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "@rneui/themed/dist/Button";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import { useRecoilState } from "recoil";
import { userid } from "@/atoms/userState";

const redirectTo = makeRedirectUri();
WebBrowser.maybeCompleteAuthSession();
export default function App() {
  const [useridState, setUseridState] = useRecoilState(userid);

  const Updatetoken = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ username: "aaaa" })
      .eq("id", useridState);
    if (error) {
      console.log(error);
    } else {
      console.log("success");
    }
  };
  const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);

    if (errorCode) throw new Error(errorCode);
    const { access_token, refresh_token } = params;

    if (!access_token) return;

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (error) throw error;
    setUseridState(data.user?.id ?? "");
    setItem("access_token", data.session?.access_token ?? "");
    setItem("refresh_token", data.session?.refresh_token ?? "");
    return data.session;
  };
  async function setItem(key: string, value: string) {
    if (Platform.OS === "web") {
      return localStorage.setItem(key, value);
    }
    AsyncStorage.setItem(key, value);
  }

  const performOAuth = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });
    if (error) throw error;

    const res = await WebBrowser.openAuthSessionAsync(
      data?.url ?? "",
      redirectTo
    );

    if (res.type === "success") {
      const { url } = res;
      await createSessionFromUrl(url);
    }
  };

  const url = Linking.useURL();
  if (url) createSessionFromUrl(url);
  return (
    <View>
      <Button onPress={performOAuth}>Sign in with Kakao</Button>
      {/* <Button onPress={signOut}>Sign out</Button> */}
      <Button onPress={() => Updatetoken()} title="Update" />
    </View>
  );
}
