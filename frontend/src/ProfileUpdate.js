import { useEffect,useState } from "react";
import useAuthenticated from "./useAuthenticated";
import { useNavigate } from "react-router-dom";

export default function ProfileUpdate() {
    const {token,isAuthenticated,username} = useAuthenticated();
    const [profile,setProfile] = useState({"name":"","profile_intro":""})
    const [image, setImage] = useState(null);

    const navigate = useNavigate()
    

    useEffect(()=>{
        if (isAuthenticated===false) {
            navigate("/login")
        }
    },[isAuthenticated])
    

    const onFill=(event,key) => {
        const newProfile={...profile};
        newProfile[key]=event.target.value;
        setProfile(newProfile)

    }



    const onEnter = (event,key) => {
        event.preventDefault();
        const finalData= {};
        finalData[key] = profile[key]

        fetch(`http://localhost:8000/users/profile/update/${username}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify(finalData)
        })
        .then(response => {
            if (response.ok){
                alert("Name has been updated successfully!");
                return response.json()
            }
            else {
                throw new Error("something went wrong")
            }
        })
        .then(data => console.log(data))
        .catch(error => alert(error))

    }

    

    const onImageChange = (event) => {
        setImage(event.target.files[0]);
    }

    const onImageUpload = (event) => {
        event.preventDefault();

        if (!image) {
            alert("Please select an image to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        fetch(`http://localhost:8000/users/profile/update/${username}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
        .then(response => {
            if (response.ok){
                alert("Image has been updated successfully!");
                return response.json()
            }
            else {
                throw new Error("something went wrong")
            }
        })
        .then(data => console.log(data))
        .catch(error => alert(error));
    }

    return (
        <div className="update-form">
            <form onSubmit={(event) => onEnter(event, "name")}>
                <label>Name</label>
                <input type="text" value={profile.name} onChange={(event) => onFill(event, "name")} />
                <input type="submit" value="Update Name" />
            </form>

            <form onSubmit={(event) => onEnter(event, "profile_intro")}>
                <label>Profile Intro</label>
                <input type="text" value={profile.profile_intro} onChange={(event) => onFill(event, "profile_intro")} />
                <input type="submit" value="Update Intro" />
            </form>

            {/* <form onSubmit={(event) => onImageUpload(event)}>
                <label>Profile Image:</label>
                <input type="file" onChange={(event) => onImageChange(event)} />
                <input type="submit" value="Update Image" />
            </form> */}
            <form onSubmit={(event) => onImageUpload(event)}>
                <label>Profile Image:</label>
                <label className="custom-file-input">
                    Choose File
                    <input type="file" onChange={(event) => onImageChange(event)} />
                </label>
                <input type="submit" value="Update Image" />
            </form>
        </div>
    );

}