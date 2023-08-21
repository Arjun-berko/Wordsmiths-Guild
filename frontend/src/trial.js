import { useState,useEffect } from "react";
import useAuthenticated from "./useAuthenticated";



export default function Trial() {
    const {token,isAuthenticated} = useAuthenticated()

    // console.log(isAuthenticated);
    // console.log(token);

    // useEffect(()=>{
    //     if (isAuthenticated){
    //         console.log(isAuthenticated);
    //         console.log(token)
    // }},[token,isAuthenticated])

    useEffect(()=> {
        console.log(isAuthenticated);
        console.log(token);
    },[token,isAuthenticated])

    return (
        <h1>Hello friend!</h1>
    )
}