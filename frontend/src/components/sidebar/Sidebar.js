import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMinusSquare, faPowerOff, faScrewdriver } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { FaRegUser } from "react-icons/fa";
import Keycloak from 'keycloak-js';
import { Enviroment } from '../../enviroment/index'
import { useNavigate } from 'react-router-dom';
 

function calltheapi() {

    const url = new URL(`${Enviroment.REACT_APP_API_URL}/auth/test`);
    fetch(url.toString(), {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('keycloak_token')}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log('response', response.status)
            if (response.status === 401) {
                if (window.location.pathname !== '/login') {
                //    window.location.href = '/login';
                }
            }
            if (!response.ok) {

                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

        })
        .catch(error => {
            if (window.location.pathname !== '/login') {
            //    window.location.href = '/login';
            }
        });
}
calltheapi()

const handleLogout = () => {
    localStorage.setItem('keycloak_token', '')
    window.location.href = '/login';
};

const Sidebar = ({ sidebarOpen, closeSidebar }) => {

    const [activeMenuLinkEvents, setActiveMenuLinkEvents] = useState('sidebar__link');
    const [activeMenuLinkTipos, setActiveMenuLinkTipos] = useState('sidebar__link');
    const [activeMenuLinkHome, setActiveMenuLinkHome] = useState('sidebar__link');

    useEffect(() => {
        const path = window.location.pathname;
        if (path.includes('/eventos') || path.includes('/incluirevento')) {
            setActiveMenuLinkEvents('sidebar__link active_menu_link');
        }
        if (path.includes('/tipos')) {
            setActiveMenuLinkTipos('sidebar__link active_menu_link');
        }

        if (!path.includes('/tipos') && !path.includes('/eventos') && !path.includes('/incluirevento')) {
            setActiveMenuLinkHome('sidebar__link active_menu_link');
        }
    }, []);

    return (

        <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
            <div className="sidebar__title">
                <div className="sidebar__img" style={{ marginLeft: '10px', fontSize: '40px' }}>
                    <FaRegUser icon={faMinusSquare} />
                    <h1 style={{ fontSize: '30px' }}>Usuário</h1>
                </div>
                <FontAwesomeIcon icon={faTimes} onClick={closeSidebar} id="sidebarIcon" aria-hidden="true" />
            </div>
            <div className="sidebar__menu">

                <h2>Admin</h2>

                <div className={activeMenuLinkEvents}>
                    <FontAwesomeIcon icon={faMinusSquare} />
                    <a href="/">Listagem de Filmes</a>
                </div>


                <div className={activeMenuLinkTipos}>
                    <FontAwesomeIcon icon={faScrewdriver} />
                    <a href="/usuarios">Listagem de Usuários</a>
                </div>

                <div className="sidebar__logout" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faPowerOff} />
                    <span>SAIR</span>
                </div>

            </div>
        </div>
    );
}

export default Sidebar;
