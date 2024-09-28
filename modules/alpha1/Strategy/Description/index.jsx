import React, { Fragment, useState } from 'react';


import { getTextContentsFromHtmlString } from '../../shared/utils/browser';
import { TextEditor, TextEditedContent, Button } from '../../../../components/common';

import { Title, EmptyLabel, Actions } from './Styles';


const Description = ({ text, updateIssue }) => {
  if (typeof text == "undefined"){text = ""}
  const [description, setDescription] = useState(text);
  const [isEditing, setEditing] = useState(false);

  const handleUpdate = () => {
    setEditing(false);
    updateIssue({ description });
  };

  const isDescriptionEmpty = getTextContentsFromHtmlString(description).trim().length === 0;

  return (
    <Fragment>
      {isEditing ? (
        <Fragment>
          <TextEditor
            placeholder="Describe the strategy"
            defaultValue={description}
            onChange={setDescription}
          />
          <Actions>
            <Button variant="primary" onClick={handleUpdate} className="btn">
              Save
            </Button>
            <Button variant="empty" onClick={() => setEditing(false)} className="btn">
              Cancel
            </Button>
          </Actions>
        </Fragment>
      ) : (
        <Fragment>
          {isDescriptionEmpty ? (
            <EmptyLabel onClick={() => setEditing(true)}>Empty...</EmptyLabel>
          ) : (
            <TextEditedContent content={description} onClick={() => setEditing(true)} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Description;
