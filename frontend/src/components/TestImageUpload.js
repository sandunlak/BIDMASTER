import React, { useState, useEffect } from "react";
import axios from "axios";


export default function ImageUpload(){

    const [image,setImage] = useState();


    const submitImage = async (e)=>{
        e.preventDefault();


        const formData = new FormData();
        formData.append("image",image);


        const result = await axios.post(
            "http://localhost:8070/upload-image",
            formData,
            {
                headers:{"Content-Type":"multipart/form-data"},
            }
        );

    };



    const onInputChange = (e)=>{

        console.log(e.target.files[0]);
        setImage(e.target.files[0])

    }



    return ( 
        <div>
        <form onSubmit={submitImage}>
        <input type="file" accept="image/*" onChange={onInputChange}></input>
        <button type="submit">Submit</button>
        </form>
        </div>
    
        
    )
}