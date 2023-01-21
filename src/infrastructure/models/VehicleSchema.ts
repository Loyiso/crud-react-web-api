import * as Yup from 'yup';

const VehicleSchema = Yup.object().shape({
    make: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Make is Required'),
    model: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Model is Required'),
    year: Yup.number()
        .moreThan(0)
        .required('Year is Required'),
    licencePlateNumber: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Licence Plate Number Required'),
    mileage: Yup.number()
        .moreThan(0)
        .required('Mileage Required'),
});

export default VehicleSchema;
