import React, { useState, useEffect } from "react";
import { 
    getDoneItemsFromLastWeek,
    getNewItemsFromLastWeek,
    getEditedItemsFromLastWeek
 } from "../../../modules/alpha1/App/services/firestore";
import { useAuth } from "../../../modules/auth";


export const LastWeek = () => {
    const [doneItemsFromLastWeek, setDoneItemsFromLastWeek] = useState()
    const [editedItemsFromLastWeek, setEditedItemsFromLastWeek] = useState()
    const [newItemsFromLastWeek, setNewItemsFromLastWeek] = useState()
    const { currentUser } = useAuth();
    const idr = currentUser?.all.currentOrg ?? currentUser?.orgs[0]


    useEffect(() => {
        refreshData()
    }, []);

    const refreshData = () => {

        getDoneItemsFromLastWeek(idr)
            .then((numberOfItems) => {
                setDoneItemsFromLastWeek(numberOfItems)
            });
            getEditedItemsFromLastWeek(idr)
            .then((numberOfItems) => {
                setEditedItemsFromLastWeek(numberOfItems)
            });
            getNewItemsFromLastWeek(idr)
            .then((numberOfItems) => {
                setNewItemsFromLastWeek(numberOfItems)
            });


    }

    return (
        <>
            <div className="col-sm-6 col-xxl-3">
            <div className="card card-flush  mb-xl-10">
                <div className="card-header pt-5">
                    <div className="card-title d-flex flex-column">
                        <div className="d-flex align-items-center mb-9">
                            <div className="symbol symbol-70px symbol-circle me-5">
                                <span className="symbol-label bg-light-success">
                                    <i className="bi bi-check-circle-fill fs-3x text-success"></i>
                                </span>
                            </div>
                            <div className="m-0">
                                <span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">{doneItemsFromLastWeek}</span>
                                <p className="text-gray-400 pt-1 fw-semibold fs-6">Finish items in the last 7 days</p>
                                <div className="d-flex d-grid gap-5">
                                    <div className="d-flex flex-column flex-shrink-0">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="col-sm-6 col-xxl-3">
            <div className="card card-flush  mb-xl-10">
                <div className="card-header pt-5">
                    <div className="card-title d-flex flex-column">
                        <div className="d-flex align-items-center mb-9">
                            <div className="symbol symbol-70px symbol-circle me-5">
                                <span className="symbol-label bg-light-info">
                                    <i className="bi bi-pencil-fill fs-3x text-info"></i>
                                </span>
                            </div>
                            <div className="m-0">
                                <span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">{editedItemsFromLastWeek}</span>
                                <p className="text-gray-400 pt-1 fw-semibold fs-6">Edited items in the last 7 days</p>
                                <div className="d-flex d-grid gap-5">
                                    <div className="d-flex flex-column flex-shrink-0">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="col-sm-6 col-xxl-3">
            <div className="card card-flush  mb-xl-10">
                <div className="card-header pt-5">
                    <div className="card-title d-flex flex-column">
                        <div className="d-flex align-items-center mb-9">
                            <div className="symbol symbol-70px symbol-circle me-5">
                                <span className="symbol-label bg-light-primary">
                                    <i className="bi bi-file-plus-fill fs-3x text-primary"></i>
                                </span>
                            </div>
                            <div className="m-0">
                                <span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">{newItemsFromLastWeek}</span>
                                <p className="text-gray-400 pt-1 fw-semibold fs-6">New items in the last 7 days</p>
                                <div className="d-flex d-grid gap-5">
                                    <div className="d-flex flex-column flex-shrink-0">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
           
        </>
    )
}