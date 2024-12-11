class Georeference {
  georeferenceId: number;
  coordinates: string;
  georeferenceName: string;
  isArea: boolean;
  areaColor: string;

  constructor(
    georeferenceId: number,
    coordinates: string,
    georeferenceName: string,
    isArea: boolean,
    areaColor: string
  ) {
    this.georeferenceId = georeferenceId;
    this.coordinates = coordinates;
    this.georeferenceName = georeferenceName;
    this.isArea = isArea;
    this.areaColor = areaColor;
  }
}

export default Georeference;
