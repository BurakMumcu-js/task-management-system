import { useState } from 'react';
import ChannelsComponent from "./channels";
import TasksComponent from "./tasks";

const HomeComponent = () => {
    const [selectedChannel, setSelectedChannel] = useState(null);

    const handleChannelSelect = (channel) => {
        setSelectedChannel(channel);
    };

    return (
        <div style={{ display: "flex", height: '100vh', justifyContent: "space-between" }}>
            <ChannelsComponent onSelect={handleChannelSelect} />
            <TasksComponent channel={selectedChannel} />
        </div>
    );
}

export default HomeComponent;
