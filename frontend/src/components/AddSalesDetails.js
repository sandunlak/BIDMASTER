//Add Delivery Person
import React,{useState} from "react";
import axios from "axios";
export default function AddSalesDetails(){
    
    const[fname,setfName]=useState("");
    const[lname,setlName]=useState("");
    const[email,setemail]=useState("");
    const[number,setnumber]=useState("");
    const[password,setpassword]=useState("");
    const[street,setstreet]=useState("");
    const[city,setcity]=useState("");
    const[nic,setnic]=useState("");
    const[dlisen,setdlisen]=useState("");


    function sendData(e){
        e.preventDefault();
        
        const SalesRegister={
            fname,
            lname,
            email,
            number,
            password,
            street,
            city,
            nic,
            dlisen
        }
        axios.post("http://localhost:8070/registermodel/enter",SalesRegister).then(()=>{
            alert("Sales added")
            setfName("");
            setlName("");
            setemail("");
            setnumber("");
            setpassword("");
            setstreet("");
            setcity("");
            setnic("");
            setdlisen("");

        }).catch((err)=>{
            alert(err)
        })
    }




    return(
        <div className="container">
            <form onSubmit={sendData}>
  <div class="form-group">
    <label for="fname">First name</label>
    <input type="text" class="form-control" id="fname" placeholder="Enter salesmen first name" 
    onChange={(e)=>{
        setfName(e.target.value); //Assign value to the setName
    }}/>
    
  </div>
  <div class="form-group">
    <label for="lname">last name</label>
    <input type="text" class="form-control" id="lname" placeholder="Enter salesmen last name"
    onChange={(e)=>{
        setlName(e.target.value); 
    }}/>
    
  </div>
  <div class="form-group">
    <label for="email">email</label>
    <input type="text" class="form-control" id="email" placeholder="Enter salemen email"
    onChange={(e)=>{
        setemail(e.target.value); 
    }}/>
    
  </div>

  <div class="form-group">
    <label for="number">number</label>
    <input type="text" class="form-control" id="number" placeholder="Enter salesmen number"
    onChange={(e)=>{
        setnumber(e.target.value); 
    }}/>
    
  </div>

  <div class="form-group">
    <label for="password">password</label>
    <input type="text" class="form-control" id="password" placeholder="Enter salesmen password"
    onChange={(e)=>{
        setpassword(e.target.value); 
    }}/>
    
  </div>

  <div class="form-group">
    <label for="street">street</label>
    <input type="text" class="form-control" id="street" placeholder="Enter salesmen street"
    onChange={(e)=>{
        setstreet(e.target.value); 
    }}/>
    
  </div>

  <div class="form-group">
    <label for="city">city</label>
    <input type="text" class="form-control" id="city" placeholder="Enter salesmen city"
    onChange={(e)=>{
        setcity(e.target.value); 
    }}/>
    
  </div>
  <div class="form-group">
    <label for="nic">Nic</label>
    <input type="text" class="form-control" id="nic" placeholder="Enter salesmen nic"
    onChange={(e)=>{
        setnic(e.target.value); 
    }}/>
    
  </div>
  <div class="form-group">
    <label for="dlisen">dlisen</label>
    <input type="text" class="form-control" id="dlisen" placeholder="Enter salesmen lisense no"
    onChange={(e)=>{
        setdlisen(e.target.value); 
    }}/>
    
  </div>
  
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
        </div>
    )
}
