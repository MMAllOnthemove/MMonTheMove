import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

type TAssetUpdateRepairshopr = {
    asset_type_name: string | undefined;
    // asset_type_id?: string | number | undefined;
    properties: {
        "Model No.:": string | undefined;
        "IMEI No.": string | undefined;
    };
    name: string | undefined;
    customer_id: number | null | undefined;
    asset_serial: string | undefined;
};

const useUpdateAssetRepairshopr = () => {
    const [updateAssetRepairshoprLoading, setLoading] = useState(false);
    const updateAssetRepairshopr = async (
        assetId: string | number | undefined,
        values: TAssetUpdateRepairshopr
    ) => {
        try {
            setLoading(true);
            const response = await axios.put(
                `https://allelectronics.repairshopr.com/api/v1/customer_assets/${assetId}`,
                values,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_REPAIRSHOPR_TOKEN}`,
                    },
                }
            );
          
            return response;
        } catch (error: any) {
            console.error("useUpdateAssetRepairshopr error", error);
            if (error?.response?.data?.message.length > 0) {
                const errors = error?.response?.data?.message;
                toast.error(errors);
            }
        } finally {
            setLoading(false);
        }
    };

    return { updateAssetRepairshopr, updateAssetRepairshoprLoading };
};

export default useUpdateAssetRepairshopr;
// todo: remove
// {
//     "data": {
//         "asset": {
//             "id": 9708669,
//             "name": "SM-A705X",
//             "customer_id": 31383993,
//             "contact_id": null,
//             "created_at": "2024-05-10T08:26:04.743+02:00",
//             "updated_at": "2025-04-11T15:00:53.119+02:00",
//             "properties": {
//                 "Model No.:": "SM-A705X",
//                 "IMEI No.": "3589759923949171234"
//             },
//             "asset_type": "HHP",
//             "asset_serial": "R58M45H62WE",
//             "external_rmm_link": null,
//             "customer": {
//                 "id": 31383993,
//                 "firstname": "Carrie",
//                 "lastname": "Thickle",
//                 "fullname": "Carrie Thickle",
//                 "business_name": "test biz",
//                 "email": "mmalldev22@gmail.com",
//                 "phone": "123456789",
//                 "mobile": "0839392755",
//                 "created_at": "2024-03-05T15:14:24.066+02:00",
//                 "updated_at": "2025-04-01T15:25:12.424+02:00",
//                 "pdf_url": null,
//                 "address": "Kamp St, Gardens, Cape Town, 8001, South Africa",
//                 "address_2": "",
//                 "city": "",
//                 "state": "",
//                 "zip": "",
//                 "latitude": -33.9356237,
//                 "longitude": 18.4129779,
//                 "notes": null,
//                 "get_sms": false,
//                 "opt_out": true,
//                 "disabled": false,
//                 "no_email": false,
//                 "location_id": null,
//                 "properties": {
//                     "Reg No.": "",
//                     "Vat No.": "",
//                     "notification_billing": "1",
//                     "notification_reports": "1",
//                     "notification_marketing": "0"
//                 },
//                 "online_profile_url": "https://allelectronics.repairshopr.com/my_profile/v2/index?portal_key=5y5s2s31mua9rfxwbo1s",
//                 "tax_rate_id": null,
//                 "notification_email": "",
//                 "invoice_cc_emails": "",
//                 "invoice_term_id": null,
//                 "referred_by": "",
//                 "ref_customer_id": null,
//                 "business_and_full_name": "test biz - Carrie Thickle",
//                 "business_then_name": "test biz"
//             },
//             "rmm_links": [],
//             "has_live_chat": false,
//             "snmp_enabled": null,
//             "device_info": {
//                 "snmp_config": {
//                     "port": 161,
//                     "enabled": false,
//                     "version": 2,
//                     "community": "public"
//                 }
//             },
//             "since_updated_at": "2025-04-11T15:00:53.119+02:00",
//             "rmm_store": {
//                 "id": 8051125,
//                 "asset_id": 9708669,
//                 "account_id": 28393,
//                 "triggers": {
//                     "bsod_triggered": "false",
//                     "time_triggered": "false",
//                     "no_av_triggered": "false",
//                     "defrag_triggered": "false",
//                     "firewall_triggered": "false",
//                     "app_crash_triggered": "false",
//                     "low_hd_space_triggered": "false",
//                     "agent_offline_triggered": "false",
//                     "smart_failure_triggered": "false",
//                     "device_manager_triggered": "false"
//                 },
//                 "windows_updates": {},
//                 "emsisoft": {},
//                 "general": {},
//                 "created_at": "2024-05-10T08:26:04.758+02:00",
//                 "updated_at": "2024-05-10T08:26:04.758+02:00",
//                 "override_alert_agent_offline_mins": null,
//                 "override_alert_agent_rearm_after_mins": null,
//                 "override_low_hd_threshold": null,
//                 "override_autoresolve_offline_alert": null,
//                 "override_low_hd_thresholds": null
//             },
//             "address": null
//         }
//     },
//     "status": 200,
//     "statusText": "",
//     "headers": {
//         "cache-control": "no-store",
//         "content-type": "application/json; charset=utf-8"
//     },
//     "config": {
//         "transitional": {
//             "silentJSONParsing": true,
//             "forcedJSONParsing": true,
//             "clarifyTimeoutError": false
//         },
//         "adapter": [
//             "xhr",
//             "http",
//             "fetch"
//         ],
//         "transformRequest": [
//             null
//         ],
//         "transformResponse": [
//             null
//         ],
//         "timeout": 0,
//         "xsrfCookieName": "XSRF-TOKEN",
//         "xsrfHeaderName": "X-XSRF-TOKEN",
//         "maxContentLength": -1,
//         "maxBodyLength": -1,
//         "env": {},
//         "headers": {
//             "Accept": "application/json, text/plain, */*",
//             "Content-Type": "application/json",
//             "Authorization": "Bearer T89dce92a69e87c2cf-146ac9c08663f0cc08ff665652aef851"
//         },
//         "method": "put",
//         "url": "https://allelectronics.repairshopr.com/api/v1/customer_assets/9708669",
//         "data": "{\"asset_type_name\":\"HHP\",\"properties\":{\"Model No.:\":\"SM-A705X\",\"IMEI No.\":\"3589759923949171234\"},\"name\":\"SM-A705X\",\"customer_id\":\"31383993\",\"asset_serial\":\"R58M45H62WE\"}"
//     },
//     "request": {}
// }
