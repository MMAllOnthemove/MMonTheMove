import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"

interface IOtpValues {
  otp: string;
}
function Update() {
  const [ipAddress, setIp] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const update = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_IPIFY}`)
      .then((res) => res.json())
      .then((data) => {
        setIp(data?.ip);
      });
  };
  useEffect(() => {
    update();
  }, [ipAddress]);

  const submit = async () => {
    const values = {
      ipAddress,
      otp,
    };

    axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_OTP}`,
      values
    ).then(function (response) {
      if (response) {
        toast.success("Successfully created!");
        router.push("/");
      }
    })
      .catch(function (error) {
        router.push("/");
        toast.error(`${error.response.data}`);

      });

  };

  return (
    <main className="updatePage">
      <article className="updatePageCard">
        <span className="mb-3 mt-4 form_input_row">
          <label
            htmlFor="otp"
            className="block mb-2 text-sm font-medium  text-gray-900 dark:text-[#eee]"
          >
            OTP
          </label>
          <input
            name="otp"
            value={otp}
            maxLength={5}
            onChange={(e) => setOtp(e.target.value)}
            className="mb-2 bg-white dark:bg-[#22303C] dark:text-[#eee] border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </span>

        <button
          onClick={submit}
          type="button"
          className="bg-[#082f49] w-full  font-semibold text-white dark:text-[#eee] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-sm text-sm px-5 py-2.5 text-center my-3"
        >
          Send
        </button>
      </article>
    </main>
  );
}

export default Update;
