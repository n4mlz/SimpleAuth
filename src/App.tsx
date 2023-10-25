import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"
import Home from "./components/Home";
import SignInUpForm from "./components/SignInUpForm";
import EmailVerification from "./components/EmailVerification";
import "./App.css"
import ResetPassword from "./components/ResetPassword";
import SetProfile from "./components/SetProfile";

function App() {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInUpForm isSignIn={true} />} />
          <Route path="/signup" element={<SignInUpForm isSignIn={false} />} />
          <Route path="/verify" element={<EmailVerification />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/setprofile" element={<SetProfile />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
