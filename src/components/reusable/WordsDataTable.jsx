import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getColsFromRows } from '../../helpers/utils';
import s from './WordsDataTable.module.scss';

const WordsDataTable = ({ rows, title, handleClose=null, setState=null }) => {
    const styles = {
        height: "400px",
        width: '100%'
    }

    // setState and Handleclose will be functions if used in a modal
    function handleRowClick(params) {
        console.log(params);
        if (typeof(setState === 'function')) {
            setState(prev => ({
                ...prev, [title]: { 
                    word: params.row.arabic,
                    id: params.row.id
                }
            }))
            handleClose();
        }
    }
    
    return (
        <div style={styles}>
            <h2>{"Select " + title}</h2>
            <DataGrid 
                rows={rows} 
                columns={getColsFromRows(rows)}
                onRowClick={handleRowClick}
                disableSelectionOnClick
                classes={{row: s.row}}
            />
        </div>

    );
};

export default WordsDataTable;