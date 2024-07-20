import { useState, useEffect } from "react";
import { supabase } from "@/hooks/supabase";
import { View } from "react-native";
import { Session } from "@supabase/supabase-js";
import { Button } from "@rneui/themed/dist/Button";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  async function signInWithKakao() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
    });
    setId(data.url);
  }
  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }
  return (
    <View>
      <Button onPress={signInWithKakao}>Sign in with Kakao</Button>
      <Button onPress={signOut}>Sign out</Button>
    </View>
  );
}
