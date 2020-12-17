import React, { useState, useEffect, useRef } from 'react';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState();

    const gridRef = useRef();

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
        { headerName: 'Phone Number', field: 'phone', sortable: true, filter: true },
        {
            headerName: '',
            field: 'links.0.href',
            cellRendererFramework: params => <EditCustomer updateCustomer={updateCustomer} params={params} />
        },
        {
            headerName: '',
            field: 'links.0.href',
            cellRendererFramework: params => <Button
                color="secondary"
                size="small"
                onClick={() => deleteCustomer(params.value)}>
                Delete
                                             </Button>
        }
    ]

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Delete Customer?')) {
            fetch(link, {
                method: 'DELETE'
            })
                .then(_ => getCustomers())
                .then(_ => setMsg('The customer was deleted.'))
                .then(_ => setOpen(true))
                .catch(err => console.error(err))
        }
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newCustomer)
        })
            .then(_ => getCustomers())
            .then(_ => setMsg('The customer was added.'))
            .then(_ => setOpen(true))
            .catch(err => console.error(err))
    }

    const updateCustomer = (link, customers) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customers)
        })
            .then(_ => getCustomers())
            .then(_ => setMsg('The customer was updated.'))
            .then(_ => setOpen(true))
            .catch(err => console.error(err))
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (

        <div style={{ height: '600px', width: '90%', margin: 'auto' }}>
            <AddCustomer addCustomer={addCustomer} />
            <div className="ag-theme-material" style={{ height: '580px', width: '90%', margin: 'auto' }}>
                <h1>Customers</h1>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => {
                        gridRef.current = params.api;
                        params.api.sizeColumnsToFit();
                    }}
                    columnDefs={columns}
                    suppressCellSelection={true}
                    rowData={customers}
                    pagination={true}
                    paginationPageSize={9}
                >
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={msg}
                />
            </div>
        </div>
    );
}

export default CustomerList;