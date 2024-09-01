import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import FormatTimeDisplay from '@/components/FormatTimeDisplay'

const History = ({ appointments }) => {
    return (
        <div className="bg-white p-4 rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order No.</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Date of Appointment</TableHead>
                        <TableHead>Time of Appointment</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Speciality</TableHead>
                        <TableHead>Status</TableHead>
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
                                    <FormatTimeDisplay time={row.startTime} /> -{' '}
                                    <FormatTimeDisplay time={row.endTime} />
                                </TableCell>
                                <TableCell>{row.doctor.name}</TableCell>
                                <TableCell>
                                    {row.doctor?.specializations?.map(
                                        (s) => s.title
                                    )}
                                </TableCell>
                                <TableCell
                                    className={`font-bold ${
                                        row.status === 'Cancelled'
                                            ? 'text-[#E94C40]'
                                            : row.status === 'Completed'
                                              ? 'text-[#5FA452]'
                                              : ''
                                    }`}
                                >
                                    ● {row.status}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                )}
            </Table>
        </div>
    )
}
export default History
