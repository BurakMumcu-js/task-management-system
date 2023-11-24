import {useEffect, useState} from 'react';
import axios from "axios";
import TasksComponent from "./tasks";

function ChannelsComponent({ onSelect }) {
    const [channels, setChannels] = useState(null);
    useEffect(() => {
        const getChannel = async () => {
            const response = await axios.get('http://localhost:5000/channel');
            const localUser = JSON.parse(localStorage.getItem('user'))
            let userChannels = [];
            response.data.filter(item => {
                item.users.map(user => {
                    console.log(localUser);
                    if (user.name === localUser.email){
                        userChannels.push(item)
                    }
                })
            })
            if (userChannels.length) setChannels(userChannels);
        }

        getChannel();
    }, [])


    return (
        <div style={{ backgroundColor: 'brown', height: '100%' }}>
            {channels ? (
                channels.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onSelect(item)}
                        style={{ margin: 5, borderRadius: 5 }}
                    >
                        {item.name}
                    </button>
                ))
            ) : (
                <div className='alert alert-danger' style={{ margin: 10, borderRadius: 10 }}>
                    <p style={{ fontWeight: 'bold' }}>Kanal Bulunamadı</p>
                </div>
            )}

        </div>
    );
}

export default ChannelsComponent;