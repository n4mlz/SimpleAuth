import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import { AuthProvider } from './contexts/AuthContext'
import './App.css'
import AuthForm from './components/AuthForm';

function App() {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='auth' element={<AuthForm />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
