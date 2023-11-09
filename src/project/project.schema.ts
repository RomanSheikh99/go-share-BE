import * as mongoose from 'mongoose';

const CargoItemSchema = new mongoose.Schema({
    des: String,
    extra: Boolean,
    height: Number,
    lenght: Number,
    pis: Number,
    title: String,
    weight: Number,
    width: Number
});

export const ProjectSchema = new mongoose.Schema({
    projectId: String,
    userId: String,
    payUrl: String,
    payId: String,
    time: String,
    date: String,
    distance: Number,
    duration: Number,
    startLocation: String,
    endLocation: String,
    totalCost: Number,
    truckCost: Number,
    helperCost: Number,
    extraCost: Number,
    status: {
        type: String,
        default: "Open"
    },
    driverId: {
        type: String,
        default: ""
    },
    driverName: {
        type: String,
        default: ""
    },
    userBack: {
        type: Number,
        default: 0
    },
    driverCost: {
        type: Number,
        default: 0
    },
    startCoordinates: [Number, Number],
    endCoordinates: [Number, Number],
    cargoItems: [CargoItemSchema],
    bids: [{
        price: Number,
        driverId: String,
        driverName: String,
        time: {
            type: Number,
            default: Date.now()
        }
    }],
    vehcle: {
        id: Number,
        dis: String,
        height: Number,
        helper: Boolean,
        img: String,
        length: Number,
        name: String,
        title: String,
        totalWeight: Number,
        weight: Number,
        width: Number
    }
});