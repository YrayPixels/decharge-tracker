import { para } from "@/client/para";
import { KeyboardProvider } from "@/utils/context/KeyboardContext";
import { ThemeProvider } from "@/utils/context/ThemeContext";
import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold, useFonts } from "@expo-google-fonts/dm-sans";
import { SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import '../global.css';
import StackView from "./stack";


SplashScreen.preventAutoHideAsync(); // Prevent auto-hide

export default function RootLayout() {

  const [appReady, setAppReady] = useState(false);

  const [loaded, error] = useFonts({
    reg: DMSans_400Regular,
    md: DMSans_500Medium,
    bold: DMSans_700Bold,
  });

  useEffect(() => {
    const initPara = async () => {
      await para.init();
    };

    initPara();
  }, []);


  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading delay
      } catch (e) {
        console.warn(e);
      } finally {
        if (loaded) {
          setAppReady(true);
          SplashScreen.hideAsync(); // Hide splash screen once everything is ready
        }
      }
    }
    prepare();
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }


  if (!appReady) {
    return (
      <View className='bg-white' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        {/* <Image source={require('@/assets/images/splaash.gif')}
          style={{ height: 100, width: 100 }}
          contentFit="contain"
        /> */}
      </View>
    );
  }

  return (
    <KeyboardProvider>
      <ThemeProvider>


        <SafeAreaView style={{ flex: 1 }}>
          <StackView />
        </SafeAreaView>
      </ThemeProvider>
    </KeyboardProvider>


  )
}
