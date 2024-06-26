import React, { useEffect, useState } from 'react'
import PlayerCard from '../components/PlayerCard'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function AddPlayer() {
    const [player, setPlayer] = useState('')
    const [players, setPlayers] = useState(JSON.parse(localStorage.getItem('playersList')) || [])
    const navigate = useNavigate();

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
        navigate('/scorePlayers')
    }
    return <>
        <div className="flex flex-col gap-10">
            <form onSubmit={(e) => addPlayer(e)} className='flex flex-col gap-5'>
                <label className='font-bold text-xl' htmlFor="Nombre">Agrega los nombres de los jugadores</label>
                <input className='bg-white h-10 min-w-[250px] text-black p-3 font-medium text-center' value={player} onChange={(e) => setPlayer(e.target.value)} type="text" />
                <button disabled={!player ? true : false} className='bg-blue-600 py-4 rounded-xl text-xl font-bold cursor-pointer'>
                    Agregar Jugador
                </button>
            </form>
            <button className='bg-green-600 py-4 rounded-xl text-xl font-bold text-white hover:text-white' disabled={!players.length} onClick={startGame}>
                Comenzar Juego
            </button>
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