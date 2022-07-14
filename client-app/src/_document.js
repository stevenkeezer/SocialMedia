import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        const pageProps = this.props?.__NEXT_DATA__?.props?.pageProps;
        return (
            <Html className='h-full bg-white'>
                <Head />
                <body className={ pageProps.isDark ? 'dark-mode h-full' : 'light-mode' }>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}