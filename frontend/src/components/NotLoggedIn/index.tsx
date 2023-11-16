import React from "react";
import Button from "../Buttons";
import { useRouter } from "next/router";

function NotLoggedIn() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center m-auto">
      <Button
        type="button"
        text="Login here"
        className="bg-[#082f49] hover:bg-[#075985] active:bg-[#075985] focus:bg-[#075985] text-white font-semibold cursor-pointer dark:text-[#eee] rounded-md p-3 my-2"
        onClick={() => router.push("/auth/login")}
      />
    </div>
  );
}

export default NotLoggedIn;
