import moment from "moment";
import { IgetRepair, IgetTicketNumberOnJobAdd } from "../../utils/interfaces";
import axios from "axios";

export async function getRepair(props: IgetRepair) {

  try {
    const { data } = await axios.get(`https://allelectronics.repairshopr.com/api/v1/tickets?query=${props.searchTicket}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
      },
    })
    if (data?.tickets[0]?.number == props.searchTicket) {
      props.setRepairFault(data?.tickets[0]?.subject);
      props.setRepairCreatedDate(
        moment(
          new Date(`${data?.tickets[0]?.created_at}`),
          moment.ISO_8601
        ).format("YYYYMMDD")
      );
      props.setRepairImei(data?.tickets[0]?.properties["IMEI"]);
      props.setRepairServiceOrder(
        data?.tickets[0]?.properties["Service Order No."]
      );
      props.setRepairTicket(data?.tickets[0]?.number);
      props.setRepairId(data?.tickets[0]?.id);
      props.setRepairEngineerAnalysis("");
      props.setRepairDepartment("HHP");
    }
  } catch (error) {

  }
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
      if (
        props.searchServiceOrder ===
        data?.tickets[0]?.properties["Service Order No."]
      ) {
        props.setTicket(data?.tickets[0]?.number || "");
      } else {
        props.setTicket("");
      }
    });
}
