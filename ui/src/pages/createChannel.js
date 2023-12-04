import {useState} from "react";
import axios from "axios";

const CreateChannelComponent = () => {

    const channelCreate = async (e) => {
        e.preventDefault();
        try {
            let creatorMail = JSON.parse(localStorage.getItem('user')).email;
            let model = {name:name,password:password,creatorMail:creatorMail}
            let response = await axios.post('http://localhost:5000/channel/create',model)
                .then(res => {
                    console.log(res);
                    let alert = `
         <div class="alert alert-success">
            ${res.data.message}
            ${res.data.message}
         </div>    
        `;
                    const row = document.querySelector('.div');
                    // beforeBegin , afterBegin , beforeEnd , afterEnd
                    row.insertAdjacentHTML('beforeBegin',alert);
                    setTimeout(()=>{
                        document.querySelector('.alert').remove();
                    },3000);
                })
        } catch (e) {
            console.log(e);
        }

    }

    const [name,setName] = useState('');
    const [password,setPassword] = useState('')
    return(
        <div className='d-flex justify-content-center mt-5 div'>
            <div className='col-md-5 card' style={{padding:50,width:500}}>
                <label className='text-secondary' style={{marginLeft:10}}>Channel Name</label>
                <input style={{margin:10}} type='text' value={name} onChange={(e)=>setName(e.target.value)} />
                <label className='text-secondary'  style={{marginLeft:10}}>Password</label>
                <input style={{margin:10}} type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button style={{margin:10}} className='btn btn-outline-primary' onClick={channelCreate}>
                    Create Channel
                </button>
            </div>
        </div>
    )
}

export default CreateChannelComponent;