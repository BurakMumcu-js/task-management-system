import react, {useEffect, useState} from 'react';
import axios from "axios";
import HomeComponent from "./home";
import TasksComponent from "./tasks";
import {useNavigate} from "react-router-dom";

function ChannelsComponent() {
    const [channels, setChannels] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const getChannel = async () => {
            const response = await axios.get('http://localhost:5000/channel');
            setChannels(response.data);
        }

        getChannel();
    }, [])

    function sendHomeChannel(channel) {
        navigate('/')
        return <TasksComponent channel={channel}/>
    }

    return (
        <div style={{backgroundColor: "brown", height: '100%'}}>
            {
                channels ? channels.map(item => {
                    return (
                        <button onClick={() => sendHomeChannel(item)} style={{margin: 5, borderRadius: 5}}>
                            {
                                item.name
                            }
                        </button>
                    )
                }) : <div className='alert alert-danger' style={{margin:10,borderRadius:10}}>
                    <p style={{fontWeight: "bold"}}>Kanal Bulunamadı</p>
                </div>
            }
        </div>
    )
}

export default ChannelsComponent;