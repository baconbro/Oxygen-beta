import React, { useEffect, useState } from 'react'
import { MenuItem } from './MenuItem'
import { MenuInnerWithSub } from './MenuInnerWithSub'
import { MegaMenu } from './MegaMenu'
import { useIntl } from 'react-intl'
import * as FirestoreService from '../../../../app/modules/alpha1/App/services/firestore'
import { useAuth } from '../../../../app/modules/auth'
import { array } from 'yup/lib/locale'
import { title } from 'process'
import WorkspaceHeaderMenu from './Workspace'
import { CreateWorkspaceModal } from '../../../partials'

export function MenuInner() {
  const intl = useIntl()
  const { currentUser } = useAuth()
  const [orgs, setOrgs] = useState<any | null>([]);
  const [spaces, setSpaces] = useState<any | null>([]);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true);
  const [showNoWorkspaceFound, setShowNoWorkspaceFound] = useState(false);

  
  useEffect(() => {
    /*     FirestoreService.getOrgs(currentUser?.email) 
          .then(getOrgs => {
            let a = new Array()
            getOrgs.forEach((doc) => {
              a.push({ [doc.id]: doc.data() })
            });
            setOrgs(a)
    
          })
          .catch((error) => console.log(error)); */
    //wait 3 seconds
    setTimeout(() => {
      FirestoreService.getSpaces(currentUser?.all?.currentOrg)
        .then(getOrgs => {
          let b = new Array()
          getOrgs.forEach((doc) => {
            b.push({ [doc.id]: doc.data() })
          });
          setSpaces(b)
          setIsLoading(false);
          if (Object.keys(b).length === 0) {
            setShowNoWorkspaceFound(true);
          }

        })
        .catch((error) => console.log(error));
    }, 3000);






  }, []);

  const showTextAfterDelay = () => {
   
  };
  
  // Call the function to trigger the 4-second delay and display the text after that
  showTextAfterDelay();
  
  return (
    <>
      <MenuItem title={intl.formatMessage({ id: 'MENU.DASHBOARD' })} to='/dashboard' />
      <MenuItem title={intl.formatMessage({ id: 'MENU.OKR' })} to='/goals' isNew={false} />
      <div data-xgn-menu-trigger="{default: 'click', lg: 'hover'}" data-xgn-menu-placement="bottom-start" className="menu-item here show menu-lg-down-accordion menu-here-bg me-0 me-lg-2">
        <MenuItem title={intl.formatMessage({ id: 'MENU.WORKSPACE' })} to='/workspace' />
{/*         <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown p-0 w-100 w-lg-850px show menu-dropdown">
          <div className="menu-state-bg menu-extended" data-xgn-menu-dismiss="true">
            <div className="row">
              <div className="col-lg-8 mb-3 mb-lg-0 py-3 px-3 py-lg-6 px-lg-6">
                <div className="row">
                  {Object.keys(spaces).length ? <WorkspaceHeaderMenu spaces={spaces} /> : (
                  <>{isLoading && 
                  <span>Loading
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span> }
                  {showNoWorkspaceFound && ''}
                  </>
                        
   
                  )
                  }
                </div>
                <div className="separator separator-dashed mx-5 my-5"></div>
                <div className="d-flex flex-stack flex-wrap flex-lg-nowrap gap-2 mx-5">
                  <div className="d-flex flex-column me-5">
                    <div className="fs-6 fw-bold text-gray-800"></div>
                    <div className="fs-7 fw-semibold text-muted"></div>
                  </div>
                  <CreateWorkspaceModal show={showCreateModal} handleClose={() => setShowCreateModal(false)} />
                  <button className="btn btn-custom btn-primary w-100" onClick={() => setShowCreateModal(true)}>
                    <span className="btn-label">Create a workspace </span>
                    <span className="svg-icon btn-icon svg-icon-2">
                      <i className="bi bi-plus"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

    </>
  )
}
