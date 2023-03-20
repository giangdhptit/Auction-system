import React, {useState} from 'react'
import Table, {ColumnsType} from "antd/lib/table";
import {Button, Popconfirm, Space} from "antd";
import {Item} from "../../../model/item";
import {useDeleteItemMutation, useGetAllItemsQuery} from "./item.api";
import ItemEditModal from "./ItemEditModal";
import ItemAddModal from "./ItemAddModal";


const ItemManage = () => {
    const [isShowAddItemModal, setIsShowAddItemModal] = useState(false);
    const [isShowEditItemModal, setIsShowEditItemModal] = useState(false);
    const {data, isFetching} = useGetAllItemsQuery();
    const [deleteItem,{isLoading}]=useDeleteItemMutation();
    const [modalData, setModalData] = useState<Item>({
        id: 0,
        name: "",
        description: "",
        nameImage: "",
        photosImagePath: ""
    });
    const columns: ColumnsType<Item> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (_, record) => (
                <img src={record.photosImagePath} height={50} alt="#"/>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: Item) => (
                <>
                    <Space size="middle">
                        <div className="bg-light-blue-100 text-white cursor-pointer p-8"
                             onClick={() => showModal(record)}>Edit
                        </div>
                        <Popconfirm
                            title="Are you sure to delete this task?"
                            onConfirm={async () => {
                                await deleteItem({item_id: record.id});
                            }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <div className="bg-red-100 text-white cursor-pointer p-8">Delete</div>
                        </Popconfirm>
                    </Space>
                </>
            ),
        },
    ];

    const showModal = (record: Item) => {
        setModalData(record);
        setIsShowEditItemModal(true);
    }
    return (
        <>
            <div className="fw-700 fs-50 mb-32">Item Manage</div>
            <div className="mt-20 mb-20">
                <Button className="bg-green-100 text-white border-radius-sm"
                        onClick={() => setIsShowAddItemModal(true)}>Add</Button>
            </div>
            <ItemAddModal visible={isShowAddItemModal} onClose={()=>setIsShowAddItemModal(false)}/>
            <Table columns={columns} dataSource={data?.result.map((el, idx) => ({key: idx, ...el}))}/>
            <ItemEditModal visible={isShowEditItemModal} onClose={() => setIsShowEditItemModal(false)} item={modalData}/>
        </>
    )
}

export default ItemManage;