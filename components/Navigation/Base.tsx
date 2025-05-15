


import IconLibrary from '@/utils/context/icons'
import { router } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'


export const Base = () => {
  return (
    <View className="absolute w-screen flex flex-row justify-center items-center bottom-0 px-2">

      <View className="w-fit gap-x-4 bg-[#E1E1E1]/60 dark:bg-accent2 p-2 h-[75] rounded-full flex flex-row justify-between items-center ">


        <TouchableOpacity onPress={() => router.push('/dashboard')} className="h-[56] w-[56] border bg-[#666666] dark:bg-accent border-white dark:border-dark flex items-center justify-center rounded-full">
          <IconLibrary.home />
          {/* <Ionicons name="color-palette-outline" size={24} color="white" /> */}

        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/rules')} className="h-[56] w-[56] flex items-center justify-center rounded-full">
          <IconLibrary.notebook />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/leaderboard')} className="h-[56] w-[56] flex items-center justify-center rounded-full">
          <IconLibrary.people />

        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/settings')} className="h-[56] w-[56] flex items-center justify-center rounded-full">
          <IconLibrary.settings />

        </TouchableOpacity>

      </View>
    </View>

  )
}
