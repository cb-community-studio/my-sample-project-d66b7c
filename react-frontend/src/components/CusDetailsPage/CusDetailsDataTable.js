
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';


const CusDetailsDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.fullName?.name?.name}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.age}</p>
    const checkboxTemplate2 = (rowData, { rowIndex }) => <Checkbox checked={rowData.gender}  ></Checkbox>
    const checkboxTemplate3 = (rowData, { rowIndex }) => <Checkbox checked={rowData.group}  ></Checkbox>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.email?.email?.email}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.country}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10} rowClassName="cursor-pointer">
            <Column field="fullName?.name" header="Full Name" body={pTemplate0} style={{ minWidth: "8rem" }} />
            <Column field="age" header="Age" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="gender" header="Gender" body={checkboxTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="group" header="Group" body={checkboxTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="email?.email" header="Email" body={pTemplate4} style={{ minWidth: "8rem" }} />
            <Column field="country" header="Country" body={pTemplate5} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default CusDetailsDataTable;