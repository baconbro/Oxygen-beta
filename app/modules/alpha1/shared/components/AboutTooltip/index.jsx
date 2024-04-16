import React from 'react';

import Button from '../Tooltip';
import Tooltip from '../Tooltip';


const AboutTooltip = tooltipProps => (
  <Tooltip
    width={300}
    {...tooltipProps}
    renderContent={() => (
      <form id="xgn_modal_new_target_form" className="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
					
							<div className="mb-13 text-center">
							
								<h1 className="mb-3">Set First Target</h1>
						
								<div className="text-muted fw-bold fs-5">If you need more info, please check
								<a href="#" className="fw-bolder link-primary">Project Guidelines</a>.</div>
							
							</div>
					
							
							<div className="d-flex flex-column mb-8">
								<label className="fs-6 fw-bold mb-2">Target Details</label>
								<textarea className="form-control form-control-solid" rows="3" name="target_details" placeholder="Type Target Details"></textarea>
							</div>

							<div className="text-center">
								<button type="reset" id="xgn_modal_new_target_cancel" className="btn btn-light me-3">Cancel</button>
								<button type="submit" id="xgn_modal_new_target_submit" className="btn btn-primary">
									<span className="indicator-label">Submit</span>
									<span className="indicator-progress">Please wait...
									<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
								</button>
							</div>
						
						<div></div></form>
    )}
  />
);

export default AboutTooltip;
