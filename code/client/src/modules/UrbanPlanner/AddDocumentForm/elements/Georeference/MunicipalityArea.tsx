import Area from "./MunicipalityArea.json";

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
  const municipalityArea = Area.features
    .filter((feature: Feature) => feature.geometry.type === "MultiPolygon")
    .flatMap((feature: Feature) => feature.geometry.coordinates);

  return municipalityArea;
};

export default LocalGeoJSONReader;
