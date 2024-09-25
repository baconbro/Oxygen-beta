import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom'



const LargeCard = ({item,id}) => {


  return (
    <div className="card mb-6 mb-xl-9">
    <div className="card-body pt-9 pb-0">
        <div className="d-flex flex-wrap flex-sm-nowrap mb-6">
 
            <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                    <div className="d-flex flex-column">
                        <div className="d-flex align-items-center mb-1">
                        <Link to={`block/${item[0]}`}>
                            <a href="#" className="text-gray-800 text-hover-primary fs-2 fw-bolder me-3">{item[1].title}</a>
                            </Link>
                            <span className="badge badge-light-success me-auto">{item[1].status}</span>
                        </div>
                        <div className="d-flex flex-wrap fw-bold mb-4 fs-5 text-gray-400">{item[1].description}</div>
                    </div>
                    <div className="d-flex mb-4">
                    </div>
                </div>
                <div className="d-flex flex-wrap justify-content-start">
                    <div className="d-flex flex-wrap">
                        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                            <div className="d-flex align-items-center">
                                <div className="fs-4 fw-bolder">{item[1].start}</div>
                            </div>
                            <div className="fw-bold fs-6 text-gray-400">Due Date</div>
                        </div>
                        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                            <div className="d-flex align-items-center">
                                <span className="svg-icon svg-icon-3 svg-icon-danger me-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect opacity="0.5" x="11" y="18" width="13" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor"></rect>
                                        <path d="M11.4343 15.4343L7.25 11.25C6.83579 10.8358 6.16421 10.8358 5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75L11.2929 18.2929C11.6834 18.6834 12.3166 18.6834 12.7071 18.2929L18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25C17.8358 10.8358 17.1642 10.8358 16.75 11.25L12.5657 15.4343C12.2533 15.7467 11.7467 15.7467 11.4343 15.4343Z" fill="currentColor"></path>
                                    </svg>
                                </span>
                                <div className="fs-4 fw-bolder counted" data-xgn-countup="true" data-xgn-countup-value="75">75</div>
                            </div>
                            <div className="fw-bold fs-6 text-gray-400">Open Tasks</div>
                        </div>
                        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                            <div className="d-flex align-items-center">
                                <span className="svg-icon svg-icon-3 svg-icon-success me-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="currentColor"></rect>
                                        <path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="currentColor"></path>
                                    </svg>
                                </span>
                                <div className="fs-4 fw-bolder counted" data-xgn-countup="true" data-xgn-countup-value="15000" data-xgn-countup-prefix="$">$15,000</div>
                            </div>
                            <div className="fw-bold fs-6 text-gray-400">Budget Spent</div>
                        </div>
                    </div>

                    <div className="symbol-group symbol-hover mb-3">
                        <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title="" data-bs-original-title="Alan Warden">
                            <span className="symbol-label bg-warning text-inverse-warning fw-bolder">A</span>
                        </div>
                        <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" title="" data-bs-original-title="Michael Eberon">
                        </div>
                        <a href="#" className="symbol symbol-35px symbol-circle" data-bs-toggle="modal" data-bs-target="#xgn_modal_view_users">
                            <span className="symbol-label bg-dark text-inverse-dark fs-8 fw-bolder" data-bs-toggle="tooltip" data-bs-trigger="hover" title="" data-bs-original-title="View more users">+42</span>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
  );
};


export default LargeCard;
