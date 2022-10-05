import Layout from '../components/Layout';
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
