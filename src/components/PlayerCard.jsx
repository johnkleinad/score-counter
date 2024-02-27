const PlayerCard = ({ i, player, DeletePlayer }) => {
    return <>
        <div className=' border border-white p-5 flex justify-between rounded-md'>
            <div className='items-start flex flex-col capitalize'>
                <span>Jugador {i + 1}</span>
                <p >{player.name}</p>
            </div>
            <button className='text-red-600' onClick={() => DeletePlayer(player.id)}>Delete</button>
        </div>
    </>
}
export default PlayerCard