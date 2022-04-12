import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getColsFromRows } from '../../helpers/utils';


const DataTable = ({ rows, title }) => {
    const styles = {
        height: "400px",
        width: '100%'
    }
    return (
        <div style={styles}>
            <h2>{title}</h2>
            <DataGrid rows={rows} columns={getColsFromRows(rows)}/>
        </div>

    );
};

export default DataTable;