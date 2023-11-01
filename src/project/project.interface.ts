interface CargoItem {
    des: string;
    extra: boolean;
    height: number;
    lenght: number;
    pis: number;
    title: string;
    weight: number;
    width: number;
}

export interface Project {
    projectId: String;
    userId: String;
    userEmail: String;
    UserName: String;
    time: String;
    date: String;
    distance: Number;
    duration: Number;
    startLocation: String;
    endLocation: String;
    totalCost: Number;
    truckCost: Number;
    helperCost: Number;
    extraCost: Number,
    startCoordinates: [Number, Number];
    endCoordinates: [Number, Number];
    cargoItems: CargoItem[];
    vehcle: {
        id: Number;
        dis: String;
        height: Number;
        helper: Boolean;
        img: String;
        length: Number;
        name: String;
        title: String;
        totalWeight: Number;
        weight: Number;
        width: Number;
    }
}
