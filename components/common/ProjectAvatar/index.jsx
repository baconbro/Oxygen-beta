import React from 'react';
import PropTypes from 'prop-types';

import { Image, Letter } from './Styles';

const propTypes = {
  className: PropTypes.string,
  avatarUrl: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
};

const defaultProps = {
  className: undefined,
  avatarUrl: null,
  name: '',
  size: 32,
};

const ProjectAvatar = ({ className, avatarUrl, name, size, ...otherProps }) => {
  const sharedProps = {
    className,
    size,
    'data-testid': name ? `avatar:${name}` : 'avatar',
    ...otherProps,
  };

  if (avatarUrl) {
    return <Image avatarUrl={avatarUrl} {...sharedProps} />;
  }

  return (
    <div className="symbol">
    <Letter color={getColorFromName(name)} {...sharedProps}>
      <span className='fs-2 fw-bold'>{name.charAt(0)}</span>
    </Letter>
    </div>
  );
};

const colors = [
  '#DA7657',
  '#6ADA57',
  '#5784DA',
  '#AA57DA',
  '#DA5757',
  '#DA5792',
  '#57DACA',
  '#57A5DA',
];

const getColorFromName = name => colors[name.toLocaleLowerCase().charCodeAt(0) % colors.length];

ProjectAvatar.propTypes = propTypes;
ProjectAvatar.defaultProps = defaultProps;

export default ProjectAvatar;
