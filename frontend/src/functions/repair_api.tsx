interface IRepairTicketInfo {
  searchTicketNumber: string;
  setTicketNumber: (order: string) => void;
}

export async function getRepairTicketInfo(props: IRepairTicketInfo) {
  await fetch(`${process.env.NEXT_PUBLIC_REPAIRSHOPR_LINK}`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_LINK}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      //
    })
    .catch((e) => {
      //
    });
}
