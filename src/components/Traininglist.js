import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        getTrainings();
    }, [])

    const columns = [
        { headerName: 'Activity', field: 'activity', sortable: true, filter: true },
        {
            headerName: 'Date', field: 'date',
            valueFormatter: function (params) {
                return moment(params.value).format('DD.MM.YYYY hh:mm a');
            },
            sortable: true, filter: true
        },
        { headerName: 'Duration (min)', field: 'duration', sortable: true, filter: true },
        { headerName: 'First Name', field: 'customer.firstname', sortable: true, filter: true },
        { headerName: 'Last Name', field: 'customer.lastname', sortable: true, filter: true }
    ]

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    return (
        <div className="ag-theme-material" style={{ height: '600px', width: '60%', margin: 'auto' }}>
            <h1>Trainings</h1>
            <AgGridReact
                columnDefs={columns}
                rowData={trainings}
                pagination={true}
                paginationPageSize={9}
            >
            </AgGridReact>
        </div>
    );
}

export default Traininglist;