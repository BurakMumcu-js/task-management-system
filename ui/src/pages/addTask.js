import {useEffect, useState} from 'react';
import axios from "axios";

const AddTaskComponent = () => {
    const [channels, setChannels] = useState(null);
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
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
    function addTask(user,title,content,channel){
        //todo: task eklemeleri için kanal>users>tasks hazırlanacak api ucu
    }

    return (
        <div>
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
                                            <div style={{width:'100%',margin:5}} className='border'>
                                                <h3 style={{width:'100%',textAlign:'center',margin:10}}>{user.name}</h3>
                                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                                   <div>
                                                       <input style={{margin:10}} type='text' placeholder='enter title' onChange={(e)=>setTitle(e.target.value)}/>
                                                       <input style={{margin:10}} type='text' placeholder='enter content' onChange={(e)=>setContent(e.target.value)}/>
                                                   </div>
                                                    <button  style={{margin:10,}} className='btn btn-success' onClick={()=>addTask(user.name,title,content,item.name)}>Add Task</button>
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