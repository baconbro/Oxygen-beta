import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Typed from 'typed.js';



const GradientText = styled.div`
    background: linear-gradient(45deg, #0061ff, #60efff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-size: 64px;
`;

function Page() {
  const el = useRef(null);




  return (
    <div id="page" className="page" style={{ backgroundColor: 'white' }} >
      <header id="header" className="header tra-menu navbar-dark">
        <div className="header-wrapper">
          <div className="wsmobileheader clearfix">
            <div className="row d-flex">
              <div className="col-12">
                <span className="smllogo"><img src={logo} alt="mobile-logo" />Oxygen</span>
                <span className="badge badge-light-primary">Beta</span>
                <span className="clearfix" style={{ float: "right", paddingRight: "25px" }}>
                  <Link to='/login' className="btn btn-light-primary smllogo " style={{ float: "right" }}>Sign in </Link>
                </span>
              </div>
            </div>
          </div>
          <div className="wsmainfull clearfix">
            <div className="wsmainwp clearfix">
              <div className="desktoplogo"><a href="/" className="logo-black"><img src={logo}
                alt="header-logo" />Oxygen <span className="badge badge-primary">Beta</span></a></div>
              <nav className="wsmenu clearfix">
                <ul className="wsmenu-list nav-stateblue-hover">
                  <li ><a href="#hero-21">Features <span className="wsarrow"></span></a>
                    <ul className="sub-menu">
                      <li ><a href="#Product-Roadmapping">Timeline, Gantt and roadmap</a></li>
                      <li ><a href="#Backlog-Management">List and table</a></li>
                      <li ><a href="#Scrum-Team">Dashboard</a></li>
                      <li ><a href="#Kanban">Board, Kanban and Scrum</a></li>
                      <li ><a href="#Portfolio-Planning">Personalization</a></li>
                      <li ><a href="#Collaboration">OKR</a></li>
                      <li ><a href="#Budget-Tracking">Budget Tracking</a></li>

                    </ul>
                  </li>
                  {/* <li className="nl-simple" ><a href="#Pricing">Pricing</a></li> */}
                  <li className="nl-simple" >
                    <Link to='/login' className="btn btn-light-primary last-link">Sign in </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>


      
    </div>
  )
}

export default Page;