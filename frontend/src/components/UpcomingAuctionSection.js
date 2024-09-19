import React, { useEffect, useState } from "react";
import axios from "axios";




export default function UpcomingAuctionSection(){

    
    return(
        <div className='container' style={{
            
            width: "100%",
            height: 300,
            marginTop: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden" // Ensure the image stays within the container
        }}>
            <img src="/Assests/hammer.jpg" alt="Hammer" style={{
                width: "100%",
                height: "100%",
                objectFit: "cover" // Fit the image within the container while covering it completely
            }} />
            
        </div>
        

    )
}