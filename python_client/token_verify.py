import requests

verify_endpoint="http://localhost:8000/posts/token/verify"


response=requests.post(verify_endpoint,json={"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5MjA5NTkwMSwiaWF0IjoxNjkyMDA5NTAxLCJqdGkiOiI4MjE0OWEwNjk0MmI0YzVjYWZiZDFiNzllYjc2NzQ0ZSIsInVzZXJfaWQiOjF9.2LbCnXg6pqVjPwlDcEOVbtCTHjdx6Fp73q6AiV54t4s"})

print(response.json())
print(response.status_code)