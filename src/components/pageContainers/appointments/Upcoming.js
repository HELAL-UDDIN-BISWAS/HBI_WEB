import FormatTimeDisplay from '@/components/FormatTimeDisplay'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

const Upcoming = ({ appointments }) => {
    return (
        <div>
            <div className="bg-white p-4 rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order No.</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead>Date of Appointment</TableHead>
                            <TableHead>Time of Appointment</TableHead>
                            <TableHead>Patient Name</TableHead>
                            <TableHead>Doctor</TableHead>
                            <TableHead>Speciality</TableHead>
                        </TableRow>
                    </TableHeader>
                    {appointments.length === 0 ? (
                        <TableBody className="h-[300px]">
                            <tr>
                                <td colSpan="7">
                                    <div className="flex justify-center ">
                                        <p>No Record</p>
                                    </div>
                                </td>
                            </tr>
                        </TableBody>
                    ) : (
                        <TableBody>
                            {appointments.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    className={
                                        index % 2 === 0 ? 'bg-[#F7F7F9]' : ''
                                    }
                                >
                                    <TableCell>
                                        {row.paymentHistories[0]?.id}
                                    </TableCell>
                                    <TableCell>
                                        {row.paymentHistories[0]?.status}
                                    </TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>
                                        <FormatTimeDisplay
                                            time={row.startTime}
                                        />{' '}
                                        -{' '}
                                        <FormatTimeDisplay time={row.endTime} />
                                    </TableCell>
                                    <TableCell>{row.user.username}</TableCell>
                                    <TableCell>{row.doctor.name}</TableCell>
                                    <TableCell>
                                        {row.doctor?.specializations?.map(
                                            (s) => s.title
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
                </Table>
            </div>
        </div>
    )
}

export default Upcoming
