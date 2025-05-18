import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();
//setTimeout(SplashScreen.hideAsync, 1000);

export default function RootLayout() {
  useEffect(() => {
    const prepare = async () => {
      // await any async loading here (fonts, data)
      await SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
