import React from 'react';
import theLogo from '../assets/Logo.png'
import searchIcon from '../assets/SearchIcon.png'
import bell from '../assets/bell.png'

function NavBar() {
    return (
        <div id='Nav'>
            <div className='container'>
                <div className="navbarTop">
                    <div className="logo">
                        <img src={theLogo} alt="Logo" />
                    </div>
                    <div className="Company">
                        <h2>MEET YOUR COLLEGE</h2>
                    </div>
                    <div className="userOptions">
                        <div className='theBell'>
                            {/* <img src={bell} alt="" /> */}
                            🔔

                        </div>
                        <div className='userIcon'>
                            👤
                        </div>
                    </div>
                </div>
                <div className="navbarBottom">
                    <div className="sort">
                        Dashboard
                    </div>
                    <div className="search">
                        Analytics
                    </div>
                    <div className="addNew">
                        New Apps
                    </div>
                    <div className="addNew">
                        Configure
                    </div>
                    <div className="addNew">
                        Events
                    </div>
                </div>
            </div>

        </div>
    )
}

export default NavBar
