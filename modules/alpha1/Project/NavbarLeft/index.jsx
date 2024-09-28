import React from 'react';
import PropTypes from 'prop-types';

import { Icon, AboutTooltip, Avatar } from '../../../../components/common';

import { NavLeft, LogoLink, StyledLogo, Bottom, Item, ItemText } from './Styles';

import { useAuth } from "../../App/contexts/AuthContext"
import { Link } from 'react-router-dom'

const propTypes = {
  //issueSearchModalOpen: PropTypes.func.isRequired,
  //issueCreateModalOpen: PropTypes.func.isRequired,
};

const ProjectNavbarLeft = ({ issueSearchModalOpen, issueCreateModalOpen }) => {

  const { currentUser } = useAuth()
 return (
  <NavLeft>
    <Link to={`/dashboard/`}>
    <Item >
      <div className="symbol symbol-25px symbol-md-25px" style={{position: "absolute",left: "18px" }}>
      <Avatar avatarUrl={currentUser.photoURL} name={currentUser.fName} size={24} />
			</div>
      <ItemText>Dashboard</ItemText>
    </Item>
    </Link>
						

    <Item onClick={issueSearchModalOpen}>
      <Icon type="search" size={22} top={1} left={3} />
      <ItemText>Search issues</ItemText>
    </Item>

    <Item onClick={issueCreateModalOpen}>
      <Icon type="plus" size={27} />
      <ItemText>Create Issue</ItemText>
    </Item>

    <Bottom>
      <AboutTooltip
        placement="right"
        offset={{ top: -218 }}
        renderLink={linkProps => (
          <Item {...linkProps}>
            <Icon type="help" size={25} />
            <ItemText>About</ItemText>
          </Item>
        )}
      />
    </Bottom>
  </NavLeft>
);
};

ProjectNavbarLeft.propTypes = propTypes;

export default ProjectNavbarLeft;
