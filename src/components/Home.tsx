import { SignOut } from "../firebase";

function Home() {
    return (
        <div>
            <button onClick={SignOut}>サインアウト</button>
        </div>
    );
}

export default Home;