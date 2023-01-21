import * as Yup from 'yup';

const VehicleSchema = Yup.object().shape({
    make: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    model: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    year: Yup.number()
        .moreThan(0)
        .required('Required'),
    licencePlateNumber: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    mileage: Yup.number()
        .moreThan(0)
        .required('Required'),
});

export default VehicleSchema;
