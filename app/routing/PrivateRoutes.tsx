import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_oxygen/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {getCSSVariableValue} from '../../_oxygen/assets/ts/_utils'
import {WithChildren} from '../../_oxygen/helpers'
import { WorkspaceProvider } from '../modules/alpha1/App/contexts/WorkspaceProvider'
import { Workspacehome } from '../modules/alpha1/Workspaces'

import Project from '../modules/alpha1/Project'
import Goals from '../modules/alpha1/Goals'
import GoalDetails from '../modules/alpha1/Goals/GoalDetails'

const PrivateRoutes = () => {
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const AdminPage = lazy(() => import('../modules/admin/AdminPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        {/* Lazy Modules */}
        <Route
          path='people/myaccount/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
         <Route
          path='admin/*'
          element={
            <SuspensedView>
              <AdminPage />
            </SuspensedView>
          }
        />
        <Route
          path='workspace/'
          element={
            <WorkspaceProvider>
            <SuspensedView>
              <Workspacehome />
            </SuspensedView>
            </WorkspaceProvider>
          }
        />
         <Route
          path='workspace/:id/*'
          element={
            <WorkspaceProvider>
            <SuspensedView>
              <Project />
            </SuspensedView>
            </WorkspaceProvider>
          }
        />
        
        <Route
          path='goals/'
          element={
            <SuspensedView>
              <Goals/>
            </SuspensedView>
          }
        />
         <Route
          path='goals/details/*'
          element={
            <SuspensedView>
              <GoalDetails/>
            </SuspensedView>
          }
        />
       
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--xgn-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
