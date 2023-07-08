import React, { useState, useEffect } from "react";
import Head from "next/head";
// Next auth session hook
import { useSession } from "next-auth/react";
import Login from "../auth/login";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

function Report() {
  // Google auth session
  const { data: session } = useSession();

  const [issue_title, setIssueTitle] = useState("");
  const [issue_body, setIssueBody] = useState("");
  const [userInfo, setUserInfo] = useState<string | null | undefined>("");

  useEffect(() => {
    // Setting the user info here because it's coming from google auth
    setUserInfo(session?.user?.name);
  }, []);

  // Chakra ui toast
  const toast = useToast();
  const router = useRouter();
  const postFeedback = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL_FEEDBACK}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            issue_title,
            issue_body,
            userInfo,
          }),
        }
      );
      if (response) {
        toast({
          title: "Job added.",
          description: "You've added a job to the table.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (session) {
    return (
      <>
        <Head>
          <title>Report a problem</title>
        </Head>
        <main className="flex justify-center h-screen items-center flex-col">
          <div className="container mx-auto">
            <h1 className="mb-4 font-extrabold text-gray-900 text-center font-sans text-xl dark:text-white">
              Report a problem
            </h1>
            <article className="rounded-md border border-slate-100 p-2 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={postFeedback}>
                <label htmlFor="issue_title" className="sr-only">
                  Subject
                </label>
                <select
                  name="issue_title"
                  id="issue_title"
                  className="mb-2 bg-white outline-none border border-gray-300 outline-0 text-gray-900 font-sans font-semibold text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  value={issue_title}
                  onChange={(e) => setIssueTitle(e.target.value)}
                >
                  <option value="" disabled>
                    Select subject
                  </option>
                  <option value="cannot add info to table">
                    Cannot add info to table
                  </option>
                  <option value="cannot update info on table">
                    Cannot update info on table
                  </option>
                  <option value="cannot update delete info from table">
                    Cannot update delete info from table
                  </option>
                </select>
                <label
                  htmlFor="issue_body"
                  className="block mb-2 text-sm font-medium font-sans text-gray-900 dark:text-white"
                >
                  Issue body
                </label>
                <textarea
                  name="issue_body"
                  id="issue_body"
                  className="mb-2 bg-white border resize-none border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full outline-0 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  value={issue_body}
                  onChange={(event) => setIssueBody(event.target.value)}
                ></textarea>
                <button
                  type="submit"
                  className="bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus: text-white font-semibold font-sans rounded py-3 px-2 my-2 w-full"
                >
                  Send Report
                </button>
              </form>
            </article>
          </div>
        </main>
      </>
    );
  } else {
    return <Login />;
  }
}

export default Report;
