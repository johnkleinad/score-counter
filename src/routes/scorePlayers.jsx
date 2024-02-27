import { useEffect, useState, useRef } from "react"

export default function scorePlayers() {
    const [players, setPlayers] = useState(JSON.parse(localStorage.getItem('playersList')) || []);
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [playerId, setPlayerId] = useState();
    const [isAdd, setIsAdd] = useState(false);

    const getId = (id, isAdd) => {
        setPlayerId(id)
        setIsAdd(isAdd)
        setIsOpenAddModal(true)
    }

    // const getMVP = (players) => {
    //     let jugadorConMasPuntos = null;
    //     let puntosMasAltos = -Infinity;
    //     for (const player of players) {
    //         if (player.score.reduce((total, score) => total + score, 0) > puntosMasAltos) {
    //             jugadorConMasPuntos = player;
    //             puntosMasAltos = player.score.reduce((total, score) => total + score, 0);
    //         }
    //     }
    //     return jugadorConMasPuntos;
    // }

    // useEffect(() => {
    //     const jugadorConMasPuntos = getMVP(players);
    //     if (jugadorConMasPuntos) {
    //         console.log(`El jugador con más puntos es ${jugadorConMasPuntos.name} con ${jugadorConMasPuntos.score.reduce((total, score) => total + score, 0)} puntos.`);
    //     } else {
    //         console.log('No hay jugadores.');
    //     }
    // }, [players])

    const updatePoints = (newPoints) => {
        setIsOpenAddModal(false)
        const newPlayersList = players.map(player => {
            if (player.id === playerId) {
                return { ...player, score: [...player.score, newPoints] };
            }
            return player
        })
        setPlayers(newPlayersList)
        const playersList = JSON.stringify(newPlayersList)
        localStorage.setItem('playersList', playersList)
        console.log(newPlayersList);
    }

    return <>
        <div className="flex flex-col w-full gap-5">
            <div className="bg-black/50 rounded-md p-3 gap-5">
                <div className="text-3xl font-black text-left uppercase mb-5">historial</div>
                <div className="inline-flex divide-x overflow-auto w-full py-3" >
                    <div className="bg-transparent backdrop-blur-sm sticky left-0">
                        <span className="font-bold text-lg">Ronda</span>
                        {players[0].score.map((s, i) => i > 0 && <div className="text-lft"> {i}</div>)}
                    </div>
                    {players.map((player) => {
                        return <div className="px-2 text-center ">
                            <span className="capitalize font-bold text-xl">{player.name}</span>
                            {player.score.map((score, i) => i > 0 && <div className={`${score > 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>{score}</div>)}
                        </div>
                    })}
                </div>
            </div>
            {players.map(({ score, name, id }) => {
                const totalScore = score.reduce((total, score) => total + score, 0)
                return <>
                    <PlayerCard
                        name={name}
                        score={totalScore}
                        id={id}
                        addScore={getId}
                    // mvp={jugadorConMasPuntos}
                    />
                </>
            })}

        </div >
        {isOpenAddModal &&
            <ModalAdd
                updatePoints={updatePoints}
                setIsOpenAddModal={setIsOpenAddModal}
                add={isAdd}
            />
        }
    </>
}

function PlayerCard({ score, name, id, addScore }) {
    return <>
        <div key={id} className="border-white border w-full p-5 flex flex-col gap-4 rounded-md">
            <div className="flex flex-col items-baseline">
                <span className="text-2xl font-medium capitalize">{name}</span>
            </div>
            <div className="grid grid-cols-3 divide-x gap-3">
                <div>
                    <span className="flex justify-center px-2">Ultimo Punto</span>
                </div>
                <div>
                    <span className="flex justify-center px-2">Puntos <br />{score}</span>
                </div>
                <div>
                    <span className="flex justify-center px-2">Desahcer</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
                <button onClick={() => addScore(id, true)} className='bg-green-600 py-4 rounded-lg text-xl font-bold'>Sumar</button>
                <button onClick={() => addScore(id, false)} className='bg-red-600 py-4 rounded-lg text-xl font-bold'>Restar</button>
            </div>
        </div>
    </>
}

function ModalAdd({ updatePoints, setIsOpenAddModal, add }) {
    const [numberValue, setNumberValue] = useState(0);
    const inputRef = useRef();
    const handleClick = () => {
        updatePoints((add ? Number(numberValue) : -Number(numberValue)))
    }

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return <>
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" >
            <div className={`h-full w-full bg-gradient-to-t ${add ? 'from-green-600' : 'from-red-700'}`} />
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="bg-stone-800 p-10 rounded-md flex flex-col gap-5">
                    <span className="font-medium text-2xl">Sumar Puntos</span>
                    <input
                        ref={inputRef}
                        autofocus
                        onChange={(e) => setNumberValue(e.target.value)}
                        className="p-3 text-black text-center bg-white"
                        type="tel"
                    />
                    <div className="grid grid-cols-2">
                        <button onClick={() => setIsOpenAddModal(false)}>cerrar</button>
                        <button onClick={handleClick}>agregar</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}