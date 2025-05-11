const fs = require('fs');
const readline = require('readline');
const path = require('path');

function simulateObdStream(csvFilePath, intervalMs = 1000) {
    const stream = fs.createReadStream(path.resolve(csvFilePath));
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity,
    });

    const rows = [];
    let headers = [];

    rl.on('line', (line) => {
        if (headers.length === 0) {
            headers = line.split(',');
        } else {
            const values = line.split(',');
            const row = headers.reduce((obj, key, index) => {
                obj[key.trim()] = values[index].trim();
                return obj;
            }, {});
            rows.push(row);
        }
    });

    rl.on('close', async () => {
        for (const row of rows) {
            const timestamp = new Date().toISOString();
            console.log(`[${timestamp}] Vehicle ID: ${row.vehicle_id}, Speed: ${row.speed_kmph} km/h, RPM: ${row.engine_rpm}, Fuel: ${row.fuel_level_pct}%, Temp: ${row.engine_temp_c}°C, DTC: ${row.dtc_code}, Location: (${row.lat}, ${row.lon})`);
            await new Promise((res) => setTimeout(res, intervalMs));
        }
    });
}

simulateObdStream('synthetic_obd_data_24h.csv', 500);
