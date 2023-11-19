import {useEffect, useState} from "react";
import axios from "axios";

function MyTasksComponent() {
    const [channels,setChannels] = useState(null);
    useEffect(() => {
        const getChannel = async () => {
            const response = await axios.get('http://localhost:5000/channel');
            setChannels(response.data);
        }
        getChannel();
    }, [])

    const taskIsFinished = (task,index,userName,channelName) => {
        let model = {
            task:task,
            index:index,
            userName:userName,
            channelName:channelName
        }

        axios.post('http://localhost:5000/task/done',model)
            .then(res => {
                console.log(res.data);
                let alert = `
         <div class="alert alert-success">
            ${res.data}
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
        <div style={{flexDirection:"row"}}>
            <div className='div'></div>
            { channels ? channels.map(channel => (
                <div className='card' style={{margin:50,width:300}} key={channel._id}>
                    <div className='card-header'>{channel.name}</div>
                    <div className='card-body'>
                        {channel.users.map(user => {
                            if (user.name === JSON.parse(localStorage.getItem('user')).email) {
                                return user.tasks.map((task, index) => (
                                    <div className='card'style={{margin:10}} key={index}>
                                        <div className='card-header'>{index + 1}. {task.title}</div>
                                        <div className={`card-body ${new Date() > new Date(task.deadline) ? 'alert alert-danger' : ''}`} style={{display:"flex"}}>
                                            {task.content}<br/>{task?.deadline}
                                        <button onClick={()=>taskIsFinished(task,index,user.name,channel.name)} className='btn btn-success' style={{padding:0}}>
                                            <span className="material-symbols-outlined">done</span></button>
                                        </div>
                                    </div>
                                ));
                            }
                            return null;
                        })}
                    </div>
                </div>
            )) : ''}
        </div>
    )
}

export default MyTasksComponent;
