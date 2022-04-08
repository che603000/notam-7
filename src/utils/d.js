Math.toRadians = function(degrees) {
    return degrees * Math.PI / 180;
}

Math.toDegrees = function(radians) {
    return radians * 180 / Math.PI;
}

function destinationPoint(origin, distance, bearing) {
    const radius = 6371e3;
    const Ad = distance / radius;
    const br = Math.toRadians(bearing);

    const lat1 = Math.toRadians(origin[0]), lon1 = Math.toRadians(origin[1]);

    const sinLat2 = Math.sin(lat1) * Math.cos(Ad) + Math.cos(lat1) * Math.sin(Ad) * Math.cos(br);
    const lat2 = Math.asin(sinLat2);
    const y = Math.sin(br) * Math.sin(Ad) * Math.cos(lat1);
    const x = Math.cos(Ad) - Math.sin(lat1) * sinLat2;
    const lon2 = lon1 + Math.atan2(y, x);

    const lat = Math.toDegrees(lat2);
    const lon = Math.toDegrees(lon2);

    return [lat, lon];
}