import { useEffect, useState } from "react";
import { ISingleDTVJob, Itable } from "../../utils/interfaces";
import axios from "axios";
import moment from "moment";


type TUser = {
  user_id: string;
  full_name: string;
  user_name: string;
  email: string;
  user_role: string;
  department: string;
}


export const fetchCurrentUser = () => {
  const [userData, setUserData] = useState<TUser | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/user/me`, {
          method: 'GET',
          credentials: 'include'
        })
        if (response.ok) {
          const data = await response.json();
          setUserData(data?.user)
        }
      } catch (error) {
        // console.log(error);

      }

    }
    fetchData()
  }, [userData])


  return { userData };
};
export const fetchTableData = () => {
  const [hhpData, setHHPData] = useState<Itable[]>([]);

  useEffect(() => {

    const fetchData = async () => {

      axios.get(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs`)
        .then((response) => {
          // console.log(data)
          setHHPData(response?.data)
        })
        .then((e) => {
          // console.log("error", e)
        })

    }
    fetchData()

  }, [hhpData]);

  return { hhpData };
};
export const fetchTableDataHistory = () => {
  const [hhpDataHistory, setHHPDataHistory] = useState<Itable[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/jobs/history`)
      setHHPDataHistory(data)

    };
    fetchData();
  }, [hhpDataHistory]);

  return { hhpDataHistory };
};
export const fetchPartsTableDataHistory = () => {
  const [partsDataHistory, setPartsDataHistory] = useState<string[] | any[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/parts/jobs/history`)
      setPartsDataHistory(data)

    };
    fetchData();
  }, [partsDataHistory]);

  return { partsDataHistory };
};
export const countJobsApprovedAndRejected = () => {
  const [fetchJobsApprovedAndRejected, setFetchJobsApprovedAndRejected] =
    useState<Itable[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/units/history/get`)
      setFetchJobsApprovedAndRejected(data)

    };
    fetchData();
  }, [fetchJobsApprovedAndRejected]);

  return { fetchJobsApprovedAndRejected };
};


export const getBookingAgentJobs = () => {
  const [getBookingAgentJobsData, setGetBookingAgentJobsData] = useState<any[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/hhp/agents/jobs`)
      setGetBookingAgentJobsData(data)

    };
    fetchData();
  }, [getBookingAgentJobsData]);

  return { getBookingAgentJobsData };
};


export const fetchOTP = () => {
  const [getOTP, setGetOTP] = useState<string | any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_OTP}`);
      setGetOTP(data);
    };
    fetchData();
  }, [getOTP]);

  return { getOTP };
};

export const fetchAllOTP = () => {
  const [getAllOTP, setGetAllOTP] = useState<string | any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_OTP}/get/all`)
      setGetAllOTP(data)
    };
    fetchData();
  }, [getAllOTP]);

  return { getAllOTP };
};

// Engineers
export const fetchEngineers = () => {
  const [getEngineers, setGetEngineers] = useState<string | any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_API}/engineers`);
      setGetEngineers(data);
    };
    fetchData();
  }, [getEngineers]);

  return { getEngineers };
};

// Engineers
export const fetchBookingAgents = () => {
  const [getBookingAgents, setGetBookingAgents] = useState<string | any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_API}/agents`);
      setGetBookingAgents(data);
    };
    fetchData();
  }, [getBookingAgents]);

  return { getBookingAgents };
};


