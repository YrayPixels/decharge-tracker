import CText from '@/components/TextComp';
import IconLibrary from '@/utils/context/icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StatusBar, View } from 'react-native';

export default function RulesScreen() {
    return (
        <View className="bg-buttons h-full">
            <StatusBar barStyle="light-content" backgroundColor="#03a582" />

            <View className="w-full px-4 py-4 flex flex-row justify-start items-center gap-x-2">
                <Pressable onPress={() => router.back()} className="p-3 rounded-full bg-white dark:bg-accent">
                    <IconLibrary.back />
                </Pressable>
            </View>

            <ScrollView className="w-full flex-1 px-5 py-5 bg-white dark:bg-accent rounded-t-3xl">
                <CText style={{ fontFamily: 'bold' }} textColor="text-buttons" className="text-[2.5rem] text-center mb-6">Earning Rules</CText>

                <View className="gap-y-2 w-full">
                    <RuleItem text="Drive under 60 kmph" points="+5" positive={true} />
                    <RuleItem text="Over 100 kmph" points="-5" positive={false} />
                    <RuleItem text="Optimal RPM (1000–3000)" points="+3" positive={true} />
                    <RuleItem text="Overrev (over 4000 RPM)" points="-3" positive={false} />
                    <RuleItem text="Healthy engine temp (less than 100°C)" points="+1" positive={true} />
                    <RuleItem text="Overheating (greater than 100°C)" points="-3" positive={false} />
                    <RuleItem text="No DTC Code" points="+2" positive={true} />
                    <RuleItem text="Fault Code present" points="-10" positive={false} />
                </View>
            </ScrollView>
        </View>
    );
}

function RuleItem({ text, points, positive }: { text: string, points: string, positive: boolean }) {
    return (
        <View className="flex-row bg-white dark:bg-accent2 shadow justify-between items-center rounded-xl p-4 mb-2">
            <CText className="text-lg flex-1">{text}</CText>
            <CText className={`text-lg font-semibold ${positive ? 'text-green-600' : 'text-red-600'}`}>
                {points} pts
            </CText>
        </View>
    );
}