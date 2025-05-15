
// screens/LeaderboardScreen.js
import CText from '@/components/TextComp';
import IconLibrary from '@/utils/context/icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StatusBar, View } from 'react-native';


const users = [
    { name: 'Liam', points: 1583 },
    { name: 'Zara', points: 2471 },
    { name: 'Kai', points: 3087 },
    { name: 'Nina', points: 4392 },
    { name: 'Ezra', points: 5344 },
    { name: 'Mila', points: 6189 },
    { name: 'Jude', points: 7412 },
    { name: 'Ivy', points: 8577 },
    { name: 'Noah', points: 9325 },
    { name: 'Tess', points: 10438 },
    { name: 'Omar', points: 11320 },
    { name: 'Luna', points: 12467 }
];

function sortUsersByPointsDescending(users: { name: string, points: number }[]) {
    return [...users].sort((a, b) => b.points - a.points);
}

function getOrdinal(n: number) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
export default function LeaderboardScreen() {
    return (
        <View className="bg-buttons  h-full">
            <StatusBar barStyle="light-content" backgroundColor="#03a582" />

            <View className="w-full px-4 py-4 flex flex-row justify-start items-center gap-x-2">
                <Pressable onPress={() => router.back()} className="p-3 rounded-full bg-white dark:bg-accent">
                    <IconLibrary.back />
                </Pressable>


            </View>


            <ScrollView className="w-full flex-1 px-5 py-5 bg-white dark:bg-accent rounded-t-3xl">

                <CText style={{ fontFamily: 'bold' }} textColor="text-buttons" className="text-[2.5rem] text-center">Leaderboard</CText>
                <View className="flex flex-row justify-center items-center gap-x-2">
                    {sortUsersByPointsDescending(users).slice(0, 3).map((user, index) => (

                        <View key={index} className="flex flex-col justify-start  items-center">
                            <View className={`${index === 1 ? 'w-40 h-40' : 'w-20 h-20'} bg-white dark:bg-accent rounded-full overflow-hidden`}>
                                <Image source={require('@/assets/images/avatar.jpeg')} style={{ width: '100%', height: '100%' }} />
                            </View>
                            <CText style={{ fontFamily: 'bold' }} textColor="text-buttons" className="text-[1rem] text-center">{user.name}</CText>
                        </View>
                    ))}
                </View>

                <View className="gap-y-2 w-full">
                    {sortUsersByPointsDescending(users).slice(3).map((user, index) => (
                        <View key={index} className="flex-row bg-white dark:bg-accent2  shadow  justify-between items-center rounded-xl pe-5">
                            <View className='flex-row justify-start items-center gap-x-2'>
                                <View className='bg-buttons rounded-xl p-4'>
                                    <CText className="text-lg">{getOrdinal(index + 3)}</CText>
                                </View>

                                <CText className="text-lg">{user.name}</CText>
                            </View>


                            <CText className="text-lg font-semibold">{user.points} pts</CText>
                        </View>
                    ))}
                </View>

            </ScrollView>


        </View>
    );
}
