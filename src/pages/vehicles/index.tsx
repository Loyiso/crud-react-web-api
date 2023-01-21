import { useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import { confirmAlert } from 'react-confirm-alert';

import VehicleService from "../../infrastructure/services/VehicleService";
import type { VehicleRecord } from "../../infrastructure/models/VehicleRecord";

import { useNavigate, Link } from 'react-router-dom';

import 'react-confirm-alert/src/react-confirm-alert.css';

const GridListing = (vehicles: VehicleRecord[]) => {
 
    function DeleteVehicle(id: string, model: string) {
        confirmAlert({
            title: 'Confirm',
            message: `Are you sure want to delete ${model} .`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        try {
                            VehicleService.delete(id).then(c => {
                                window.location.reload();
                            });

                        } catch (e) {
                            console.log(e);
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    const columnNames = [
        { key: 'make', name: 'Make' },
        { key: 'model', name: 'Model' },
        { key: 'year', name: 'Year' },
        { key: 'licencePlateNumber', name: 'Licence Plate Number' },
        { key: 'mileage', name: 'Mileage' },
        {
            key: 'id',
            name: 'Actions',
            formatter(props: any) {
                var url = "/vehicles/edit/" + props.row.id;
                let actionButtons = <>
                    <button className="btn btn-indigo btn-icon" onClick={() => DeleteVehicle(props.row.id, props.row.make)}>Delete </button>
                    <Link to={url} state={{id:props.row.id}}>Edit</Link>
                </>;

                return actionButtons;
            }
        },
    ];

    return <DataGrid columns={columnNames} rows={vehicles} renderers={{ noRowsFallback: "No Records" }} className="small-grid" />
}

function VehicleListing() {
    const [vehicles, setVehicles] = useState<VehicleRecord[]>([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    let navigate = useNavigate();

    function AddVehicle() {
        navigate('/vehicles/add');
    }

    const loadData = async () : Promise<[boolean, VehicleRecord[]]> => {
        try {
            let response = await VehicleService.get();
       
            return  [ true,  response ];
        } catch (error) {
            console.log(error);
            return [ false,  [] ];;
        }
    }

    useEffect(() => {
        (async () => {
            loadState();
        })();
    }, []);

    const loadState = async () => {
        setDataLoaded(false);
        let [success, data] = await loadData();
        if (success) { 
            setVehicles(data);
            setDataLoaded(true);
        }
        else {
            setDataLoaded(false);
        }
    }

    return (
        <>
            <div className='page__main'>
                <h1>Vehicles</h1>
            </div>

            <div>
                <div className="row">
                    <div className="col-5">
                        <button className="btn btn-primary" onClick={AddVehicle}> Add Vehicle</button>
                    </div>
                </div>
                <br /><br />
                {
                    dataLoaded ? GridListing(vehicles) : "loading..please wait..."
                }
            </div>
        </>
    );
}

export default VehicleListing;