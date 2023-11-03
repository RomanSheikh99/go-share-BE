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
    startCoordinates: [Number, Number],
    endCoordinates: [Number, Number],
    cargoItems: [CargoItemSchema],
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