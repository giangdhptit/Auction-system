import React, {useEffect, useState} from "react";
import {Item} from "../../../model/item";
import {Button, Input, Modal, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useUpdateItemMutation} from "./item.api";

type Props = {
    visible: boolean;
    onClose: () => void;
    item: Item;
}
const ItemEditModal = ({onClose, visible, item}: Props) => {
    const [updateItem, isLoading] = useUpdateItemMutation();
    const [imageItemUpdate, setImageItemUpdate] = useState(null);
    const [itemImagePath, setItemImagePath] = useState("");
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const handleChangeImage = ({file}: any) => {
        setImageItemUpdate(file.originFileObj);
    }
    useEffect(()=>{
        setItemName(item.name);
        setItemImagePath(item.photosImagePath);
        setItemDescription(item.description);
    },[item]);
    return (
        <>
            <Modal getContainer={false} title="Edit Item" visible={visible} footer={null}
                   onCancel={onClose}>
                <div>Name</div>
                <Input name="name" value={itemName} onChange={(e) => setItemName(e.target.value)}/>
                <div>Description</div>
                <Input name="description" value={itemDescription}
                       onChange={(e) => setItemDescription(e.target.value)}/>
                <div>
                    <img src={
                        imageItemUpdate ? URL.createObjectURL(imageItemUpdate) : itemImagePath
                    } alt="" width={200}/>
                </div>
                <Upload action='https://www.mocky.io/v2/5cc8019d300000980a055e76' onChange={handleChangeImage}
                        maxCount={1}>
                    <Button icon={<UploadOutlined/>}>Image Item</Button>
                </Upload>
                <Button onClick={
                    async () => {
                        await updateItem({
                            id:item.id,
                            name: itemName,
                            description: itemDescription,
                            imageItem: imageItemUpdate,
                        }).unwrap();
                        onClose();
                    }}>Update Item</Button>
            </Modal>
        </>
    )
}

export default ItemEditModal;