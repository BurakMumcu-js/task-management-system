import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


const DeleteChannelComponent = () => {
    const [channel,setChannel] = useState('')

    const channelDelete = async (channelName) => {
       let model = {
           channelName:channelName
       }

       axios.post('http://localhost:5000/channel/delete',model)
           .then(res => {
                   let alert = `
         <div class="alert alert-success">
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
    }


    const navigate = useNavigate();

    useEffect(()=>{
        checkIsAdmin();
    },[])
    const checkIsAdmin = () => {
        let user = JSON.parse(localStorage.getItem('user'))
        if (!user.isAdmin){
            navigate('/')
        }
    }
    return(
        <div className='d-flex justify-content-center mt-5 div'>
            <div className='div'></div>
            <div className='col-md-5 card' style={{padding:50,width:500}}>
                <label className='text-secondary' style={{marginLeft:10}}>Channel Name</label>
                <input style={{margin:10}} type='text' value={channel} onChange={(e)=>setChannel(e.target.value)} />
                <button style={{margin:10}} className='btn btn-outline-primary' onClick={()=>channelDelete(channel)}>
                    Delete Channel
                </button>
            </div>
        </div>
    )
}

export default DeleteChannelComponent;