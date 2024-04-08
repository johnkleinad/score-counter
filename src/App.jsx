import './App.css'
import { Link } from 'react-router-dom';

function App() {

  return <>
    aqui no hay nada
    <br />
    <Link to={'/addPlayers'}>
      Add players con linl
    </Link>
  </>
}

export default App