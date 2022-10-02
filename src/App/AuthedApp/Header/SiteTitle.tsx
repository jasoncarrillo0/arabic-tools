import { BROWSER_HISTORY } from "src/helpers/constants";

type Props = {};

const SiteTitle = ({}: Props) => {
    return <h2 onClick={() => BROWSER_HISTORY.push("/home")}>Arabic Tools</h2>;
};

export default SiteTitle;
