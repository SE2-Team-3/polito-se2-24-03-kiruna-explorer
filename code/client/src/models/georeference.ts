class Georeference {
  georeferenceId: number;
  coordinates: [number, number][];
  georeferenceName: string;
  isArea: boolean;

  constructor(
    georeferenceId: number,
    coordinates: [number, number][],
    georeferenceName: string,
    isArea: boolean
  ) {
    this.georeferenceId = georeferenceId;
    this.coordinates = coordinates;
    this.georeferenceName = georeferenceName;
    this.isArea = isArea;
  }
}

export default Georeference;
