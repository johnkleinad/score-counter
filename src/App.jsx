import { useEffect, useState } from 'react';
import './App.css'

function App() {

  useEffect(() => {
    const playersList = JSON.stringify(players)
    localStorage.setItem('playersList', playersList)
  }, [players])
  return <>
    aqui no hay nada
  </>
}

export default App