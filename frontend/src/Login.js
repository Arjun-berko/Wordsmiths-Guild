// import { useState } from "react";

// export default function Login() {
//   const [credentials, setCredentials] = useState({ username: "", password: "" });

//   const onFill = (event, key) => {
//     const newCredentials = { ...credentials };
//     newCredentials[`${key}`] = event.target.value;
//     setCredentials(newCredentials);
//   };

//   const onEnter = (event) => {
//     event.preventDefault(); // Prevent the default form submission

//     fetch("http://localhost:8000/posts/token", {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(credentials),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         sessionStorage.setItem("access token", `${data["access"]}`);
//         sessionStorage.setItem("refresh token", `${data["refresh"]}`);

//       })
//       .catch((error) => {console.log(error);console.log("Incorrect credentials")});
//   };

//   return (
//     <form onSubmit={onEnter}>
//       <label>Username</label>
//       <input type="text" value={credentials.username} onChange={(event) => onFill(event, "username")} />
//       <br />
//       <label>Password</label>
//       <input type="password" value={credentials.password} onChange={(event) => onFill(event, "password")} />
//       <br />
//       <input type="submit" />
//     </form>
//   );
// }



import { useState } from "react";

export default function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const onFill = (event, key) => {
    const newCredentials = { ...credentials };
    newCredentials[`${key}`] = event.target.value;
    setCredentials(newCredentials);
  };

  const onEnter = (event) => {
    event.preventDefault(); // Prevent the default form submission
    const finalCredentials={...credentials}

    fetch("http://localhost:8000/posts/token", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(finalCredentials),
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then(data => {
            sessionStorage.setItem("access token", data["access"]);
            sessionStorage.setItem("refresh token", data["refresh"]);
            sessionStorage.setItem("username",finalCredentials["username"])
            alert("You have been logged in successfully !!!")
          });
        } else {
          return response.json().then(data => {
            if (response.status === 401) {
              // Use the server's error message if available, otherwise use a default message
              throw new Error(data.error || "Incorrect Credentials");
            } else {
              throw new Error(data.error || "An error occurred!");
            }
          });
        }
      })
      .catch(error => {
        console.error("There was a problem", error);
        alert(error)
      });
    
    }

  return (
    <form onSubmit={onEnter}>
      <label>Username</label>
      <input type="text" value={credentials.username} onChange={(event) => onFill(event, "username")} />
      <br />
      <label>Password</label>
      <input type="password" value={credentials.password} onChange={(event) => onFill(event, "password")} />
      <br />
      <input type="submit" />
    </form>
  );
}










// import { useState } from "react";

// export default function Login() {
//   const [credentials, setCredentials] = useState({ username: "", password: "" });
//   const [errorMessage, setErrorMessage] = useState(""); // Add this line

//   const onFill = (event, key) => {
//     const newCredentials = { ...credentials };
//     newCredentials[`${key}`] = event.target.value;
//     setCredentials(newCredentials);
//   };

//   const onEnter = (event) => {
//     event.preventDefault(); // Prevent the default form submission

//     fetch("http://localhost:8000/posts/token", {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(credentials),
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json().then(data => {
//             sessionStorage.setItem("accessToken", data["access"]); // Fixed the key name
//             sessionStorage.setItem("refreshToken", data["refresh"]); // Fixed the key name
//             setErrorMessage(""); // Clear any previous error message
//           });
//         } else {
//           return response.json().then(data => {
//             if (response.status === 401) {
//               throw new Error(data.error || "Incorrect Credentials");
//             } else {
//               throw new Error(data.error || "An error occurred!");
//             }
//           });
//         }
//       })
//       .catch(error => {
//         console.error("There was a problem", error);
//         setErrorMessage(error.message); // Set the error message
//       });
//   };

//   return (
//     <form onSubmit={onEnter}>
//       <label>Username</label>
//       <input type="text" value={credentials.username} onChange={(event) => onFill(event, "username")} />
//       <br />
//       <label>Password</label>
//       <input type="password" value={credentials.password} onChange={(event) => onFill(event, "password")} />
//       <br />
//       <input type="submit" />
//       {errorMessage && <p>{errorMessage}</p>} {/* Render the error message conditionally */}
//     </form>
//   );
// }
