import requests

# URL of the API
url = ""
auth_token = ""
headers = {
    "Authorization": f"Bearer {auth_token}"
}

try:
    # Send a GET request to the URL
    response = requests.get(url,headers=headers)
    
    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        data = response.json()  # Convert response to JSON
         # Access the "tickets" list from the response
        tickets = data.get("tickets", [])  # Default to an empty list if "tickets" key is missing
        filtered_list = [ticket for ticket in tickets if ticket.get("problem_type") in ['HHP (Robtronics)', 'HHP(Mobile Phone/Tablets)', 'HHP (DSV)', 'Dunoworx (HHP)']]
        # filtered_list = [tickets for tickets in data if tickets["problem_type"] in ['HHP (Robtronics)', 'HHP(Mobile Phone/Tablets)', 'HHP (DSV)', 'Dunoworx (HHP)']]
         # Extract ticket numbers and display them
        ticket_numbers = [ticket.get("number") for ticket in filtered_list]
        
        
        if filtered_list:
            print("Filtered Ticket Numbers and Created Dates:")
            for ticket in filtered_list:
                number = ticket.get("number", "N/A")
                created_at = ticket.get("created_at", "N/A")
                print(f"Ticket Number: {number}, Created At: {created_at}")
        else:
            print("No tickets found with the specified problem types.")
    else:
        print(f"Failed to fetch data. Status code: {response.status_code}")
except requests.exceptions.RequestException as e:
    print(f"An error occurred: {e}")
