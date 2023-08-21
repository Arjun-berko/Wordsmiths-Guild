import requests

# URL for the token refresh endpoint
refresh_endpoint = "http://localhost:8000/posts/token/refresh"

# Your refresh token goes here
refresh_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5MjE4NzM2MSwiaWF0IjoxNjkyMTAwOTYxLCJqdGkiOiJmMjQ3M2I5MjJjOWY0Mjc1YjEwMjllODU1MTA2NzQ2ZiIsInVzZXJfaWQiOjF9.2_-B2ySpQFHKiFequyaS_iZJkLnG3fqH2p_JLb9ewbk"

# The payload with the refresh token
payload = {
    "refresh": refresh_token
}

# Making the POST request to the refresh endpoint
response = requests.post(refresh_endpoint, json=payload)

# If the request was successful, the new access token will be in the response
if response.status_code == 200:
    new_access_token = response.json().get("access")
    print("New access token:", new_access_token)
else:
    print("Failed to refresh token:", response.content)
