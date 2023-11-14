import react, {useEffect, useState} from 'react';
import axios from "axios";
import HomeComponent from "./home";
import TasksComponent from "./tasks";

function ChannelsComponent() {
    const [channels,setChannels] = useState(null);
    const [homeChannel,setHomeChannel] = useState(null);

    useEffect(()=>{
        const getChannel = async () => {
            const response = await axios.get('http://localhost:5000/channel');
            setChannels(response.data);
            console.log(response.data)
        }

        getChannel();
    },[])

    function sendHomeChannel(channel){
        return <TasksComponent channel={channel}/>
    }

    return (
        <div style={{backgroundColor: "brown", height: '100%'}}>
            {
                channels.map(item =>{
                    return(
                        <button onClick={()=>sendHomeChannel(item)} style={{margin: 5, borderRadius: 5}}>
                            {
                                item.name
                            }
                        </button>
                    )
                })
            }
        </div>
    )
}

export default ChannelsComponent;