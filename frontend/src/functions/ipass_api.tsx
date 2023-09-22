interface IgetSOInfoAll {
  searchServiceOrder: string;
  setServiceOrder: (order: string) => void;
  setCreatedDate: (order: string) => void;
  setCreatedTime: (order: string) => void;
  setModel: (order: string) => void;
  setWarranty: (order: string) => void;
  setFault: (order: string) => void;
  setImei: (order: string) => void;
  setSerialNumber: (order: string) => void;
  setEngineerAssignDate: (order: string) => void;
  setEngineerAssignTime: (order: string) => void;
  setGSPNStatus: (order: string) => void;
}
interface IgetSOStatusDescLatest {
  showServiceOrderNumber: string;
  setGSPNStatus: (order: string) => void;
}
interface IgetPartsInfo {
  debouncedSearch: string | any;
  setData: (data: any) => void;
}
interface IpostBookingAgentsJobs {
  searchServiceOrder: string;
  setServiceOrder: (order: string) => void;
  setCreatedDate: (order: string) => void;
  setCreatedTime: (order: string) => void;
  setWarranty: (order: string) => void;
  setBookingAgent: (order: string) => void;
}

export async function getSOInfoAllFunction(props: IgetSOInfoAll) {
  const options = {
    IvSvcOrderNo: props.searchServiceOrder,
    IsCommonHeader: {
      Company: `${process.env.NEXT_PUBLIC_COMPANY}`,
      AscCode: `${process.env.NEXT_PUBLIC_ASC_CODE}`,
      Lang: `${process.env.NEXT_PUBLIC_LANG}`,
      Country: `${process.env.NEXT_PUBLIC_COUNTRY}`,
      Pac: `${process.env.NEXT_PUBLIC_PAC}`,
    },
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_IPAAS_API_GETSOINFOALL}`,
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_IPASS}`,
      },
      body: JSON.stringify(options),
    }
  );

  const data = await response.json();

  props.setServiceOrder(data?.Return?.EsHeaderInfo?.SvcOrderNo);
  props.setCreatedDate(data?.Return?.EsHeaderInfo?.CreateDate);
  props.setCreatedTime(data?.Return?.EsHeaderInfo.CreateTime);
  props.setModel(data?.Return?.EsModelInfo?.Model);
  props.setWarranty(data?.Return?.EsModelInfo?.WtyType);
  props.setFault(data?.Return?.EsModelInfo?.DefectDesc);
  props.setImei(data?.Return?.EsModelInfo?.IMEI);
  props.setSerialNumber(data?.Return?.EsModelInfo?.SerialNo);
  props.setEngineerAssignDate(data?.Return?.EsScheInfo?.EngrAssignDate);
  props.setEngineerAssignTime(data?.Return?.EsScheInfo?.EngrAssignTime);
  props.setGSPNStatus(data?.EtFlowInfo?.results?.map((x: any) => x.StatusDesc));
}
export async function getSOStatusDescLatest(props: IgetSOStatusDescLatest) {
  const options = {
    IvSvcOrderNo: props.showServiceOrderNumber,
    IsCommonHeader: {
      Company: `${process.env.NEXT_PUBLIC_COMPANY}`,
      AscCode: `${process.env.NEXT_PUBLIC_ASC_CODE}`,
      Lang: `${process.env.NEXT_PUBLIC_LANG}`,
      Country: `${process.env.NEXT_PUBLIC_COUNTRY}`,
      Pac: `${process.env.NEXT_PUBLIC_PAC}`,
    },
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_IPAAS_API_GETSOINFOALL}`,
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_IPASS}`,
      },
      body: JSON.stringify(options),
    }
  );
  const data = await response.json();
  props.setGSPNStatus(data?.EtLogInfo?.results?.map((x: any) => x.StatusDesc));
}

export async function getPartsInfoFunction(props: IgetPartsInfo) {
  const options = {
    IsCommonHeader: {
      Company: `${process.env.NEXT_PUBLIC_COMPANY}`,
      AscCode: `${process.env.NEXT_PUBLIC_ASC_CODE}`,
      Lang: `${process.env.NEXT_PUBLIC_LANG}`,
      Country: `${process.env.NEXT_PUBLIC_COUNTRY}`,
      Pac: `${process.env.NEXT_PUBLIC_PAC}`,
    },
    IvPartsNo: props.debouncedSearch,
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_IPAAS_API_GETSOINFOALL}`,
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_IPASS}`,
      },
      body: JSON.stringify(options),
    }
  );
  const data = await response.json();
  props.setData(data);
  // console.log(data);
}

export async function postBookingAgentsJobs(props: IpostBookingAgentsJobs) {
  const options = {
    IvSvcOrderNo: props.searchServiceOrder,
    IsCommonHeader: {
      Company: `${process.env.NEXT_PUBLIC_COMPANY}`,
      AscCode: `${process.env.NEXT_PUBLIC_ASC_CODE}`,
      Lang: `${process.env.NEXT_PUBLIC_LANG}`,
      Country: `${process.env.NEXT_PUBLIC_COUNTRY}`,
      Pac: `${process.env.NEXT_PUBLIC_PAC}`,
    },
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_IPAAS_API_GETSOINFOALL}`,
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_IPASS}`,
      },
      body: JSON.stringify(options),
    }
  );

  const data = await response.json();
  props.setServiceOrder(data?.Return?.EsHeaderInfo?.SvcOrderNo);
  props.setCreatedDate(data?.Return?.EsHeaderInfo?.CreateDate);
  props.setCreatedTime(data?.Return?.EsHeaderInfo?.CreateTime);
  props.setWarranty(data?.Return?.EsModelInfo?.WtyType);
  props.setBookingAgent(data?.EtLogInfo?.results[0]?.ChangedBy);
}
