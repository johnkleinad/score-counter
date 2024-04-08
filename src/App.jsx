import { useEffect, useState } from 'react';
import './App.css'
import { Link } from 'react-router-dom';

function App() {

  return <>
    aqui no hay nada
    <a href="/addPlayers">add players con a</a>
    <Link to={'/addPlayers'}>
      Add players con linl
    </Link>
  </>
}

export default App