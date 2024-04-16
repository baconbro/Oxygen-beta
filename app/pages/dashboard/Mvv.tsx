import { useEffect, useState } from "react";
import Description from "../../modules/alpha1/Strategy/Description";
import { editOrg, getOrgData } from "../../modules/alpha1/App/services/firestore";
import { useAuth } from "../../modules/auth";

const MissionVisionValue = () => {
    const [spaceData, setSpaceData] = useState<any>();
    const { currentUser } = useAuth();
    const idr = currentUser?.all.currentOrg ?? currentUser?.orgs[0]

    useEffect(() => {
        refreshData()
    }, []);

    const refreshData = () => {
        getOrgData(idr)
            .then(spaceData => {
                setSpaceData(spaceData.data());
            })
            .catch((error) => console.log(error));
    }

    const updateMission = (updatedFields: any) => {
        const a = [updatedFields]
        const newArrayOfObj = a.map(({
            description: mission,
            ...rest
        }) => ({
            mission,
            ...rest
        }));
        editOrg(newArrayOfObj[0], idr);
    };
    const updateVision = (updatedFields: any) => {
        const a = [updatedFields]
        const newArrayOfObj = a.map(({
            description: vision,
            ...rest
        }) => ({
            vision,
            ...rest
        }));
        editOrg(newArrayOfObj[0], idr);
    };
    const updateValues = (updatedFields: any) => {
        const a = [updatedFields]
        const newArrayOfObj = a.map(({
            description: orgValues,
            ...rest
        }) => ({
            orgValues,
            ...rest
        }));
        editOrg(newArrayOfObj[0], idr);
    };

    return (
        <>
            {spaceData &&
                <div className="row g-6 g-xl-9">
                    {spaceData.mission && spaceData.vision && spaceData.orgValues ? null : (
                        <div className="alert alert-dismissible bg-light-primary border border-primary d-flex flex-column flex-sm-row p-5 mb-10">
                            <i className="bi bi-compass fs-2hx text-success me-4 mb-5 mb-sm-0"></i>
                            <div className="d-flex flex-column pe-0 pe-sm-10">
                                <h5 className="mb-1">Set your direction</h5>
                                <span>Start setting your North star, the mission, the vision and your values.</span>
                            </div>
                        </div>)
                    }
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
                </div>
            }
        </>
    )
}

export { MissionVisionValue }