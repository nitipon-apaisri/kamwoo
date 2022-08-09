import { Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { positiveTokens } from "../assets/positiveATK";
import MainLayout from "../layout";

const HOLDS = () => {
    const [owners, setOwners] = useState([]);
    const [ownTokens, setOwnTokens] = useState([]);
    const [ownPositiveTokens, setOwnPositiveTokens] = useState([]);
    const [owner, setOwner] = useState({ wallet: "", reward: "", bonus: false });
    const [ownerId, setOwnerId] = useState("");
    useEffect(() => {
        for (let i = 0; i < ownTokens.length; i++) {
            const findOwnPositiveTokens = positiveTokens.find((positiveToken) => positiveToken === ownTokens[i].token_series_id);
            if (findOwnPositiveTokens !== undefined) {
                setOwnPositiveTokens((token) => [...token, findOwnPositiveTokens]);
            }
        }
    }, [ownTokens]);
    useEffect(() => {
        setTimeout(() => {
            if (ownTokens.length >= 2 && ownPositiveTokens.length === 0) {
                setOwners((owner) => [...owner, { wallet: ownTokens[0].owner_id, reward: "BASE" }]);
            }
            if (ownTokens.length >= 2 && ownPositiveTokens.length === 1) {
                setOwners((owner) => [...owner, { wallet: ownTokens[0].owner_id, reward: "MS" }]);
            }
        }, 100);
    }, [ownTokens, ownPositiveTokens]);
    useEffect(() => {
        if (owners.length >= 2) {
            console.log([...new Set(owners)]);
        }
    });
    const checkHolder = (ownerId) => {
        axios
            .get(`https://api-v2-mainnet.paras.id/token?creator_id=kamwoo.near&owner_id=${ownerId}&collection_id=its-fine-by-kamwoonear`)
            .then((res) => {
                if (res.data.data.results.length !== 0) {
                    res.data.data.results.forEach((r) => {
                        if (r.metadata.copies < 2) {
                            setOwnTokens((token) => [...token, r]);
                        }
                    });
                }
            })
            .catch((err) => console.log(err));
    };
    const fetch = () => {
        axios
            .get("https://api-v2-mainnet.paras.id/collection-stats?collection_id=its-fine-by-kamwoonear")
            .then((res) => {
                setOwnTokens([]);
                checkHolder("nitipon-apaisri.near");
                setOwnTokens([]);
                checkHolder("12lil.near");
                // for (let i = 0; i < 2; i++) {
                //     checkHolder(res.data.data.results.owner_ids[i]);
                // }
            })
            .catch((err) => console.log(err));
    };
    return (
        <MainLayout>
            <div className="hold-container">
                <p>HOLD</p>
                <>{/* <p>total owner: {Array(new Set(owners.length))}</p> */}</>
                <Button onClick={fetch} type="primary">
                    Click
                </Button>
            </div>
        </MainLayout>
    );
};

export default HOLDS;
