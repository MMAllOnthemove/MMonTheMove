// External imports
import {
  useToast,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CreateChecklistContent from "@/components/DTV/CreateChecklistContent";
import Container from "@/components/Container";
import SingleJobDetails from "@/components/DTV/SingleJobDetails";

type Repo = {
  engineer: string;
  job_status: string;
  full_name: string;
  customer_address: string;
  customer_email: string;
  customer_contact_info: string;
  service_order_no: string;
  fault: string;
  ticket: string;
  ticket_number_id: boolean | number | string;
  parts_list: string[];
  added_on: string;
  car_driver: boolean | string;
  checklist_id: boolean | number | string;
  engineer_phone_number: number | string;
};

export default function EditTask() {
  const router = useRouter();
  const { id } = router.query;
  const [getData, setGetData] = useState<string[] | any>([]);
  const [isJobComplete, setIsJobsComplete] = useState<boolean>(false);
  const [jobComment, setJobComment] = useState("");
  const [updatedByWho, setUpdatedByWho] = useState("");
  const [getChecklistData, setChecklistData] = useState<string[] | any>([]);
  const [getFilteredChecklistData, setFilteredChecklistData] = useState<
    string[] | any
  >([]);

  useEffect(() => {
    getThisJobsData();
    fetchCheckistForThisJob();
  }, []);
  async function getThisJobsData() {
    // Reminder to always check:
    // The computer's IP changes based on whether it's connected via LAN or WAN
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DTV}task/get/` + id, {
        method: "GET",
        cache: "default",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          setGetData(data);
          return data;
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCheckistForThisJob() {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DTV}checklist/get`, {
        method: "GET",
        cache: "default",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          let filteredData = [...data].filter((x) => x.job_id === id);
          // console.log("filteredData", filteredData);
          setChecklistData(filteredData);
          return data;
        });
    } catch (error) {
      // console.log(error);
    }
  }
  return (
    <>
      <main>
        <Container>
          <span>
            <h1>Job details</h1>
          </span>
          <Tabs defaultIndex={0} size="md" variant="enclosed">
            <TabList>
              <Tab fontFamily="inherit" fontWeight="500" color={"#8899a6"}>
                Job Details
              </Tab>

              <Tab fontFamily="inherit" fontWeight="500" color={"#8899a6"}>
                {getChecklistData.length > 0
                  ? "View Checklist"
                  : "Create Checklist"}
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <section className="my-5">
                  <SingleJobDetails pageId={id} />
                </section>
              </TabPanel>
              <TabPanel>
                <section className="my-5">
                  <CreateChecklistContent pageId={id} />
                </section>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </main>
    </>
  );
}
