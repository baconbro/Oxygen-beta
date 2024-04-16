import { useEffect, useState } from "react";
import { useAuth } from "../../auth";

import * as FirestoreService from '../App/services/firestore'
import WorkspaceHeaderMenu from "../../../../_oxygen/layout/components/header/Workspace";
import EmptyWorkspace from "../App/emptyStates/emptyWorkspace";


export const Workspacehome = () => {
    const { currentUser } = useAuth()
    const [spaces, setSpaces] = useState([]);
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
    })
    return (
        <>
            <div class="card shadow-sm">
                <div class="card-body">
                    <div className="row">
                        {Object.keys(spaces).length ? <WorkspaceHeaderMenu spaces={spaces} /> : (
                            <>{isLoading &&
                                <span>Loading
                                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                </span>}
                                {showNoWorkspaceFound && <EmptyWorkspace />}
                            </>
                        )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}