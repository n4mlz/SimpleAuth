import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Start from "./pages/Start";
import SetProfile from "./pages/SetProfile";
import PageTransition from "./components/PageTransition";
import "./App.css";
import Header from "./components/Header";

function App() {

  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Start page="signin" />} />
          <Route path="/signup" element={<Start page="signup" />} />
          <Route path="/verify" element={<Start page="verify" />} />
          <Route path="/reset" element={<Start page="reset" />} />
          <Route path="/setprofile" element={<SetProfile />} />
        </Routes>
        <PageTransition />
      </AuthProvider>
    </>
  )
}

export default App
