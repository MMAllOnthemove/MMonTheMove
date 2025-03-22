# Pesudo testing (end to end)

## Authentication

1. App will have a screen with a login button with text 'Login'
2. User taken to auth screen with a tab that has Login and Signup
    1. Under Login:
    - Has the text 'Signin to your account'
    - The email field will have label 'Label'
    - Type email in email field
    - The password field will have label 'Password'
    - Type password in the password field
    - Can click toggle password button to toggle password
    - Click submit button with text 'Continue'
    - The 'Forgot password' link does not work as yet
    - Logging in with existing details or credentials should show 'Invalid credentials'
    - Logging in with none existing details or credentials should also show 'Invalid credentials'
    - If password is incorrect show 'Invalid credentials'
    - If email and password check out, show success message 'Successfully logged in' and route to home screen
    2. Under Signup:
    - Has the text 'Create account'
    - The full name will have the label 'Full name'
    - The full name field will actually be a shadcn select dropdown with a list of names
    - The email field will have label 'Label'
    - Type email in email field
    - Select a name from the list (user will appear because they are in the system)
    - The password field will have label 'Password'
    - Type password in the password field
    - Click submit button with text 'Continue'
    - Sigining up with existing details or credentials should show 'User already exists'
    - if email is invalid 'Email is invalid!'
    - If there is no email provided 'Email is required!'
    - If password is less than 6 characters, show 'Password must be minimum 6 characters!'
    - If full name, email and password check out, show success message 'Account created' and route to home screen

## Home screen

1. Should have a search field, type of search
2. A button with text 'Bin stats'
3. A button with text 'Get report'
4. An input of type date and id of 'dateFrom'
5. An input of type date and id of 'dateTo'
6. A shadcn ui select with label 'Status' and various status options
7. A shadcn ui select with label 'Unassigned' and an option called 'Unassigned'
8. A shadcn ui select with label 'Technician' and various technician options
9. A button with text 'Reset filters'
10. A button with text 'Sort columns'
11. A button with text 'Add task'

## View single ticket end to end test

1. Since we are testing, run the [Authentication flow](#authentication) to login again
2. Should have html select with a disabled value 'Select status'
3. Click the select element and select 'New' option
4. Wait 5 seconds and select 'Resolved' option
5. Should have html select with a disabled value 'Select engineer'
6. Click the select element and select 'Dineo Langa' option
7. Wait 5 seconds
8. Click the select element and select 'Andrea Likomba' option
9. Should have an 'Edit' button
10. Click the button and open the shadcn ui dialog
11. Find the select html element and select 'OOW' in one of the options
12. Look for the label 'Service order' and the input with the name 'serviceOrder' and type '123456789'
13. Look for the label 'Add location' and the input with the name 'device_location' and type 'Test location'
14. Look for the label 'Add job repair no' and the input with the name 'add_job_repair_no' and type '123456789'
15. Look for the label 'Special requirement' and the input with the name 'additionalInfo' and type 'Test requirement'
16. Then click the button of type button to update the details you just typed
17. Textarea with name 'qc_comment' and type 'Test qc comment'
18. Locate button with text 'Update Quality Control' and click it to submit
19. Locate input of type text with name 'part_name' and type 'GH82-33133A'
20. Locate input of type text with name 'part_desc' is equal to 'SVC FRONT MODULE-FRAME(E/ZA),SM-F731'
21. Locate input of type number with name 'part_quantity' and type '1'
22. Locate button of type button with text 'Add part'
23. Locate textarea with name 'partsExtraText' and type 'Testing...'
24. Locate button with text 'Submit comment' and click it to submit
