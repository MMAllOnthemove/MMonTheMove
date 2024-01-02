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
export const fetchSingleDTVChecklist = (id: string | string[] | undefined) => {
  const [dtvSingleChecklist, setDTVSingleChecklist] = useState<Itable[]>([]);

  useEffect(() => {
    const fetchData = async (id: string | string[] | undefined) => {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DTV}checklist/get/` + id)
        .then((res) => res.json())
        .then((data) => {
          // console.log("data", data);
          const filteredData = [...data].filter((x) => x.id === id);
          setDTVSingleChecklist(filteredData);
        });
    };
    fetchData(id);
  }, [dtvSingleChecklist]);

  return { dtvSingleChecklist };
};
