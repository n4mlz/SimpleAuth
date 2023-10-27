import "../style/Header.css"
import logo from "../../public/logo.png"

const Header = () => {
    return (
        <div className="header">
            <img className="logo" src={logo} />
        </div>
    )
}

export default Header;