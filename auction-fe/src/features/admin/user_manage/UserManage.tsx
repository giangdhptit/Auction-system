import React from 'react'
import Table, {ColumnsType} from "antd/lib/table";
import {User} from "../../../model/user";
import {Dropdown, Menu, Popconfirm, Space} from "antd";
import {DownOutlined} from "@ant-design/icons";
import {useGetAllUsersQuery, useSetAdminRoleMutation} from "./user.api";



const UserManage = () => {
    const {data, isLoading:isGettingAllUsers} = useGetAllUsersQuery();
    const [setAdminRole,{isLoading:isSettingAdminRole}]=useSetAdminRoleMutation();
    const menu=(idUser:number) => (
        <Menu
            items={[
                {
                    label: <><Popconfirm
                        title="Are you sure to change admin role?"
                        onConfirm={async () => {
                            await setAdminRole({idUser:idUser});
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <div>SET ADMIN ROLE</div>
                    </Popconfirm></>,
                    key: '0',
                },
            ]}
        />
    );
    const columns: ColumnsType<User> = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'DOB',
            key: 'dob',
            dataIndex: 'dob',
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            key: 'balance',
        },
        {
            title: 'Role',
            key: 'role',
            render: (_, record) => (
                <Space size="middle">
                    {record.role === "admin" ? (<>ADMIN</>) :( <>
                        <Dropdown overlay={menu(record.id)} trigger={['click']}>
                            <a onClick={e => e.preventDefault()}>
                                <Space>
                                    {record.role.toUpperCase()}
                                    <DownOutlined/>
                                </Space>
                            </a>
                        </Dropdown>
                    </>)}
                </Space>
            ),
        },
    ];
    return (
        <>
            <div className="fw-700 fs-50 mb-32">User Manage</div>
            <Table columns={columns} dataSource={data?.result.map((el, idx) => ({key: idx, ...el}))}/>
        </>
    )
}

export default UserManage;