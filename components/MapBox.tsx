import React from 'react';
import { StyleSheet, View } from 'react-native';

import Mapbox, { MapView } from "@rnmapbox/maps";

Mapbox.setAccessToken("<YOUR_ACCESSTOKEN>");
const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    container: {
        height: 300,
        width: 300,
        backgroundColor: "tomato"
    },
    map: {
        flex: 1
    }
});


const MapBox = ({ mapdata }: { mapdata: any }) => {


    return (
        <View style={styles.container}>
            <MapView style={styles.map} />
        </View>
    );
};

export default MapBox;
