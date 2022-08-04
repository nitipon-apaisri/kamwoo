import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layout";
import { Divider, Input } from "antd";
import Reward1 from "../components/Reward1";
import Reward2 from "../components/Reward2";
import Reward3 from "../components/Reward3";

const { Search } = Input;
const WTChecker = () => {
    const [wallet, setWallet] = useState("");
    const [ownTokens, setOwnTokens] = useState([]);
    const [ownPositiveTokens, setOwnPositiveTokens] = useState([]);
    useEffect(() => {
        const positiveTokens = [
            "110115",
            "143161",
            "144796",
            "159454",
            "169916",
            "169924",
            "190698",
            "190703",
            "215721",
            "242459",
            "242663",
            "259261",
            "259282",
            "259292",
            "267766",
            "277449",
            "283417",
            "305294",
            "305319",
            "309017",
            "309653",
            "309661",
            "317164",
            "319310",
            "329200",
            "332222",
            "337333",
            "348371",
            "351958",
            "354647",
            "369768",
            "370834",
            "385946",
            "417967",
            "433671",
        ];
        for (let i = 0; i < ownTokens.length; i++) {
            // console.log(tokens[i].token_series_id);
            const findOwnPositiveTokens = positiveTokens.find((positiveToken) => positiveToken === ownTokens[i].token_series_id);
            if (findOwnPositiveTokens !== undefined) {
                setOwnPositiveTokens((token) => [...token, findOwnPositiveTokens]);
            }
        }
    }, [ownTokens]);
    useEffect(() => {
        document.title = "KAMWOO | It's fine reward checker";
    }, []);
    const onSearch = (value) => {
        axios
            .get(`https://api-v2-mainnet.paras.id/token?creator_id=kamwoo.near&owner_id=${value}&collection_id=its-fine-by-kamwoonear`)
            .then((res) => {
                res.data.data.results.forEach((r) => {
                    if (r.metadata.copies < 2) {
                        setOwnTokens((token) => [...token, r]);
                    }
                });
            })
            .catch((err) => console.log(err));
    };
    return (
        <MainLayout>
            <div className="wt-checker">
                <h1>
                    Your <span className="its-fine-highlight">It's fine.</span> rewards
                </h1>
                <Search
                    placeholder="example.near"
                    onSearch={(e) => {
                        onSearch(e);
                        setTimeout(() => {
                            setOwnTokens([]);
                            setOwnPositiveTokens([]);
                        }, 100);
                    }}
                    onChange={(e) => setWallet(e.target.value)}
                    enterButton
                    value={wallet}
                />
                <Divider className="wt-divider" />
                {ownTokens.length !== 0 && (
                    <div className="reward-img-container">
                        {(() => {
                            if (ownTokens.length >= 2 && ownPositiveTokens.length === 0) {
                                return <Reward1 />;
                            }
                            if (ownTokens.length >= 1 && ownPositiveTokens.length === 1) {
                                return <Reward2 />;
                            }
                            if (ownPositiveTokens.length >= 2) {
                                return <Reward3 />;
                            }
                        })()}
                    </div>
                )}
                {/* <p>Own ATK: {ownTokens.length} piece(s) </p>
                <p>Own Positive ATK: {ownPositiveTokens.length} piece(s)</p> */}
            </div>
        </MainLayout>
    );
};

export default WTChecker;
