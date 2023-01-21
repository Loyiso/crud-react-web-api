import { useState } from 'react'
import { NavLink } from 'react-router-dom'
 
import './Nav.modules.css'

const Nav = ({ children }) => {

    const [show, setShow] = useState(false)

    const showSideBar = () => {
        setShow(!show)
    }

    const links = [
        {
            url: '/dashboard',
            i_class: 'bx bxs-dashboard',
            link_title: 'Dashboard',
            key: 0
        }, 
        {
            url: "vehicles",
            i_class: "bx bxs-truck ",
            link_title: "Vehicles",
            key: 4
        }
    ]
     
    return (
        <>
            <header className={`header ${show ? "add_body_padding" : " "}  `} id="admin-dash-header">
                <div className='header_toggle'>
                    <i className={`bx bx-menu ${show ? "bx-x" : " "}`} id="header-toggle" onClick={showSideBar}></i>
                </div> 
                <div className="container ht-100p pd-t-0-f">
                     <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"> Developer: &nbsp;
                        <a href="https://www.uloyiso.com" target="_blank" style={{ textDecoration: 'none' }}>Loyiso Nelani</a> </span>
                </div>
            </header>

            <aside className={`sidebar ${show ? "review" : " "} `} id="admin-dash-nav">
                <nav className="admin-dash-nav">
                    <div>
                        <NavLink to={"/"} className="nav_logo">
                            {" "}
                            <img src="/img/logo.png" alt="logo" className="logo" /> <span className="nav_logo-name">Big L Motors</span>{" "}
                        </NavLink>
                        <div className="nav_list">
                            {links.map((link) => (
                                <NavLink to={link.url} className="nav_link " key={link.key}>
                                    <i className={`${link.i_class}  nav_icon`}></i> <span className="nav_name">{link.link_title}</span>{" "} 
                                </NavLink>
                            ))}
                        </div>
                    </div> 
                </nav>
            </aside>

            <main className={` ${show ? "add_body_padding" : "main"} `}> {children} </main>  
        </>
    )
}

export default Nav