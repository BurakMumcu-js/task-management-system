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

    return (
        <div style={{flexDirection:"row"}}>
            { channels ? channels.map(channel => (
                <div className='card' style={{margin:50,width:250}} key={channel.id}>
                    <div className='card-header'>{channel.name}</div>
                    <div className='card-body'>
                        {channel.users.map(user => {
                            if (user.name === JSON.parse(localStorage.getItem('user')).email) {
                                return user.tasks.map((task, index) => (
                                    <div className='card'style={{margin:10}} key={index}>
                                        <div className='card-header'>{index + 1}. {task.title}</div>
                                        <div className='card-body'>{task.content}</div>
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
