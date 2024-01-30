import {
  IgetSOInfoAll,
  IgetSOStatusDescLatest,
  IgetPartsInfo,
  IpostBookingAgentsJobs,
  IgetStockOverviewInfo,
  IgetSOInfoAllParts,
  IgetSOInfoAllDtv,
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
export async function getSOInfoAllFunctionDtv(props: IgetSOInfoAllDtv) {
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
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      props.setAcknowledgeDate(data?.Return.EsScheInfo.ASCAckDate);
      props.setAcknowledgeTime(data?.Return.EsScheInfo.ASCAckTime);
      props.setEngineerAssignDate(data?.Return.EsScheInfo.EngrAssignDate);
      props.setEngineerAssignTime(data?.Return.EsScheInfo.EngrAssignTime);
      props.setEngineer(data?.Return.EsScheInfo.EngineerName);
      props.setModel(data?.Return.EsModelInfo.Model);
      props.setRemark(data?.Return.EsModelInfo.Remark);
      props.setSerialNumber(data?.Return.EsModelInfo.SerialNo);
      props.setServiceOrder(data?.Return.EsHeaderInfo.SvcOrderNo);
      props.setCreatedDate(data?.Return.EsHeaderInfo.CreateDate);
      props.setCreatedTime(data?.Return.EsHeaderInfo.CreateTime);
      props.setWarranty(data?.Return.EsModelInfo.WtyType);
      props.setWarrantyRepairType(data?.Return.EsWtyInfo.WtyRepairType);
      props.setFault(data?.Return.EsModelInfo.DefectDesc);
      props.setImei(data?.Return.EsModelInfo.IMEI);
      props.setCustomerEmail(data?.Return.EsBpInfo.CustEmail);
      props.setCustomerFirstName(data?.Return.EsBpInfo.CustFirstName);
      props.setCustomerLastName(data?.Return.EsBpInfo.CustLastName);
      props.setCustomerStreetAddress(data?.Return.EsBpInfo.CustAddrStreet1);
      props.setCustomerStreetAddressTwo(data?.Return.EsBpInfo.CustAddrStreet2);
      props.setCustomerCity(data?.Return.EsBpInfo.CustCity);
      props.setCustomerCountry(data?.Return.EsBpInfo.CustCountry);
      props.setCustomerProvince(data?.Return.EsBpInfo.CustStateDesc);
      props.setCustomerDistrict(data?.Return.EsBpInfo.CustDistrict);
      props.setCustomerHomePhone(data?.Return.EsBpInfo.CustHomePhone);
      props.setCustomerMobilePhone(data?.Return.EsBpInfo.CustMobilePhone);
    });
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
    `https://eu.ipaas.samsung.com/eu/gcic/GetPartsInfo/1.0/ImportSet`,
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
  // console.log(data);
  if (data) {
    props.setData(data);
  }
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
  await fetch(
    `https://eu.ipaas.samsung.com/eu/gcic/GetBranchStockOverview/1.0/ImportSet`,
    {
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
    }
  )
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
type TgetPartsInfoForServiceOrder = {
  searchServiceOrder: string;
  setPartsAssignedForJob: (order: string) => void;
};
export async function getPartsInfoForServiceOrder(
  props: TgetPartsInfoForServiceOrder
) {
  const options = {
    IsCommonHeader: {
      Company: `${process.env.NEXT_PUBLIC_COMPANY}`,
      AscCode: `${process.env.NEXT_PUBLIC_ASC_CODE}`,
      Lang: `${process.env.NEXT_PUBLIC_LANG}`,
      Country: `${process.env.NEXT_PUBLIC_COUNTRY}`,
      Pac: `${process.env.NEXT_PUBLIC_PAC}`,
    },
    IvSvcOrderNo: props.searchServiceOrder,
  };
  try {
    await fetch(`${process.env.NEXT_PUBLIC_IPAAS_API_SEARCH_PARTS}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_IPASS}`,
      },
      body: JSON.stringify(options),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data?.EtPartsInfo !== null) {
          const parts = data?.EtPartsInfo?.results?.map((i: any) => i.PartsNo);
          // console.log("parts", parts);
          return props.setPartsAssignedForJob(parts);
        } else {
          return props.setPartsAssignedForJob("") as any;
        }
      });
  } catch (error) {
    // console.log("Ipaas parts info error", error);
  }
}
