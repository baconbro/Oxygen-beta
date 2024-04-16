import clsx from 'clsx'
import React, { FC } from 'react'
import { InlineSVG, toAbsoluteUrl } from '../../../helpers'
import {
  HeaderUserMenu,
  ThemeModeSwitcher,
} from '../../../partials'
import { useLayout } from '../../core'
import { useAuth } from '../../../../app/modules/auth'
import { Avatar } from '../../../../app/modules/alpha1/shared/components'

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px',
  toolbarButtonIconSizeClass = 'svg-icon-1'

const Topbar: FC = () => {
  const { config } = useLayout()
  const { currentUser, logout } = useAuth()

  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      {/* begin::Theme mode */}
      <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        <ThemeModeSwitcher
          toggleBtnClass={clsx('btn-active-light-primary btn-custom', toolbarButtonHeightClass)}
        />
      </div>
      {/* end::Theme mode */}

      {/* begin::User */}
      <div
        className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
        id='xgn_header_user_menu_toggle'
      >
        {/* begin::Toggle */}
        <div
          className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
          data-xgn-menu-trigger='click'
          data-xgn-menu-attach='parent'
          data-xgn-menu-placement='bottom-end'
          data-xgn-menu-flip='bottom'
        >
          <Avatar name={currentUser?.all?.fName} avatarUrl={currentUser?.photoURL} size={32} className={''}/>

        </div>
        <HeaderUserMenu />
        {/* end::Toggle */}
      </div>
      {/* end::User */}

      {/* begin::Aside Toggler */}
      {config.header.left === 'menu' && (
        <div className='d-flex align-items-center d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
            id='xgn_header_menu_mobile_toggle'
          >
            <InlineSVG path='/media/icons/duotune/text/txt001.svg' className='svg-icon-1' />
          </div>
        </div>
      )}
    </div>
  )
}

export { Topbar }
