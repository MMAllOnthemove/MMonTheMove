interface IgetDtvTasks {
  setDtvTasks: (order: string | any) => void;
}

export const getDtvTasks = async ({ setDtvTasks }: IgetDtvTasks) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_JOBS}/get`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setDtvTasks(data);
  } catch (error) {}
};
