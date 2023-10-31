import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import defaultIcon from "../assets/default-icon.png";

const Home: React.FC = () => {
    const user = useAuthContext();
    return (
        <div className="main-contents">
            <div className="block">
                <h1 className="headline">ホーム</h1>
                <div className="block-content">
                    <img className="icon big-icon" src={user?.photoURL ? user.photoURL : defaultIcon}></img>
                    <h1 className="separate">{user?.displayName}</h1>
                    <Link className="separate" to="/setprofile">プロフィールを変更</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;