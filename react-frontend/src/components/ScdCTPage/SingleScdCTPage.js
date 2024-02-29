import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';

const SingleScdCTPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();
    
    useEffect(() => {
        //on mount
        client
            .service("scdCT")
            .get(urlParams.singleScdCTId, { query: { $populate: [] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "ScdCT", type: "error", message: error.message || "Failed get scdCT" });
            });
    }, []);

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
    };

    const goBack = () => {
        navigate("/scdCT", { replace: true });
    };
    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">ScdCT</h3>
                </div>
                <p>scdCT/{urlParams.singleScdCTId}</p>
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">Like</label>
                    <div className="ml-3"><Checkbox checked={_entity?.like} onChange={ (e) => setValByKey("like", e.checked)}  ></Checkbox></div>
                    <label className="text-sm text-primary">Dislike</label>
                    <div className="ml-3"><Checkbox checked={_entity?.dislike} onChange={ (e) => setValByKey("dislike", e.checked)}  ></Checkbox></div>
            
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

export default connect(mapState, mapDispatch)(SingleScdCTPage);
