import ChannelsComponent from "./channels";
import TasksComponent from "./tasks";

const HomeComponent = () => {
    return (
            <div style={{display:"flex",height:'100vh'}}>
                <ChannelsComponent/>
                <TasksComponent/>
            </div>
    )
}

export default HomeComponent;