import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuthenticated() {
  const [isAuthenticated, changeIsAuthenticated] = useState();
  const [token, changeToken] = useState("");
  const [username,changeUsername] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const currentToken = sessionStorage.getItem("access token");
    if (currentToken) {
      fetch("http://localhost:8000/posts/token/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "token": currentToken }), // Fixed string literal
      })
        .then((response) => {
          if (response.ok) {
            changeIsAuthenticated(true);
            changeToken(currentToken);
            changeUsername(sessionStorage.getItem("username"))
          } else {
            fetch("http://localhost:8000/posts/token/refresh", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ "refresh": sessionStorage.getItem("refresh token") }),
            })
              .then((response) => response.json())
              .then((data) => {
                const newAccessToken = data["access"];
                sessionStorage.setItem("access token", newAccessToken); // Update sessionStorage
                changeToken(newAccessToken);
                changeIsAuthenticated(true);
                changeUsername(sessionStorage.getItem("username"));
              })
              .catch((error) => {
                // Handle error
                console.error(error);
              });
          }
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    }
    else {
      changeIsAuthenticated(false)
    }
  }, [navigate]); // Updated dependency array

  return { token, isAuthenticated, username };


}
