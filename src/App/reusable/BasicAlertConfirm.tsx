import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

type Props = {
    open: boolean
    title: string
    content: string
    handleClose: () => void
    handleConfirm: () => void
    loading: boolean
}
const BasicAlertConfirm = ({ 
    open, 
    title, 
    content, 
    handleClose, 
    handleConfirm, 
    loading 
} : Props) => {
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
