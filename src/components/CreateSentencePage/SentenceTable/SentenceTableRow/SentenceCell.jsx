import { TableCell, Tooltip } from '@mui/material';
import React from 'react';

const SentenceCell = ({
    children,
    onClick,
    isEditing,
    style={}
}) => {

    const nonEditingStyles = {
        cursor: "inherit",
        "&:hover": {
            "backgroundColor": "inherit"
        }
    }

    return (
        <>
        {
            isEditing && typeof(children) === "string" ? (
                <Tooltip title="edit" arrow>
                    <TableCell onClick={onClick} sx={style} component="th" scope="row">
                    {children}
                    </TableCell>
                </Tooltip>
            ) : (
                <TableCell onClick={onClick} sx={{...style, ...nonEditingStyles}} component="th" scope="row">
                {children}
                </TableCell>
            )
        }
        </>
    );
};

export default SentenceCell;