import React,{useState} from "react";
import axios from "axios";
export default function AddStudent(){
    
    const[name,setName]=useState("");
    const[mobile,setMobile]=useState("");
    const[nic,setNic]=useState("");


    function sendData(e){
        e.preventDefault();
        
        const newStudent={
            name,
            mobile,
            nic
        }
        axios.post("http://localhost:8070/student/add",newStudent).then(()=>{
            alert("Student added")
            setName("");
            setMobile("");
            setNic("");
        }).catch((err)=>{
            alert(err)
        })
    }




    return(
        <div className="container">
            <form onSubmit={sendData}>
  <div class="form-group">
    <label for="name">name</label>
    <input type="text" class="form-control" id="name" placeholder="Enter Student name" 
    onChange={(e)=>{
        setName(e.target.value); //Assign value to the setName
    }}/>
    
  </div>
  <div class="form-group">
    <label for="name">mobile</label>
    <input type="text" class="form-control" id="mobile" placeholder="Enter Student mobile"
    onChange={(e)=>{
        setMobile(e.target.value); //Assign value to the setMobile
    }}/>
    
  </div>
  <div class="form-group">
    <label for="nic">name</label>
    <input type="text" class="form-control" id="nic" placeholder="Enter Student nic"
    onChange={(e)=>{
        setNic(e.target.value); //Assign value to the setNic
    }}/>
    
  </div>
  
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
        </div>
    )
}
