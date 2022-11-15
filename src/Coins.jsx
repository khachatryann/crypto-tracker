import axios from 'axios';
import React, {useEffect, useState} from 'react';

export const Coins = () => {

    const [listOfCoins, setlistOfCoins] = useState([]);
    const [searchCoin, setSearchCoin] = useState('');

    useEffect(() => {
        axios.get("https://api.coinstats.app/public/v1/coins?skip=0&limit=10")
        .then((res) => {
          setlistOfCoins(res.data.coins)
        })
    }, [])

    return(
        <>
        <div className='search__bar'>
            <input type="search"  placeholder='Search' onChange={(e) => setSearchCoin(e.target.value)}/>
        </div>
        <div  className='parent__container'>
            {listOfCoins
            .filter(coin => {
                return coin.name.toLowerCase().startsWith(searchCoin.toLocaleLowerCase())
            })
            .map((coin) => {
                return (
                    <div className='container' key={coin.id}>
                        <div className="controller">
                        <p className='coin__name'>{coin.symbol}</p>
                        <div className="img__container">
                            <img src={coin.icon} alt={coin.symbol + " " + 'Icon'} />
                        </div>
                        </div>
                        <p className='coin__price'>{'$' + " " + coin.price}</p>

                        <p className='coin__changes'>
                            {(coin.priceChange1h < 0) ? <p style={{color : 'red'}}>{coin.priceChange1h}</p> : <p style={{color : 'rgb(25, 193, 25)'}}>{'+' + coin.priceChange1h}</p>}
                        </p>
                    </div>
                )})}
        </div>
        </>
    )
}