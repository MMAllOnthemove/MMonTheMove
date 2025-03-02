import requests
import time


API1_URL = "https://api1.example.com/tickets"  # Replace with actual API 1 URL
API2_URL = "https://api2.example.com/tickets"  # Replace with actual API 2 URL
HEADERS = {
    "Authorization": "Bearer ",  # Replace with your API key
    "Content-Type": "application/json"
}

REJECTION_KEYWORDS = ["declined estimate", "reject quote", "rejected quotation"]
APPROVAL_KEYWORDS = ["estimate approved"]

def fetch_tickets_from_api1():
    try:
        response = requests.get("", headers={
            "Content-Type": "application/json"
            
        })
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error fetching tickets from API 1: {e}")
        return []

def fetch_ticket_from_api2(ticket_number):
    try:
        response = requests.get(f"={ticket_number}", headers=HEADERS)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error fetching ticket {ticket_number} from API 2: {e}")
        return None

def update_api1(ticket_id, update_data):
    try:
        response = requests.patch(f"/{ticket_id}", json=update_data,  headers={
            "Content-Type": "application/json"
            
        })
        response.raise_for_status()
        print(f"Updated API 1 for ticket {ticket_id}: {update_data}")
    except requests.RequestException as e:
        print(f"Error updating API 1 for ticket {ticket_id}: {e}")

def process_tickets():
    tickets = fetch_tickets_from_api1()
    filtered_tickets = [ticket for ticket in tickets if not (ticket.get("quote_rejected") or ticket.get("quote_accepted"))]
    for ticket in filtered_tickets:
        print(f"Processing ticket: {ticket['ticket_number']}")
        ticket_data = fetch_ticket_from_api2(ticket['ticket_number'])
        
        if not ticket_data or 'tickets' not in ticket_data or not ticket_data['tickets']:
            print(f"No data found in API 2 for ticket {ticket['ticket_number']}")
            continue
        
        comments = ticket_data['tickets'][0].get('comments', [])
        quote_rejected = False
        quote_accepted = False
        
        for comment in comments:
            comment_text = comment.get('body', '').lower()
            if any(keyword in comment_text for keyword in REJECTION_KEYWORDS):
                quote_rejected = True
                break
            if not quote_rejected and any(keyword in comment_text for keyword in APPROVAL_KEYWORDS):
                quote_accepted = True
        
        if quote_rejected:
            update_api1(ticket['id'], {"quote_rejected": True})
        elif quote_accepted:
            update_api1(ticket['id'], {"quote_accepted": True})
        
        time.sleep(2)  # 2-second delay before processing the next ticket

if __name__ == "__main__":
    process_tickets()
