import L, { LatLngExpression } from "leaflet";

export const validateLocation = (municipalityArea: LatLngExpression[][], lat: number, lon: number) => {
  const point = L.latLng(lat, lon);

  return municipalityArea.some((polygonCoords) => {
    let count = 0;
    const n = polygonCoords.length;

    for (let i = 0; i < n; i++) {
      const coord1 = L.latLng(polygonCoords[i]);
      const coord2 = L.latLng(polygonCoords[(i + 1) % n]);

      if (
        (coord1.lat <= point.lat && coord2.lat > point.lat) ||
        (coord2.lat <= point.lat && coord1.lat > point.lat)
      ) {
        const xIntersection =
          coord1.lng +
          ((point.lat - coord1.lat) / (coord2.lat - coord1.lat)) *
            (coord2.lng - coord1.lng);

        if (xIntersection > point.lng) {
          count++;
        }
      }
    }

    return count % 2 !== 0;
  });
};
