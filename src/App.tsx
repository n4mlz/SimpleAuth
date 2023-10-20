import { Routes, Route } from 'react-router-dom';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm'
import Home from './components/Home';
import { AuthProvider } from './contexts/AuthContext'
import './App.css'

function App() {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignInForm />} />
          <Route path='/signup' element={<SignUpForm />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
