import requests

api_endpoint="http://localhost:8000/posts/update/47"
response=requests.patch(api_endpoint,json={"content":"This is some new content"})

print(response.json())