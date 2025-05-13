import CText from "@/components/TextComp";
import { Image } from "expo-image";
import { ScrollView, View } from "react-native";
import RNSpeedometer from 'react-native-speedometer';


/**
  * What should be done here
 Dashboard Page
  */
function Dashboard() {

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
                        <Image source={require('@/assets/cars/side.png')} style={{ width: '100%', height: '100%' }} />
                    </View>
                </View>

                <View className="w-full flex justify-end items-end h-[250px]">
                    <Image
                        source={require('@/assets/cars/front.png')} style={{ width: "100%", height: "100%" }}
                        contentFit="contain"
                    />
                </View>

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

                <ScrollView

                >
                    <View className="w-full mb-3 overflow-hidden h-[100px] left-0 rounded-2xl bg-accent ">
                        <View className="absolute">

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
                                value={200} size={200} />
                        </View>

                        <View className="absolute right-10 bottom-0">
                            <CText style={{ fontFamily: 'bold' }} className="text-[1.5rem]" textColor="text-buttons">Speed</CText>
                            <CText className="text-[20px]">72.14 km/h</CText>
                        </View>
                    </View>

                    <View className="flex mb-3 flex-row justify-center items-stretch gap-x-2">
                        <View className="w-fit bg-accent rounded-2xl p-3 flex justify-center items-center">
                            <CText style={{ fontFamily: 'bold' }} className="text-[1.5rem]" textColor="text-buttons">Fuel Level</CText>
                            {/* <CText className="text-[20px]">61.8%</CText> */}

                            {/* <CText className="text-[20px]">72.14 km/h</CText> */}

                            <View className="rounded-xl p-2 flex justify-center items-center">
                                <View className="h-[150px] w-[100px] bg-accent2 rounded-2xl overflow-hidden">
                                    <View
                                        className="w-full bottom-0 absolute rounded-2xl"
                                        style={{
                                            height: `61%`,
                                            backgroundColor: 61 > 20 ? '#2eeb44' : '#ff3b30', // red if low
                                        }}
                                    />
                                </View>
                                <CText className="text-right mt-1 text-[1.5rem] font-medium">{61}%</CText>
                            </View>
                        </View>

                        <View className="flex flex-col flex-1 justify-center items-start gap-y-2">
                            <View className="h-[100px] w-full bg-accent rounded-2xl p-3 gap-y-3">
                                <CText style={{ fontFamily: 'bold' }} className="text-[1.5rem]" textColor="text-buttons">Engine RPM</CText>
                                <CText className="text-[20px]">2671 rpm</CText>
                            </View>

                            <View className="h-[100px] flex flex-row justify-between items-start relative w-full bg-accent rounded-2xl p-3 gap-y-3">
                                <View>
                                    <CText style={{ fontFamily: 'bold' }} className="text-[1.5rem]" textColor="text-buttons">Engine Temp</CText>
                                    <CText className="text-[20px]">74.6°C</CText>
                                </View>


                                <View className="h-50 w-[30px]">
                                    <Image source={require('@/assets/cars/temp.png')} style={{ width: '100%', height: '100%' }} />
                                </View>
                            </View>

                        </View>

                    </View>

                    <View className="h-[100px] w-5/12 bg-accent rounded-2xl p-3 gap-y-3">
                        <CText style={{ fontFamily: 'bold' }} className="text-[2rem]" textColor="text-buttons">Fuel Level</CText>
                        <CText className="text-[20px]">61.8%</CText>
                    </View>

                </ScrollView>


            </View >


        </View >
    );
}

export default Dashboard

