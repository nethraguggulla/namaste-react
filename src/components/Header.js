import { useEffect, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router";

const Header = () => {
    const [btnName, setBtnName] = useState("Login");

    useEffect(()=>{
        console.log("UseEffect Called");
    }, []);

    console.log("Header Component Called");
    return (
        <div className='header'>
            <div className='logo-container'>
                <img className='logo'src={LOGO_URL} />
            </div>
        <div className='nav-items'>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li>Cart</li>
                <button className="btn-login" onClick={() => {
                    btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
                }}>{btnName}</button>
            </ul>
        </div>
    </div>
    );
}

export default Header;