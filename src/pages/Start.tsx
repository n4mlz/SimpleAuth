import { ReactNode } from "react";
import SignInUpForm from "../components/SignInUpForm";
import EmailVerification from "../components/EmailVerification";
import ResetPassword from "../components/ResetPassword";
import "../style/SignInUp.css"
import heroareaimg from "../../public/heroarea.jpg"

const pages: {[key: string]: ReactNode} = {
    signup: <SignInUpForm isSignIn={false} />,
    signin: <SignInUpForm isSignIn={true} />,
    verify: <EmailVerification />,
    reset: <ResetPassword />
}

const Start: React.FC<{ page: string }> = (props) => {
    return (
        <div>
            <div className="heroarea">
                <img src={heroareaimg} />
                <h1>Happy<br />Helloween!</h1>
            </div>
            {pages[props.page]}
        </div>
    )
}

export default Start;
