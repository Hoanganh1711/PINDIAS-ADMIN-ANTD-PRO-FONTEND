import React from 'react'
import type { ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
export type TableListItem = {
    key: number
    status: string | number
    cascader: string[]
    treeSelect: string[]
}
function Test() {
    const cascaderOptions = [
        {
            field: 'front end',
            value: 'fe',
            language: [
                {
                    field: 'Javascript',
                    value: 'js',
                },
                {
                    field: 'Typescript',
                    value: 'ts',
                },
            ],
        },
        {
            field: 'back end',
            value: 'be',
            language: [
                {
                    field: 'Java',
                    value: 'java',
                },
                {
                    field: 'Go',
                    value: 'go',
                },
            ],
        },
    ]

    const valueEnumMap: any = {
        0: 'running',
        1: 'online',
        2: 'error',
    }

    const tableListDataSource: TableListItem[] = []

    for (let i = 0; i < 2; i += 1) {
        tableListDataSource.push({
            key: i,
            status: valueEnumMap[Math.floor(Math.random() * 10) % 3],
            cascader: ['fe', 'js'],
            treeSelect: ['fe', 'js'],
        })
    }

    const valueEnum = {
        all: { text: '全部', status: 'Default' },
        running: { text: '运行中', status: 'Processing' },
        online: { text: '已上线', status: 'Success' },
        error: { text: '异常', status: 'Error' },
    }

    const columns: ProColumns<TableListItem>[] = [
        {
            title: 'status',
            valueType: 'select',
            dataIndex: 'status',
            initialValue: ['all'],
            width: 100,
            valueEnum,
        },
        {
            title: 'status1',
            dataIndex: 'status',
            valueType: 'radio',
            initialValue: 'all',
            width: 100,
            valueEnum,
        },
        {
            title: 'status2',
            dataIndex: 'status',
            valueType: 'radioButton',
            initialValue: 'all',
            width: 100,
            valueEnum,
        },
        {
            title: 'status3',
            dataIndex: 'status',
            initialValue: ['all'],
            width: 100,
            valueType: 'checkbox',
            valueEnum,
        },
        {
            title: 'select  cascader',
            key: 'cascader',
            dataIndex: 'cascader',
            width: 100,
            fieldProps: {
                options: cascaderOptions,
                fieldNames: {
                    children: 'language',
                    label: 'field',
                },
            },
            valueType: 'cascader',
        },
        {
            title: 'tree select',
            key: 'treeSelect',
            dataIndex: 'treeSelect',
            width: 100,
            // request: async () => cascaderOptions,
            fieldProps: {
                options: cascaderOptions,
                fieldNames: {
                    children: 'language',
                    label: 'field',
                },
                showSearch: true,
                filterTreeNode: true,
                multiple: true,
                treeNodeFilterProp: 'field',
            },
            valueType: 'treeSelect',
        },
        {
            title: '操作',
            key: 'option',
            width: 120,
            valueType: 'option',
            render: (_, row, index, action) => [
                <a
                    key="a"
                    onClick={() => {
                        action?.startEditable(row.key)
                    }}
                >
                    编辑
                </a>,
            ],
        },
    ]
    return (
        <div>
            <ProTable<TableListItem>
                columns={columns}
                request={() => {
                    return Promise.resolve({
                        data: tableListDataSource,
                        success: true,
                    })
                }}
                search={{
                    defaultCollapsed: false,
                    span: 12,
                    labelWidth: 'auto',
                }}
                editable={{
                    type: 'multiple',
                }}
                rowKey="key"
                headerTitle="样式类"
            />
        </div>
    )
}

export default Test
