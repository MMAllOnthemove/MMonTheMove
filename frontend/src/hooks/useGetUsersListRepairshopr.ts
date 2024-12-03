import axios from "axios";
import { useEffect, useState } from "react";

const useGetUserListRepairshopr = () => {
    const [rsUsersList, setData] = useState([]);
    const [rsUsersListLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_REPAIRSHOPR_USER_LIST}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                        },
                    }
                );
                if (data) {
                    setData(data?.users);
                }
            } catch (error) {
                if (process.env.NODE_ENV !== "production") {
                    console.error("Error fetching RS users:", error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { rsUsersListLoading, rsUsersList };
};

export default useGetUserListRepairshopr;
