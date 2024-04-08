import React, { useEffect, useState } from 'react'
import PlayerCard from '../components/PlayerCard'
import { Link } from 'react-router-dom';

export default function AddPlayer() {
    const [player, setPlayer] = useState('')
    const [players, setPlayers] = useState(JSON.parse(localStorage.getItem('playersList')) || [])

    useEffect(() => {
        const playersList = JSON.stringify(players)
        localStorage.setItem('playersList', playersList)
    }, [players])

    const addPlayer = (event) => {
        event.preventDefault();
        const newPlayer = {
            name: player,
            score: [0],
            id: Date.now() + Math.floor(Math.random())
        }

        setPlayers([...players, newPlayer])
        setPlayer('')
    }
    const DeletePlayer = (playerId) => {
        setPlayers(players.filter(player => player.id !== playerId))
    }
    const startGame = () => {
        const playersList = JSON.stringify(players)
        localStorage.setItem('playersList', playersList)
    }
    return <>
        <div className="flex flex-col gap-10">
            <form onSubmit={(e) => addPlayer(e)} className='flex flex-col gap-5'>
                <label className='font-bold text-xl' htmlFor="Nombre">Agrega los nombres de los jugadores</label>
                <input className='bg-white h-10 min-w-[250px] text-black p-3 font-medium text-center' value={player} onChange={(e) => setPlayer(e.target.value)} type="text" />
                <button disabled={!player ? true : false} className='bg-blue-600 py-4 rounded-xl text-xl font-bold'>
                    Agregar Jugador
                </button>
            </form>
            <Link to={'/scorePlayers'}>
                <button onClick={startGame} className='bg-green-600 py-4 rounded-xl text-xl font-bold'>
                    Comenzar Juego
                </button>
            </Link>
            <div className='flex gap-4 flex-col'>
                {players.map((p, i) =>
                    <PlayerCard
                        key={i}
                        i={i}
                        player={p}
                        DeletePlayer={DeletePlayer}
                    />)}
            </div>
        </div>
    </>
}