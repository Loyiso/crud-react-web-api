export type VehicleRecord = {  
    Id: string; 
    make: string; 
    model: string;
    year: number; 
    licencePlateNumber: string; 
    mileage: number;  
    dateUpdated?: Date 
    dateCreated: Date
};

export type UpdateVehicleRecord = {  
    Id: string; 
    make: string; 
    model: string;
    year: number; 
    licencePlateNumber: string; 
    mileage: number;  
};
 