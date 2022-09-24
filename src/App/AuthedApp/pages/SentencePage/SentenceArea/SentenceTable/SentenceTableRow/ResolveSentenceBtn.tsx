import { LoadingButton } from "@mui/lab";
import { Sentence, SentenceTypes } from "src/redux/sentence/interfaces";
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { useState } from "react";
import BasicAlertConfirm from "src/App/reusable/BasicAlertConfirm";
import { markSentenceResolved } from "src/db-ops/sentences/general-sentence-ops";
import { useSnackbar } from "notistack";
import { ERR_SNACKBAR } from "src/helpers/constants";
type Props = {
    sentence: Sentence
    collection: SentenceTypes
}

const ResolveSentenceBtn = ({ sentence, collection }: Props) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar()

    async function handleClick() {
        setLoading(true);
        try {
            await markSentenceResolved(sentence, collection);
        } catch (e: any) {
            enqueueSnackbar(e.message, ERR_SNACKBAR);
        }
        setLoading(false);
    }


    return (
        <>
            <LoadingButton variant="outlined" onClick={() => setOpen(true)} startIcon={<BookmarkRemoveIcon/>}>
                Mark Resolved
            </LoadingButton>
            <BasicAlertConfirm
                open={open}
                title="Are you sure this sentence is resolved?"
                content="By clicking yes, all users will see this sentence as a normal, up to date sentence with no word issues."
                handleClose={() => setOpen(false)}
                handleConfirm={handleClick}
                loading={loading}
            />
        </>
        
    )
}

export default ResolveSentenceBtn;