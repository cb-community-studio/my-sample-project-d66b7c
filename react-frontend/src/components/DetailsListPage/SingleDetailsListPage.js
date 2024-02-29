import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { InputText } from 'primereact/inputtext';

const SingleDetailsListPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();
    const [fullname, setfullname] = useState([]);
    useEffect(() => {
        //on mount
        client
            .service("detailsList")
            .get(urlParams.singleDetailsListId, { query: { $populate: ["fullname"] }})
            .then((res) => {
                set_entity(res || {});
                const fullname = Array.isArray(res.fullname)
            ? res.fullname.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.fullname
                ? [{ _id: res.fullname._id, name: res.fullname.name }]
                : [];
        setfullname(fullname);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "DetailsList", type: "error", message: error.message || "Failed get detailsList" });
            });
    }, []);

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
    };

    const goBack = () => {
        navigate("/detailsList", { replace: true });
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">DetailsList</h3>
                </div>
                <p>detailsList/{urlParams.singleDetailsListId}</p>
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">Fullname</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.fullname?.name}</p></div>
                    <label className="text-sm text-primary">Age</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.age}</p></div>
                    <label className="text-sm text-primary">Group</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.group}</p></div>
                    <label className="text-sm text-primary">Country</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.country}</p></div>
                    <label className="text-sm text-primary">ContactNo</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.contactNo}</p></div>
            <label className="text-sm">Fullname</label>
            {fullname.map((elem) => (
                    <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div className="card">
                            <p>{elem.name}</p>
                        </div>
                    </Link>
                ))}
                </div>
            </div>
        </div>
    );
};

const mapState = (state) => {
    return {};
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
    //
});

export default connect(mapState, mapDispatch)(SingleDetailsListPage);
