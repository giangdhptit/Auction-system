import React, {useState} from 'react'
import Table, {ColumnsType} from "antd/lib/table";
import {Item} from "../../../model/item";
import {Button, DatePicker, Form, Input, Modal, Popconfirm, Select, Space} from "antd";
import {Auction} from "../../../model/auction";
import {User} from "../../../model/user";
import {useAddAuctionMutation, useDeleteAuctionMutation, useGetAllAuctionsQuery} from "./auction.api";
import {useGetAllItemsQuery} from "../item_manage/item.api";

type Props = {
    userCurrent: User|null;
};

const AuctionManage = ({userCurrent}: Props) => {
    const {data: auctions, isFetching: isGettingAllAuctions} = useGetAllAuctionsQuery();
    const {data: items, isFetching: isGettingAllItems} = useGetAllItemsQuery();
    const [addAuction, {isLoading:isAdding}] = useAddAuctionMutation();
    const [deleteAuction,{isLoading:isDeleting}]=useDeleteAuctionMutation();
    const [isShowAddAuctionModal, setIsShowAddAuctionModal] = useState(false);

    const [form] = Form.useForm();
    const columns: ColumnsType<Auction> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
            render: (_, record) => (
                record.item.name
            ),
        },
        {
            title: 'Init Price',
            dataIndex: 'initPrice',
            key: 'initPrice',
        },
        {
            title: 'Start Date',
            dataIndex: 'timeStart',
            key: 'timeStart',
        },
        {
            title: 'End Date',
            dataIndex: 'timeEnd',
            key: 'timeEnd',
        },
        {
            title: 'Status',
            key: 'status',
            render:(_,record)=>(
                <>
                    {record.status===1 && "Đang diễn ra"}
                    {record.status===-1 && "Đã kết thúc"}
                    {record.status===0 && "Chưa diễn ra"}
                </>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={async () => {
                            await deleteAuction({idAuction: record.id});
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <div className="bg-red-100 text-white cursor-pointer p-8">Delete</div>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="fw-700 fs-50 mb-32">Auction Manage</div>
            <div className="mt-20 mb-20">
                <Button className="bg-green-100 text-white border-radius-sm"
                        onClick={() => setIsShowAddAuctionModal(true)}>Add</Button>
            </div>
            <Modal title="Add Auction" visible={isShowAddAuctionModal} footer={null}
                   onCancel={() => setIsShowAddAuctionModal(false)}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{offset: 1, span: 5}}
                    wrapperCol={{span: 16}}
                    requiredMark={false}
                    autoComplete="off"
                    onFinish={async (values) => {
                        try {
                            const timeStart = values.timeStart.format("YYYY-MM-DDThh:mm:ss");
                            const timeEnd = values.timeEnd.format("YYYY-MM-DDThh:mm:ss");
                            const idUser = userCurrent?.id;
                            const initPrice = parseInt(values.initPrice);
                            const auction = {...values, timeStart, timeEnd, idUser, initPrice};
                            await addAuction(auction).unwrap();
                            form.resetFields();
                            setIsShowAddAuctionModal(false);
                        } catch (err) {
                            console.log(err);
                        }
                    }}
                >
                    <Form.Item label="Select" name="idItem">
                        <Select>
                            {
                                items?.result.map((item, key) => (
                                    <Select.Option key={key} value={item.id}>{item.name}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Start Date" name="timeStart"
                               rules={[{required: true, message: 'Please input Start Date!'}]}>
                        <DatePicker showTime/>
                    </Form.Item>
                    <Form.Item label="End Date" name="timeEnd"
                               rules={[{required: true, message: 'Please input End Date!'}]}>
                        <DatePicker showTime/>
                    </Form.Item>
                    <Form.Item
                        label="Init Price"
                        name="initPrice"
                        rules={[{required: true, message: 'Please input Init Price!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item wrapperCol={{span: 24}} className="text-center">
                        <Button type="primary" htmlType="submit">
                            Add Auction
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Table columns={columns} dataSource={auctions?.result.map((el, idx) => ({key: idx, ...el}))}/>
        </>
    )
}

export default AuctionManage;