import AppSettings from "../store/settingsstore";

let previousFuel: number | null = null;

export function calculateEarnings(entry: any) {
    const sharedData = AppSettings.getState().dataShare;

    let points = 0;


    if (sharedData.speed) {
        // Speed
        if (entry.speed_kmph < 60) points += 5;
        else if (entry.speed_kmph > 100) points -= 5;
    }

    if (sharedData.rpm) {
        // RPM
        if (entry.engine_rpm >= 1000 && entry.engine_rpm <= 3000) points += 3;
        else if (entry.engine_rpm > 4000) points -= 3;
    }

    if (sharedData.fuel) {
        // Fuel level
        if (previousFuel !== null) {
            const diff = entry.fuel_level_pct - previousFuel;
            if (diff > 0) points += 2;
            else if (diff < -5) points -= 2;
        }
        previousFuel = entry.fuel_level_pct;
    }

    if (sharedData.temp) {
        // Engine Temp
        if (entry.engine_temp_c < 100) points += 1;
        else points -= 3;
    }

    if (sharedData.location) {
        // DTC Code
        if (!entry.dtc_code) points += 2;
        else points -= 10;
    }

    return {
        timestamp: entry.timestamp,
        vehicle_id: entry.vehicle_id,
        pointsEarned: points,
    };

}
