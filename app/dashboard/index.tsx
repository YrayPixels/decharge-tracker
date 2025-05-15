import FuelBar from "@/components/AnimatedBattery";
import AnimatedPoint from "@/components/AnimatedPoints";

import { Base } from "@/components/Navigation/Base";
import CText from "@/components/TextComp";
import { obdData } from "@/synthetic_obd_data_24h";
import IconLibrary from "@/utils/context/icons";
import { calculateEarnings } from "@/utils/miscfunctions.ts/earnings";
import AppSettings from "@/utils/store/settingsstore";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Pressable, ScrollView, View } from "react-native";
//@ts-ignore
import RNSpeedometer from 'react-native-speedometer';


/**
  * What should be done here
    Dashboard Page
  */
function Dashboard() {
    const { points, updatePoints } = AppSettings()
    const [activeData, setActiveData] = useState<any>(null)
    const [pendingAnimations, setPendingAnimations] = useState<{ points: number; id: number }[]>([])
    const carRef = useRef<View>(null);
    const pointsRef = useRef<View>(null);
    const animationIdCounter = useRef(0);

    const handlePointsEarned = (pointsEarned: number) => {
        animationIdCounter.current += 1;
        setPendingAnimations(prev => [...prev, { points: pointsEarned, id: animationIdCounter.current }]);
    };

    const removeAnimation = (id: number) => {
        setPendingAnimations(prev => prev.filter(anim => anim.id !== id));
    };

    useEffect(() => {
        function wait(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function pingBasedOnTimestamps(dataArray: any, callback: any) {
            for (let i = 0; i < dataArray.length; i++) {
                callback(dataArray[i]);

                const current = new Date(dataArray[i].timestamp) as any;
                const next = dataArray[i + 1] ? new Date(dataArray[i + 1].timestamp) : null as any;

                if (next) {
                    const delayMs = next - current;
                    await wait(5000);
                }
            }
        }

        pingBasedOnTimestamps(obdData, (data: any) => {
            const earnings = calculateEarnings(data)
            updatePoints(earnings.pointsEarned)
            handlePointsEarned(earnings.pointsEarned)
            setActiveData(data)
        });
    }, [])

    return (
        <View
            className="relative bg-grey dark:bg-dark h-full w-100 flex justify-start items-center"
        >
            <View className="py-5 w-full px-4  flex-col justify-start ">
                <View className="flex flex-row justify-between items-center">
                    <View>
                        <CText className="text-[20px]" style={{ fontFamily: 'bold' }}>Tesla Captain Electro</CText>
                    </View>
                    <View ref={pointsRef} className="flex flex-row justify-between items-center gap-x-2" >
                        <CText className="text-[20px]" style={{ fontFamily: 'bold' }}>
                            {points} DE
                        </CText>
                        <View className="w-10 h-10 rounded-full bg-white overflow-hidden" >
                            <Image source={require('@/assets/images/avatar.jpeg')}
                                contentFit="cover"
                                style={{ width: '100%', height: '100%' }} />
                        </View>
                    </View>

                </View>

                <View ref={carRef} className="w-full flex flex-row justify-end items-end h-[250px]">
                    <Image
                        source={require('@/assets/cars/front.png')} style={{ width: "100%", height: "100%" }}
                        contentFit="contain"
                    />

                    <Image
                        source={require('@/assets/cars/side.png')} style={{ width: "100%", height: "100%" }}
                        contentFit="contain"
                    />
                </View>

                {pendingAnimations.map(({ points: earnedPoints, id }) => (
                    <AnimatedPoint

                        key={id}
                        points={earnedPoints}
                        startPosition={{ x: Dimensions.get('window').width / 2, y: 250 }}
                        endPosition={{ x: Dimensions.get('window').width - 100, y: 20 }}
                        onComplete={() => removeAnimation(id)}
                    />
                ))}

                <ScrollView

                >
                    <View className="w-full mb-3 overflow-hidden left-0 rounded-2xl bg-white shadow dark:bg-accent ">
                        <RNSpeedometer innerCycleStyle={{
                            backgroundColor: 'black',
                        }}
                            labelStyle={{
                                display: 'none',
                            }}
                            labelNoteStyle={{
                                display: 'none',
                            }}
                            minValue={0}
                            maxValue={200}
                            value={activeData?.speed_kmph} size={200} />

                        <View className="flex flex-row justify-center items-end">
                            <CText style={{ fontFamily: 'bold' }} className="text-[2rem]">{activeData?.speed_kmph} km/h</CText>
                        </View>
                    </View>

                    <View className="flex mb-3 flex-row justify-center items-stretch gap-x-2">
                        <View className="w-fit bg-white shadow dark:bg-accent rounded-2xl p-3 flex justify-center items-center">
                            <CText style={{ fontFamily: 'bold' }} className="text-[1.5rem]" textColor="text-buttons">Fuel Level</CText>
                            <View className="rounded-xl p-2 flex justify-center items-center">
                                <FuelBar fuelLevelPct={activeData?.fuel_level_pct} />
                                <CText className="text-right mt-1 text-[1.5rem] font-medium">{activeData?.fuel_level_pct}%</CText>
                            </View>
                        </View>

                        <View className="flex flex-col flex-1 justify-center items-start gap-y-2">
                            <View className="h-[100px] overflow-hidden  w-full bg-white shadow dark:bg-accent rounded-2xl p-3 gap-y-3">
                                <View className="w-[100%] h-[100%] absolute bottom-5 -right-20">
                                    <Image
                                        source={require('@/assets/images/rpm.png')} style={{ width: "100%", height: "100%" }}
                                        contentFit="contain"
                                    />
                                </View>
                                <CText style={{ fontFamily: 'bold' }} className="text-[1.5rem]" textColor="text-buttons">RPM</CText>
                                <CText className="text-[20px]">{activeData?.engine_rpm} rpm</CText>


                            </View>

                            <View className="h-[100px] flex flex-row justify-between items-start relative w-full bg-white shadow dark:bg-accent rounded-2xl p-3 gap-y-3">
                                <View>
                                    <CText style={{ fontFamily: 'bold' }} className="text-[1.5rem]" textColor="text-buttons">Temperature</CText>
                                    <CText className="text-[20px]">{activeData?.engine_temp_c}°F</CText>
                                </View>


                                <View className="h-50 w-[40px]">
                                    {activeData?.engine_temp_c >= 86 ?
                                        <Image source={require('@/assets/images/red.png')} style={{ width: '100%', height: '100%' }} />
                                        :
                                        <Image source={require('@/assets/images/blue.png')} style={{ width: '100%', height: '100%' }} />
                                    }
                                </View>
                            </View>

                        </View>

                    </View>

                    <Pressable
                        onPress={() => { }}
                        className=" h-[100px] w-full dark:bg-accent bg-white shadow rounded-2xl gap-y-3 overflow-hidden relative">
                        <View className="overflow-hidden rounded-2xl" >
                            <Image source={require('@/assets/images/map.jpeg')} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                        </View>


                        <View
                            className="h-full z-10 absolute bg-black/20 dark:bg-black/80 w-full p-3 gap-y-3 flex flex-row justify-between items-center">
                            <View>
                                <CText style={{ fontFamily: 'bold' }} className="text-[2rem]" textColor="text-buttons">Track Route</CText>
                                <CText style={{ fontFamily: 'bold' }} className="text-[20px]" textColor="text-white">Click to open map</CText>
                            </View>

                            <View className="w-10 h-10 bg-white dark:bg-black rounded-full flex justify-center items-center">
                                <IconLibrary.angle_right />
                            </View>
                        </View>

                    </Pressable>

                </ScrollView>


                <Base />

            </View >


        </View >
    );
}

export default Dashboard

