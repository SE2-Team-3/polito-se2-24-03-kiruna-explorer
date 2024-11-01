class Area {
    areaId: number
    polygon: string

    constructor(
        areaId: number,
        polygon: string
    ) {
        this.areaId = areaId;
        this.polygon = polygon;
    }
}

export default Area;