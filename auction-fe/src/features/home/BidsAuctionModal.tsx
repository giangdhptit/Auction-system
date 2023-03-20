import React, {useEffect, useRef, useState} from 'react';
import socketIOClient from "socket.io-client";
import {Button, Col, Input, InputRef, Modal, Row} from "antd";
import {Auction} from "../../model/auction";
import {User} from "../../model/user";
import {useNavigate} from "react-router-dom";

const SOCKET_URL = 'http://localhost:8000';

type Props = {
    visible: boolean;
    onClose: () => void;
    auction?: Auction;
    user: User | null;
}

export type Bid = {
    mess: string[];
    currentPrice?: number;
}

export type BidEnded = {
    mess: string;
    maxBidPrice: number;
}
const BidsAuctionModal = ({onClose, visible, auction, user}: Props) => {
    const [checkBids, setCheckBids] = useState(false);
    const [isDisabledBid, setIsDisabledBid] = useState(false);
    const [bids, setBids] = useState<Bid>({
        mess: [],
        currentPrice: auction?.currentPrice
    });
    const [bidEnded, setBidEnded] = useState<BidEnded | null>(null);
    const bidsRef = useRef<InputRef>(null);
    const scrollRef = useRef<null | HTMLDivElement>(null);
    const navigate = useNavigate();
    let socket = socketIOClient(SOCKET_URL);
    useEffect(() => {
        if (!user && visible) {
            navigate("/login");
        }
        if (visible) {
            socket.emit("joinRoom", {
                idAuction: auction?.id,
                mess: "ok",
            });
            socket.on("joinRoomReceive", data => {
                console.log(data);
            });
            const bidReceive = (data: { mess: string, currentPrice: number }) => {
                setBids(prevBids => ({
                    ...prevBids,
                    mess: [...prevBids.mess, data.mess],
                    currentPrice: data.currentPrice
                }));
            }
            socket.on("bidReceive", bidReceive);

            const checkEndedReceive = (data: { mess: string, maxBidPrice: number }) => {
                setBidEnded(() => ({mess: data.mess, maxBidPrice: data.maxBidPrice}));
                setIsDisabledBid(true);
            }

            socket.on("checkEndedReceive", checkEndedReceive);
        }
        return () => {
            socket.close();
        };
    }, [auction]);
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [bids]);
    const handleBids = () => {
        const bidValue = bidsRef.current?.input?.value || "";
        const currentPrice = bids.currentPrice || auction?.currentPrice || 0;
        const userBalance = user?.balance || 0;
        if (parseInt(bidValue) > currentPrice && parseInt(bidValue) < userBalance) {
            setCheckBids(false);
            socket.emit("bid", {
                idAuction: auction?.id,
                bidPrice: parseInt(bidValue),
                idUser: user?.id
            });
        } else {
            setCheckBids(true);
        }
    }
    return (
        <>
            <Modal title="Bids Auction" visible={visible} footer={null} onCancel={onClose} width={1000}>
                <Row gutter={16}>
                    <Col className="gutter-row" span={8}>
                        <div>
                            <h3>History</h3>
                            <hr/>
                            <div style={{height: 300, overflow: "auto"}}>
                                {bids.mess.map((bid, key) => (
                                    <div key={key}>
                                        {bid}
                                    </div>
                                ))}
                                <div ref={scrollRef} key="scroll"/>
                            </div>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={16}>
                        <div>
                            <h3 className="text-center">Auction</h3>
                            <hr/>
                            <div className="d-flex mb-16">
                                <div className="mr-16">
                                    <img src={auction?.item.photosImagePath} width={250} alt="#"/>
                                </div>
                                <div>
                                    <h4>Name: {auction?.item.name}</h4>
                                    <h4>Description:</h4>
                                    <p className="w-360">{auction?.item.description}</p>
                                    <h3 className="text-yellow-100">Current
                                        Price: {bids.currentPrice || auction?.currentPrice} $</h3>
                                    {
                                        bidEnded && (<>
                                                <h3 className="text-green-100">Max Bid Price: {bidEnded.maxBidPrice} $</h3>
                                                <h3 className="text-green-100">{bidEnded.mess}</h3>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                            {
                                checkBids && (<p className="text-red-100 mb-0">Bid Price is available!</p>)
                            }

                            <div className="d-flex">
                                <Input ref={bidsRef} type="number" placeholder="Bid Price" className="w-240 mr-8"/>
                                <Button type="primary" onClick={() => handleBids()}
                                        disabled={isDisabledBid}>Bids</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Modal>
        </>
    );
}

export default BidsAuctionModal;