import Layout from '../components/layout';
import '../styles/globals.css'

/**
 * サイト全体で共有するレイアウトコンポーネント。
 */
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
