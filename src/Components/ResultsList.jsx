import React, {useEffect, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "axios";
import ButtonRenderer from "./ButtonRenderer";


const ResultsList = () =>{
  const [rowData, setRowData] = useState([]);

  const dataCallBack = () => {
    axios.get("http://localhost:8080/getResult").then(
        response =>{
          setRowData(response.data);
        })
  }
  const onCellClicked = (events) => {
    if (events.colDef.field === "Delete") {
      axios.delete("http://localhost:8080/deleteResult",
          {params: {id: events.data.id}}).then(dataCallBack)
    }
  }

  useEffect(()=>{
    dataCallBack()
  },[])

  const [columnDefs] = useState([
    {field: 'course', headerName:"Course"},
    {field: 'studentName', headerName:"Student"},
    {field: 'score', headerName:"Score"},
    {field: 'Delete', minWidth: 175, cellRenderer: ButtonRenderer}
  ])
  return(
      <div className="ag-theme-alpine" style={{height: 400, width: 800}}>
        <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
          onCellClicked={onCellClicked}>
        </AgGridReact>
      </div>
  );
}

export default ResultsList;
