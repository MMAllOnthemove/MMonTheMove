import { useEffect, useState } from "react";
import {
  IgetSOInfoAll,
  IgetSOStatusDescLatest,
  IgetPartsInfo,
  IpostBookingAgentsJobs,
  IgetStockOverviewInfo,
  IgetSOInfoAllParts,
} from "../../utils/interfaces";

export const getSOInfoAllFunction = (props: IgetSOInfoAll) => {
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
  useEffect(() => {
    const fetchData = async () => {
      try {
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
        props.setModel(data?.Return?.EsModelInfo?.Model);
        props.setWarranty(data?.Return?.EsModelInfo?.WtyType);
        props.setFault(data?.Return?.EsModelInfo?.DefectDesc);
        props.setImei(data?.Return?.EsModelInfo?.IMEI);
        props.setSerialNumber(data?.Return?.EsModelInfo?.SerialNo);
        props.setEngineerAssignDate(data?.Return?.EsScheInfo?.EngrAssignDate);
        props.setEngineerAssignTime(data?.Return?.EsScheInfo?.EngrAssignTime);
        props.setGSPNStatus(
          data?.EtFlowInfo?.results?.map((x: any) => x.StatusDesc)
        );
      } catch (e) {
        //
      }
    };
    fetchData();
  }, []);

  return {};
};

export const getSOStatusDescLatest = async (props: IgetSOStatusDescLatest) => {
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
};

export const getPartsInfoFunction = async (props: IgetPartsInfo) => {
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
};

export const postBookingAgentsJobs = async (props: IpostBookingAgentsJobs) => {
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
};

export const getStockOverviewInfo = async (props: IgetStockOverviewInfo) => {
  const options = {
    IvCompany: `${process.env.NEXT_PUBLIC_COMPANY}`,
    IvLanguage: `${process.env.NEXT_PUBLIC_LANG}`,
    IvAscAcctno: `${process.env.NEXT_PUBLIC_ASC_CODE}`,
    IvAscCode: `${process.env.NEXT_PUBLIC_ASC_CODE}`,
    IvPartsCode: props.debouncedSearch,
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
      props.setStockData(data);
      // console.log(data);
    });
};
export const getSOInfoAllFunctionForParts = async (
  props: IgetSOInfoAllParts
) => {
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
  props.setModel(data?.Return?.EsModelInfo?.Model);
  props.setWarranty(data?.Return?.EsModelInfo?.WtyType);
  props.setFault(data?.Return?.EsModelInfo?.DefectDesc);
  props.setImei(data?.Return?.EsModelInfo?.IMEI);
  props.setSerialNumber(data?.Return?.EsModelInfo?.SerialNo);
};
