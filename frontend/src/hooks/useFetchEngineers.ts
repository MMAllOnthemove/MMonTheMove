import axios from "axios";
import { useEffect, useState } from "react";

type TEngineers = {
    id: string;
    unique_id: string;
    engineer: string;
    department: string;
};

const useFetchEngineer = () => {
    const [engineersList, setEngineers] = useState<TEngineers[] | any>([]);
    const [engineersListLoading, setEngineersLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setEngineersLoading(true);
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/engineers`,
                    {
                        withCredentials: true,
                    }
                );
                if (response?.data) {
                    // console.log(response);
                    setEngineers(response?.data);
                }
            } catch (error) {
                console.log("Get engineers list error", error);
            } finally {
                setEngineersLoading(false);
            }
        };

        fetchData();
    }, [engineersList]);

    return { engineersList, engineersListLoading };
};

export default useFetchEngineer;