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
        .catch(error => {
            console.error('Error fetching data:', error)
        })
    }, [])
    

    return(
        <>
            <div className='header'>
                <h1>Today's Cryptocurrency Prices by Market Cap 💸</h1>
                <input type="search"  placeholder='Search Cryptocurrency 🔎' onChange={(e) => setSearchCoin(e.target.value)}/>
            </div>  
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>24h %</th>
                        <th>Market Cap</th>
                        <th>Volume(24h)</th>
                        <th>Circulating Supply</th>
                    </tr>
                </thead>    
                <tbody>
                    {listOfCoins.length > 0 ? (
                        listOfCoins
                            .filter(coin => {  
                                return coin.name.toLowerCase().includes(searchCoin.toLocaleLowerCase()) || coin.symbol.toLowerCase().includes(searchCoin.toLocaleLowerCase())               
                            })  
                            .map((coin) => {
                                return (
                                        <tr key={coin.id}>
                                            <td>{coin.rank}</td>
                                            <td>
                                                <div className="name__box">
                                                    <img className='icon' src={"images/icons/" + coin.symbol.toLowerCase() + ".png"} alt='Icon' />
                                                    <p className='coin__name'>{coin.name}</p>
                                                    <p className='coin__symbol'>{coin.symbol}</p>    
                                                </div>
                                            </td>
                                            <td>{'$' + parseFloat(coin.priceUsd).toFixed(2)}</td>
                                            <td>
                                                {
                                                    coin.changePercent24Hr > 0 
                                                    ? <p style={{'color' : 'rgb(30, 191, 113)'}}>{'+' + parseFloat(coin.changePercent24Hr).toFixed(2) + '%' }</p>
                                                    : (<p style={{'color' : 'rgb(226, 32, 52)'}}>{parseFloat(coin.changePercent24Hr).toFixed(2) + '%'}</p>)
                                                }
                                            </td>
                                            <td>{'$' + Math.round(coin.marketCapUsd)}</td>
                                            <td>{'$' + Math.round(coin.volumeUsd24Hr)}</td>
                                            <td>{Math.round(coin.supply) + ' ' + coin.symbol}</td>
                                        </tr>   
                                )
                    })
        ) : (
                <tr>
                    <td colSpan="7">No coins found.</td>
                </tr>
        )
            }
        </tbody>
            </table>   
        </>
    )
}