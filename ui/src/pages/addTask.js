import {useEffect, useState} from 'react';
import axios from "axios";

const AddTaskComponent = () => {
    const [channels, setChannels] = useState(null);
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [deadline,setDeadline] = useState(null)
    const creatorChannels = []
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        const getChannel = async () => {
            const response = await axios.get('http://localhost:5000/channel');
            setChannels(response.data);

        }
        getChannel();
        }, [])

   channels?.map(item =>{
        if (item.creator === user.email){
            creatorChannels.push(item)
        }
    })
    function addTask(title,content,user,channel,deadline){
        let model = {title:title,content:content,user:user,channel:channel,deadline:deadline}
        console.log(deadline);
        axios.post('http://localhost:5000/task/add',model)
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

    return (
        <div className='div' style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:20,margin:20}}>
            {
                creatorChannels.length ?  creatorChannels.map(item => {
                    return(
                        <div className='card'>
                            <div className='card-header'>
                                {item?.name}
                            </div>
                            <div className='card-body'>
                                {
                                    item?.users.map(user => {
                                        return(
                                            <div style={{margin:5}} className='border'>
                                                <h3 style={{textAlign:'center',margin:10}}>{user.email}</h3>
                                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                                   <div>
                                                       <input style={{margin:10}} type='text' placeholder='enter title' onChange={(e)=>setTitle(e.target.value)}/>
                                                       <input style={{margin:10}} type='text' placeholder='enter content' onChange={(e)=>setContent(e.target.value)}/>
                                                       <input
                                                           type='date'
                                                           onChange={(e) => setDeadline(e.target.value)}
                                                       />

                                                   </div>
                                                    <button  style={{margin:10,}} className='btn btn-success' onClick={()=>addTask(title,content,user.name,item.name,deadline)}>Add Task</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                }) : <div className='alert alert-danger' style={{margin:20}}>
                    <h3>Oluşturucu Olduğunuz Kanal Bulunamadı</h3>
                </div>
            }
        </div>
    )
}

export default AddTaskComponent;