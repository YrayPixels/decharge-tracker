// DriveSimulator.js
import React, { useEffect, useRef, useState } from 'react';
import { Easing, StyleSheet, Text, View } from 'react-native';
import MapView, { AnimatedRegion, Marker, Polyline } from 'react-native-maps';

// Simulated route (polyline)
const route = [
    { latitude: 37.78825, longitude: -122.4324 },
    { latitude: 37.78925, longitude: -122.4334 },
    { latitude: 37.79025, longitude: -122.4344 },
    { latitude: 37.79125, longitude: -122.4354 },
];

const getRandom = (min: any, max: any) => Math.floor(Math.random() * (max - min + 1)) + min;

const DriveSimulator = () => {
    const [telemetry, setTelemetry] = useState({ speed: 0, rpm: 0, emissions: 0 });
    const [reward, setReward] = useState(0);
    const [index, setIndex] = useState(0);
    const carPosition = useRef(new AnimatedRegion(route[0])).current;

    useEffect(() => {
        const interval = setInterval(() => {
            if (index < route.length - 1) {
                const nextCoord = route[index + 1];


                carPosition.timing({
                    ...nextCoord,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }).start();

                const newTelemetry = {
                    speed: getRandom(40, 100),
                    rpm: getRandom(1000, 5000),
                    emissions: getRandom(80, 200),
                };

                setTelemetry(newTelemetry);
                setReward(prev => parseFloat((prev + newTelemetry.speed * 0.002).toFixed(2)));
                setIndex(prev => prev + 1);
            }
        }, 1200);

        return () => clearInterval(interval);
    }, [index, carPosition]);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}>
                <Polyline coordinates={route} strokeColor="#2eeb44" strokeWidth={4} />
                <Marker.Animated coordinate={carPosition}>
                    <View style={styles.carMarker} />
                </Marker.Animated>
            </MapView>
            <View style={styles.overlay}>
                <Text style={styles.info}>🚗 Speed: {telemetry.speed} km/h</Text>
                <Text style={styles.info}>🔧 RPM: {telemetry.rpm}</Text>
                <Text style={styles.info}>🌫 Emissions: {telemetry.emissions} g/km</Text>
                <Text style={styles.reward}>💰 +{reward} $DRIVE</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    carMarker: {
        width: 20,
        height: 20,
        backgroundColor: '#2eeb44',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },
    overlay: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        backgroundColor: '#000000aa',
        borderRadius: 12,
        padding: 12,
    },
    info: { color: 'white', fontSize: 16, marginBottom: 4 },
    reward: { color: '#2eeb44', fontSize: 20, fontWeight: 'bold', marginTop: 10 },
});

export default DriveSimulator;
