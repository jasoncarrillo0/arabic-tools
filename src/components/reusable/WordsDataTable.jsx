import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getColsFromRows } from '../../helpers/utils';
import s from './WordsDataTable.module.scss';

const WordsDataTable = ({ rows, title, wordType, handleClose=null, setState=null, disabledId="" }) => {
    const styles = {
        height: "400px",
        width: '100%'
    }

    // setState and Handleclose will be functions if used in a modal
    function handleRowClick(params) {
        if (typeof(setState === 'function')) {

            if (disabledId && params.row.id === disabledId) return
            setState(prev => ({
                ...prev, [wordType]: { 
                    word: params.row.arabic,
                    id: params.row.id
                }
            }))
            handleClose();
        }
    }
    
    return (
        <div style={styles}>
            <h2>{title}</h2>
            <DataGrid 
                rows={rows} 
                columns={getColsFromRows(rows)}
                onRowClick={handleRowClick}
                disableSelectionOnClick
                classes={{row: s.row}}
                getRowClassName={(params) => params.row.id === disabledId ? s.disabled : s.row}
            />
        </div>

    );
};

export default WordsDataTable;