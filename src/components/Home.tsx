import React from "react";
import { Link } from "react-router-dom";
import { SignOut } from "../firebase";

const Home: React.FC = () => {
    return (
        <div>
            <h1>ホーム</h1>
            <button onClick={SignOut}>サインアウト</button>
            <Link to="/setprofile">プロフィールを変更</Link>
        </div>
    );
}

export default Home;