import { LoadingButton } from "@mui/lab";
import { BROWSER_HISTORY } from "src/helpers/constants";

type Props = {
    loading: boolean
};

const DictionaryButton = ({ loading }: Props) => {
    return (
        <LoadingButton
            onClick={() => BROWSER_HISTORY.push("/home/dictionary")}
            loading={loading}
        >
            Dictionary
        </LoadingButton>
    );
};

export default DictionaryButton;
