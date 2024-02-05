import axios from 'axios';
import React, {useEffect, useState} from 'react';

export const Coins = () => {

    const [listOfCoins, setlistOfCoins] = useState([]);
    const [searchCoin, setSearchCoin] = useState('');

    useEffect(() => {
        axios.get("https://api.coincap.io/v2/assets")
        .then((res) => {
          setlistOfCoins(res.data.data)
        })
    }, [])

    return(
        <>
        <div className='search__bar'>
            <input type="search"  placeholder='Search' onChange={(e) => setSearchCoin(e.target.value)}/>
        </div>
        <div className="header">
            <ul className='sticky'>
                <li className='sticky__top'>#</li>
                <li className='sticky__top'>Name</li>
                <li className='sticky__top'>Price</li>
                <li className='sticky__top'>24h %</li>
                <li className='sticky__top'>Market Cap</li>
                <li className='sticky__top'>Volume(24h)</li>
                <li className='sticky__top'>Circulating Supply</li>
            </ul>
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
                            <p className='coin__rank'>{coin.rank}</p>
                            <div className="img__container">
                                <img src={coin.icon} alt={coin.symbol + " " + 'Icon'} />
                            </div>

                            <p className='coin__name'>{coin.name}</p>
                            <p className='coin__symbol'>{coin.symbol}</p>

                            <p className='coin__price'>{'$' + " " + parseFloat(coin.priceUsd).toFixed(2)}</p>

                            <p className='coin__changes'>
                                {(coin.changePercent24Hr < 0) ? <p style={{color : 'red'}}>{parseFloat(coin.changePercent24Hr).toFixed(2)}%</p> : <p style={{color : 'rgb(25, 193, 25)'}}>{'+' + parseFloat(coin.changePercent24Hr).toFixed(2)}%</p>}
                            </p>

                            <p className='market__cap'>{Math.round(coin.marketCapUsd)}</p>

                            <p className='coin__volume'>{Math.round(coin.volumeUsd24Hr)}</p>

                            <p className='coin__supply'>{Math.round(coin.supply)}</p>
                        </div>
                    </div>
                )})}    
        </div>
        </>
    )
}