// External imports
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
  fetchCurrentUser,
  fetchSingleDTVChecklist,
  fetchSingleDTVJob,
} from "@/hooks/useFetch";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import NotLoggedIn from "@/components/NotLoggedIn";
import TabPane from "@/components/Tabs/TabPane";
import Tabs from "@/components/Tabs";

// Custom imports

const Button = dynamic(() => import("@/components/Buttons"));
const Container = dynamic(() => import("@/components/Container"));
const CreateChecklistContent = dynamic(
  () => import("@/components/DTV/CreateChecklistContent")
);
const SingleJobDetails = dynamic(
  () => import("@/components/DTV/SingleJobDetails")
);
const ViewTaskChecklist = dynamic(
  () => import("@/components/DTV/ViewTaskChecklist")
);

function EditTask() {
  const router = useRouter();
  const { id } = router?.query;
  const { userData } = fetchCurrentUser();
  const { dtvSingleJobData } = fetchSingleDTVJob(id);
  const { dtvSingleChecklist } = fetchSingleDTVChecklist();
  const filterChecklistByJobId = [...dtvSingleChecklist].filter(
    (x) => x.id === id
  );
  const [isJobComplete, setIsJobsComplete] = useState<boolean>(false);
  const [jobComment, setJobComment] = useState("");
  const [updatedByWho, setUpdatedByWho] = useState("");

  return (
    <>
      <Head>
        <title>DTV | HA edit task</title>
      </Head>

      <main>
        <Container>
          {!userData ? (
            <NotLoggedIn />
          ) : (
            <>
              <span className="flex items-center justify-between my-5">
                <Button
                  type="button"
                  onClick={() => history.back()}
                  className="bg-[#082f49]   font-semibold text-white dark:text-[#eee] hover:bg-blue-800 rounded-sm text-sm p-2.5 text-center"
                  text="Back"
                />

                <h1 className="text-center text-gray-900 dark:text-[#eee] font-semibold lg:text-2xl">
                  About task
                </h1>

                <div />
              </span>
              <Tabs>
                <TabPane title="Job Details">
                  <section className="my-5">
                    <SingleJobDetails id={id} />
                  </section>
                </TabPane>
                <TabPane
                  title={`${filterChecklistByJobId?.length > 0
                      ? "View Checklist"
                      : "Create Checklist"
                    }`}
                >
                  <section className="my-5">
                    {filterChecklistByJobId?.length > 0 ? (
                      <ViewTaskChecklist id={id} />
                    ) : (
                      <CreateChecklistContent id={id} />
                    )}
                  </section>
                </TabPane>
              </Tabs>
            </>
          )}
        </Container>
      </main>
    </>
  );
}

export default EditTask;
