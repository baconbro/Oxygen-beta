import {createRoot} from 'react-dom/client'
// Axios
import axios from 'axios'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
// Apps
import {BaseI18nProvider} from './i18n/Basei18n'
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_oxygen/assets/css/style.rtl.css'
 **/
import './_oxygen/assets/sass/style.scss'
import './_oxygen/assets/sass/plugins.scss'
import './_oxygen/assets/sass/style.react.scss'
import {AppRoutes} from './app/routing/AppRoutes'
import {AuthProvider, setupAxios} from './app/modules/auth'

import { Provider } from 'react-redux';
//import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
//import { createFirestoreInstance } from 'redux-firestore';

import  store  from './app/store'


/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic  mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */
/**
 * Inject  interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
setupAxios(axios)


const queryClient = new QueryClient()
const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BaseI18nProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BaseI18nProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>
  )
}
