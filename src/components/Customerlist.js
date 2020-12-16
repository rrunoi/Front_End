import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function CustomerList() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getCustomers();
    }, [])

    const columns = [
        { headerName: 'First Name', field: 'firstname', sortable: true, filter: true },
        { headerName: 'Last Name', field: 'lastname', sortable: true, filter: true },
        { headerName: 'Street Address', field: 'streetaddress', sortable: true, filter: true },
        { headerName: 'Postal Code', field: 'postcode', sortable: true, filter: true },
        { headerName: 'City', field: 'city', sortable: true, filter: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        { headerName: 'Phone Number', field: 'phone', sortable: true, filter: true }
    ]

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    return (
        <div className="ag-theme-material" style={{ height: '600px', width: '85%', margin: 'auto' }}>
            <h1>Customers</h1>
            <AgGridReact
                columnDefs={columns}
                rowData={customers}
                pagination={true}
                paginationPageSize={9}
            >
            </AgGridReact>
        </div>
    );
}

export default CustomerList;