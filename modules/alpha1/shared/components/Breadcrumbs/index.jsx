import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Container, Divider } from './Styles';

const propTypes = {
  items: PropTypes.array.isRequired,
};

const Breadcrumbs = ({ items }) => (
  <ul className="breadcrumb breadcrumb-dot fw-bold text-gray-600 fs-7 my-1">
    {items.map((item, index) => (
      <li className="breadcrumb-item text-gray-600" key={item}>
    <span className="text-gray-600">
        
        {item}
        </span>
  
      </li>
    ))}
  </ul>
);

Breadcrumbs.propTypes = propTypes;

export default Breadcrumbs;
