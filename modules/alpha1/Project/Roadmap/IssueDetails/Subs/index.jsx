import React, { useState, useCallback, useEffect } from 'react';
import { SectionTitle } from '../Styles';
import Create from './Create';
import ProjectBoardIssueDetailsDelete from '../Delete';
import * as FirestoreService from '../../../../App/services/firestore';
import { Link, useMatch } from "react-router-dom";
import { issueTypeColors } from '../../../../../../utils/styles';




const SubsComponent = ({ issue, updateIssue }) => {
  const [tags, setTags] = useState([issue.tags])
  const [itemList, setItemList] = useState([])
  const match = useMatch();

  useEffect(() => {
    refreshData()
  }, []);

  const refreshData = () => {
    const unsubscribe = FirestoreService.streamItemsSubs(issue.id,
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
    if(item.status == 'done'){FirestoreService.editItem({status:'backlog'},item.id)}
    else
    {FirestoreService.editItem({status:'done'},item.id)}
  }



  return (
    <>

      <SectionTitle>Sub items</SectionTitle>
      {itemList && itemList.map((item, index) => (
        <div className="d-flex align-items-center mb-8">

          <span className="bullet bullet-vertical h-40px" style={{ backgroundColor: issueTypeColors[item.type] }}></span>

          <div className="form-check form-check-custom form-check-solid mx-5">
            {item.status == 'done'?
            (<input className="form-check-input" type="checkbox" value="" checked onClick={() => handleChange(item)}/>)
            :
            (<input className="form-check-input" type="checkbox" value="" onClick={() => handleChange(item)}/>)
}
          </div>

          <div className="flex-grow-1">
            <Link to={`/project/${match.params.id}/board/issues/${item.id}`} target="_blank" className='link-primary fw-bolder'>
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
              <span className="badge badge-light-success fs-8 fw-bold">{item.status}</span>
            </div>
            <button className="btn btn-icon btn-active-secondary btn-sm border-0">
              <ProjectBoardIssueDetailsDelete issue={item} modalClose={modalClose} />

            </button>
          </div>

        </div>
      ))}
      <Create issueId={issue.id} issue={issue} />

    </>
  )
}



export default SubsComponent;
