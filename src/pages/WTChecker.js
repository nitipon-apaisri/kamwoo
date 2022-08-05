import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layout";
import { Divider, Empty, Input } from "antd";
import Reward1 from "../components/Reward1";
import Reward2 from "../components/Reward2";
import Reward3 from "../components/Reward3";
import { positiveTokens } from "../assets/positiveATK";
const { Search } = Input;
const WTChecker = () => {
    const [wallet, setWallet] = useState("");
    const [ownTokens, setOwnTokens] = useState([]);
    const [ownPositiveTokens, setOwnPositiveTokens] = useState([]);
    const [checked, setChecked] = useState(false);
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        for (let i = 0; i < ownTokens.length; i++) {
            const findOwnPositiveTokens = positiveTokens.find((positiveToken) => positiveToken === ownTokens[i].token_series_id);
            if (findOwnPositiveTokens !== undefined) {
                setOwnPositiveTokens((token) => [...token, findOwnPositiveTokens]);
            }
        }
    }, [ownTokens]);
    useEffect(() => {
        if (checked === true) {
            setTimeout(() => {
                setLoader(false);
            }, 300);
        }
    }, [ownTokens, checked]);
    useEffect(() => {
        if (wallet === "") {
            setOwnTokens([]);
            setOwnPositiveTokens([]);
            setChecked(false);
        }
    }, [wallet]);
    useEffect(() => {
        document.title = "KAMWOO | Reward Checker";
    }, []);
    const onSearch = (value) => {
        axios
            .get(`https://api-v2-mainnet.paras.id/token?creator_id=kamwoo.near&owner_id=${value}&collection_id=its-fine-by-kamwoonear`)
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
    return (
        <MainLayout>
            <div className="wt-checker">
                <h1>
                    Your <span className="its-fine-highlight">It's fine.</span> rewards
                </h1>
                <Search
                    placeholder="example.near"
                    onSearch={(e) => {
                        setOwnTokens([]);
                        setOwnPositiveTokens([]);
                        onSearch(e);
                        setLoader(true);
                        setChecked(true);
                    }}
                    onChange={(e) => setWallet(e.target.value)}
                    enterButton
                    value={wallet}
                />
                {wallet !== "" && checked === true && <Divider className="wt-divider" />}
                {loader && (
                    <div className="loading">
                        <div className="loader"></div>
                    </div>
                )}
                {ownTokens.length === 0 && wallet !== "" && checked === true && !loader ? (
                    <>
                        <div className="empty-banner">
                            <Empty />
                        </div>
                    </>
                ) : (
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
            </div>
        </MainLayout>
    );
};

export default WTChecker;
