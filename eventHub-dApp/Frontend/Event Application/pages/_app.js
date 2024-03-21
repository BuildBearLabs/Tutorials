import Layout from "../components/Layout";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "components/GolabalReducers/store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </Provider>
  );
}
