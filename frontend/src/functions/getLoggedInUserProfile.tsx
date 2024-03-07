import { useEffect } from "react";
import { useRouter } from "next/router";
interface IgetProfile {
  setUserData: (value: string | any) => void;
}

export const getUserInfo = () => {
  fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/me`, {
    method: "POST",
    credentials: "include",
    cache: "default",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  }).then((res) => res.json);
};
export const getProfile = async ({ setUserData }: IgetProfile) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/me`,
      {
        method: "POST",
        credentials: "include",
        cache: "default",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    const getUserData = await res.json();
    if (getUserData !== "") setUserData(getUserData.email);
  } catch (err) {}
};

export const logoutUserFunction = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/logout`,
      {
        credentials: "include",
      }
    );
  } catch (err) {}
};
