import React from "react";
import { Link } from "react-router-dom";
import { SignOut } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";

const Home: React.FC = () => {
    const user = useAuthContext();
    return (
        <div>
            <h1>ホーム</h1>
            <img src={user?.photoURL?user.photoURL:undefined}></img>
            <p>{user?.displayName}</p>
            <button onClick={SignOut}>サインアウト</button>
            <Link to="/setprofile">プロフィールを変更</Link>
        </div>
    );
}

export default Home;