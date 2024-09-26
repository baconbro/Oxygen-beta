/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {useState} from 'react'
import {CreateAppModal} from '../../../partials'
import {useLayout} from '../../core'
import {DefaultTitle} from '../header/page-title/DefaultTitle'

const Toolbar1 = () => {
  const {classes} = useLayout()
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)

  return (
    <>
      <div className='toolbar' id='xgn_toolbar'>
        {/* begin::Container */}
        <div
          id='xgn_toolbar_container'
          className={clsx(classes.toolbarContainer.join(' '), 'd-flex flex-stack')}
        >
          <DefaultTitle />

          {/* begin::Actions */}
          <div className='d-flex align-items-center py-1'>
            {/* begin::Wrapper */}
            <div className='me-4'>
            </div>
            {/* end::Wrapper */}

          </div>
          {/* end::Actions */}
        </div>
        {/* end::Container */}
      </div>
      <CreateAppModal show={showCreateAppModal} handleClose={() => setShowCreateAppModal(false)} />
    </>
  )
}

export {Toolbar1}
