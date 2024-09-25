import React, { useState, useEffect } from 'react';
import { Route, useMatch, useNavigate, useParams, Navigate } from 'react-router-dom';


import { PageLoader, Modal } from '../shared/components';

import * as FirestoreService from '../App/services/firestore';
import Header from '../Org/Header';
import Description from './Description';
import LargeCard from './LargeCard';
import useCurrentUser from '../shared/hooks/currentUser';
import toast from '../shared/utils/toast';


const StrategyPage = () => {
  const match = useMatch();
  var id = useParams()
  var idr = id[Object.keys(id)[0]]
  const [spaceData, setSpaceData] = useState();
  const [items, setItems] = useState([]);
  const { currentUserId } = useCurrentUser();
  const history = useNavigate();

  useEffect(() => {
    refreshData()
  }, []);

  const refreshData = () => {
    FirestoreService.getOrgData(idr)
      .then(spaceData => {
        if (spaceData) {
          setSpaceData(spaceData.data());
        } else {
        }
      })
      .catch((error) => console.log(error));
      if (1==1) {
        const unsubscribe2 = FirestoreService.streamSubItems(idr,
          (querySnapshot) => {
            const singleItem =
              querySnapshot.docs.map(docSnapshot => [docSnapshot.id, docSnapshot.data()]);
              setItems(singleItem);
          },
          (error) => console.log('children item fail')
        );
        return unsubscribe2;
      }
  }

  const updateMission = (updatedFields) => {
    const a = [updatedFields]
    const newArrayOfObj = a.map(({
      description: mission,
      ...rest
    }) => ({
      mission,
      ...rest
    }));
    FirestoreService.editOrg(newArrayOfObj[0], idr);
  };
  const updateVision = (updatedFields) => {
    const a = [updatedFields]
    const newArrayOfObj = a.map(({
      description: vision,
      ...rest
    }) => ({
      vision,
      ...rest
    }));
    FirestoreService.editOrg(newArrayOfObj[0], idr);
  };
  const updateValues = (updatedFields) => {
    const a = [updatedFields]
    const newArrayOfObj = a.map(({
      description: orgValues,
      ...rest
    }) => ({
      orgValues,
      ...rest
    }));
    FirestoreService.editOrg(newArrayOfObj[0], idr);
  };
  const createStrategy = () => {
    FirestoreService.addSubItem({
      description: '',
      status: "backlog",
      listPosition: 1,
      type: 'strategy',
      title: '',
      reporterId: currentUserId,
      userIds: [],
      priority: '',
      users: [],
  }, 'userId')
  .then((newItem) => {
    history.push(match.url+'/block/'+newItem.id)
  })
  .catch((error) => {
    toast.error(error.message);
  });

  }


  if (!spaceData) return <PageLoader />;


  return (
    <div className="page d-flex flex-row flex-column-fluid">
      <div className="wrapper d-flex flex-column flex-row-fluid" id="xgn_wrapper">
        <Header
        />
        <div className="d-flex flex-column-fluid">
          <div className="d-flex flex-column flex-column-fluid container-fluid">

            <div className="content flex-column-fluid" id="xgn_content">


              <Route
                path={`${match.path}/central`}
                render={() => (
                  <>
                    <div className="row g-6 g-xl-9">
                      <div className="col-lg-6 col-xxl-4">

                        <div className="card h-100">

                          <div className="card-body p-9">

                            <div className="fs-2hx fw-bolder">Mission</div>
                            <div className="fs-4 fw-bold text-gray-400 mb-7">
                              <Description text={spaceData.mission} updateIssue={updateMission} />
                            </div>

                            <div className="d-flex flex-wrap">

                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-xxl-4">

                        <div className="card h-100">

                          <div className="card-body p-9">

                            <div className="fs-2hx fw-bolder">Vision</div>
                            <div className="fs-4 fw-bold text-gray-400 mb-7">
                              <Description text={spaceData.vision} updateIssue={updateVision} />
                            </div>

                            <div className="d-flex flex-wrap">

                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-xxl-4">

                        <div className="card h-100">

                          <div className="card-body p-9">

                            <div className="fs-2hx fw-bolder">Values</div>
                            <div className="fs-4 fw-bold text-gray-400 mb-7">
                              <Description text={spaceData.orgValues} updateIssue={updateValues} />
                            </div>

                            <div className="d-flex flex-wrap">

                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='toolbar mb-5 mb-lg-7'>
                        <div className="page-title d-flex flex-column me-3">
                          <h1 className="d-flex text-dark fw-bolder my-1 fs-3">Active strategies</h1>

                        </div>
                        <div className="d-flex align-items-center py-2 py-md-1" >
                          <button className="btn btn-dark fw-bolder" onClick={createStrategy}>Create</button>
                        </div>
                      </div>
                      {items && items.map((item, index) => (
                      <LargeCard item={item}/>
                      ))}

                    </div>

                  </>
                )}
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyPage;
