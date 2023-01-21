import  { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';

import { Label } from 'reactstrap';

import VehicleService from "../../infrastructure/services/VehicleService";
import VehicleSchema from "../../infrastructure/models/VehicleSchema";
import { VehicleRecord } from "../../infrastructure/models/VehicleRecord";

import { useNavigate } from 'react-router-dom';

const AddVehicle = () => {
    let navigate = useNavigate();
    const [isSaving, setLoader] = useState(false);

    function Cancel() {
        navigate('/vehicles');
    }

    return (
        <div className="az-content pd-y-20 pd-lg-y-30 pd-xl-y-40">
            <div className='page__main'>
                <h1>Vehicles</h1>
            </div>

            <div>
                <Formik
                    initialValues={{
                        make: '',
                        model: '',
                        year: 0,
                        licencePlateNumber: '',
                        mileage: 0,
                    }}
                    validationSchema={VehicleSchema}
                    onSubmit={values => { 
                        setLoader(true);  
                        let data: VehicleRecord =   {
                            Id: '',
                            make: values.make,
                            model: values.model,
                            year: values.year,
                            licencePlateNumber: values.licencePlateNumber,
                            mileage: values.mileage,
                            dateCreated: new Date()
                        };
                         
                        VehicleService.create(data).then(() => {
                            navigate('/vehicles');
                        }).catch((error) => {
                            console.log(error);
                            setLoader(false);  
                        });
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className="row row-sm">
                                <div className="col-lg-6">
                                    <Label htmlFor="make">Make </Label>
                                    <Field name="make" className="form-control" />
                                    {errors.make && touched.make ? (
                                        <div className="error">{errors.make}</div>
                                    ) : null}
                                </div>

                                <div className="col-lg-6">
                                    <Label htmlFor="model">Model </Label>
                                    <Field name="model" className="form-control" />
                                    {errors.model && touched.model ? (
                                        <div className="error">{errors.model}</div>
                                    ) : null}
                                </div>

                                <div className="col-lg-6">
                                    <Label htmlFor="year">Year </Label>
                                    <Field name="year" className="form-control" />
                                    {errors.year && touched.year ? (
                                        <div className="error">{errors.year}</div>
                                    ) : null}
                                </div>

                                <div className="col-lg-6">
                                    <Label htmlFor="licencePlateNumber">Licence Plate Number </Label>
                                    <Field name="licencePlateNumber" className="form-control" />
                                    {errors.licencePlateNumber && touched.licencePlateNumber ? (
                                        <div className="error">{errors.licencePlateNumber}</div>
                                    ) : null}
                                </div>

                                <div className="col-lg-6">
                                    <Label htmlFor="mileage">Mileage </Label>
                                    <Field name="mileage" className="form-control" />
                                    {errors.mileage && touched.mileage ? (
                                        <div className="error">{errors.mileage}</div>
                                    ) : null}
                                </div>

                            </div>
                            <br />
                            <div className="row row-sm wd-xl-70p"> 
                                <div className="col-lg-4">
                                    {
                                        isSaving ? "Please wait.." : 
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
            </div>
        </div> 
    )
}

export default AddVehicle;