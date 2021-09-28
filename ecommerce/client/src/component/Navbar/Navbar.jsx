import React from 'react';
import './Navbar.css';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import { Badge } from '@material-ui/core';

const Navbar = () => {
    return (
        <div className="Container">
            <div className="Wrapper">
                <div className="Left">
                    <span className="Language">EN</span>
                    <div className="SearchContainer">
                            <input type="text" className="Input" />
                            <Search style={{color:"gray",fontSize:16,cursor:"pointer"}}/>
                    </div>
                </div>
                <div className="Center">
                    <h1 className="Logo">
                        Khu147.
                    </h1>
                </div>
                <div className="Right">
                    <div className="MenuItem">Register</div>
                    <div className="MenuItem">Sign In</div>
                    <div className="MenuItem">
                        <Badge badgeContent={4} color="primary">
                            <ShoppingCartOutlined/>
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
