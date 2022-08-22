import {
    Breadcrumb,
    Button,
    Image,
    Input,
    InputRef,
    Table,
    TableProps,
    Tag,
    Typography,
    DatePicker,
    message,
    Dropdown,
    Space,
    Menu,
    Modal,
    Tooltip,
    Row,
    Col,
    Form,
    Divider,
} from 'antd'
import type { ColumnsType, ColumnType } from 'antd/es/table'
import type { TableRowSelection } from 'antd/es/table/interface'
import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment'

import {
    SearchOutlined,
    CalendarOutlined,
    DownOutlined,
    PlusCircleOutlined,
    EyeOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons'
import ImgError from '../../public/img/img-error.png'
import { Link, useParams } from 'react-router-dom'

import type { FilterConfirmProps } from 'antd/es/table/interface'
import {
    fetchChangeRealEstateStatus,
    getAllNewsRealEstate,
    getAllNewsRealEstateSearchFilter,
} from '../../service/real-estate-all'
// import { updateRealEstateStatus } from "../../../service/config";
import { useTranslation } from 'react-i18next'
import { fetchGetAllProjects } from '../../service/projects'
import { ActionType, ProColumns, ProTable, TableDropdown } from '@ant-design/pro-components'

// samplr data for table

const { Title, Text } = Typography
const { RangePicker } = DatePicker
const { confirm } = Modal
const { TextArea } = Input

type DataType = {
    key: React.Key
    id: number
    name: string
    thumbnail: string
    startDate: string
    endDate: string
    location: any[]
    purpose: string
    status: string
}

function AllRealEstates() {
    const actionRef = useRef<ActionType>()
    const { t } = useTranslation()
    const { params } = useParams()
    const [actionForm] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [projectData, setProjectData] = useState<any>([])
    const [realEstateData, setRealEstateData] = useState<any>([])
    const [tableData, setTableData] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [dropdownLoading, setDropdownLoading] = useState(false)
    const [keyStoreArray, setKeyStoreArray] = useState<any>([])
    const [actionVisible, setActionVisible] = useState(false)
    // const [actionType, setActionType] = useState("");
    const [actionMessage, setActionMessage] = useState('')
    const [searchFilter, setSearchFilter] = useState(false)

    // For pagination
    const [currentPage, setCurrentPage] = useState<any>(1)
    const [pageSize, setPageSize] = useState<any>(10)
    const [totalElement, setTotalElement] = useState(0)

    // For search
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef<InputRef>(null)

    // For filtering
    const [tableFilters, settableFilters] = useState({})

    useEffect(() => {
        getAllRealEstate()
        getAllProjects()
    }, [tableFilters, currentPage, pageSize])

    useEffect(() => {
        if (realEstateData.length > 0) {
            setLoading(true)
            const data: any = realEstateData.map((item: any) => {
                return {
                    key: item.id,
                    id: item.id,
                    name: item.name,
                    thumbnail: item.thumbnail,
                    purpose: item.purpose,
                    startDate: moment(item.startDate).format('YYYY-MM-DD HH:mm:ss'),
                    endDate: moment(item.endDate).format('YYYY-MM-DD HH:mm:ss'),
                    location: [item.location],
                    district: [item.district[0]],
                    province: [item.province[0]],
                    ward: [item.ward[0]],
                    investorName: item.investorName,
                    status: item.status,
                }
            })
            setLoading(false)
            setTableData(data)
        }
    }, [realEstateData])

    const getAllProjects = async () => {
        setLoading(true)
        const searchItems = { page: currentPage - 1, size: pageSize }
        const response = await fetchGetAllProjects(searchItems, setLoading)
        if (response) {
            if (response.status === 200) {
                setProjectData(response.data.content)
                setLoading(true)
            } else {
                message.error(response.data)
            }
        } else {
            message.error('Get all projects failed')
        }
        setLoading(false)
    }

    const getAllRealEstate = async () => {
        // alert(2);
        setLoading(true)
        const searchItems = {
            ...tableFilters,
            page: currentPage - 1,
            size: pageSize,
            projectId: params === undefined ? '' : params,
        }
        const response = await getAllNewsRealEstateSearchFilter(
            searchItems,
            setLoading,
            searchFilter,
        )
        if (response) {
            if (response.status === 200) {
                const newData: any = []
                response.data.content.forEach((element: any) => {
                    newData.push({
                        key: element.id,
                        id: element.id,
                        name: element.name,
                        thumbnail: element.thumbnail,
                        purpose: element.purpose,
                        startDate: element.startDate,
                        endDate: element.endDate,
                        location: [element.location],
                        district: [element.district],
                        province: [element.province],
                        ward: [element.ward],
                        investorName: element.investorName,
                        status: element.status,
                    })
                })

                setRealEstateData(newData)
                setTotalElement(response.data.totalElements)
                setLoading(true)
            } else {
                message.error(response.data)
            }
        } else {
            message.error('Get all real estate failed')
        }
        setLoading(false)
        return
    }

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: any,
    ) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
        setSearchFilter(true)
    }

    const getColumnSearchProps = (dataIndex: any): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
            <div id="list-all-data-table" style={{ padding: 8 }}>
                {dataIndex === 'startDate' || dataIndex === 'endDate' ? (
                    <DatePicker.RangePicker
                        onChange={(e: any) => {
                            setSelectedKeys(e.length ? [e] : [])
                        }}
                        placeholder={['Start', 'End']}
                        value={selectedKeys[0]}
                        format="YYYY-MM-DD"
                        style={{ marginBottom: 8 }}
                    />
                ) : (
                    <Input
                        ref={searchInput}
                        placeholder={`Search ${
                            dataIndex === 'name'
                                ? 'name'
                                : dataIndex === 'location'
                                ? 'location'
                                : dataIndex === 'investorName'
                                ? 'investor name'
                                : ''
                        }`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() =>
                            handleSearch(selectedKeys as string[], confirm, dataIndex)
                        }
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                )}

                <div className="d-flex justify-content-between">
                    <Button
                        className="table-btn-search"
                        type="primary"
                        onClick={() => {
                            handleSearch(selectedKeys as string[], confirm, dataIndex)
                            setLoading(true)
                            setTimeout(() => {
                                setLoading(false)
                            }, 1000)
                        }}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: '48%' }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            clearFilters()
                            confirm()
                            setLoading(true)
                            setTimeout(() => {
                                setLoading(false)
                            }, 1000)
                            setSearchText('')
                            setSearchFilter(false)
                        }}
                        size="small"
                        style={{ width: '48%' }}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        ),
        filterIcon: (filtered: boolean) =>
            dataIndex === 'startDate' || dataIndex === 'endDate' ? (
                <CalendarOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
            ) : (
                <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
            ),
        onFilter: (value: any, record: any) =>
            dataIndex === 'startDate' || dataIndex === 'endDate'
                ? record[dataIndex]
                : record[dataIndex]
                      .toString()
                      .toLowerCase()
                      .includes((value as string).toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100)
            }
        },
    })

    const columns: any = [
        {
            title: 'ID',
            dataIndex: 'id',
            hideInSearch: true,
            hideInForm: true,
            editable: false,
            width: '5%',
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            responsive: ['lg'],
            valueType: 'image',
            width: '8%',
            render: (text: string, record: any) => (
                <img src={record.thumbnail} alt="thumbnail" style={{ width: 80, height: 60 }} />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            ellipsis: true,
            tip: 'If the title is too long, it will automatically shrink',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: 'Title is required!',
                    },
                ],
            },
            width: '15%',
            // render(name: any, record: any) {
            //     return (
            //         <Tooltip placement="topLeft" title={record.name}>
            //             <Link to={'#'}>
            //                 <h5 style={{ color: 'blue' }}>{record.name}</h5>
            //             </Link>
            //         </Tooltip>
            //     )
            // },
        },
        {
            title: t('view-on-page'),
            render: (_: any, row: any) => {
                return (
                    <span>
                        {row.status === 'APPROVED' ? (
                            <Tooltip placement="topLeft" title={t('view-on-tooltip')}>
                                <Button style={{ borderRadius: '5px' }}>
                                    <a
                                        className="d-flex align-items-center"
                                        href={`https://v2.pindias.com/real-estate/detail/${row.id}`}
                                        target="_blank"
                                    >
                                        <EyeOutlined />
                                    </a>
                                </Button>
                            </Tooltip>
                        ) : (
                            <Tooltip placement="topLeft" title={t('view-on-tooltip-pending')}>
                                <Button style={{ borderRadius: '5px' }} disabled>
                                    <a
                                        className="d-flex align-items-center"
                                        href={`https://v2.pindias.com/real-estate/detail/${row.id}`}
                                        target="_blank"
                                    >
                                        <EyeOutlined />
                                    </a>
                                </Button>
                            </Tooltip>
                        )}
                    </span>
                )
            },
            width: '8%',
        },
        {
            title: 'purpose',
            key: 'purpose',
            dataIndex: 'purpose',
            valueType: 'string',
            width: '5%',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            // ellipsis: true,
            // tip: 'If the title is too long, it will automatically shrink',
            // formItemProps: {
            //     rules: [
            //         {
            //             required: true,
            //             message: 'Title is required!',
            //         },
            //     ],
            // },
            render(name: any, record: any) {
                return (
                    <h5>{`${record.location}, ${record.ward[0].nameWithType}, ${record.district[0].nameWithType}, ${record.province[0].nameWithType}`}</h5>
                )
            },
            width: '15%',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            filters: true,
            onFilter: true,
            ellipsis: true,
            width: '10%',
            // responsive: ["lg"],
            // valueType: 'string',
            // valueEnum: {
            //     all: { text: 'Super long'.repeat(50) },
            //     open: {
            //         text: 'Unsolved',
            //         status: 'Error',
            //     },
            //     closed: {
            //         text: 'Solved',
            //         status: 'Success',
            //         disabled: true,
            //     },
            //     processing: {
            //         text: 'Processing',
            //         status: 'Processing',
            //     },
            // },
        },
        {
            title: 'End Date',
            key: 'endDate',
            dataIndex: 'endDate',
            width: '10%',
            // valueType: 'select',
            // valueEnum: {
            //     all: { text: 'Super long'.repeat(50) },
            //     open: {
            //         text: 'Unsolved',
            //         status: 'Error',
            //     },
            //     closed: {
            //         text: 'Solved',
            //         status: 'Success',
            //         disabled: true,
            //     },
            //     processing: {
            //         text: 'Processing',
            //         status: 'Processing',
            //     },
            // },
        },

        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            valueType: 'string',
            width: '10%',
            render: (status: string, record: any) => {
                console.log('item', record.status);
                
                return (
                    <div id="real-estate-status" key={record.id}>
                        {record.status === 'APPROVED' ? (
                            <Tag color="#5BD8A6">
                                <span className="text-uppercase status-tag">{record.status}</span>
                            </Tag>
                        ) : record.status === 'PENDING' ? (
                            <Tag color="#FF9900">
                                <span className="text-uppercase status-tag">{record.status}</span>
                            </Tag>
                        ) : record.status === 'FINISHED' ? (
                            <Tag color="#868e96">
                                <span className="text-uppercase status-tag">{record.status}</span>
                            </Tag>
                        ) : record.status === 'OPENING' ? (
                            <Tag color="#15aabf">
                                <span className="text-uppercase status-tag">{record.status}</span>
                            </Tag>
                        ) : record.status === 'REJECTED' ? (
                            <Tag color="#FF0000">
                                <span className="text-uppercase status-tag">{record.status}</span>
                            </Tag>
                        ) : (
                            ''
                        )}
                    </div>
                )
            },
        },
        {
            title: 'Operate',
            valueType: 'option',
            key: 'option',
            render: (text: any, record: any, _: any, action: any) => [
                <a
                    key="editable"
                    onClick={() => {
                        action?.startEditable?.(record.id)
                    }}
                >
                    Edit
                </a>,

                <TableDropdown
                    key="actionGroup"
                    onSelect={() => action?.reload()}
                    menus={[
                        { key: 'copy', name: 'Copy' },
                        { key: 'delete', name: 'Delete' },
                    ]}
                />,
            ],
            width: '10%',
        },
    ]

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys)
    }

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            // Table.SELECTION_ALL,
            Table.SELECTION_NONE,
            // {
            //     key: "odd",
            //     text: "Select Odd Row",
            //     onSelect: (changableRowKeys) => {
            //         let newSelectedRowKeys = [];
            //         newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            //             if (index % 2 !== 0) {
            //                 return false;
            //             }
            //             return true;
            //         });
            //         setSelectedRowKeys(newSelectedRowKeys);
            //     },
            // },
            // {
            //     key: "even",
            //     text: "Select Even Row",
            //     onSelect: (changableRowKeys) => {
            //         let newSelectedRowKeys = [];
            //         newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            //             if (index % 2 !== 0) {
            //                 return true;
            //             }
            //             return false;
            //         });
            //         setSelectedRowKeys(newSelectedRowKeys);
            //     },
            // },
        ],
    }

    const hasSelected = selectedRowKeys.length > 0

    const start = () => {
        setLoading(true)
        setTimeout(() => {
            setSelectedRowKeys([])
            setLoading(false)
        }, 1000)
    }

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        const { current, pageSize } = pagination

        setCurrentPage(current)
        setPageSize(pageSize)
        const { id, name, startDate, endDate, location, purpose, status }: any = filters

        const filter = {
            id: id && id.length > 0 ? id[0] : '',
            name: name && name.length > 0 ? name[0] : '',
            // startDate: startDate && startDate.length > 0 ? startDate[0] : "",
            // endDate: endDate && endDate.length > 0 ? endDate[0] : "",
            location: location && location.length > 0 ? location[0] : '',
            purpose: purpose && purpose.length > 0 ? purpose : '',
            status: status && status.length > 0 ? status : '',
            startFrom: startDate ? moment(startDate[0][0]._d).format('YYYY-MM-DD') : '',
            startTo: startDate ? moment(startDate[0][1]._d).format('YYYY-MM-DD') : '',
            endFrom: endDate ? moment(startDate[0][0]._d).format('YYYY-MM-DD') : '',
            endTo: endDate ? moment(startDate[0][1]._d).format('YYYY-MM-DD') : '',
        }
        settableFilters(filter)
    }

    const showPromiseConfirm = (actionType: string) => {
        confirm({
            title: `Are you sure you want to ${actionType === 'DELETED' ? 'DELETE' : 'FINISH'} ${
                selectedRowKeys.length > 1 ? 'these real estate' : 'this real estate'
            }?`,
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleOk(actionType)
            },
        })
    }

    const handleOk = (actionType: any) => {
        actionForm
            .validateFields()
            .then(async values => {
                setDropdownLoading(true)
                const response = await fetchChangeRealEstateStatus(
                    selectedRowKeys,
                    actionType,
                    actionMessage,
                    setDropdownLoading,
                )
                if (response) {
                    if (response.status === 200) {
                        message.success('Successfully changed status of selected real estate')
                        setSelectedRowKeys([])
                        setActionVisible(false)
                        actionForm.resetFields()
                        getAllRealEstate()
                    } else {
                        message.error(
                            response.data === 'Invalid status'
                                ? 'Cannot change Approved status to Pending!'
                                : 'response.data',
                        )
                        setActionVisible(false)
                    }
                } else {
                    console.log('error')
                    message.error(
                        `${actionType} ${
                            selectedRowKeys.length > 1 ? 'real estate' : 'real estate'
                        } failed`,
                    )
                }
            })
            .catch(info => {
                console.log('Validate Failed:', info)
            })
    }

    const handleCancel = () => {
        setActionVisible(false)
        actionForm.resetFields()
    }

    const menu = (
        <Menu
            items={[
                {
                    label: (
                        <span onClick={() => showPromiseConfirm('FINISHED')}>
                            Finish Real Estate{selectedRowKeys.length > 1 && 's'}
                        </span>
                    ),
                    key: 'FINISHED',
                },
                {
                    label: (
                        <span onClick={() => showPromiseConfirm('DELETED')}>
                            Delete Real Estate{selectedRowKeys.length > 1 && 's'}
                        </span>
                    ),
                    key: 'DELETED',
                },
            ]}
        />
    )

    return (
        <>
            <ProTable<any>
                rowKey="id"
                dataSource={tableData}
                columns={columns}
                actionRef={actionRef}
                rowSelection={rowSelection}
                // onChange={handleTableChange}
                cardBordered
                editable={{
                    type: 'multiple',
                    // editableKeys,
                    onSave: async (rowKey, data, row) => {
                        console.log({ rowKey, data, row })
                    },
                    // onChange: setEditableRowKeys,
                }}
                columnsState={{
                    persistenceKey: 'pro-table-singe-demos',
                    persistenceType: 'localStorage',
                    onChange(value) {
                        console.log('value: ', value)
                    },
                }}
                search={{
                    labelWidth: 'auto',
                }}
                options={{
                    setting: {
                        listsHeight: 400,
                    },
                }}
                form={{
                    // Due to the configuration of transform, the submitted participation is different from the definition, which needs to be transformed here
                    syncToUrl: (values, type) => {
                        if (type === 'get') {
                            return {
                                ...values,
                                created_at: [values.startTime, values.endTime],
                            }
                        }
                        return values
                    },
                }}
                pagination={{
                    pageSize: pageSize,
                    current: currentPage,
                    // total: totalNews,
                    // onChange: page => setcurrentPage(page),
                }}
                dateFormatter="string"
                headerTitle="News List"
                // toolBarRender={() => [
                //     <Button key="button" icon={<PlusOutlined />} type="primary">
                //         New
                //     </Button>,
                //     <Dropdown key="menu" overlay={menu}>
                //         <Button>
                //             <EllipsisOutlined />
                //         </Button>
                //     </Dropdown>,
                // ]}
            />
        </>
    )
}
export default AllRealEstates
