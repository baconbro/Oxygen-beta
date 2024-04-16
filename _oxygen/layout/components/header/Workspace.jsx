import React from "react";
import { ProjectAvatar } from "../../../../app/modules/alpha1/shared/components";
import { Link } from 'react-router-dom'

function WorkspaceHeaderMenu(spaces) {

    return (
        <>
            {spaces && spaces.spaces.map((space, index) => (
                <div className="col-lg-6 mb-3" key={index}>
                    <div className="menu-item p-0 m-0">
                        <Link to={`/workspace/${Object.keys(space)}`} className="menu-link" >
                            <span className="menu-custom-icon d-flex flex-center flex-shrink-0 rounded w-40px h-40px me-3">
                                <ProjectAvatar avatarUrl="" name={space[Object.keys(space)].title} size={50} className='me-5' />
                            </span>
                            <span className="d-flex flex-column">
                                <span className="fs-6 fw-bold text-gray-800">{space[Object.keys(space)].title}</span>
                                <span className="fs-7 fw-semibold text-muted">{Object.keys(space)}</span>
                            </span>
                        </Link>
                    </div>
                </div>
            ))}
        </>
    )
}
export default WorkspaceHeaderMenu;