import { useEffect } from "react";
import { useRouter } from "next/router";
interface IgetProfile {
  setUserData: (value: string | any) => void;
}

export const getProfile = async ({ setUserData }: IgetProfile) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/`, {
      method: "POST",
      credentials: "include",
      cache: "default",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const getUserData = await res.json();

    setUserData(getUserData.email);
  } catch (err) {
    // console.log(err);
  }
};

export const logoutUserFunction = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/logout`,
      {
        credentials: "include",
      }
    );
  } catch (err) {
    console.log(err);
  }
};
