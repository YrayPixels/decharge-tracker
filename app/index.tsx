import Buttons from "@/components/ButtonComp";
import CText from "@/components/TextComp";
import { delay } from "@/utils/miscfunctions.ts";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, View } from "react-native";


const screens = [
  {
    title: "Earn from Your Drive",
    subtitle: "Share your car's data securely and get rewarded in real time. Every mile counts on DeCharge.",
    image: require("@/assets/splash/speedcar.jpg")

  },
  {
    title: "The Marketplace for Smart Cars",
    subtitle: "Buy, sell, or trade valuable vehicle insights. From diagnostics to driving behavior—data is the new fuel.",
    image: require("@/assets/splash/cardash.jpeg")

  },
  {
    title: "Bounties Built for Drivers",
    subtitle: "Complete challenges, verify insights, and earn crypto. Whether you're a driver, dev, or data geek—there's a bounty for you.",
    image: require("@/assets/images/icon.png")

  }
];
const { width, height } = Dimensions.get('window');



export default function Index() {

  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);



  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };


  useEffect(() => {

    delay(1500)

    router.replace('/dashboard')

  }, [])


  return (
    <View
      // onLayout={onLayoutRootView}
      className="relative bg-white dark:bg-dark flex-1"
    >
      <View className="absolute top-10   z-50 flex-row self-center">
        {screens.map((_, index) => (
          <Pressable
            onPress={() => {
              scrollRef.current?.scrollTo({ x: width * index });
            }}
            key={index}
            className={`h-2 w-2 mx-1 rounded-3xl ${currentIndex === index ? 'bg-buttons w-6' : 'bg-gray-400'}`}
          />
        ))}
      </View>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className=""
      >

        {screens.map((screen, index) => (



          <ImageBackground
            source={screen.image}
            contentFit="cover"
            contentPosition="center"

            key={index} style={{ width, height }} className="items-center justify-start gap-y-3 relative">

            <View className="px-6 bg-dark/90  flex-1 justify-center items-start">
              <CText style={{ fontFamily: 'bold' }} className="text-[4rem]  text-start  text-primary dark:text-white">{screen.title}</CText>
              <View className="w-[50%] h-1 bg-buttons"></View>
              <CText style={{ fontFamily: 'bold' }} className="text-[2.5rem] mt-2 text-gray-600 dark:text-buttons text-start">{screen.subtitle}</CText>
            </View>

            <View className="px-3 w-full absolute h-fit bottom-14 left-0">
              <Buttons
                className=""
                text="Next"
                // textClass="text-[#000000]"
                onPress={() => {
                  if (currentIndex >= 2) {
                    // markOpened();
                    router.replace('/auth/login')
                  }
                  scrollRef.current?.scrollTo({ x: width * (currentIndex + 1) });
                }}
              />
            </View>

          </ImageBackground>

        ))}
      </ScrollView>
    </View>
  )
}
