import '@/styles/globals.css'
import { store } from "../app/store";
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider} from 'react-query'
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}