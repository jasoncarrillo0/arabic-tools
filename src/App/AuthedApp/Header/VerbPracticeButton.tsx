import { LoadingButton } from "@mui/lab";
import { BROWSER_HISTORY } from "src/helpers/constants";

type Props = {
    loading: boolean;
};

const VerbPracticeButton = ({ loading }: Props) => {
    return (
        <LoadingButton
            loading={loading}
            onClick={() => BROWSER_HISTORY.push("/home/verbpractice")}
        >
            Verb Practice
        </LoadingButton>
    );
};

export default VerbPracticeButton;
