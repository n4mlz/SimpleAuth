import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import defaultIcon from "../assets/default-icon.png";

const Home: React.FC = () => {
    const user = useAuthContext();
    return (
        <div className="block">
            <h1 className="headline">ホーム</h1>
            <div className="block-content">
                <img className="icon big-icon" src={user?.photoURL ? user.photoURL : defaultIcon}></img>
                <h3>{user?.displayName}</h3>
                <Link className="separate" to="/setprofile">プロフィールを変更</Link>
            </div>
        </div>
    );
}

export default Home;