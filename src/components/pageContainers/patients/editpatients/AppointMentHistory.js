import usePatientStore from '@/store/patientsStore'
import { useEffect } from 'react'
import DataTable from '@/components/base/table/DataTable'

const Appointment = ({ id }) => {
    const { appointmentHistory, fetchAppointmentHistory } = usePatientStore()
    useEffect(() => {
        if (id) {
            fetchAppointmentHistory(id)
        }
    }, [id, fetchAppointmentHistory])
    console.log(appointmentHistory)

    //===========table structuer with this culumns
    const columns = [
        {
            dataField: 'attributes.date',
            text: 'Appointment Date',
        },
        {
            dataField: 'attributes.startTime',
            text: 'Appointment Time',
        },
        {
            dataField: 'attributes.doctor.data.attributes.name',
            text: 'Doctor',
        },
        {
            dataField:
                'attributes.doctor.data.attributes.specializations.data[0].attributes.title',
            text: 'Speciality',
        },
        {
            dataField: 'attributes.bookingType',
            text: 'Type Of Consultation',
        },
        {
            dataField: 'attributes.doctor.data.attributes.fees',
            text: 'Consultation Fee',
        },
        {
            dataField: 'attributes.status',
            text: 'Status',
        },
    ]

    return (
        <div className="bg-white p-3">
            <p className="text-[#627AA4] text-xl font-semibold mb-2">History</p>
            <DataTable columns={columns} data={appointmentHistory} />
        </div>
    )
}

export default Appointment
