import CText from '@/components/TextComp';
import IconLibrary from '@/utils/context/icons';
import AppSettings from '@/utils/store/settingsstore';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StatusBar, Switch, View } from 'react-native';

export default function SettingsScreen() {
    const { dataShare, setDataShare } = AppSettings()


    const handleDataShare = (key: keyof typeof dataShare, value: boolean) => {
        setDataShare({ ...dataShare, [key]: value })
    }



    return (
        <View className="bg-buttons h-full">
            <StatusBar barStyle="light-content" backgroundColor="#03a582" />

            <View className="w-full px-4 py-4 flex flex-row justify-start items-center gap-x-2">
                <Pressable onPress={() => router.back()} className="p-3 rounded-full bg-white dark:bg-accent">
                    <IconLibrary.back />
                </Pressable>
            </View>

            <ScrollView className="w-full flex-1 px-5 py-5 bg-white dark:bg-accent rounded-t-3xl">
                <CText style={{ fontFamily: 'bold' }} textColor="text-buttons" className="text-[2.5rem] text-center mb-6">Data Sharing</CText>

                <View className="gap-y-2 w-full">
                    <SettingItem label="Share Speed" value={dataShare.speed} onValueChange={() => handleDataShare('speed', !dataShare.speed)} />
                    <SettingItem label="Share RPM" value={dataShare.rpm} onValueChange={() => handleDataShare('rpm', !dataShare.rpm)} />
                    <SettingItem label="Share Fuel Level" value={dataShare.fuel} onValueChange={() => handleDataShare('fuel', !dataShare.fuel)} />
                    <SettingItem label="Share Engine Temp" value={dataShare.temp} onValueChange={() => handleDataShare('temp', !dataShare.temp)} />
                    <SettingItem label="Share Location" value={dataShare.location} onValueChange={() => handleDataShare('location', !dataShare.location)} />
                </View>
            </ScrollView>
        </View>
    );
}

function SettingItem({ label, value, onValueChange }: { label: string, value: boolean, onValueChange: (value: boolean) => void }) {
    return (
        <View className="flex-row bg-white dark:bg-accent2 shadow justify-between items-center rounded-xl p-4 mb-2">
            <CText className="text-lg">{label}</CText>
            <Switch value={value} onValueChange={onValueChange} />
        </View>
    );
}