import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Avatar, Card, Col, Row} from "antd";
import {connect} from "react-redux";
import Search from "antd/lib/input/Search";
import home from "../../assets/img/home.png";
import {RootState} from "../../store";
import {User} from "../../model/user";
import {useGetAuctionInProgressQuery} from "./home.api";
import BidsAuctionModal from "./BidsAuctionModal";
import {Auction} from "../../model/auction";

const mapState = (state: RootState) => ({
    user: state.auth.user,
});
type Props = {
    user: User | null;
};
const Home = ({user}: Props) => {
    const navigate = useNavigate();
    const {data: auctions, isFetching: isGettingAllAuctions} = useGetAuctionInProgressQuery();
    const [auctionModal,setAuctionModal]=useState<Auction>();
    const [isShowBidsAuctionModal,setIsShowBidsAuctionModal]=useState(false);
    const showModal=(auction:Auction)=>{
        setAuctionModal(auction);
        setIsShowBidsAuctionModal(true);
    }
    return (
        <>
            <div className="h-200 text-center bg-light-blue-100 d-flex justify-center items-center">
                <div className="fs-100 fw-700 text-white ">Auction App</div>
            </div>
            <div className="h-62 d-flex items-center justify-space-between bg-deep-blue-100">
                <div
                    className="logo ml-32 cursor-pointer"
                >
                    <img src={home} width={40} height={40} alt="Home"/>
                </div>
                <div className="search w-500 ml-200">
                    <Search
                        placeholder="Search Auction"
                        allowClear
                        size="large"
                        enterButton
                    />
                </div>
                <div className="user mr-32">
                    {user ? (
                        <div className="text-white fs-24 cursor-pointer">
                            <Avatar src={user?.photosImagePath} size={40} className="mr-8"/>
                            {user?.name}
                        </div>
                    ) : (
                        <div className="d-flex">
                            <div
                                onClick={() => {
                                    navigate("/login");
                                }}
                                className="text-white fs-24 cursor-pointer mr-20"
                            >
                                Login
                            </div>
                            <div
                                onClick={() => {
                                    navigate("/register");
                                }}
                                className="text-white fs-24 cursor-pointer"
                            >
                                Register
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Row gutter={32} className="py-32 px-100 m-0">
                {auctions?.result.map((auction, key) => (
                    <Col className="gutter-row" xs={24}  md={12} lg={8} xl={6} key={key}>
                        <div className="text-center">
                            <Card
                                hoverable
                                className="border-radius-md p-0"
                                onClick={()=>showModal(auction)}
                            >
                                <img src={auction.item.photosImagePath} alt="Item" width="100%" height="250px"/>
                                <h2 className="mt-16">{auction.item.name}</h2>
                            </Card>
                        </div>
                    </Col>
                ))}
            </Row>
            <BidsAuctionModal user={user} auction={auctionModal} visible={isShowBidsAuctionModal} onClose={()=>setIsShowBidsAuctionModal(false)}/>
        </>
    );
};

export default connect(mapState, {})(Home);
