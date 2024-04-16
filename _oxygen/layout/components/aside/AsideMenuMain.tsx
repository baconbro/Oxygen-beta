import {useIntl} from 'react-intl'

import {AsideMenuItem} from './AsideMenuItem'
import { usePageData } from '../../core'

export function AsideMenuMain() {
  const intl = useIntl()
  const {pageSideMenu} = usePageData()

  return (
    <>
      {pageSideMenu &&
        pageSideMenu.length > 0 &&
        <>
          <div className='menu-item'>
            <div className='menu-content pt-8 pb-2'>
              <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Screens</span>
            </div>
          </div>
          ({Array.from(pageSideMenu).map((item, index) => (
            <span key={index}>
            <AsideMenuItem
              to={item.to}
              icon={item.icon}
              title={item.title}
              fontIcon={item.fontIcon}
            />
            </span>
          ))})
        </>}

        <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Menu</span>
        </div>
      </div>
    
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItem
        to='/goals'
        icon='/media/icons/duotune/general/gen020.svg'
        title={intl.formatMessage({id: 'MENU.OKR'})}
        fontIcon='bi-app-indicator'
        isNew={false}
      />


      <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4'></div>
        </div>
      </div>

    </>
  )
}
