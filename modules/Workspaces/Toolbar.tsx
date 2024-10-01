import { DefaultTitle } from '../../layout/components/header/page-title/DefaultTitle'

const Toolbar = () => {

  return (
    <>
      <div className='toolbar' id='xgn_toolbar'>
        <div
          id='xgn_toolbar_container'
          className='container-fluid d-flex flex-stack'
        >
          <DefaultTitle />
          <div className='d-flex align-items-center py-1'>
            <div className='me-4'>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export { Toolbar }
