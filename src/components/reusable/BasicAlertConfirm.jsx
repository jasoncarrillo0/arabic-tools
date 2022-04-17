import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";

const BasicAlertConfirm = ({ open, title, content, handleClose, handleConfirm, loading }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle >
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions >
                <Button sx={{marginLeft: '0.5rem'}} variant="contained" onClick={handleClose}>No</Button>
                <LoadingButton variant="contained" loading={loading} onClick={handleConfirm}>Yes</LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default BasicAlertConfirm;
