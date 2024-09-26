import React, { useEffect, useRef, useState } from 'react';
import { Search } from '../../../../../../partials';
import DepDescription from './depDescription';
import * as Firestore from '../../../../App/services/firestore';
import { useWorkspace } from '../../../../App/contexts/WorkspaceProvider';
import { Select,IssueTypeIcon } from '../../../../shared/components';
import { SectionTitle } from '../Styles'; 
import { useAuth } from '../../../../../auth';



const TaskDependencies = ({ issue, updateIssue, modalClose, scope }) => {
  //get dependencies that for that issue
  const [dependencies, setDependencies] = useState([]);
  const { project } = useWorkspace();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (issue.id) {
      refreshDependencies()
    }else{
      setDependencies([])
    }
  }, []);

  //refresh dependencies
  const refreshDependencies = () => {
    Firestore.getDependencies(currentUser?.all?.currentOrg, issue.id)
    .then((dependencies) => {
      setDependencies(dependencies);
    }).catch((error) => {
      console.log(error)
    })
  }


  const updateDependencies = (fields,id) => {
   Firestore.updateDependencie(currentUser?.all?.currentOrg, fields, id.id ).then(() => {
      console.log('update dependencies')
      //wait for 1 sec to refresh the dependencies
      setTimeout(() => {
      refreshDependencies()
      }, 1000);
    })
    .catch((error) => {
      console.log(error)
    }) 
  }

  const deleteDependencie = (id) => {
    Firestore.deleteDependencie(currentUser?.all?.currentOrg, id.id).then(() => {
      console.log('delete dependencies')
      refreshDependencies()
    })
    .catch((error) => {
      console.log(error)
    })
  }


  //returne the issue from project.issues that has the same id as the dependency
  const getIssue = (id) => {
    return project.issues.find((issue) => issue.id === id);
  };

  const DepType = {
    BLOCKED_BY: 'BLOCKED_BY',
    BLOCKS: 'BLOCKS',
    DUPLICATES: 'DUPLICATES',
    DUPLICATED_BY: 'DUPLICATED_BY',
    RELATES_TO: 'RELATES_TO',
  };

  return (
    <>
    <h3 className="fw-bold mb-1">Dependencies</h3>
    <div className='mb-6'>
      <Search orgId={currentUser?.all?.currentOrg} scope={'project'} currentId={issue.id}/>
      </div>
      {/* if dependencies */}
      {dependencies.length > 0 && Object.values(dependencies).map((values, index) => {
        return (
          <div className="m-0 row border-gray-300 border-dashed rounded pb-1 mb-6" key={index}>
            <div className="timeline ms-n1 col-5">
              <div className="timeline-item align-items-center mb-4">
                <div className="timeline-line w-20px mt-12 mb-n14"></div>
                <div className="timeline-icon pt-1" style={{ marginLeft: "0.7" }}>
                  <i className="ki-duotone ki-cd fs-2 text-success"><span className="path1"></span><span className="path2"></span></i>
                </div>
                <div className="timeline-content m-0">         
                                        <a href="#" className="fs-6 text-gray-800 fw-bold d-block text-hover-primary"> <IssueTypeIcon type={getIssue(values.A).type} top={1} className='svg-icon-2 svg-icon-primary' /> {getIssue(values.A).title}</a>
                                        <span className="fw-semibold text-gray-400">{getIssue(values.A).id}</span>
                                    </div>

              </div>

              <div className="timeline-item align-items-center">
                <div className="timeline-line w-20px"></div>
                <div className="timeline-icon pt-1" style={{ marginLeft: "0.5" }}>
                  <i className="bi bi-link-45deg fs-2 text-info"></i>
                </div>
                <div className=" m-0 ">
                  <Select
                    variant="empty"
                    dropdownWidth={150}
                    withClearValue={false}
                    name="type"
                    value={values.type}
                    options={Object.values(DepType).map(type => ({
                      value: type,
                      label: DepType[type],
                    }))}
                    onChange={type => updateDependencies({ type},{id: values.id })}
                    renderValue={({ value: type }) => (
                      <span className="fs-8 fw-bolder text-info text-uppercase" >{type}</span>
                    )}
                    renderOption={({ value: type }) => (
                      <span className="fs-8 fw-bolder text-info text-uppercase" >{type}</span>
                    )}
                  />
                  <a href="#" className="fs-6 text-gray-800 fw-bold d-block text-hover-primary"> <IssueTypeIcon type={getIssue(values.B).type} top={1} className='svg-icon-2 svg-icon-primary' />{getIssue(values.B).title}</a>
                  <span className="fw-semibold text-gray-400">{getIssue(values.B).id}</span>
                </div>
              </div>
            </div>
            <div className="ms-n1 col-6">
              <DepDescription issue={values} updateIssue={updateDependencies} />
            </div>
            <div className="ms-n1 col-1 d-flex flex-column-fluid flex-center">
              <i className="bi bi-trash fs-2 text-danger" onClick={() => deleteDependencie({id: values.id})}></i>
            </div>
          </div>)
      }
      )}
    </>
  );
};


export default TaskDependencies;
