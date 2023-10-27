import SignInUpForm from "../components/SignInUpForm"
import "../style/SignInUp.css"
import heroareaimg from "../../public/heroarea.jpg"

const SignInUp: React.FC<{ isSignIn: boolean }> = (props) => {
    return (
        <div>
            <div className="heroarea">
                <img src={heroareaimg} />
                <h1>Happy<br />Helloween!</h1>
            </div>
            <SignInUpForm isSignIn={props.isSignIn} />
        </div>
    )
}

export default SignInUp;
