class Georeference {
    georeferenceId: number
    coordinates: string

    constructor(
        georeferenceId: number,
        coordinates: string
    ) {
        this.georeferenceId = georeferenceId;
        this.coordinates = coordinates;
    }
}

export default Georeference;
