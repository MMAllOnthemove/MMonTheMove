import axios from "axios";
import "dotenv/config";
import { capitalizeText } from "../../../../utils/capitalize.js";

// this will handle when user creates ticket from service order
// first search if customer exists on repairshopr
// if they do, grab their customer id
// if no result, create a new customer on rs
// return that customer id in either case
const createCustomerOnRepairshopr = async (
    firstname,
    lastname,
    businessname,
    email,
    phone,
    phone_2,
    address,
    address_2,
    city,
    state
) => {
    const payload = {
        firstname: capitalizeText(firstname),
        lastname: capitalizeText(lastname),
        businessname: businessname,
        email: email,
        phone: phone,
        mobile: phone_2,
        address: address,
        address_2: address_2,
        city: city,
        state: state,
        zip: "",
    };

    try {
        const response = await axios.post(
            `https://allelectronics.repairshopr.com/api/v1/customers`,
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                },
            }
        );

        return response;
    } catch (error) {
        console.log("create customer on rs error", JSON.stringify(error));
    }
};
export default createCustomerOnRepairshopr;
