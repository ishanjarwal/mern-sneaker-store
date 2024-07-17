import { check } from "express-validator";
import { Country, State, City } from "country-state-city";

export const validateAddress = [
    check('address.first_name').trim().notEmpty().withMessage('First name is required').isString().withMessage('First Name should contain characters only'),
    check('address.last_name').trim().notEmpty().withMessage('Last name is required').isString().withMessage('Last Name should contain characters only'),
    check('address.plot_no').trim().notEmpty().withMessage('Plot number is required'),
    check('address.email').trim().optional().isEmail().withMessage('Invalid email address'),
    check('address.phone').trim().notEmpty().withMessage('Phone number is required').bail()
        .isMobilePhone().withMessage('Invalid phone number'),
    check('address.address_line_1').trim().notEmpty().withMessage('Address line 1 is required'),
    check('address.address_line_2').trim().optional().isString().withMessage('Address line 2 must be a string'),
    check('address.landmark').trim().optional().isString().withMessage('Landmark must be a string'),
    check('address.pincode').trim().notEmpty().withMessage('Pincode is required')
        .isPostalCode('IN').trim().withMessage('Invalid pincode'),
    check('address.country.isoCode').notEmpty().withMessage('Country is required').bail()
        .custom((value) => {
            const countries = Country.getAllCountries();
            if (!countries.some(country => country?.isoCode === value)) {
                throw new Error('Invalid country');
            }
            return true;
        }),
    check('address.state.isoCode').trim().notEmpty().withMessage('State is required').bail()
        .custom((value, { req }) => {
            const country = req.body.address.country;
            const states = State.getStatesOfCountry(country?.isoCode);
            if (!states.some(state => state.isoCode === value)) {
                throw new Error('Invalid state');
            }
            return true;
        }),
    check('address.city.name').trim().notEmpty().withMessage('City is required').bail()
        .custom((value, { req }) => {
            const stateCode = req.body.address.state?.isoCode;
            const countryCode = req.body.address.country?.isoCode;
            const cities = City.getCitiesOfState(countryCode, stateCode);
            if (!cities.some(city => city.name === value)) {
                throw new Error('Invalid city');
            }
            return true;
        }),
]