import React, { useLayoutEffect } from 'react';
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { prefixer } from 'stylis'
import { CssBaseline } from '@mui/material';


const cacheLtr = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin]
});

const ltrTheme = createTheme({ direction: "ltr" });

const RtlProvider = ({ children }) => {

    useLayoutEffect(() => {
        document.body.setAttribute("dir", "rtl");
        return () => {
            document.body.setAttribute("dir", "ltr");
        }
    }, [])


    return (
        <CacheProvider value={cacheLtr}>
            <ThemeProvider theme={ltrTheme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </CacheProvider>
    );
};

export default RtlProvider;