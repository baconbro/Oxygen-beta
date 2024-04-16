
import React, { useState } from 'react';

import {
    Actions,
    ActionButton,
    FormElement,
} from '../../../Project/IssueCreate/Styles';

import * as FirestoreService from '../../../App/services/firestore';
import { Form } from '..';

import toast from '../../utils/toast';
import { Modal } from 'react-bootstrap'


const FeedbackForm = () => {

    const [showCreateAppModal, setShowCreateAppModal] = useState(false)

    return (
        <>
            <button className="btn btn-custom btn-primary w-100"
                data-bs-toggle="modal" data-bs-target="#modal_feedback"
                data-bs-trigger='hover'
                data-bs-dismiss-='click'
                onClick={() => setShowCreateAppModal(true)}
                >
                <span className="btn-label">Send feedback </span>
                <span className="svg-icon btn-icon svg-icon-2">
                    <i className="bi bi-send-fill"></i>
                </span>
            </button>

            <Modal

                id='modal_feedback'
                tabIndex={-1}
                aria-hidden='true'
                dialogClassName='modal-dialog modal-dialog-centered mw-900px'
                show={showCreateAppModal}
                onHide={() => setShowCreateAppModal(false)}
                animation={false}>
                <div className='modal-content rounded'>
                    <div className="modal-header pb-0 border-0 justify-content-end">

                        <div className="btn btn-sm btn-icon btn-active-color-primary" onClick={() => setShowCreateAppModal(false)}>

                            <span className="svg-icon svg-icon-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor"></rect>
                                    <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor"></rect>
                                </svg>
                            </span>

                        </div>

                    </div>
                    <div className='modal-body scroll-y px-10 px-lg-15 pt-0 pb-15'>
{/*                         <div className="mb-13 text-center">

                            <h1 className="mb-3">Help improve Oxygen's products.</h1>

                            <div className="text-muted fw-bold fs-5">Send feedback or Report a bug, enter a description and click Submit to send your feedback straight to our team.</div>

                        </div>


                        <div className="d-flex flex-column mb-8">
                            <Form
                                enableReinitialize
                                initialValues={{
                                    description: '',
                                }}
                                validations={{
                                    description: Form.is.required(),
                                }}
                                onSubmit={async (values, form) => {
                                    try {
                                        //create a ticket in support
                                        await FirestoreService.addSubItem('DQzcyoXHsK5Y8Ws33tqB',{
                                            ...values,
                                            status: 'backlog',
                                            projectId: 'U9AJ2JIVaPzidq5bffHI',
                                            listPosition: 9999,
                                            type: 'task',
                                            title: 'support',
                                            reporterId: '',
                                            userIds: [],
                                            priority: '',
                                            users: [],
                                        }, 'userId')
                                        toast.success('Feedback successfully sended.')
                                        setShowCreateAppModal(false)
                                    } catch (error) {
                                        console.log(error)
                                    }
                                }}
                            >
                                <div>
                                    <FormElement>
                                        <Form.Field.TextEditor
                                            name="description"
                                            label="Description"
                                            tip="Describe the issue in as much detail as you'd like."
                                            //className="form-control form-control-solid"
                                            placeholder="How can we help?"
                                        />


                                        <div className="text-center">
                                            <Actions>
                                                <ActionButton type="submit" variant="primary" className="btn">
                                                    Send feedback
                                                </ActionButton>
                                                <ActionButton type="button" variant="empty" onClick={() => setShowCreateAppModal(false)} className="btn">
                                                    Cancel
                                                </ActionButton>
                                            </Actions>


                                        </div>
                                    </FormElement>
                                </div>
                            </Form>
                        </div> */}
                        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdpJkGv1VMw_lu7GBsKV4lwkdatscw2KZ-WtFfxuq7FrcZacw/viewform?embedded=true" width="640" height="696" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                    </div>
                </div>

            </Modal>

        </>

    )
}
export default FeedbackForm;