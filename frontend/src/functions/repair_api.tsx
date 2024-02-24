import { IRepairTicketId, IRepairTicketInfo } from "../../utils/interfaces";

export async function getRepairTicketId({
  ticket,
  setTicketId,
}: IRepairTicketId) {
  await fetch(`${process.env.NEXT_PUBLIC_REPAIRSHOPR_LINK}`, {
    method: "GET",
    mode: "no-cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}tickets?number=${ticket}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        setTicketId(data?.tickets[0]?.id);
      }
    })
    .catch((e) => {
      //
    });
}
