import './App.css'
import SignUpForm from './components/SignUpForm'
import { AuthProvider } from './contexts/AuthContext'

function App() {

  return (
    <>
      <AuthProvider>
        <SignUpForm />
      </AuthProvider>
    </>
  )
}

export default App
