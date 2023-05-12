import React, {useEffect, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "axios";
import ButtonRenderer from "./ButtonRenderer";

const StudentsList = () => {
  const [rowData, setRowData] = useState([]);

  const dataCallBack = () => {
    axios.get("http://localhost:8080/getStudent").then(
        response => {
          setRowData(response.data);
        })
  }

  useEffect(() => {
    dataCallBack()
  }, [])

  const [columnDefs] = useState([
    {field: 'studentName', headerName: "Name & Family Name"},
    {field: 'dateOfBirth', headerName: "Date Of Birth"},
    {field: 'email', headerName: "Email"},
    {field: 'Delete', minWidth: 175, cellRenderer: ButtonRenderer}
  ])

  const onCellClicked = (events) => {
    if (events.colDef.field === "Delete") {
      axios.delete("http://localhost:8080/deleteStudent",
          {params: {id: events.data.id}}).then(dataCallBack)
    }
  }
  return (
      <div className="ag-theme-alpine" style={{height: 400, width: 800}}>
        <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            onCellClicked={onCellClicked}>
        </AgGridReact>
      </div>
  );
}

export default StudentsList;
