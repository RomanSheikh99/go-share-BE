/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Connection } from 'mongoose';
export declare const projectProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<{
        startCoordinates: number[];
        endCoordinates: number[];
        cargoItems: import("mongoose").Types.DocumentArray<{
            des?: string;
            extra?: boolean;
            height?: number;
            lenght?: number;
            pis?: number;
            title?: string;
            weight?: number;
            width?: number;
        }>;
        status: string;
        driverId: string;
        bids: {
            time: number;
            driverId?: string;
            driverName?: string;
            price?: number;
        }[];
        driverName: string;
        userBack: number;
        driverCost: number;
        date?: string;
        projectId?: string;
        payUrl?: string;
        userId?: string;
        time?: string;
        distance?: number;
        duration?: number;
        startLocation?: string;
        endLocation?: string;
        totalCost?: number;
        truckCost?: number;
        helperCost?: number;
        extraCost?: number;
        vehcle?: {
            id?: number;
            name?: string;
            length?: number;
            height?: number;
            title?: string;
            weight?: number;
            width?: number;
            dis?: string;
            helper?: boolean;
            img?: string;
            totalWeight?: number;
        };
        payId?: string;
    }, {}, {}, {}, import("mongoose").Document<unknown, {}, {
        startCoordinates: number[];
        endCoordinates: number[];
        cargoItems: import("mongoose").Types.DocumentArray<{
            des?: string;
            extra?: boolean;
            height?: number;
            lenght?: number;
            pis?: number;
            title?: string;
            weight?: number;
            width?: number;
        }>;
        status: string;
        driverId: string;
        bids: {
            time: number;
            driverId?: string;
            driverName?: string;
            price?: number;
        }[];
        driverName: string;
        userBack: number;
        driverCost: number;
        date?: string;
        projectId?: string;
        payUrl?: string;
        userId?: string;
        time?: string;
        distance?: number;
        duration?: number;
        startLocation?: string;
        endLocation?: string;
        totalCost?: number;
        truckCost?: number;
        helperCost?: number;
        extraCost?: number;
        vehcle?: {
            id?: number;
            name?: string;
            length?: number;
            height?: number;
            title?: string;
            weight?: number;
            width?: number;
            dis?: string;
            helper?: boolean;
            img?: string;
            totalWeight?: number;
        };
        payId?: string;
    }> & {
        startCoordinates: number[];
        endCoordinates: number[];
        cargoItems: import("mongoose").Types.DocumentArray<{
            des?: string;
            extra?: boolean;
            height?: number;
            lenght?: number;
            pis?: number;
            title?: string;
            weight?: number;
            width?: number;
        }>;
        status: string;
        driverId: string;
        bids: {
            time: number;
            driverId?: string;
            driverName?: string;
            price?: number;
        }[];
        driverName: string;
        userBack: number;
        driverCost: number;
        date?: string;
        projectId?: string;
        payUrl?: string;
        userId?: string;
        time?: string;
        distance?: number;
        duration?: number;
        startLocation?: string;
        endLocation?: string;
        totalCost?: number;
        truckCost?: number;
        helperCost?: number;
        extraCost?: number;
        vehcle?: {
            id?: number;
            name?: string;
            length?: number;
            height?: number;
            title?: string;
            weight?: number;
            width?: number;
            dis?: string;
            helper?: boolean;
            img?: string;
            totalWeight?: number;
        };
        payId?: string;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
        startCoordinates: number[];
        endCoordinates: number[];
        cargoItems: import("mongoose").Types.DocumentArray<{
            des?: string;
            extra?: boolean;
            height?: number;
            lenght?: number;
            pis?: number;
            title?: string;
            weight?: number;
            width?: number;
        }>;
        status: string;
        driverId: string;
        bids: {
            time: number;
            driverId?: string;
            driverName?: string;
            price?: number;
        }[];
        driverName: string;
        userBack: number;
        driverCost: number;
        date?: string;
        projectId?: string;
        payUrl?: string;
        userId?: string;
        time?: string;
        distance?: number;
        duration?: number;
        startLocation?: string;
        endLocation?: string;
        totalCost?: number;
        truckCost?: number;
        helperCost?: number;
        extraCost?: number;
        vehcle?: {
            id?: number;
            name?: string;
            length?: number;
            height?: number;
            title?: string;
            weight?: number;
            width?: number;
            dis?: string;
            helper?: boolean;
            img?: string;
            totalWeight?: number;
        };
        payId?: string;
    }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
        startCoordinates: number[];
        endCoordinates: number[];
        cargoItems: import("mongoose").Types.DocumentArray<{
            des?: string;
            extra?: boolean;
            height?: number;
            lenght?: number;
            pis?: number;
            title?: string;
            weight?: number;
            width?: number;
        }>;
        status: string;
        driverId: string;
        bids: {
            time: number;
            driverId?: string;
            driverName?: string;
            price?: number;
        }[];
        driverName: string;
        userBack: number;
        driverCost: number;
        date?: string;
        projectId?: string;
        payUrl?: string;
        userId?: string;
        time?: string;
        distance?: number;
        duration?: number;
        startLocation?: string;
        endLocation?: string;
        totalCost?: number;
        truckCost?: number;
        helperCost?: number;
        extraCost?: number;
        vehcle?: {
            id?: number;
            name?: string;
            length?: number;
            height?: number;
            title?: string;
            weight?: number;
            width?: number;
            dis?: string;
            helper?: boolean;
            img?: string;
            totalWeight?: number;
        };
        payId?: string;
    }>> & import("mongoose").FlatRecord<{
        startCoordinates: number[];
        endCoordinates: number[];
        cargoItems: import("mongoose").Types.DocumentArray<{
            des?: string;
            extra?: boolean;
            height?: number;
            lenght?: number;
            pis?: number;
            title?: string;
            weight?: number;
            width?: number;
        }>;
        status: string;
        driverId: string;
        bids: {
            time: number;
            driverId?: string;
            driverName?: string;
            price?: number;
        }[];
        driverName: string;
        userBack: number;
        driverCost: number;
        date?: string;
        projectId?: string;
        payUrl?: string;
        userId?: string;
        time?: string;
        distance?: number;
        duration?: number;
        startLocation?: string;
        endLocation?: string;
        totalCost?: number;
        truckCost?: number;
        helperCost?: number;
        extraCost?: number;
        vehcle?: {
            id?: number;
            name?: string;
            length?: number;
            height?: number;
            title?: string;
            weight?: number;
            width?: number;
            dis?: string;
            helper?: boolean;
            img?: string;
            totalWeight?: number;
        };
        payId?: string;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    }>>;
    inject: string[];
}[];
