import React, {useState} from "react";
import {Button, Input, Modal, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useAddItemMutation} from "./item.api";

type Props = {
    visible: boolean;
    onClose: () => void;
}
const ItemAddModal = ({onClose, visible}: Props) => {
    const [addItem, {isLoading}] = useAddItemMutation();
    const [imageItemAdd, setImageItemAdd] = useState(null);
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");

    const handleChangeImage = ({file}: any) => {
        setImageItemAdd(file.originFileObj);
    }

    return (
        <>
            <Modal getContainer={false} title="Add Item" visible={visible} footer={null}
                   onCancel={onClose}>
                <div>Name</div>
                <Input name="name" onChange={(e) => setItemName(e.target.value)}/>
                <div>Description</div>
                <Input name="description" onChange={(e) => setItemDescription(e.target.value)}/>
                <div>
                    {imageItemAdd && <img src={
                        URL.createObjectURL(imageItemAdd)
                    } alt="" width={200}/>}

                </div>
                <Upload action='https://www.mocky.io/v2/5cc8019d300000980a055e76' onChange={handleChangeImage}
                        maxCount={1}>
                    <Button icon={<UploadOutlined/>}>Image Item</Button>
                </Upload>
                <Button onClick={
                    async () => {
                        await addItem({
                            name: itemName,
                            description: itemDescription,
                            imageItem: imageItemAdd,
                        }).unwrap();
                        setImageItemAdd(null);
                        onClose();
                    }}>Add Item</Button>
            </Modal>
        </>
    )
}

export default ItemAddModal;