import DataTable from "../../base/table/DataTable";
import { Action } from "./SpecializationTable";
import './customTable.css';

const SpecialiZationDataTable = ({ specializations }) => {

    // const dataSource = specializations.map((spec) => ({
    //     key: spec.id,
    //     title: spec.title,
    //     description: spec.description,
    //     doctors: spec.doctors.map((doc) => doc.name).join(', '),
    //     appointments: spec.appointments.length,
    //     section: spec.section?.title,
    // }));

    const columns = [
        {
            dataField: 'title',
            text: 'Specialization Name',
            headerAlign: 'left',
            textAlign: "left",
            formatter: (cell, row) => (
                <span className="text-[#344054] font-bold">
                    {cell}
                </span>
            ),
        },

        {
            formatter: (cellContent, row) => <span className="text-[#344054] font-bold w-fit mx-auto">
                <Action row={row} />
            </span>,
            text: 'Action',
			headerAlign: 'center',
            textAlign: "center",
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={specializations || []}
            className={"w-full border-[#E4E7EC] border-2 rounded-md border-l border-r border-b border-t-0 custom-table"}
        />
    );
};

export default SpecialiZationDataTable;