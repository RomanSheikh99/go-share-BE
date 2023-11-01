class CargoItemDTO {
    des: string;
    extra: boolean;
    height: number;
    lenght: number;
    pis: number;
    title: string;
    weight: number;
    width: number;
}

export class ProjectDTO {
    cargoItems: CargoItemDTO[];
    date: string;
    distance: number;
    duration: number;
    email: string;
    endCoordinates: [number, number];
    endLocation: string;
    extraCost: number;
    helperCost: number;
    userId: string;
    name: string;
    startCoordinates: [number, number];
    startLocation: string;
    time: string;
    totalCost: number;
    truckCost: number;
    vehcle: {
        id: number;
        dis: string;
        height: number;
        helper: boolean;
        img: string;
        length: number;
        name: string;
        title: string;
        totalWeight: number;
        weight: number;
        width: number;
    };
}
