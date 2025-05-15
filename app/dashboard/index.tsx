import FuelBar from "@/components/AnimatedBattery";
import MapBox from "@/components/MapBox";
import CText from "@/components/TextComp";
import { obdData } from "@/synthetic_obd_data_24h";
import IconLibrary from "@/utils/context/icons";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import RNSpeedometer from 'react-native-speedometer';

{/* 
 {
    "timestamp": "2025-05-01T09:00:00Z",
    "vehicle_id": "CAR001",
    "speed_kmph": 72.14,
    "engine_rpm": 2671,
    "fuel_level_pct": 61.8,
    "engine_temp_c": 74.6,
    "lat": 12.976136,
    "lon": 77.595407,
    "dtc_code": ""
  },
*/}


/**
  * What should be done here
 Dashboard Page
  */
function Dashboard() {

    const [activeData, setActiveData] = useState<any>(null)
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
                    const delayMs = next - current; // difference in milliseconds
                    await wait(5000);
                }
            }
        }
        // Usage:
        pingBasedOnTimestamps(obdData, (data: any) => {
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

                    <View className="w-10 h-10 rounded-full bg-white overflow-hidden" >
                        <Image source={require('@/assets/images/avatar.jpeg')}
                            contentFit="cover"
                            style={{ width: '100%', height: '100%' }} />
                    </View>
                </View>

                <View className="w-full flex flex-row justify-end items-end h-[250px]">
                    <Image
                        source={require('@/assets/cars/front.png')} style={{ width: "100%", height: "100%" }}
                        contentFit="contain"
                    />

                    <Image
                        source={require('@/assets/cars/side.png')} style={{ width: "100%", height: "100%" }}
                        contentFit="contain"
                    />
                </View>


                <ScrollView

                >
                    <View className="w-full mb-3 overflow-hidden left-0 rounded-2xl bg-accent ">
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
                        <View className="w-fit bg-accent rounded-2xl p-3 flex justify-center items-center">
                            <CText style={{ fontFamily: 'bold' }} className="text-[1.5rem]" textColor="text-buttons">Fuel Level</CText>
                            <View className="rounded-xl p-2 flex justify-center items-center">
                                <FuelBar fuelLevelPct={activeData?.fuel_level_pct} />
                                <CText className="text-right mt-1 text-[1.5rem] font-medium">{activeData?.fuel_level_pct}%</CText>
                            </View>
                        </View>

                        <View className="flex flex-col flex-1 justify-center items-start gap-y-2">
                            <View className="h-[100px] overflow-hidden  w-full bg-accent rounded-2xl p-3 gap-y-3">
                                <View className="w-[100%] h-[100%] absolute bottom-5 -right-20">
                                    <Image
                                        source={require('@/assets/images/rpm.png')} style={{ width: "100%", height: "100%" }}
                                        contentFit="contain"
                                    />
                                </View>
                                <CText style={{ fontFamily: 'bold' }} className="text-[1.5rem]" textColor="text-buttons">RPM</CText>
                                <CText className="text-[20px]">{activeData?.engine_rpm} rpm</CText>


                            </View>

                            <View className="h-[100px] flex flex-row justify-between items-start relative w-full bg-accent rounded-2xl p-3 gap-y-3">
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
                        className=" h-[100px] w-full bg-accent rounded-2xl gap-y-3 overflow-hidden">

                        <Image source={require('@/assets/images/map.jpeg')} style={{ width: '100%', height: '100%' }} />

                        <View
                            className="h-full border z-10 absolute bg-black/80 w-full p-3 gap-y-3 flex flex-row justify-between items-center">
                            <View>
                                <CText style={{ fontFamily: 'bold' }} className="text-[2rem]" textColor="text-buttons">Track Route</CText>
                                <CText className="text-[20px]">Click to open map</CText>
                            </View>

                            <View className="w-10 h-10 bg-black rounded-full flex justify-center items-center">
                                <IconLibrary.angle_right />
                            </View>
                        </View>

                    </Pressable>

                </ScrollView>

                <MapBox mapdata={activeData} />

            </View >


        </View >
    );
}

export default Dashboard

