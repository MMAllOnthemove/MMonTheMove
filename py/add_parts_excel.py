import requests
import pandas as pd
import time
import os
from openpyxl import load_workbook
from requests.exceptions import RequestException


# Rate limit and retry settings
MAX_RETRIES = 5
INITIAL_BACKOFF = 1  # Start at 1 second, double on each failure
EXCEL_FILENAME = "parts_details.xlsx"  # Excel file name

# Step 1: Get all parts from RS
def get_parts_from_api_1():
    api_1_url = "https://allelectronics.repairshopr.com/api/v1/products"  # Replace with your actual RS URL
    headers = {
        "Authorization": "Bearer ",  # Replace with actual token
        "Content-Type": "application/json",
    }
    all_parts = []
    page = 300
    while True:
           
       print(f"Fetching page {page}...")

       try:
            response = requests.get(f"{api_1_url}?page={page}", headers=headers)
            response.raise_for_status()  # Raise exception for HTTP errors

            data = response.json()
            parts = data.get("products", [])

            if not parts:
                print("No more products found. Stopping.")
                break

            all_parts.extend(parts)
            # Check if more pages exist
            total_pages = data.get("meta", {}).get("total_pages", 1)
            if page >= 310:
                break  # Stop when last page is reached

            page += 1  # Next page
            time.sleep(1)  # Delay to avoid hitting rate limits
       except RequestException as e:
           print(f"Error fetching page {page}: {e}")
           time.sleep(5)  # Wait before retrying
           continue
       
    return all_parts

          





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

    backoff = INITIAL_BACKOFF

    for attempt in range(MAX_RETRIES):
        try:
            response = requests.post(ipaas_api_url, json=options, headers=headers)
            response.raise_for_status()

            data = response.json()
            part_info = data.get("Return", {}).get("EsPartsInfo", {})
            print(f"Part {part_info}")
            # Extract fields
            return (
                part_info.get("UnitPrice"),
                part_info.get("PartsDescription"),
                part_info.get("DivisionDesc"),
            )

        except RequestException as e:
            print(f"Error fetching info for {part_number}, attempt {attempt + 1}: {e}")
            time.sleep(backoff)
            backoff *= 2  # Exponential backoff

    return None, None, None  # Return None after max retries


# Function to append new data to an existing Excel file
def append_to_excel(new_data):
    if os.path.exists(EXCEL_FILENAME):
        existing_df = pd.read_excel(EXCEL_FILENAME, engine="openpyxl")  # Load existing data
        df = pd.concat([existing_df, new_data], ignore_index=True)  # Append new rows
    else:
        df = new_data  # If file doesn't exist, create a new one

    df.to_excel(EXCEL_FILENAME, index=False, engine="openpyxl")  # Save to Excel
    print(f"Data appended to '{EXCEL_FILENAME}' successfully.")



# Step 3: Fetch all parts and get details from API 2
def generate_excel():
    # page = input("Enter page number to fetch: ").strip()
    parts = get_parts_from_api_1()
    data = []
    

    for index, part in enumerate(parts):
        part_number = part.get("upc_code")  # Adjust based on API response

        if part_number:
            retail_price, description, division_desc = get_so_parts_info(part_number)

            data.append({
                "Part Number": part_number,
                "Unit Price GSPN": retail_price,
                "Description": description or part.get("description"),
                "Category": part.get("product_category"),
                "Cost Price Repairshopr": part.get("price_cost"),
                "Retail Price Repairshopr": part.get("price_retail"),
                "Division": division_desc
            })

        if index % 20 == 0:  # Print progress every 20 parts
            print(f"Processed {index + 1}/{len(parts)} parts...")
        print(f"Sleeping for 5 seconds to avoid rate limit...")
        time.sleep(0.5)  # Small delay to prevent rate limit issues

    # Convert to DataFrame and append to Excel
    new_df = pd.DataFrame(data)
    append_to_excel(new_df)

    print(f"Excel file '{new_df}' generated successfully.")

# Run the script
if __name__ == "__main__":
    generate_excel()
