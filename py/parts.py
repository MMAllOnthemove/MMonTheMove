import os
import requests

def get_so_parts_info(part_number: str):
    ipaas_api_url = ""
    bearer_token = ""
    company = ""
    asc_code = ""
    lang = ""
    country = ""
    pac = ""
    
    if not part_number:
        return None
    
    options = {
        "IsCommonHeader": {
            "Company": company,
            "AscCode": asc_code,
            "Lang": lang,
            "Country": country,
            "Pac": pac,
        },
        "IvPartsNo": part_number,
    }
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {bearer_token}",
    }
    
    try:
        response = requests.post(ipaas_api_url, json=options, headers=headers)
        # Debug: Check the status and content of the response
        print("Response Status Code:", response.status_code)
        print("Response Content:", response.json())
        response.raise_for_status()
        return response.json()
    except requests.RequestException as error:
        if os.getenv("NODE_ENV") != "production":
            print("Error fetching GSPN Info API:", error)
        return None

get_so_parts_info("GH82-33133A")