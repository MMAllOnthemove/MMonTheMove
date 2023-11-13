interface IgetProfile {
  setUserData: (value: string | any) => void;
}

export const getProfile = async ({ setUserData }: IgetProfile) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/dashboard/`,
      {
        method: "POST",

        // headers: { jwt_token: localStorage.token },
        // credentials: "include",
        headers: {
          "Content-type": "application/json",
          jwt_token: localStorage.token,
        },
      }
    );

    const getUserData = await res.json();
    // console.log(getUserData);
    setUserData(getUserData.email);
  } catch (err) {
    console.log(err);
  }
};
