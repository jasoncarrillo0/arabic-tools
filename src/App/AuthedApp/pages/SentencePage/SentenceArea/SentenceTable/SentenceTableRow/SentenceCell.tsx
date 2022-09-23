import { TableCell, Tooltip } from '@mui/material';
import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode | ReactNode[]
    onClick: () => void
    isEditing: boolean
    style?: object
}

const SentenceCell = ({
    children,
    onClick,
    isEditing,
    style={}
} : Props) => {

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