import moment from "moment";

interface IgetRepair {
  searchTicket: string | number;
  setRepairFault: (order: string) => void;
  setRepairCreatedDate: (order: string) => void;
  setRepairCreatedTime: (order: string) => void;
  setRepairEngineerAssignDate: (order: string) => void;
  setRepairEngineerAssignTime: (order: string) => void;
  setRepairImei: (order: string) => void;
  setRepairServiceOrder: (order: string) => void;
  setRepairTicket: (order: string) => void;
  setRepairEngineerAnalysis: (order: string) => void;
  setRepairDepartment: (order: string) => void;
  setRepairAPILoading: (order: boolean) => void;
}

export async function getRepair(props: IgetRepair) {
  await fetch(
    `https://allelectronics.repairshopr.com/api/v1/tickets?number=${props.searchTicket}`,

    {
      method: "GET",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      props.setRepairFault(data?.tickets[0]?.subject || "");
      props.setRepairCreatedDate(
        moment(new Date(`${data?.tickets[0]?.created_at}`)).format(
          "YYYYMMDD"
        ) || ""
      );
      props.setRepairCreatedTime(
        moment(`${data?.tickets[0]?.created_at}`).format("HHMMSS") || ""
      );
      props.setRepairEngineerAssignDate("");
      props.setRepairEngineerAssignTime("");
      props.setRepairImei(data?.tickets[0]?.properties["IMEI"] || "");
      props.setRepairServiceOrder(
        data?.tickets[0]?.properties["Service Order No."] || ""
      );
      props.setRepairTicket(data?.tickets[0]?.number || "");
      props.setRepairEngineerAnalysis("");
      props.setRepairDepartment("HHP");
      props.setRepairAPILoading(false);
    });
}

interface IgetTicketNumberOnJobAdd {
  searchServiceOrder: string;
  setTicket: (order: string) => void;
}
export async function getTicketNumberOnJobAdd(props: IgetTicketNumberOnJobAdd) {
  await fetch(
    `https://allelectronics.repairshopr.com/api/v1/tickets?number=${props.searchServiceOrder}`,

    {
      method: "GET",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      props.setTicket(data?.tickets[0]?.number || "");
    });
}
