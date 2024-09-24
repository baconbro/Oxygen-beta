import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_oxygen/layout/core'
import {MasterInit} from '../_oxygen/layout/MasterInit'
import {AuthInit} from './modules/auth'

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            <Outlet />
            <MasterInit />
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export {App}
