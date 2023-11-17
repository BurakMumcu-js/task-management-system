import react, {useEffect} from 'react';

const TasksComponent = (props) => {
    return(
        <div style={{width:'100%'}}>
            <h2 style={{textAlign:"center",fontWeight:"bold"}}>{props.channel}</h2>
        </div>
    )
}

export default TasksComponent