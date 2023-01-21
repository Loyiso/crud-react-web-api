import  { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';

import { Label } from 'reactstrap';

import VehicleService from "../../infrastructure/services/VehicleService";
import VehicleSchema from "../../infrastructure/models/VehicleSchema";
import { VehicleRecord, UpdateVehicleRecord } from "../../infrastructure/models/VehicleRecord";

import { useNavigate, useLocation } from 'react-router-dom';
  
const EditVehicle = () => {
    
    const [vehicle, setVehicle] = useState<VehicleRecord>();
    const [isLoading, setIsLoading] = useState(false);

    let navigate = useNavigate();
    let location = useLocation();

    const loadData = async  (id:string) : Promise<[boolean, VehicleRecord]> => {
 
        try {
            let vehicle = await VehicleService.getById(id);

            return  [ true,  vehicle ];   
        } catch (error) { 
            console.log(error)
            return [  false, {} as VehicleRecord];
        }
    }

    useEffect(() => {
        (async () => {
            setIsLoading(true); 

            let id = location.state.id;
            if (id == null) {
              navigate('/vehicles');
            } 
                let [success, data] = await  loadData(id);
             
                if (success) {   
                    setVehicle(data);                     
                }
                
                setIsLoading(false);               
        })();
    }, []);

    function Cancel() {
        navigate('/vehicles');
    }
 
    return (
        <div className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content"> 
                <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                     
                    <h2 className="az-content-title">Vehicle </h2>
  
                    <div>
                        {
                            vehicle == null ? "loading..." :
                                <Formik
                                    initialValues={{
                                        make:  vehicle.make ,
                                        model: vehicle.model,
                                        year: vehicle.year,
                                        licencePlateNumber: vehicle.licencePlateNumber,
                                        mileage: vehicle.mileage,
                                    }} 
                                    validationSchema={VehicleSchema}
                                    onSubmit={values => {
                                        setIsLoading(true); 

                                        let data: UpdateVehicleRecord =   {
                                            Id: location.state.id,
                                            make: values.make,
                                            model: values.model,
                                            year: values.year,
                                            licencePlateNumber: values.licencePlateNumber,
                                            mileage: values.mileage
                                        };

                                        VehicleService.update(data).then(() => {
                                            navigate('/vehicles');
                                        }).catch((error) => {
                                            console.log(error);
                                            setIsLoading(false); 
                                        }); 
                                    }}
                                >
                                    {({ errors, touched }) => (
                                           <Form>
                                           <div className="row row-sm">
                                               <div className="col-lg-4 form-group">
                                                   <Label htmlFor="make">Make  </Label>
                                                   <Field name="make" className="form-control"/>
                                                    
                                                   {errors.make && touched.make ? (
                                                       <div className="error">{errors.make}</div>
                                                   ) : null}
                                               </div>

                              
                                               <div className="col-lg-4">
                                                   <Label htmlFor="model">Model </Label>
                                                   <Field name="model" className="form-control" />
                                                   {errors.model && touched.model ? (
                                                       <div className="error">{errors.model}</div>
                                                   ) : null}
                                               </div>
               
                                               <div className="col-lg-4">
                                                   <Label htmlFor="year">Year </Label>
                                                   <Field name="year" className="form-control" />
                                                   {errors.year && touched.year ? (
                                                       <div className="error">{errors.year}</div>
                                                   ) : null}
                                               </div>
               
                                               <div className="col-lg-4">
                                                   <Label htmlFor="licencePlateNumber">Licence Plate Number </Label>
                                                   <Field name="licencePlateNumber" className="form-control" />
                                                   {errors.licencePlateNumber && touched.licencePlateNumber ? (
                                                       <div className="error">{errors.licencePlateNumber}</div>
                                                   ) : null}
                                               </div>
               
                                               <div className="col-lg-4">
                                                   <Label htmlFor="mileage">Mileage </Label>
                                                   <Field name="mileage" className="form-control" />
                                                   {errors.mileage && touched.mileage ? (
                                                       <div className="error">{errors.mileage}</div>
                                                   ) : null}
                                               </div>
               
                                           </div>
                                           <br />
                                           <div className="row row-sm wd-xl-80p">
                                               <div className="col-lg-4">
                                                  {
                                                    isLoading ? "Please wait.." : 
                                                        <>
                                                            <button type="submit" className="btn btn-primary btn-rounded btn-block px-5 ml-2"> Save</button>&nbsp;&nbsp;
                                                            <a className="btn btn-dark btn-block px-5 ml-2" onClick={Cancel}>Cancel</a>
                                                        </> 
                                                  }  
                                               </div>  
                                           </div>
                                       </Form>
                                    )}
                                </Formik>
                        }
                    </div> 
                </div> 
        </div>
    ) 
}

export default EditVehicle;