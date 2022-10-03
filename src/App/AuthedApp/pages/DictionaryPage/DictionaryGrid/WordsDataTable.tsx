import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { DataGrid, GridRowParams, GridToolbar } from '@mui/x-data-grid';
import s from './WordsDataTable.module.scss';
import { Popover, Typography } from '@mui/material';
import { Word } from 'src/redux/dictionary/interfaces';
import { useSnackbar } from 'notistack';
import { ERR_SNACKBAR } from 'src/helpers/constants';
import { SentenceWord } from 'src/redux/sentence/interfaces';
import { getColsFromRows } from 'src/helpers/utils';
import { CustomToolbar } from './CustomToolbar';


type Props = {
    rows: Word[]
    title?: string
    colWidth?: number
    height?: string
    setState?: Dispatch<SetStateAction<SentenceWord>> 
    handleClose?: () => void
    disabledArabic?: string
}


const WordsDataTable = ({ 
    rows,
    title="",
    colWidth=130,
    height="400px",
    handleClose, 
    setState, 
    disabledArabic="" 
} : Props) => {
    const styles = {
        height: height,
        width: '100%'
    }
    const [open, setOpen]             = useState(false);
    const [anchorEl, setAnchorEl]     = useState<EventTarget & HTMLElement | null>(null);
    const [popoverVal, setPopoverVal] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    // setState and Handleclose will be functions if used in a modal
    function handleRowClick(params: GridRowParams) {
        if (setState) {

            if (disabledArabic && params.row.arabic === disabledArabic) return
            setState(prev => ({
                ...prev,
                arabic: params.row.arabic,
                english: params.row.english,
                id: params.row.id
            }));
            handleClose!();
        }
    }
    
    function handleMouseEnter({ currentTarget }: ChangeEvent<HTMLElement>) {
        const { field } = currentTarget.dataset;
        const arabicOrEnglish = field === "english" || field === "arabic";
        if (arabicOrEnglish) {
            const id       = currentTarget.parentElement!.dataset.id;
            const foundRow = rows.find(row => row.id === id);
            if (!foundRow) {
                enqueueSnackbar("couldn't find row when hovering over element.", ERR_SNACKBAR);
            } else {
                if (foundRow.english.length > 18) {
                    setPopoverVal(foundRow.english);
                    setAnchorEl(currentTarget);
                    setOpen(true);
                }
            }
            
        }
    }

    function handleMouseLeave({ currentTarget }: ChangeEvent<HTMLElement>) {
        //console.log(currentTarget);
        if (open) {
            setOpen(false);
            setAnchorEl(null);
            setPopoverVal('');
        }
    }

    return (
        <div style={styles}>
            {title && <h2>{title}</h2>}
            <DataGrid 
                rows={rows}
                columns={getColsFromRows(rows, colWidth)}
                onRowClick={handleRowClick}
                disableSelectionOnClick
                classes={{row: s.row}}
                getRowClassName={(params) => params.row.arabic === disabledArabic ? s.disabled : s.row}
                getCellClassName={(params) => params.field === "arabic" ? s.arabic : ''}
                components={{
                    Toolbar: CustomToolbar
                }}
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