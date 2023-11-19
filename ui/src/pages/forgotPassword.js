import {useState} from "react";
import axios from "axios";


const PasswordComponent = () => {
    const [email,setEmail] = useState('')

    const changePassword = (email) =>  {
        let model = {
            email:email
        }
        axios.post('http://localhost:5000/password/change',model)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className='d-flex justify-content-center mt-5 div'>
            <div className='col-md-5 card' style={{padding:50,width:500}}>
                <label className='text-secondary' style={{marginLeft:10,fontWeight:"bold"}}>email</label>
                <input style={{margin:10}} type='email' onChange={(e)=>setEmail(e.target.value)}/>
                <button className='btn btn-primary' style={{margin:10}} onClick={()=>changePassword(email)}>Change Password</button>
            </div>
        </div>
    )
}

export default PasswordComponent;