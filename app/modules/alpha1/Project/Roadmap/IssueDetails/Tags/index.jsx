import React, { useState, useCallback } from 'react';
import { SectionTitle } from '../Styles';
import Tags from "@yaireo/tagify/dist/react.tagify"
import './tagify.css'




const TagsComponent = ({ issue, updateIssue }) => {
  const [tags, setTags] = useState([issue.tags])


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
    updateIssue({ tags : e.detail.tagify.getCleanValue() })
  }, [])



  return (
    <>
      <div style={{ maxWidth: "150px" }}>
        <SectionTitle>Tags</SectionTitle>
        <Tags
          settings={{
            dropdown: {
              enabled: 1
            }
          }}
          defaultValue={list(tags[0]).toString()}
          autoFocus={false}
          whitelist={[]}//from all tags in the organisation
          className="form-control"
          onAdd={onChange}
          onRemove={onChange}


        />
      </div>
    </>
  )
}



export default TagsComponent;
