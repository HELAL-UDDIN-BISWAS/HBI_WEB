import { Dropdown } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { HiDotsVertical } from 'react-icons/hi'
import { BiEditAlt } from 'react-icons/bi'
import { MdDoDisturb } from 'react-icons/md'
import { FaKey } from 'react-icons/fa'
import { IoNotificationsOffOutline } from 'react-icons/io5'

const Action = ({ row }) => {
    const router = useRouter()
    let menuItems = []
    if (
        row?.attributes.isNotified === false &&
        row?.attributes.status === 'Inactive'
    ) {
        menuItems = [
            {
                key: 'edit',
                icon: <BiEditAlt />,
                text: 'Edit',
                url: `/system-users/${row.id}`,
                bgColor: '#3fc9c1',
                textColor: 'white',
            },
            {
                key: 'activate',
                icon: <MdDoDisturb />,
                text: 'Activate',
                url: `/edit/${row.id}`,
                bgColor: 'white',
                textColor: '#e94c40',
            },
            {
                key: 'resetPassword',
                icon: <FaKey />,
                text: 'Reset Password',
                url: `/edit/${row.id}`,
                bgColor: 'white',
                textColor: '#ffa800',
            },
            {
                key: 'activateNotify',
                icon: <IoNotificationsOffOutline />,
                text: 'Active Notify',
                url: `/edit/${row.id}`,
                bgColor: 'white',
                textColor: '#e94c40',
            },
        ]
    } else if (
        row?.attributes.isNotified === true &&
        row?.attributes.status === 'Active'
    ) {
        menuItems = [
            {
                key: 'edit',
                icon: <BiEditAlt />,
                text: 'Edit',
                url: `/system-users/${row.id}`,
                bgColor: '#3fc9c1',
                textColor: 'white',
            },
            {
                key: 'suspend',
                icon: <MdDoDisturb />,
                text: 'Suspend',
                url: `/edit/${row.id}`,
                bgColor: 'white',
                textColor: '#e94c40',
            },
            {
                key: 'resetPassword',
                icon: <FaKey />,
                text: 'Reset Password',
                url: `/edit/${row.id}`,
                bgColor: 'white',
                textColor: '#ffa800',
            },
            {
                key: 'closeNotify',
                icon: <IoNotificationsOffOutline />,
                text: 'Close Notify',
                url: `/edit/${row.id}`,
                bgColor: 'white',
                textColor: '#e94c40',
            },
        ]
    } else if (
        row?.attributes.isNotified === false &&
        row?.attributes.status === 'Active'
    ) {
        menuItems = [
            {
                key: 'edit',
                icon: <BiEditAlt />,
                text: 'Edit',
                url: `/system-users/${row.id}`,
                bgColor: '#3fc9c1',
                textColor: 'white',
            },
            {
                key: 'suspend',
                icon: <MdDoDisturb />,
                text: 'Suspend',
                url: `/edit/${row.id}`,
                bgColor: 'white',
                textColor: '#e94c40',
            },
            {
                key: 'resetPassword',
                icon: <FaKey />,
                text: 'Reset Password',
                url: `/edit/${row.id}`,
                bgColor: 'white',
                textColor: '#ffa800',
            },
            {
                key: 'activateNotify',
                icon: <IoNotificationsOffOutline />,
                text: 'Active Notify',
                url: `/edit/${row.id}`,
                bgColor: 'white',
                textColor: '#e94c40',
            },
        ]
    } else if (
        row?.attributes.isNotified === true &&
        row?.attributes.status === 'Inactive'
    ) {
        menuItems = [
            {
                key: 'edit',
                icon: <BiEditAlt />,
                text: 'Edit',
                url: `/system-users/${row.id}`,
                bgColor: '#3fc9c1',
                textColor: 'white',
            },
            {
                key: 'activate',
                icon: <MdDoDisturb />,
                text: 'Activate',
                url: `/edit/${row.id}`,
                bgColor: 'white',
                textColor: '#e94c40',
            },
            {
                key: 'resetPassword',
                icon: <FaKey />,
                text: 'Reset Password',
                url: `/edit/${row.id}`,
                bgColor: 'white',
                textColor: '#ffa800',
            },
            {
                key: 'closeNotify',
                icon: <IoNotificationsOffOutline />,
                text: 'Close Notify',
                url: `/edit/${row.id}`,
                bgColor: 'white',
                textColor: '#e94c40',
            },
        ]
    } else if (
        row?.attributes.isNotified === true &&
        row?.attributes.status === 'Pending'
    ) {
        menuItems = [
            {
                key: 'edit',
                icon: <BiEditAlt />,
                text: 'Edit',
                url: `/system-users/${row.id}`,
                bgColor: '#3fc9c1',
                textColor: 'white',
            },
            {
                key: 'inactivate',
                icon: <MdDoDisturb />,
                text: 'Inactivate',
                url: `/edit/${row.id}`,
                bgColor: 'white',
                textColor: '#e94c40',
            },
            {
                key: 'resetPassword',
                icon: <FaKey />,
                text: 'Reset Password',
                url: `/edit/${row.id}`,
                bgColor: 'white',
                textColor: '#ffa800',
            },
            {
                key: 'closeNotify',
                icon: <IoNotificationsOffOutline />,
                text: 'Close Notify',
                url: `/edit/${row.id}`,
                bgColor: 'white',
                textColor: '#e94c40',
            },
        ]
    } else if (
        row?.attributes.isNotified === false &&
        row?.attributes.status === 'Pending'
    ) {
        menuItems = [
            {
                key: 'edit',
                icon: <BiEditAlt />,
                text: 'Edit',
                url: `/system-users/${row.id}`,
                bgColor: '#3fc9c1',
                textColor: 'white',
            },
            {
                key: 'inactivate',
                icon: <MdDoDisturb />,
                text: 'Inactivate',
                url: `/edit/${row.id}`,
                bgColor: 'white',
                textColor: '#e94c40',
            },
            {
                key: 'resetPassword',
                icon: <FaKey />,
                text: 'Reset Password',
                url: `/edit/${row.id}`,
                bgColor: 'white',
                textColor: '#ffa800',
            },
            {
                key: 'activeNotify',
                icon: <IoNotificationsOffOutline />,
                text: 'Active Notify',
                url: `/edit/${row.id}`,
                bgColor: 'white',
                textColor: '#e94c40',
            },
        ]
    }

    const handleMenuItemClick = (url) => {
        router.push(url)
    }

    return (
        <Dropdown className="p-0 ">
            <Dropdown.Toggle
                className="p-0 border-0 after:hidden"
                variant="link"
                id="dropdown-basic"
            >
                <HiDotsVertical className="text-xl text-black" />
            </Dropdown.Toggle>

            <Dropdown.Menu className="p-0 m-0 rounded-lg">
                {menuItems.map((item) => (
                    <Dropdown.Item
                        className="py-3 px-8"
                        key={item.key}
                        onClick={() => handleMenuItemClick(item.url)}
                        style={{
                            backgroundColor: item.bgColor,
                            color: item.textColor,
                            borderBottom: '1px solid #ddd',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        {item.icon}
                        <span className="ml-2">{item.text}</span>
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Action
