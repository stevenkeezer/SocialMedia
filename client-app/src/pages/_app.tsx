import React, { useEffect } from 'react';
import '../styles/index.css'

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        document.body.className = pageProps.isDark ? 'dark-mode' : 'light-mode';
    });
    return <Component {...pageProps} />
}