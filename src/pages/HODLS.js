import { Button, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { positiveTokens } from "../assets/positiveATK";
import MainLayout from "../layout";

const HOLDS = () => {
    const [holders, setHolders] = useState([]);
    const [ownTokens, setOwnTokens] = useState([]);
    const [ownPositiveTokens, setOwnPositiveTokens] = useState([]);
    const [owner, setOwner] = useState({ wallet: "", reward: "", bonus: false });
    const [ownerId, setOwnerId] = useState("");
    useEffect(() => {
        console.log("hi");
        fetch();
    }, []);
    const columns = [
        {
            title: "Holder",
            dataIndex: "holder",
            key: "hold",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "ATK",
            dataIndex: "holder",
            key: "hold",
            render: (text) => <p>{text}</p>,
        },
    ];
    const fetch = () => {
        axios
            .get("https://api-v2-mainnet.paras.id/collection-stats?collection_id=its-fine-by-kamwoonear")
            .then((res) => {
                setHolders((holder) => [...holder, { holder: "nitipon-apaisri.near" }]);

                // checkHolder("12lil.near");
                // for (let i = 0; i < 2; i++) {
                //     setHolders((holder) => [...holder, { holder: res.data.data.results.owner_ids[i] }]);
                // }
            })
            .catch((err) => console.log(err));
    };
    const checkHolder = (ownerId) => {
        axios
            .get(`https://api-v2-mainnet.paras.id/token?creator_id=kamwoo.near&owner_id=${ownerId}&collection_id=its-fine-by-kamwoonear`)
            .then((res) => {
                if (res.data.data.results.length !== 0) {
                    res.data.data.results.forEach((r) => {
                        if (r.metadata.copies < 2) {
                            console.log(res.data.data.results);
                            // setHolders((token) => [...token, r]);
                        }
                    });
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <MainLayout>
            <div className="hold-container">
                <p>HOLD</p>
                <p>{holders.length}</p>
                {holders.length !== 0 && <Table columns={columns} dataSource={holders} rowKey={(row) => row.holder} />}
            </div>
        </MainLayout>
    );
};

export default HOLDS;
