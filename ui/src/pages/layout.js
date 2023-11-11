import {Link, useNavigate,Outlet} from "react-router-dom";
import {useEffect} from "react";

function LayoutComponent(){
    const navigate = useNavigate()
    let isAdmin = false

    const logout = () => {
        navigate('/login')
    }

    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login');
        }
    })

    const checkIsAdmin = () => {
        let user = JSON.parse(localStorage.getItem('user'))
        isAdmin = user.isAdmin
    }
    checkIsAdmin()

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
                                isAdmin &&
                                <li className="nav-item">
                                    <Link className='nav-link' to='/products'>Add Task</Link>
                                </li>
                            }

                            <li className="nav-item">
                                <Link className='nav-link' to='/orders'>My Tasks</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link' to='/baskets'>My Notes</Link>
                            </li>

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