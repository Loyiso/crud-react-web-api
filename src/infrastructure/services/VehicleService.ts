import axios from 'axios';
import { VehicleRecord, UpdateVehicleRecord } from '../models/VehicleRecord';
import config from './HttpHeader';
import AppSettings from '../../AppSettings';

const apiUrl = AppSettings.API_URL + "/Vehicles";

class VehicleService {
    async get(): Promise<VehicleRecord[]> { 
        var records = await axios.get(apiUrl, config);
 
        return JSON.parse(JSON.stringify(records.data)); 
    }

    async create(vehicle: VehicleRecord) {
        return axios.post(apiUrl, vehicle, config);
    }

    async getById(id: string) : Promise<VehicleRecord>  { 
        var record = await axios.get(apiUrl + '/' + id);
 
        return JSON.parse(JSON.stringify(record.data));  
    }

    async update(vehicle: UpdateVehicleRecord) {
        return axios.put(apiUrl, vehicle, config);
    }

    async delete(id: string) {
        return axios.delete(apiUrl + '/' + id, config);
    }
}

export default new VehicleService();
