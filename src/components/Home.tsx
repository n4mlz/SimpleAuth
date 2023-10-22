import React from "react";
import { SignOut } from "../firebase";

const Home: React.FC = () => {
    return (
        <div>
            <h1>ホーム</h1>
            <button onClick={SignOut}>サインアウト</button>
        </div>
    );
}

export default Home;