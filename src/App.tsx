import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import SignInUp from "./pages/SignInUp";
import EmailVerification from "./components/EmailVerification";
import ResetPassword from "./components/ResetPassword";
import SetProfile from "./components/UpdateProfile";
import PageTransition from "./components/PageTransition";
import "./App.css";
import Header from "./pages/Header";

function App() {

  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInUp isSignIn={true} />} />
          <Route path="/signup" element={<SignInUp isSignIn={false} />} />
          <Route path="/verify" element={<EmailVerification />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/setprofile" element={<SetProfile />} />
        </Routes>
        <PageTransition />
      </AuthProvider>
    </>
  )
}

export default App
