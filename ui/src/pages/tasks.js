import react, {useEffect, useState} from 'react';
import axios from "axios";

const TasksComponent = (props) => {
    const [addedMail,setAddedMail] = useState('')

    const addMember = async (person,channel) => {

         let model = {
             emailAdded : person,
             channelName: channel
         }

        await axios.post('http://localhost:5000/channel/add',model)
              .then(response => {
                  console.log(response)
              })
              .catch(e => {
                  console.log(e.message)
              })
    }

    return(
        <div style={{width:'100%'}}>
            {
                props.channel ? (
                    <div>
                        <h2 style={{textAlign:"center",fontWeight:"bold"}}>{props?.channel?.name}</h2>
                        {
                            props.channel.users.map(user => {
                                return (
                                    <div className='card' style={{width:250,margin:30}}>
                                        <div className='card-header'>{user.email}</div>
                                        <div className='card-body'>
                                            {
                                                user.tasks.map((task,index) => {
                                                    return(
                                                        <div className='card'style={{margin:10}} key={index}>
                                                            <div className='card-header'>{index + 1}. {task.title}</div>
                                                            <div className={`card-body ${new Date() > new Date(task.deadline) ? 'alert alert-danger' : ''}`} style={{margin:0}}>{task.content}<br/>{task?.deadline}</div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                        { JSON.parse(localStorage.getItem('user')).email === props.channel.creator ?
                            <div className='card' style={{width:500,marginLeft:300}}>
                                <div className='card-header'>
                                    Üye Ekleme Alanı
                                </div>
                                <div className='card-body' style={{display:"flex"}}>
                                    <input type='text' placeholder='email giriniz' onChange={(e)=>setAddedMail(e.target.value)}/>
                                    <button onClick={()=>addMember(addedMail,props.channel.name)}>Ekle</button>
                                </div>
                            </div> :
                            ''

                        }
                        <p className='text-secondary' style={{textAlign:"center"}}>This channel was founded by <strong>{props.channel.creator}</strong> </p>
                    </div>
                ) : ''
            }


        </div>
    )
}

export default TasksComponent