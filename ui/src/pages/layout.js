import {Link, useNavigate,Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";

function LayoutComponent(){
    const navigate = useNavigate()
    const [user,setUser] = useState(null)  
    const [isAdmin,setIsAdmin] = useState(false);
    const [isCreator,setIsCreator] = useState(false)  
    
    const logout = () => {
        Cookies.remove('user');
        Cookies.remove('token');
        navigate('/login');
    }
    
    useEffect(() => {
        if (!Cookies.get('token') || !Cookies.get('user')) {
            navigate('/login');
        }
        else{
            let user = JSON.parse(Cookies.get('user'))
            setUser(user);
            if (user.role.includes('admin'))  
                setIsAdmin(true); 
            if (user.role.includes('creator'))  
                setIsCreator(true);        
        }
    }, [])
    return(
        <>
            <nav className="navbar navbar-expand-lg bg-body-secondary">
                <div className="container-fluid">
                    <a className="navbar-brand">Task Management System</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item active">
                                <Link className='nav-link' to='/'>Home Page</Link>
                            </li>
                               {
                                isCreator &&
                                 <li className="nav-item">
                                    <Link className='nav-link' to='/addTask'>Add Task</Link>
                                </li>
                                }
                            <li className="nav-item">
                                <Link className='nav-link' to='/myTasks'>My Tasks</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link' to='/createChannel'>Create Channel</Link>
                            </li>
                            {
                                isAdmin &&
                                <li className="nav-item">
                                    <Link className='nav-link' to='/deleteChannel'>Delete Channel</Link>
                                </li>
                            }
                        </ul>
                        <button onClick={logout} className="btn btn-outline-danger" type="submit">Exit</button>
                    </div>
                </div>
            </nav>
            <Outlet/>
        </>
    )
}

export default LayoutComponent