import { useEffect, useState } from "react";
import { ISingleDTVJob, Itable } from "../../utils/interfaces";

export const fetchCurrentUser = () => {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/me`, {
        method: "POST",
        credentials: "include",
        cache: "default",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log("data", data);
          setUserData(data.email);
        });
    };
    fetchData();
  }, [userData]);

  return { userData };
};
export const fetchTableData = () => {
  const [hhpData, setHHPData] = useState<Itable[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log("data", data);
          setHHPData(data);
        });
    };
    fetchData();
  }, [hhpData]);

  return { hhpData };
};
export const fetchTableDataHistory = () => {
  const [hhpDataHistory, setHHPDataHistory] = useState<Itable[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/units/history/get`
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log("data", data);
          setHHPDataHistory(data);
        });
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
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/parts/history/get`
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log("data", data);
          setPartsDataHistory(data);
        });
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
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/units/history/get`
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log("data", data);
          setFetchJobsApprovedAndRejected(data);
        });
    };
    fetchData();
  }, [fetchJobsApprovedAndRejected]);

  return { fetchJobsApprovedAndRejected };
};

export const fetchDTVTableData = () => {
  const [dtvData, setDTVData] = useState<Itable[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DTV}task/get/`)
        .then((res) => res.json())
        .then((data) => {
          // console.log("data", data);
          setDTVData(data);
        });
    };
    fetchData();
  }, [dtvData]);

  return { dtvData };
};

export const fetchSingleDTVJob = (id: string | string[] | undefined) => {
  const [dtvSingleJobData, setDTVSingleJobData] = useState<ISingleDTVJob[]>([]);

  useEffect(() => {
    const fetchData = async (id: string | string[] | undefined) => {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DTV}task/get/` + id)
        .then((res) => res.json())
        .then((data) => {
          // console.log("data", data);
          setDTVSingleJobData(data);
        });
    };
    fetchData(id);
  }, [dtvSingleJobData]);

  return { dtvSingleJobData };
};
export const fetchSingleDTVChecklist = () => {
  const [dtvSingleChecklist, setDTVSingleChecklist] = useState<Itable[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DTV}checklist/get/`)
        .then((res) => res.json())
        .then((data) => {
          // console.log("data", data);
          // const filteredData = [...data].filter((x) => x.id === id);
          setDTVSingleChecklist(data);
        });
    };
    fetchData();
  }, [dtvSingleChecklist]);

  return { dtvSingleChecklist };
};

// Get the engineers and repaired jobs from api
export const countEngineerRepairCompleteAlltimeJobs = () => {
  const [engineerUnitsAdded, setEngineerUnitsAdded] = useState<
    string[] | any[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL_DASHBOARD_UNITS_COUNT}/complete/all-time`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log("all-time graph", data);
          setEngineerUnitsAdded(data);
        });
    };
    fetchData();
  }, [engineerUnitsAdded]);

  return { engineerUnitsAdded };
};
export const getBookingAgentJobs = () => {
  const [getBookingAgentJobsData, setGetBookingAgentJobsData] = useState<any[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_MANAGEMENT_AGENTS}/booking-agents/jobs/get`
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log("data", data);
          // const filteredData = [...data].filter((x) => x.id === id);
          setGetBookingAgentJobsData(data);
        });
    };
    fetchData();
  }, [getBookingAgentJobsData]);

  return { getBookingAgentJobsData };
};
export const getPartsDepatmentJobs = () => {
  const [partsDepartmentData, setPartsDepartmentData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL_MANAGEMENT}/parts/get`
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log("data", data);
          // const filteredData = [...data].filter((x) => x.id === id);
          setPartsDepartmentData(data);
        });
    };
    fetchData();
  }, [partsDepartmentData]);

  return { partsDepartmentData };
};
