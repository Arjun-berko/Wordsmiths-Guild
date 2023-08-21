import requests
from getpass import getpass

def authenticate():
    auth_endpoint="http://localhost:8000/posts/auth"
    username=input("username: ")
    password=getpass("password: ")
    auth_response=requests.post(auth_endpoint,json={"username":username,"password":password})
    if auth_response.status_code==200:
        my_token= auth_response.json()["token"]
        with open("tokens.py","w") as file:
            file.write(f"my_token='{my_token}'")
        return my_token

def find_token():
    try:
        from .tokens import my_token
        return my_token
    except ImportError:
        return None

token_search=find_token()
token=""
if token_search is None:
    token=authenticate()
else:
    token=token_search
headers = {
    "Authorization": f"Token {token}"
}

api_endpoint = "http://localhost:8000/posts/list"
response = requests.get(api_endpoint, headers=headers)

print(response.json())








# if token doesnt exist, run authenticate function, store in
# if token exists, use that