import react, {useEffect} from 'react';

const TasksComponent = (props) => {
    return(
        <div style={{width:'100%'}}>
            <h2 style={{textAlign:"center",fontWeight:"bold"}}>{props.channel}</h2>
            {
                props.channel ? (
                    <div>
                        <h2 style={{textAlign:"center",fontWeight:"bold"}}>{props?.channel?.name}</h2>
                        {
                            props.channel.users.map(user => {
                                return (
                                    <div className='card' style={{width:250,margin:30}}>
                                        <div className='card-header'>{user.name}</div>
                                        <div className='card-body'>
                                            {
                                                user.tasks.map((task,index) => {
                                                    return(
                                                        <div className='card'style={{margin:10}} key={index}>
                                                            <div className='card-header'>{index + 1}. {task.title}</div>
                                                            <div className='card-body'>{task.content}</div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <p className='text-secondary' style={{textAlign:"center"}}>This channel was founded by <strong>{props.channel.creator}</strong> </p>
                    </div>
                ) : ''
            }


        </div>
    )
}

export default TasksComponent