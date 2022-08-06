import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layout";
import { Divider, Empty, Input } from "antd";
import Reward1 from "../components/Reward1";
import Reward2 from "../components/Reward2";
import Reward3 from "../components/Reward3";
import { positiveTokens, positiveTokensSS1, positiveTokensSS2 } from "../assets/positiveATK";
import WTRewards from "../components/WTRewards";
const { Search } = Input;
const WTChecker = () => {
    const [wallet, setWallet] = useState("");
    const [ownTokens, setOwnTokens] = useState([]);
    const [ownPositiveTokens, setOwnPositiveTokens] = useState([]);
    const [checked, setChecked] = useState(false);
    const [loader, setLoader] = useState(false);
    const [ownPositiveSS1, setOwnPositiveSS1] = useState(false);
    const [ownPositiveSS2, setOwnPositiveSS2] = useState(false);
    const [rewardSet, setRewardSet] = useState("");
    useEffect(() => {
        for (let i = 0; i < ownTokens.length; i++) {
            const findOwnPositiveTokens = positiveTokens.find((positiveToken) => positiveToken === ownTokens[i].token_series_id);
            if (findOwnPositiveTokens !== undefined) {
                setOwnPositiveTokens((token) => [...token, findOwnPositiveTokens]);
            }
        }
    }, [ownTokens]);

    useEffect(() => {
        if (ownPositiveTokens.length !== 0) {
            for (let i = 0; i < ownPositiveTokens.length; i++) {
                const findPositiveSS1 = positiveTokensSS1.find((token) => token === ownPositiveTokens[i]);
                const findPositiveSS2 = positiveTokensSS2.find((token) => token === ownPositiveTokens[i]);
                if (findPositiveSS1 !== undefined) {
                    setOwnPositiveSS1(true);
                }
                if (findPositiveSS2 !== undefined) {
                    setOwnPositiveSS2(true);
                }
            }
        }
        if (ownTokens.length >= 2 && ownPositiveSS1 === false && ownPositiveSS2 === false && ownPositiveTokens.length === 0) {
            setRewardSet("BASE");
            console.log("BASE");
        } else if (ownPositiveSS1 === true && ownPositiveSS2 === true) {
            setRewardSet("FS");
            console.log("FS");
        } else {
            setRewardSet("MS");
            console.log("MS");
        }
    }, [ownPositiveTokens, ownPositiveSS1, ownPositiveSS2]);
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
        if (wallet !== "") {
            setLoader(true);
            setChecked(true);
            setOwnTokens([]);
            setOwnPositiveSS1(false);
            setOwnPositiveSS2(false);
            setOwnPositiveTokens([]);
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
        } else {
            setLoader(true);
            setChecked(true);
        }
    };
    return (
        <MainLayout>
            <div className="wt-checker">
                <h1>
                    Your <span className="its-fine-highlight">It's fine.</span> rewards
                    <p>{ownPositiveTokens.length}</p>
                </h1>
                <Search
                    placeholder="example.near"
                    onSearch={(e) => {
                        onSearch(e);
                    }}
                    onChange={(e) => setWallet(e.target.value)}
                    enterButton
                    value={wallet}
                />
                {wallet !== "" && checked === true && <Divider className="wt-divider" />}
                {wallet === "" && checked === true && <Divider className="wt-divider" />}
                {loader && (
                    <div className="loading">
                        <div className="loader"></div>
                    </div>
                )}
                {ownTokens.length <= 1 && wallet !== "" && checked === true && !loader && (
                    <>
                        <div className="empty-banner">
                            <Empty />
                        </div>
                    </>
                )}
                {ownTokens.length === 0 && wallet === "" && checked === true && !loader && (
                    <>
                        <div className="empty-banner">
                            <Empty />
                        </div>
                    </>
                )}
                {ownTokens.length >= 2 && wallet !== "" && checked === true && !loader && (
                    <div className="reward-img-container">
                        {/* {(() => {
                            if (ownTokens.length >= 2 && ownPositiveTokens.length === 0) {
                                return <Reward1 />;
                            }
                            if (ownTokens.length >= 1 && ownPositiveTokens.length === 1) {
                                return <Reward2 />;
                            }
                            if (wallet !== "" && checked === true && ownPositiveTokens.length >= 2) {
                                return <Reward3 />;
                            }
                        })()} */}
                        <WTRewards reward={rewardSet} />
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default WTChecker;
