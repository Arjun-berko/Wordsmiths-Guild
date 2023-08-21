import requests
from getpass import getpass

auth_endpoint="http://localhost:8000/posts/token"
username=input("What is your username?\n")
password=getpass("What is your password?\n")

auth_response=requests.post(auth_endpoint,json={"username":username,"password":password})
print(auth_response.status_code)
print(auth_response.json())

if auth_response.status_code==200:
    token=auth_response.json()["access"]
    headers={
        "Authorization": f"Bearer {token}"
    }

    api_endpoint="http://localhost:8000/posts/list"
    response=requests.get(api_endpoint,headers=headers)

    print(response.json())




