import React, { useState, useCallback, useEffect } from 'react';
import { SectionTitle } from '../Styles';
import Create from './Create';
import ProjectBoardIssueDetailsDelete from '../Delete';
import * as FirestoreService from '../../../../../services/firestore';
import { Link,useLocation } from "react-router-dom";
import { issueTypeColors } from '../../../../../utils/styles';
import { useAuth } from '../../../../auth';
import  Status  from '../Status';




const SubsComponent = ({ issue, updateIssue }) => {
  const [tags, setTags] = useState([issue.tags])
  const [itemList, setItemList] = useState([])
  const {currentUser} = useAuth(); 

  //remove 2 last elements from path
  const location = useLocation();
  const path = location.pathname.split('/').slice(0, -2).join('/');


  useEffect(() => {
    refreshData()
  }, []);

  const refreshData = () => {
    const unsubscribe = FirestoreService.streamItemsSubs(currentUser?.all?.currentOrg, issue.id,
      (querySnapshot) => {
        const items =
          querySnapshot.docs.map(docSnapshot => docSnapshot.data());
        setItemList(items);

      },
      (error) => console.log('no Items')
    );
    return unsubscribe;
  }


  const list = (tags) => {
    var arr = [];
    if (tags) {
      for (let i = 0; i < tags.length; i++) {
        arr.push(tags[i].value);
      }
    }
    return arr;

  }

  const onChange = useCallback(e => {
    updateIssue({ tags: e.detail.tagify.getCleanValue() })
  }, [])

  const modalClose = () => {}

  const handleChange = (item) => { 
    if(item.status == 'done'){FirestoreService.editSubItem(currentUser?.all?.currentOrg,{status:'backlog'},item.id)}
    else
    {FirestoreService.editSubItem(currentUser?.all?.currentOrg,{status:'done'},item.id)}
  }

  const removeChild = async (item) =>{
      try{
        await FirestoreService.editSubItem(
          currentUser?.all?.currentOrg,
          { parent: ''},
          item.id,
          item.projectId
          )
      } catch (error) {

      }

  }

  const updateItem = (updatedFields, item) => {
    FirestoreService.editSubItem(currentUser?.all?.currentOrg,updatedFields, item.id,item.projectId);
  };



  return (
    <>
<h3 className="fw-bold mb-1">Child issues</h3>
      {itemList && itemList.map((item, index) => (
        <div className="d-flex align-items-center mb-8" key={index}>

          <span className="bullet bullet-vertical h-40px" style={{ backgroundColor: issueTypeColors[item.type] }}></span>

          <div className="form-check form-check-custom form-check-solid mx-5">
{/*             {item.status === 'done'?
            (<input className="form-check-input" type="checkbox"  defaultChecked onClick={() => handleChange(item)}/>)
            :
            (<input className="form-check-input" type="checkbox" defaultChecked={false} onClick={() => handleChange(item)}/>)
} */}
          </div>

          <div className="flex-grow-1 link-primary fw-bolder">
            <Link to={`${path}/issues/${item.id}`} target="_blank" className='link-primary fw-bolder'>
            {item.status == 'done'?
              <span className="text-gray-800 text-hover-primary fw-bold fs-6" style={{textDecoration: 'line-through'}}>{item.title}</span>
              :
              <span className="text-gray-800 text-hover-primary fw-bold fs-6">{item.title}</span>
}
              <i className="bi bi-box-arrow-up-right mx-5"></i>
            </Link>

          </div>
          <div className="d-flex align-items-center">
            <div className="me-6">
              <span className="badge  fs-8 fw-bold"> <Status issue={item} updateIssue={(updatedFields) => updateItem(updatedFields, item)} /></span>
            </div>
            <span className="btn btn-icon btn-active-secondary btn-sm border-0">
              <ProjectBoardIssueDetailsDelete issue={item} modalClose={modalClose} />

            </span>
            <span className="btn btn-icon btn-sm  btn-active-secondary border-0" data-bs-toggle='tooltip' title='Remove child' onClick={()=>removeChild(item)}>
              <i className='bi bi-x-lg'></i>

            </span>
          </div>

        </div>
      ))}
      <Create issueId={issue.id} issue={issue} />

    </>
  )
}



export default SubsComponent;
