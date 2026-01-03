import './App.css'
import Container from './Components/Container/Container'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'

function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <Container/>
      <Footer/>
    </div>
  )
}

export default App
