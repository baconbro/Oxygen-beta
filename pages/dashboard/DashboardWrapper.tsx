/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, Key, ReactChild, ReactFragment, ReactPortal} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../layout/core'
import { LastWeek } from './Components/LastWeek'
import ChartItemByStatus from './Components/ItemsByStatus'
import ChartItemByPriority from './Components/ItemsByPriority'






 


const DashboardPage: FC = () => (
  <>


  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      {/* <DashboardPage /> */}
      <div className="row g-5 g-xl-10 mb-5 mb-xl-10">
        <LastWeek/>
        
        
      </div> 
{/*       <div className="row g-5 g-xl-10 mb-5 mb-xl-10">
        <div className="col-sm-6 col-xxl-6">
      <ChartItemByStatus/>
      </div>
      <div className="col-sm-6 col-xxl-6">
      <ChartItemByPriority/>
      </div>
      </div> */}
    </>
  )
}

export {DashboardWrapper}
