import React, { useState } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';

import { Icon, ProjectAvatar } from '../../../../components/common';

import {
  Sidebar,
  ProjectInfo,
  ProjectTexts,
  ProjectName,
  ProjectCategory,
  Divider,
  LinkItem,
  LinkText,
  NotImplemented,
} from './Styles';

import FeedbackForm from '../../shared/components/Feedbackform';
import Offcanvas from 'react-bootstrap/Offcanvas'


const ProjectSidebar = ({ project }) => {
  const match = useLocation();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {show &&
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="aside card" style={{ display: show ? 'flex' : 'none' }}>
              <div className="aside-menu flex-column-fluid px-5">

                <div className="hover-scroll-overlay-y my-5 pe-4 me-n4" >

                  <div className="menu menu-column menu-rounded fw-bold fs-6">

                    <ProjectInfo>
                      <ProjectAvatar avatarUrl="" name={project.title} size={50} />
                      <ProjectTexts>
                        <ProjectName>{project.title}</ProjectName>
                        <ProjectCategory><Link to={match.url + '/settings'}><i className="bi bi-gear"></i> settings</Link></ProjectCategory>
                      </ProjectTexts>
                    </ProjectInfo>
                    <Divider />


                    {renderLinkItem(match, 'Kanban Board', 'board', '/board')}

                    <Divider />


                  </div>

                </div>
              </div>

              <div className="aside-footer flex-column-auto pt-5 pb-7 px-5" id="xgn_aside_footer">
                <FeedbackForm />


              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      }
      <div className="d-lg-none btn btn-icon btn-active-color-white w-30px h-30px ms-n2" onClick={handleShow}>

        <span className="svg-icon svg-icon-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="currentColor"></path>
            <path opacity="0.3" d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="currentColor"></path>
          </svg>
        </span>

      </div>

      <div className="aside card" >
        <div className="aside-menu flex-column-fluid px-5">

          <div className="hover-scroll-overlay-y my-5 pe-4 me-n4" >

            <div className="menu menu-column menu-rounded fw-bold fs-6">

              <ProjectInfo>
                <ProjectAvatar avatarUrl="" name={project.title} size={50} />
                <ProjectTexts>
                  <ProjectName>{project.title}</ProjectName>
                  <ProjectCategory><Link to={match.url + '/settings'}><i className="bi bi-gear"></i> settings</Link></ProjectCategory>
                </ProjectTexts>
              </ProjectInfo>
              <Divider />


              {renderLinkItem(match, 'Kanban Board', 'board', '/board')}
              {renderLinkItem(match, 'Backlog', 'backlog', '/backlog')}
              {renderLinkItem(match, 'Roadmap', 'roadmap', '/roadmap')}

              <Divider />


            </div>

          </div>
        </div>

        <div className="aside-footer flex-column-auto pt-5 pb-7 px-5" id="xgn_aside_footer">
          <FeedbackForm />


        </div>
      </div>
    </>
  );
};

const renderLinkItem = (match, text, iconType, path) => {
  const isImplemented = !!path;

  const linkItemProps = { as: NavLink, to: `${match.url}${path}` }

  return (
    <LinkItem {...linkItemProps} className="mb-2">
      <LinkText className="menu-item">
        <div className="menu-link">
          <span className="menu-icon">

            <Icon type={iconType} />

          </span>
          <span className="menu-title">{text}</span>

        </div>

      </LinkText>
      {!isImplemented && <NotImplemented>Not implemented</NotImplemented>}
    </LinkItem>
  );
};


export default ProjectSidebar;
