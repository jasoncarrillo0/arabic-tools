import { BrowserRouterProps, Router } from "react-router-dom";
import { BrowserHistory } from 'history';
import { useState, useLayoutEffect } from 'react';

interface Props extends BrowserRouterProps {
    history: BrowserHistory
}
const CustomRouter = ({ history, ...props }: Props) => {
    const [state, setState] = useState({
        action: history.action,
        location: history.location,
    });

    useLayoutEffect(() => history.listen(setState), [history]);

    return (
        <Router
            {...props}
            location={state.location}
            navigationType={state.action}
            navigator={history}
        />
    );
};

export default CustomRouter;