import React, { useState, useRef } from 'react';
import { Textarea } from '../../shared/components';
import { Actions, FormButton } from '../../Project/Board/Lists/List/Styles.js';
import * as FirestoreService from '../../App/services/firestore';
import toast from '../../shared/utils/toast';
import { KeyCodes } from '../../shared/constants/keyCodes';

import { useAuth } from '../../../auth';
import { useLocation, useNavigate } from 'react-router-dom';



const AddGoal = ({reloadGoals}) => {
    const [isFormOpen, setFormOpen] = useState(false);
    const [isCreating, setCreating] = useState(false);
    const [body, setBody] = useState('');
    const $textareaRef = useRef();

    const { currentUser } = useAuth();
    const path = '/goals/';
  const navigate = useNavigate();

    const handleSubmit = async () => {
        if ($textareaRef.current.value.trim()) {
            await FirestoreService.createGoal(currentUser?.all?.currentOrg, {
                title: body,
                description: "",
                score:0,
                status:"ontrack",
            })
                .then(() => {
                    setBody('')
                    reloadGoals()
                    setFormOpen(false)
                }).catch((error) => {
                    toast.error(error.message)
                });

        }
    }


    return (
        <>
        {isFormOpen ? (
            <div className='d-flex me-2 mb-2 ms-2'>
                <Textarea
                    autoFocus
                    placeholder="Add a goal"
                    value={body}
                    onChange={setBody}
                    ref={$textareaRef}
                    onKeyDown={event => {
                        if (event.keyCode === KeyCodes.ENTER) {
                            event.target.blur();
                            handleSubmit()
                        }
                    }}
                    minRows={1}
                    className="form-control me-3 flex-grow-1 my-1 "
                />
                <Actions>

                    <FormButton variant="primary" isWorking={isCreating} onClick={handleSubmit} className="btn btn-primary fw-bold flex-shrink-0">
                        Save
                    </FormButton>
                    <FormButton variant="empty" onClick={() => setFormOpen(false)}  className="btn">
                        Cancel
                    </FormButton>

                </Actions>
            </div>
            
            ) : (
                <>
                    <button className='btn btn-light btn-outline btn-outline-dashed btn-outline-default me-2 mb-2 ms-2' onClick={() => setFormOpen(true)}><i className='bi bi-plus'></i> Add goal</button>
                </>
            )}
        </>
    );
};

const calculateListPosition = async ({ issues }) => {


    const listPositions = issues.map(({ listPosition }) => listPosition);

    if (listPositions.length > 0) {
        return Math.min(...listPositions) - 1;
    }
    return 1;
};

export default AddGoal;
