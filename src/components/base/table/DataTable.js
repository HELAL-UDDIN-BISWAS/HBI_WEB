/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import filterFactory from 'react-bootstrap-table2-filter'
import { Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import PrimaryBtn from '../button/hbi_btn'
import PrimaryInput from '../input/hbi_input'
import EmptyData from './EmptyData'
import ResetButton from './ResetButton'
import './dataTable.css'
import SearchIcon from '@/components/assets/icons/SearchIcon'
import { BiReset } from 'react-icons/bi'

const DataTable = ({
    data,
    columns,

    enableSearch = false,
    searchTerm,
    setSearchTerm,
    searchPlaceholder = '',

    enableSecondSearch = false,
    secondSearchTerm,
    setSecondSearchTerm,
    secondSearchPlaceholder = '',

    enableFilter = false,
    filterSearchTerm,
    setFilterSearchTerm,
    filterPlaceholder = '',

    enableSecondFilter = false,
    secondFilterSearchTerm,
    setSecondFilterSearchTerm,
    secondFilterPlaceholder = '',

    enableSelect = false,
    selectOptions = [],
    selectColumn,
    setSelectColumn,
    selectPlaceholder = '',

    enableSecondSelect = false,
    secondSelectOptions = [],
    secondSelectColumn,
    setSecondSelectColumn,
    secondSelectPlaceholder = '',

    enableSearchBtn = false,
    handleSearch,

    enableResetBtn = false,
    handleReset,

    enablePagination = false,
    paginationSize = 10,
    sizePerPageList = [
        { text: '10', value: 10 },
        { text: 'All', value: data?.length },
    ],
    paginationSizePerPageList = [10, 20, 30],
    onPageChange,
}) => {
    const [allData, setAllData] = useState(data)
    const [currentData, setCurrentData] = useState(data)
    const [currentPage, setCurrentPage] = useState(1)
    const [sizePerEachPage, setSizePerEachPage] = useState(10)
    const [totalSize, setTotalSize] = useState(data?.length)

    const fetchData = () => {
        // Simulating an API call

        const startIndex = (currentPage - 1) * sizePerEachPage
        const endIndex = startIndex + sizePerEachPage
        const pageData = allData?.slice(startIndex, endIndex)

        setCurrentData(pageData)

        setTotalSize(data?.length)
    }

    useEffect(() => {
        setCurrentPage(1)
        setAllData(data)
    }, [data])

    useEffect(() => {
        fetchData()
    }, [allData, currentPage, sizePerEachPage])

    const handleSearchBtn = () => {
        if (handleSearch) {
            handleSearch()
        }
    }

    const handleResetBtn = () => {
        if (handleReset) {
            handleReset()
        }
    }

    const handleTableChange = (
        type,
        { page, sizePerPage, sortField, sortOrder, filters }
    ) => {
        setCurrentPage(page)
        setSizePerEachPage(sizePerPage)
        // console.log('Table change type:', type);
        // console.log('Page:', page);
        // console.log('Size per page:', sizePerPage);
        // console.log('Sort field:', sortField);
        // console.log('Sort order:', sortOrder);
        // console.log('Filters:', filters);
        // Fetch data from the server using these parameters
    }

    const paginationOptions = {
        paginationSize,
        pageStartIndex: 1,
        alwaysShowAllBtns: true,
        prePageText: 'Prev',
        nextPageText: 'Next',
        showTotal: true,
        withFirstAndLast: false,
        hideSizePerPage: true,
        hidePageListOnlyOnePage: true,
        sizePerPage: sizePerEachPage,
        totalSize,
        sizePerPageList: [
            { text: '10', value: 10 },
            { text: 'All', value: totalSize },
        ],

        pageButtonRenderer: ({
            page,
            active,
            disable,
            title,
            onPageChange,
        }) => {
            const handleClick = (e) => {
                e.preventDefault()
                onPageChange(page)
            }

            const activeStyle = active
                ? { backgroundColor: '#3FC9C1', color: 'white' }
                : { backgroundColor: 'white', color: '#2F4858' }
            return (
                <li
                    key={page}
                    className={`page-item ${active ? 'active' : ''}`}
                >
                    <button
                        type="button"
                        onClick={handleClick}
                        className="page-link"
                        style={{
                            width:
                                page === 'Prev' || page === 'Next'
                                    ? '70px'
                                    : '40px',
                            height: '40px',
                            ...activeStyle,
                            border: 'none',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '14px',
                            fontWeight: 600,
                            outline: 'none',
                        }}
                    >
                        {page}
                    </button>
                </li>
            )
        },

        paginationTotalRenderer: (from, to, size) => (
            <div className="PaginationTotalDiv">
                <span className="text-[14px] font-normal text-[#637480] ml-2">
                    Showing {to} of {size} Entries
                </span>
            </div>
        ),
    }

    const rowStyle = (row, rowIndex) => {
        const style = {}
        if (rowIndex % 2 === 0) {
            style.backgroundColor = '#000'
        } else {
            style.backgroundColor = '#fff'
        }
        return style
    }

    const rowClasses = (row, rowIndex) => {
        return rowIndex % 2 === 0 ? 'even-row' : ''
    }

    return (
        <div className="h-full bg-[#f7f7f9] flex flex-col">
            {(enableSearch ||
                enableSecondSearch ||
                enableFilter ||
                enableSecondFilter ||
                enableSelect ||
                enableSecondSelect ||
                enableSearchBtn ||
                enableResetBtn) && (
                <Row className="mb-3 md:h-[40px] grid grid-cols-2 md:flex items-center gap-2">
                    {enableSearch && (
                        <Col md={3} className="h-full w-full md:w-[25%]">
                            <PrimaryInput
                                placeholder={searchPlaceholder || 'Search...'}
                                isIconleft={true}
                                icon={<SearchIcon />}
                                fontSize="14px"
                                fontWeight={400}
                                paddingLeft="36px"
                                width="100%"
                                height="40px"
                                bgColor="white"
                                radius="6px"
                                value={searchTerm}
                                handleChange={(e) =>
                                    setSearchTerm(e.target.value)
                                }
                                boxShadow="0 4px 6px 0 rgba(50, 50, 93, 0.11)"
                            />
                        </Col>
                    )}

                    {enableSecondSearch && (
                        <Col md={3} className="h-full w-full md:w-[20%] ">
                            <PrimaryInput
                                placeholder={
                                    secondSearchPlaceholder || 'Search...'
                                }
                                isIconleft={true}
                                icon={<SearchIcon />}
                                fontSize="14px"
                                fontWeight={400}
                                paddingLeft="36px"
                                width="100%"
                                height="40px"
                                bgColor="white"
                                radius="6px"
                                value={secondSearchTerm}
                                handleChange={(e) =>
                                    setSecondSearchTerm(e.target.value)
                                }
                                boxShadow="0 4px 6px 0 rgba(50, 50, 93, 0.11)"
                            />
                        </Col>
                    )}

                    {enableFilter && (
                        <Col md={3} className="h-full w-full md:w-[20%]">
                            <PrimaryInput
                                placeholder={filterPlaceholder || 'Filter...'}
                                isIconleft={true}
                                icon={<SearchIcon />}
                                fontSize="14px"
                                fontWeight={400}
                                paddingLeft="36px"
                                width="100%"
                                height="40px"
                                bgColor="white"
                                radius="6px"
                                value={filterSearchTerm}
                                handleChange={(e) =>
                                    setFilterSearchTerm(e.target.value)
                                }
                                boxShadow="0 4px 6px 0 rgba(50, 50, 93, 0.11)"
                            />
                        </Col>
                    )}

                    {enableSecondFilter && (
                        <Col md={3} className="h-full w-full md:w-[20%]">
                            <PrimaryInput
                                placeholder={
                                    secondFilterPlaceholder || 'Filter...'
                                }
                                isIconleft={true}
                                icon={<SearchIcon />}
                                fontSize="14px"
                                fontWeight={400}
                                paddingLeft="36px"
                                width="100%"
                                height="40px"
                                bgColor="white"
                                radius="6px"
                                value={secondFilterSearchTerm}
                                handleChange={(e) =>
                                    setSecondFilterSearchTerm(e.target.value)
                                }
                                boxShadow="0 4px 6px 0 rgba(50, 50, 93, 0.11)"
                            />
                        </Col>
                    )}

                    {enableSelect && (
                        <Col md={3} className="h-full w-full md:w-[20%]">
                            <PrimaryInput
                                placeholder={selectPlaceholder || 'Select...'}
                                fontSize="14px"
                                fontWeight={400}
                                paddingLeft="36px"
                                width="100%"
                                height="40px"
                                bgColor="white"
                                radius="6px"
                                // selectedValue={selectColumn?.label}
                                // handleChange={(e) => setSelectColumn(e.target.value)}
                                selectedValue={selectOptions?.find(
                                    (option) => option?.value === selectColumn
                                )}
                                handleChange={(option) =>
                                    setSelectColumn(option?.value)
                                }
                                isSelect={true}
                                // options={[
                                // 	{ value: 'option1', label: 'All' },
                                // 	{ value: 'option2', label: 'Active' },
                                // 	{ value: 'option3', label: 'Inactive' },
                                // ]}
                                options={selectOptions}
                                boxShadow="0 4px 6px 0 rgba(50, 50, 93, 0.11)"
                            />
                        </Col>
                    )}

                    {enableSecondSelect && (
                        <Col md={3} className="h-full w-full md:w-[20%]">
                            <PrimaryInput
                                placeholder={
                                    secondSelectPlaceholder || 'Select...'
                                }
                                fontSize="14px"
                                fontWeight={400}
                                paddingLeft="36px"
                                width="100%"
                                height="40px"
                                bgColor="white"
                                radius="6px"
                                // selectedValue={secondSelectColumn?.label}
                                // handleChange={(e) => setSecondSelectColumn(e.target.value)}
                                selectedValue={secondSelectOptions?.find(
                                    (option) =>
                                        option?.value === secondSelectColumn
                                )}
                                handleChange={(option) =>
                                    setSecondSelectColumn(option?.value)
                                }
                                isSelect={true}
                                // options={[
                                // 	{ value: 'option1', label: 'All' },
                                // 	{ value: 'option2', label: 'Active' },
                                // 	{ value: 'option3', label: 'Inactive' },
                                // ]}
                                options={secondSelectOptions}
                                boxShadow="0 4px 6px 0 rgba(50, 50, 93, 0.11)"
                            />
                        </Col>
                    )}
                    {enableSearchBtn && enableResetBtn && (
                        <div className="md:w-[25%] flex items-center gap-2 md:gap-3">
                            {enableSearchBtn && (
                                <PrimaryBtn
                                    name="Search"
                                    color="white"
                                    width={102}
                                    onClick={handleSearchBtn}
                                />
                            )}

                            {enableResetBtn && (
                                <button
                                    className="flex items-center text-[#386FFF] hover:underline"
                                    onClick={handleResetBtn}
                                >
                                    Reset{' '}
                                    <BiReset className="ml-1 w-[18px] h-[20px]" />
                                </button>
                            )}
                        </div>
                    )}

                    <Col md={1}></Col>
                </Row>
            )}

            <div className="tableWrapper">
                {(data?.length === 0 && <EmptyData />) || (
                    <>
                        <BootstrapTable
                            classes="table"
                            bootstrap4
                            keyField="id"
                            data={currentData}
                            columns={columns}
                            bordered={false}
                            bodyClasses="tableBody"
                            striped
                            pagination={paginationFactory(paginationOptions)}
                            filter={filterFactory()}
                            filterPosition="top"
                            remote={{ pagination: true }} // Enable remote pagination
                            // rowStyle={rowStyle}
                            // rowStyle={{ backgroundColor: "red" }}
                            rowClasses={rowClasses}
                            onTableChange={handleTableChange}
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default DataTable
