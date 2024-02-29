import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';




const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const DetailsListCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const [fullname, setfullname] = useState([])
    const [users, setusers] = useState([])

    useEffect(() => {
        set_entity({});
    }, [props.show]);
    const onSave = async () => {
        let _data = {
            fullname: _entity.fullname,
            age: _entity.age,
            group: _entity.group,
            country: _entity.country,
            contactNo: _entity.contactNo,
        };

        setLoading(true);
        try {
            
        const result = await client.service("detailsList").create(_data);
        const eagerResult = await client
            .service("detailsList")
            .find({ query: { $limit: 100 ,  _id :  { $in :[result._id]}, $populate : [
                
                {
                    path : "fullname",
                    service : "users",
                    select:["name"]
                }
            
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info detailsList updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };
     useEffect(() => {
                    //on mount
                    client
                        .service("users")
                        .find({ query: { $limit: 100 } })
                        .then((res) => {
                            setusers(res.data);
                            setfullname(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };
    const fullnameOptions = fullname.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="detailsList-create-dialog-component">
            <div>
                <p className="m-0">Fullname:</p>
                <Dropdown value={_entity?.fullname} optionLabel="name" optionValue="value" options={fullnameOptions} onChange={(e) => setValByKey("fullname", e.value)} />
            </div>
            <div>
                <p className="m-0">Age:</p>
                <InputText type="number" className="w-full mb-3" value={_entity?.age} onChange={(e) => setValByKey("age", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Group:</p>
                <InputText className="w-full mb-3" value={_entity?.group} onChange={(e) => setValByKey("group", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Country:</p>
                <InputText className="w-full mb-3" value={_entity?.country} onChange={(e) => setValByKey("country", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">ContactNo:</p>
                <InputText className="w-full mb-3" value={_entity?.contactNo} onChange={(e) => setValByKey("contactNo", e.target.value)}  />
            </div>
                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    return {}
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(null, mapDispatch)(DetailsListCreateDialogComponent);
