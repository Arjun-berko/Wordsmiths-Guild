import requests

api_endpoint="http://localhost:8000/posts/create"

response=requests.post(api_endpoint, json={
    "title":"random title",
    "content":"random content",
    "author_username":"arjunnarayanan"
    })


print(response.json())
