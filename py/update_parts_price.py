import os
import requests
import json
import time

# Step 1: Get all parts from RS
def get_parts_from_api_1():
    api_1_url = ""  # Replace with your actual RS URL
    headers = {
        "Authorization": "Bearer ",  # Replace with actual token
        "Content-Type": "application/json",
    }

    try:
        response = requests.get(api_1_url, headers=headers)
        response.raise_for_status()
        # print(response.json())
        return response.json().get(
            "products", []
        )  # Assuming the response is a list of parts
    except requests.RequestException as error:
        print("Error fetching parts from RS:", error)
        return []


# Step 2: Get price for a part from API 2
def get_so_parts_info(part_number: str):
    ipaas_api_url = ""
    bearer_token = ""
    company = ""
    asc_code = ""
    lang = ""
    country = ""
    pac = ""

    if not part_number:
        return None, None, None

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
        # print("Response Status Code:", response.status_code)
        # print("Response Content:", response.json())
        response.raise_for_status()
        data = response.json()
        part_info = data.get("Return", {}).get("EsPartsInfo", {})

        # Extract relevant fields
        retail_price = part_info.get("UnitPrice", None)
        description = part_info.get("PartsDescription", None)
        division_desc = part_info.get("DivisionDesc", None)
        
        return retail_price, description, division_desc


    except requests.RequestException as error:
        print(f"Error fetching info for {part_number} from API 2:", error)
        return None, None, None


# Step 3: Update part price in RS
def update_price_in_api_1(part_id, new_price, new_description, new_category):
    api_1_url = f"/{part_id}"  # Replace with actual RS URL for updating
    headers = {
        "Authorization": "Bearer ",  # Replace with actual token
        "Content-Type": "application/json",
    }
    # payload = {
    #     "price_cost": float(new_price)
    # }
    payload = {}

    if new_price:
        payload["price_cost"] = float(new_price)
    if new_description:
        payload["description"] = new_description
    if new_category:
        payload["product_category"] = new_category
        payload["category_path"] = new_category
        
    if not payload:
        print(f"No updates needed for part ID {part_id}. Skipping...")

    try:
        response = requests.put(api_1_url, json=payload, headers=headers)
        response.raise_for_status()
        print(f"Successfully updated price for part ID {part_id} to {new_price}")
    except requests.RequestException as error:
        print(f"Error updating price for part ID {part_id}:", error)


# Main function to loop through the parts and update prices
def update_parts_prices():
    parts = get_parts_from_api_1()  # Step 1: Get all parts from RS
    print(parts)

    if not parts:
        print("No parts found.")
        return

    for part in parts:
        part_name = part.get("upc_code")
        part_id = part.get("id")  # Assuming each part has an "id"
        
        if not part_id or not part_name:
            print(f"Skipping part with missing ID or Part name: {part}")
            continue
        
        print(f"Fetching info for part name: {part_name}...")
        retail_price, description, division_desc = get_so_parts_info(part_name)
        
        print(retail_price, description, division_desc)
        
        # todo: uncomment
        if retail_price or description or division_desc:
            update_price_in_api_1(part_id, retail_price, description, division_desc)
        # else:
            print(f"No valid data found for part name {part_name}. Skipping update.")
            
            #  Add a short delay to prevent rate limits
        time.sleep(1)
   


if __name__ == "__main__":
    update_parts_prices()
