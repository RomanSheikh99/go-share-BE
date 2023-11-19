import { Model } from 'mongoose';
import { Driver } from './driver.interface';
export declare class DriverService {
    private driverModel;
    constructor(driverModel: Model<Driver>);
    create(driver: any): Promise<Driver>;
    findOne(email: string): Promise<Driver>;
    findOneById(sub: string): Promise<Driver>;
}
