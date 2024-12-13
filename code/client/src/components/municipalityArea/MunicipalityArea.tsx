import { useEffect, useState } from "react";
import Area from "./MunicipalityArea.json";
import { LatLngExpression } from "leaflet";

interface Geometry {
  type: string;
  coordinates: number[][][][];
}

interface Feature {
  type: string;
  properties: {
    stat_id: string;
    pnm: string;
  };
  geometry: Geometry;
}

const LocalGeoJSONReader = () => {
  const [municipalityArea, setMunicipalityArea] = useState<
    LatLngExpression[][]
  >([]);

  useEffect(() => {
    const geoJsonData = Area.features
      .filter((feature: Feature) => feature.geometry.type === "MultiPolygon")
      .flatMap((feature: Feature) => feature.geometry.coordinates);

    const allCoordinatesPerMultiPolygon: [number, number][][] = [];

    geoJsonData.forEach((multiPolygon) => {
      const singleMultiPolygonCoordinates: [number, number][] = [];
      if (Array.isArray(multiPolygon)) {
        multiPolygon.forEach((polygon) => {
          if (Array.isArray(polygon)) {
            polygon.forEach((coord) => {
              if (Array.isArray(coord) && coord.length === 2) {
                const [lon, lat] = coord;
                singleMultiPolygonCoordinates.push([lat, lon]);
              }
            });
          }
        });
      }

      allCoordinatesPerMultiPolygon.push(singleMultiPolygonCoordinates);
    });

    setMunicipalityArea(allCoordinatesPerMultiPolygon);
  }, []);
  return municipalityArea;
};

export default LocalGeoJSONReader;
