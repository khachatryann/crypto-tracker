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
        <div  className='main__container'>
            {/* <div className='search__bar'>
                <input type="search"  placeholder='Search' onChange={(e) => setSearchCoin(e.target.value)}/>
            </div> */}
            <table>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>24h %</th>
                    <th>Market Cap</th>
                    <th>Volume(24h)</th>
                    <th>Circulating Supply</th>
                </tr>
                {listOfCoins
                .filter(coin => {
                    return coin.name.toLowerCase().startsWith(searchCoin.toLocaleLowerCase())
                })
                .map((coin) => {
                    return (
                            <tr>
                                <td>{coin.rank}</td>
                                <td>
                                    <img src={coin.icon} alt='Icon' />
                                    <p>{coin.name}</p>
                                    <p>{coin.symbol}</p>
                                </td>
                                <td>{'$' + parseFloat(coin.priceUsd).toFixed(2)}</td>
                                <td>
                                    {
                                        coin.changePercent24Hr > 0 
                                        ? '+' + parseFloat(coin.changePercent24Hr).toFixed(2) + '%' 
                                        : (parseFloat(coin.changePercent24Hr).toFixed(2) + '%')
                                    }
                                </td>
                                <td>{'$' + Math.round(coin.marketCapUsd)}</td>
                                <td>{'$' + Math.round(coin.volumeUsd24Hr)}</td>
                                <td>{Math.round(coin.supply) + ' ' + coin.symbol}</td>
                            </tr>   
                    )})}
            </table>    
        </div>
    )
}