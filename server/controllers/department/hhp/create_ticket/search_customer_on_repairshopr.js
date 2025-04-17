import axios from "axios";
import "dotenv/config";

export const searchCustomerOnRepairshopr = async (phone) => {
    const res = await axios.get(
        `https://allelectronics.repairshopr.com/api/v1/customers?query=${phone}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
            },
        }
    );


    return res?.data?.customers || [];
};
