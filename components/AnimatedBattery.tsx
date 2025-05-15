import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
const FuelBar = ({ fuelLevelPct }: { fuelLevelPct: number }) => {
    const animatedHeight = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedHeight, {
            toValue: fuelLevelPct,
            duration: 500, // smooth animation duration
            useNativeDriver: false, // height needs layout updates
        }).start();
    }, [fuelLevelPct, animatedHeight]);

    const backgroundColor = fuelLevelPct >= 50 ? '#2eeb44' : fuelLevelPct > 30 ? '#F1960F' : '#ff3b30';

    return (
        <View className="h-[120px] w-[90px] bg-accent2 rounded-2xl overflow-hidden justify-end">
            <Animated.View
                className="w-full rounded-2xl"
                style={{
                    height: animatedHeight.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                    }),
                    backgroundColor,
                }}
            />
        </View>
    );
};

export default FuelBar;
