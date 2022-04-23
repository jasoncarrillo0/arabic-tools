import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getColsFromRows } from '../../helpers/utils';
import s from './WordsDataTable.module.scss';
import { Popover, Typography } from '@mui/material';

const WordsDataTable = ({ 
    rows, 
    title="",
    colWidth=130,
    height="400px",
    wordType="", 
    handleClose=null, 
    setState=null, 
    disabledId="" 
}) => {
    const styles = {
        height: height,
        width: '100%'
    }
    const [open, setOpen]             = useState(false);
    const [anchorEl, setAnchorEl]     = useState(null);
    const [popoverVal, setPopoverVal] = useState('');

    // setState and Handleclose will be functions if used in a modal
    function handleRowClick(params) {
        if (setState && typeof(setState === 'function')) {

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
    
    function handleMouseEnter({ currentTarget }) {
        const { field } = currentTarget.dataset;
        const arabicOrEnglish = field === "english" || field === "arabic";
        if (arabicOrEnglish) {
            const id          = currentTarget.parentElement.dataset.id;
            const { english } = rows.find(row => row.id === id);
            if (english.length > 18) {
                setPopoverVal(english);
                setAnchorEl(currentTarget);
                setOpen(true);
            }
        }
    }

    function handleMouseLeave({ currentTarget }) {
        //console.log(currentTarget);
        if (open) {
            setOpen(false);
            setAnchorEl(null);
            setPopoverVal('');
        }
    }
    return (
        <div style={styles}>
            <h2>{title}</h2>
            <DataGrid 
                rows={rows} 
                columns={getColsFromRows(rows, colWidth)}
                onRowClick={handleRowClick}
                disableSelectionOnClick
                classes={{row: s.row}}
                getRowClassName={(params) => params.row.id === disabledId ? s.disabled : s.row}
                getCellClassName={(params) => params.field === "arabic" ? s.arabic : ''}
                componentsProps={{
                    cell: {
                        onMouseEnter: handleMouseEnter,
                        onMouseLeave: handleMouseLeave
                    }
                }}
            />
            <Popover
                sx={{ 'pointerEvents': 'none'}}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',    
                }}
                disableRestoreFocus
            >
                <Typography sx={{p: 1}}>{popoverVal}</Typography>
            </Popover>
        </div>

    );
};

export default WordsDataTable;