import { SignOut } from "../firebase";
import "../style/Header.css"
import logo from "../../public/logo.png"
import { useAuthContext } from "../contexts/AuthContext";

const Header = () => {

    const user = useAuthContext();

    return (
        <header>
            <img className="logo" src={logo} />
            <h1>Simple Auth</h1>
            <nav>
                {user ? <button onClick={SignOut}>Sign Out</button> : null}
            </nav>
        </header>
    )
}

export default Header;