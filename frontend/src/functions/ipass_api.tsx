import {
  IgetSOInfoAll,
  IgetSOStatusDescLatest,
  IgetPartsInfo,
  IpostBookingAgentsJobs,
  IgetStockOverviewInfo,
  IgetSOInfoAllParts,
} from "../../utils/interfaces";

export async function getSOInfoAllFunction({
  searchServiceOrder,
  setServiceOrder,
  setCreatedDate,
  setCreatedTime,
  setModel,
  setWarranty,
  setFault,
  setImei,
  setSerialNumber,
  setEngineerAssignDate,
  setEngineerAssignTime,
  setGSPNStatus,
}: IgetSOInfoAll) {
  const options = {
    IvSvcOrderNo: searchServiceOrder,
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

  setServiceOrder(data?.Return?.EsHeaderInfo?.SvcOrderNo);
  setCreatedDate(data?.Return?.EsHeaderInfo?.CreateDate);
  setCreatedTime(data?.Return?.EsHeaderInfo?.CreateTime);
  setModel(data?.Return?.EsModelInfo?.Model);
  setWarranty(data?.Return?.EsModelInfo?.WtyType);
  setFault(data?.Return?.EsModelInfo?.DefectDesc);
  setImei(data?.Return?.EsModelInfo?.IMEI);
  setSerialNumber(data?.Return?.EsModelInfo?.SerialNo);
  setEngineerAssignDate(data?.Return?.EsScheInfo?.EngrAssignDate);
  setEngineerAssignTime(data?.Return?.EsScheInfo?.EngrAssignTime);
  setGSPNStatus(data?.EtFlowInfo?.results?.map((x: any) => x.StatusDesc));
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
    `${process.env.NEXT_PUBLIC_IPAAS_API_SEARCH_PARTS}`,
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
  if (response.ok) {
    const data = await response.json();
    props.setData(data);
  } else {
    return <p>Loading...</p>;
  }
  // console.log(data);
}

export async function postBookingAgentsJobs({
  searchServiceOrder,
  setServiceOrder,
  setCreatedDate,
  setCreatedTime,
  setWarranty,
}: IpostBookingAgentsJobs) {
  const options = {
    IvSvcOrderNo: searchServiceOrder,
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
  setServiceOrder(data?.Return?.EsHeaderInfo?.SvcOrderNo);
  setCreatedDate(data?.Return?.EsHeaderInfo?.CreateDate);
  setCreatedTime(data?.Return?.EsHeaderInfo?.CreateTime);
  setWarranty(data?.Return?.EsModelInfo?.WtyType);
}

export async function getStockOverviewInfo({
  debouncedSearch,
  setStockData,
}: IgetStockOverviewInfo) {
  const options = {
    IvCompany: `${process.env.NEXT_PUBLIC_COMPANY}`,
    IvLanguage: `${process.env.NEXT_PUBLIC_LANG}`,
    IvAscAcctno: `${process.env.NEXT_PUBLIC_ASC_CODE}`,
    IvAscCode: `${process.env.NEXT_PUBLIC_ASC_CODE}`,
    IvPartsCode: debouncedSearch,
    IsCommonHeader: {
      Company: `${process.env.NEXT_PUBLIC_COMPANY}`,
      AscCode: `${process.env.NEXT_PUBLIC_ASC_CODE}`,
      Lang: `${process.env.NEXT_PUBLIC_LANG}`,
      Country: `${process.env.NEXT_PUBLIC_COUNTRY}`,
      Pac: `${process.env.NEXT_PUBLIC_PAC}`,
      Systemkey: "",
      Msgid: "",
    },
  };
  await fetch(`${process.env.NEXT_PUBLIC_IPAAS_API_GetBranchStockOverview}`, {
    method: "POST",
    mode: "cors",
    cache: "force-cache",
    next: { revalidate: 10 },
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_IPASS}`,
    },
    body: JSON.stringify(options),
  })
    .then((response) => response.json())
    .then((data) => {
      setStockData(data);
      // console.log(data);
    });
}
export async function getSOInfoAllFunctionForParts({
  searchServiceOrder,
  setServiceOrder,
  setModel,
  setWarranty,
  setFault,
  setImei,
  setSerialNumber,
}: IgetSOInfoAllParts) {
  const options = {
    IvSvcOrderNo: searchServiceOrder,
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

  setServiceOrder(data?.Return?.EsHeaderInfo?.SvcOrderNo);
  setModel(data?.Return?.EsModelInfo?.Model);
  setWarranty(data?.Return?.EsModelInfo?.WtyType);
  setFault(data?.Return?.EsModelInfo?.DefectDesc);
  setImei(data?.Return?.EsModelInfo?.IMEI);
  setSerialNumber(data?.Return?.EsModelInfo?.SerialNo);
}
