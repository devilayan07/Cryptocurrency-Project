import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchCrytoDetails, fetchCrytoUpdate } from '../../../ReduxToolkit/CryptoSlice'
import "./CryptoDetails.css"

function CryptoDetails() {
    const {id}=useParams()
    console.log(id)

    const[user,setUser]=useState({
      priceUsd:"",
      changePercent24Hr:""

    })

    const {isLoading,singleassets}=useSelector(state=>state.Crypto)
    console.log(singleassets)
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(fetchCrytoDetails(id))

    },[dispatch,id])

    useEffect(()=>{
      if(singleassets){
        setUser({
          priceUsd:singleassets.priceUsd,
          changePercent24Hr:singleassets.changePercent24Hr
        })
      }
    },[singleassets])

    let name,value
    const handleChange=(e)=>{
      name=e.target.name
      value=e.target.value
      setUser({...user,[name]:value})

    }

    const handleSaveChanges=(e)=>{
      e.preventDefault()
      dispatch(fetchCrytoUpdate({id,user}))
    }
  return (
    <div>
        {
            isLoading ? ( <h2> Loading....   </h2>  )
            :(      <div className="crypto-details">
                <h1 className="crypto-name">
                    {singleassets?.name} ({singleassets?.symbol})
                </h1>
                <ul className="crypto-info">
                  <li>
                    <strong>Rank:</strong> {singleassets?.rank}
                  </li>
                  <li>
                    <strong>Price</strong>{" "}
                    <input
                      type="text"
                      name="priceUsd"
                      value={user.priceUsd}
                      onChange={handleChange}
                      // onBlur={handleSaveChanges}
                    />
                  </li>
                  <li>
                    <strong>Change (24H):</strong>{" "}
                    <input
                      type="text"
                      name="changePercent24Hr"
                      value={user.changePercent24Hr}
                      onChange={handleChange}
                      // onBlur={handleSaveChanges}
                    />
                    %
                  </li>
                  <li>
                    <strong>Market Cap (USD):</strong> ${singleassets?.marketCapUsd}
                  </li>
                  <li>
                    <strong>Volume (USD 24H):</strong> ${singleassets?.volumeUsd24Hr}
                  </li>
                  <li>
                    <strong>Supply:</strong> {singleassets?.supply}

                  </li>
                  <li>
                    <strong>Max Supply:</strong>  {singleassets?.maxSupply}
                  </li>
                  <li>
                    <strong>VWAP (USD 24H):</strong>  ${singleassets?.vwap24Hr}
                  </li>
                  <button onClick={handleSaveChanges}>Save Changes</button>
                  <li>
                    <strong>Explorer:</strong>{" "}
                    <a href={""} target="_blank" rel="noopener noreferrer">
                      {""}
                    </a>
                  </li>
                </ul>
              </div>
            )
        }
      
    </div>
  )
}

export default CryptoDetails
