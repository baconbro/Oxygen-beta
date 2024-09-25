import React from 'react';

import { ErrorPage, ErrorPageInner, ErrorBox, StyledIcon, Title } from './Styles';

const PageError = () => (
  <div className="d-flex flex-column flex-root">
		
			<div className="d-flex flex-column flex-center flex-column-fluid p-10">
			
				<h1 className="fw-bold mb-10" style={{color: "#A3A3C7"}}>Seems there is nothing here</h1>
			
				<a href="/" className="btn btn-primary">Return Home</a>
			
			</div>
		
		</div>
);

export default PageError;
