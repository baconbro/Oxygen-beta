/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useRef,useState} from 'react'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
import {useLayout} from '../../core'
import {InlineSVG, toAbsoluteUrl} from '../../../helpers'
import {AsideMenu} from './AsideMenu'
import FeedbackForm from '../../../modules/alpha1/shared/components/Feedbackform'

const AsideDefault: FC = () => {
  const {config, classes} = useLayout()
  const asideRef = useRef<HTMLDivElement | null>(null)
  const {aside} = config
  const [minimized,setMinimized] = useState(aside.minimized)
  


  const minimize = () => {
    asideRef.current?.classList.add('animating')
    setTimeout(() => {
      asideRef.current?.classList.remove('animating')
    }, 300)
    setMinimized((prevValue) => !prevValue);
  }

  return (
    <div
      id='xgn_aside'
      className={clsx('aside', classes.aside.join(' '))}
      data-xgn-drawer='true'
      data-xgn-drawer-name='aside'
      data-xgn-drawer-activate='{default: true, lg: false}'
      data-xgn-drawer-overlay='true'
      data-xgn-drawer-width="{default:'200px', '300px': '250px'}"
      data-xgn-drawer-direction='start'
      data-xgn-drawer-toggle='#xgn_aside_mobile_toggle'
      ref={asideRef}
    >
      
      {/* begin::Brand */}
      <div className='aside-logo flex-column-auto' id='xgn_aside_logo'>
        {/* begin::Logo */}
        
        
          
          <Link to='/dashboard'>
            <img
              alt='Logo'
              className='h-25px app-sidebar-logo-default'
              src={toAbsoluteUrl('/media/logos/default-dark.svg')}
            /> 
            {minimized ? (''):(
              <>
            <span className='me-2'> Oxygen</span>
            <span className="badge badge-light-primary me-auto">Beta</span>
            </>
            )
          }
          </Link>
          
        
{/*         {aside.theme === 'light' && (
          <Link to='/dashboard'>
            <img
              alt='Logo'
              className='h-25px logo'
              src={toAbsoluteUrl('/media/logos/default.svg')}
            />
          </Link>
        )} */}
        {/* end::Logo */}

        {/* begin::Aside toggler */}
        {aside.minimize && (
          <div
            id='xgn_aside_toggle'
            className='btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle'
            data-xgn-toggle='true'
            data-xgn-toggle-state='active'
            data-xgn-toggle-target='body'
            data-xgn-toggle-name='aside-minimize'
            onClick={minimize}
          >
            <InlineSVG
              path={'/media/icons/duotune/arrows/arr080.svg'}
              className={'svg-icon-1 rotate-180'}
            />
          </div>
        )}
        {/* end::Aside toggler */}
      </div>
      {/* end::Brand */}

      {/* begin::Aside menu */}
      <div className='aside-menu flex-column-fluid'>
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
      </div>
      {/* end::Aside menu */}

      {/* begin::Footer */}
      <div className='aside-footer flex-column-auto pt-5 pb-7 px-5' id='xgn_aside_footer'>
        <FeedbackForm/>
      </div>
      {/* end::Footer */}
    </div>
  )
}

export {AsideDefault}
