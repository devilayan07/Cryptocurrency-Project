import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryto } from '../../../ReduxToolkit/CryptoSlice';
import { useNavigate } from 'react-router-dom';


function CryptoList() {
  const[rowData,setRowData]=useState([])
  const[colDefs]=useState([
    {field:"name",headerName:"Name",filter:true,sortable: true},
    {field:"symbol",headerName:"Symbol",filter:true,sortable: true},
    {field:"rank",headerName:"Rank",filter:true,sortable: true,flex:1},
    {field:"priceUsd",headerName:"Price(USD)",filter:true,sortable: true},
    {field:"changePercent24Hr",headerName:"Change(%)",filter:false,sortable: true},
    {field:"marketCapUsd",headerName:"Market Cap(USD)",filter:true,sortable: true},
    { field: "volumeUsd24Hr", headerName: "Volume (USD 24H)", sortable: true, filter: true },
    { field: "supply", headerName: "Supply", sortable: true, filter: true },

])



const Assets=useSelector(state=>state.Crypto)
console.log(Assets)
const dispatch=useDispatch()
const navigate=useNavigate()

useEffect(()=>{
  dispatch(fetchCryto())
},[dispatch])

useEffect(()=>{
  if(Assets?.assets?.data){
    setRowData(Assets?.assets?.data)

  }
},[Assets])

const handleRowClicked=(event)=>{
  const rowData=event.data
  const cryptoId=rowData?.id

  navigate(`/crypto/${cryptoId}`)

}

  return (
    <div>
      <div style={{justifyContent:"center",alignItems:"center",display:"flex"}}>
        <h1>Crypto Currencies</h1>

      </div>
      <div
  className="ag-theme-quartz-dark" // applying the Data Grid theme
  style={{ height: 550 }} // the Data Grid will fill the size of the parent container
 >
   <AgGridReact
       rowData={rowData}
       columnDefs={colDefs}
       pagination={true}
       paginationPageSize={10}
       paginationPageSizeSelector={[10, 20, 30]}
       onRowClicked={handleRowClicked}

   />
 </div>



      
    </div>
  )
}

export default CryptoList

