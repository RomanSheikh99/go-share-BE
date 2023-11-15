import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';

class CargoItemDTO {
  // @IsString()
  des: string;

  // @IsBoolean()
  extra: boolean;

  // @IsNumber()
  height: number;

  // @IsNumber()
  lenght: number;

  // @IsNumber()
  pis: number;

  // @IsNumber()
  title: string;

  // @IsNumber()
  weight: number;

  // @IsNumber()
  width: number;
}

export class ProjectDTO {
  cargoItems: CargoItemDTO[];

  // @IsString()
  projectId: String;

  // @IsString()
  userId: String;

  // @IsString()
  payUrl: String;

  // @IsString()
  payId: String;

  // @IsString()
  date: string;

  // @IsNumber()
  distance: number;

  // @IsNumber()
  duration: number;

  // @IsEmail()
  email: string;

  endCoordinates: [number, number];

  // @IsString()
  endLocation: string;

  // @IsNumber()
  extraCost: number;

  // @IsNumber()
  helperCost: number;

  startCoordinates: [number, number];

  // @IsString()
  startLocation: string;

  // @IsString()
  time: string;

  // @IsNumber()
  totalCost: number;

  // @IsNumber()
  truckCost: number;

  vehcle: vehicleDto;

  user: {
    sub: string;
  };

  bids: any;
}

export class vehicleDto {
  // @IsNumber()
  id: number;

  // @IsString()
  dis: string;

  // @IsNumber()
  height: number;

  // @IsBoolean()
  helper: boolean;

  // @IsString()
  img: string;

  // @IsNumber()
  length: number;

  // @IsNumber()
  name: string;

  // @IsNumber()
  title: string;

  // @IsNumber()
  totalWeight: number;

  // @IsNumber()
  weight: number;

  // @IsNumber()
  width: number;
}
