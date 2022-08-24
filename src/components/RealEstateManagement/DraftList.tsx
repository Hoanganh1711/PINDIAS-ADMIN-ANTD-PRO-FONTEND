import {
    Button,
    Input,
    InputRef,
    Table,
    Tag,
    DatePicker,
    message,
    Space,
    Menu,
    Modal,
    Tooltip,
    Form,
    Dropdown,
    Descriptions,
    Row,
    Col,
    Select,
    InputNumber,
    TableProps,
} from 'antd'
import type { TableRowSelection } from 'antd/es/table/interface'
import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment'

import {
    EyeOutlined,
    ExclamationCircleOutlined,
    PlusOutlined,
    SearchOutlined,
    DownOutlined,
    UpOutlined,
    EllipsisOutlined,
} from '@ant-design/icons'
import ImgError from '../../public/img/img-error.png'
import { Link, useParams } from 'react-router-dom'

import type { FilterConfirmProps } from 'antd/es/table/interface'
import {
    fetchChangeRealEstateStatus,
    fetchGetRealEstatesByStatus,
    getAllNewsRealEstateSearchFilter,
} from '../../service/real-estate-all'
// import { updateRealEstateStatus } from "../../../service/config";
import { useTranslation } from 'react-i18next'
import { fetchGetAllProjects } from '../../service/projects'
import { ActionType, ProColumns, ProTable, Search, TableDropdown } from '@ant-design/pro-components'
import { PurposeStatusMenu, RealEstateStatusMenu } from '../../Hooks/valueEnumSelect'

const { RangePicker } = DatePicker
const { confirm } = Modal
const { Option } = Select

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

function DraftList() {
    const actionRef = useRef<ActionType>()
    const { t } = useTranslation()
    const { params } = useParams()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [projectData, setProjectData] = useState<any>([])
    const [realEstateData, setRealEstateData] = useState<any>([])
    const [tableData, setTableData] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [dropdownLoading, setDropdownLoading] = useState(false)
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

    const defaultColConfig = {
        xs: 24,
        sm: 24,
        md: 12,
        lg: 12,
        xl: 8,
        xxl: 6,
    }

    useEffect(() => {
        getRealEstatesByStatus()
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

    const getRealEstatesByStatus = async () => {
        // alert(2);
        setLoading(true)
        const searchItems = {
            ...tableFilters,
            page: currentPage - 1,
            size: pageSize,
            projectId: params === undefined ? '' : params,
        }
        const response = await fetchGetRealEstatesByStatus(searchItems, "DRAFT", setLoading)
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

    const handleSelectRows = (rows: any) => { 
        setSelectedRowKeys(rows)

    }

    const columns: any = [
        {
            title: 'ID',
            dataIndex: 'id',
            responsive: ['lg'],
            width: '5%',
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            responsive: ['lg'],
            valueType: 'image',
            width: '7%',
            render: (text: string, record: any) => (
                <img src={record.thumbnail} alt="thumbnail" style={{ width: 80, height: 60 }} />
            ),
            search: false,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            ellipsis: true,
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: 'Title is required!',
                    },
                ],
            },
            // width: '15%',
            render(name: any, record: any) {
                return (
                    <Link to={'#'}>
                        <span style={{ color: 'blue' }} className="real-estate-name">
                            {name}
                        </span>
                    </Link>
                )
            },
        },
        {
            title: 'View on page',
            search: false,
            tip: 'View on page',
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
            width: '10%',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            // responsive: ['lg'],
            ellipsis: true,
            // tip: 'If the title is too long, it will automatically shrink',
            render(name: any, record: any) {
                return (
                    <span>{`${record.location}, ${record.ward[0].nameWithType}, ${record.district[0].nameWithType}, ${record.province[0].nameWithType}`}</span>
                )
            },
            width: '15%',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            valueType: 'dateRange',
            filters: true,
            onFilter: true,
            ellipsis: true,
            responsive: ['lg'],
            // width: '10%',
            render(startDate: any, record: any) {
                return (
                    <div>
                        <span>{record.startDate}</span>
                    </div>
                )
            },
        },
        {
            title: 'End Date',
            key: 'endDate',
            dataIndex: 'endDate',
            valueType: 'dateRange',
            responsive: ['lg'],
            // width: '10%',
            render(endDate: any, record: any) {
                return (
                    <div>
                        <span>{record.endDate}</span>
                    </div>
                )
            },
        },
        {
            title: 'Purpose',
            key: 'purpose',
            dataIndex: 'purpose',
            valueType: 'checkbox',
            valueEnum: PurposeStatusMenu(),
            // width: '10%',
            render: (purpose: string, record: any) => {
                return (
                    <div key={record.id}>
                        {record.purpose === 'SELL' ? (
                            <Tag color="blue" style={{ width: '80%', textAlign: 'center' }}>
                                <span className="text-uppercase status-tag">{record.purpose}</span>
                            </Tag>
                        ) : (
                            <Tag color="purple" style={{ width: '80%', textAlign: 'center' }}>
                                <span className="text-uppercase status-tag">{record.purpose}</span>
                            </Tag>
                        )}
                    </div>
                )
            },
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            search: false,
            valueType: 'checkbox',
            valueEnum: RealEstateStatusMenu(),
            // width: '10%',
            render: (status: string, record: any) => {
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
            // responsive: ['lg', 'md'],
            render: (text: any, record: any, _: any, action: any) => [
                <a key="editable">View Details</a>,
            ],
            // width: '6%',
        },
    ]

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
        form.validateFields()
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
                        form.resetFields()
                        getRealEstatesByStatus()
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
        form.resetFields()
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

    const onChange = (searchValues: any) => {
        const { id, name, startDate, endDate, location, purpose, status }: any = searchValues
        console.log('searchValues', searchValues)

        const searchParams = {
            id: id ? id : '',
            name: name ? name : '',
            startFrom: startDate ? moment(startDate[0]).format('YYYY-MM-DDT00:00:00') : '',
            startTo: startDate ? moment(startDate[1]).format('YYYY-MM-DDT23:59:59') : '',
            endFrom: endDate ? moment(endDate[0]).format('YYYY-MM-DDT00:00:00') : '',
            endTo: endDate ? moment(endDate[1]).format('YYYY-MM-DDT23:59:59') : '',
            location: location ? location : '',
            purpose: purpose && purpose.length > 0 ? purpose : '',
            status: status && status.length > 0 ? status : '',
        }
        console.log('new params', searchParams)

        settableFilters(searchParams)
        setSearchFilter(true)
    }

    return (
        <>
            <ProTable<any>
                loading={loading}
                dataSource={tableData}
                columns={columns}
                actionRef={actionRef}
                rowSelection={{
                    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                }}
                beforeSearchSubmit={(params: any) => {
                    onChange(params)
                    return {
                        ...params,
                    }
                }}
                onSubmit={() => getRealEstatesByStatus()}
                rowKey="id"
                search={{
                    defaultCollapsed: true,
                    span: defaultColConfig,
                    labelWidth: 80,
                }}
                options={{
                    fullScreen: true,
                    reload: true,
                    setting: true,
                    density: true,
                }}
                pagination={{
                    showSizeChanger: true,
                    showQuickJumper: true,
                    pageSizeOptions: ['10', '20', '50', '100'],
                    showTotal: (total: number) => `Total ${total} items`,
                }}
                dateFormatter="string"
                headerTitle="Real Estate"
                toolBarRender={() => [
                    <Button
                        type="primary"
                        onClick={() => {
                            setActionVisible(true)
                        }}
                    >
                        <PlusOutlined />
                        <span>Create Real Estate</span>
                    </Button>,
                    <Dropdown overlay={menu} placement="bottomRight">
                        <Button>
                            <DownOutlined />
                            <span>Change Status</span>
                        </Button>
                    </Dropdown>,
                ]}
                scroll={{ x: 500 }}
            />
            <Modal
                title="Change Status"
                visible={actionVisible}
                onOk={() => handleOk('CHANGED')}
                onCancel={() => handleCancel()}
                okText="Change"
                cancelText="Cancel"
            />
        </>
    )
}
export default DraftList
