import React, {useEffect, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "axios";
import ButtonRenderer from "./ButtonRenderer";

const CourseList = () => {
  const [rowData, setRowData] = useState([]);

  const dataCallBack = () => {
    axios.get("http://localhost:8080/getCourse").then(
        response => {
          setRowData(response.data);
        })
  }

  useEffect(() => {
    dataCallBack()
  }, [])

  const [columnDefs] = useState([
    {field: 'course', headerName: "Course Name"},
    {field: 'Delete', minWidth: 175, cellRenderer: ButtonRenderer}
  ])

  const onCellClicked = (events) => {
    if (events.colDef.field === "Delete") {
      axios.delete("http://localhost:8080/deleteCourse",
          {params: {id: events.data.id}}).then(dataCallBack)
    }
  }

  return (
      <div className="ag-theme-alpine" style={{width: 400, height: 700}}>
        <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            onCellClicked={onCellClicked}

        >
        </AgGridReact>
      </div>
  );
}

export default CourseList;
