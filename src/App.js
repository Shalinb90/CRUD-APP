import React, { useEffect, useState } from 'react'
import axios from 'axios';

const App = () => {
    const[Fname,setFname]=useState('');
    const [Lname,setLname]=useState('');
    const[Age,setAge]=useState(0);
    const[UserData,setData]=useState([]);
    const[UpdatedFirst,setUpdateFirst]=useState('');
    const[UpdatedLast,setUpdateLast]=useState('');
    const[UpdatedAge,setUpdateAge]=useState('');
   

    const AddDetails=()=>{
        axios.post("http://localhost:3001/insert",{Fname:Fname,Lname:Lname,Age:Age})
    }


useEffect(()=>{
axios.get("http://localhost:3001/read").then((response)=>{
setData(response.data);
})
 },[]);

 const UpdateData=(id)=>{
     axios.put("http://localhost:3001/update",{id:id,UpdatedFirst:UpdatedFirst,UpdatedLast:UpdatedLast,UpdatedAge:UpdatedAge})
 }

 const Delete=(id)=>{
axios.delete(`http://localhost:3001/delete/${id}`);
 }


  return (
   <div id='Users'>
       <h1>UserDetails</h1>
       <label>Enter First Name</label>
       <input type="text" value={Fname} placeholder="Enter First Name" onChange={(e)=>setFname(e.target.value)}/>
       <label>Enter Last Name</label>
       <input type="text" value={Lname} placeholder="Enter Last Name" onChange={(e)=>setLname(e.target.value)}/>
       <label>Enter Your Age</label>
       <input type="number" value={Age} placeholder="Enter Last Name" onChange={(e)=>setAge(e.target.value)}/> 

       <button onClick={AddDetails}>ADD Details</button>
       <hr/>
     
           {UserData.map((val,key)=>{
               return(<>
               <div id="userData" key={key}>
                 <h3>{val.Firstname}</h3>
                 <h3>{val.Lastname}</h3>
                 <h3>{val.Age}</h3>
                 <input type="text" placeholder='Enter New Name' onChange={(e)=>setUpdateFirst(e.target.value)} />
                 <input type="text" placeholder='Enter New Name' onChange={(e)=>setUpdateLast(e.target.value)} />
                 <input type="number" placeholder='Enter New Age' onChange={(e)=>setUpdateAge(e.target.value)} />
                 <button onClick={()=>UpdateData(val._id)}>Update</button>
                 <button onClick={()=>Delete(val._id)}>Delete</button>
                 </div>
                 </>
               )
           })}
       
   </div>
  )
}

export default App