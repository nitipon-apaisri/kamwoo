import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../layout";
import { Divider, Empty, Input } from "antd";
import WTRewards from "../components/WTRewards";
import { RewardCheckerContext } from "../store/rewardChecker";
const { Search } = Input;
const WTChecker = () => {
    const [loader, setLoader] = useState(false);
    const rewardCheckerContext = useContext(RewardCheckerContext);
    useEffect(() => {
        if (rewardCheckerContext.checked === true) {
            setTimeout(() => {
                setLoader(false);
            }, 300);
        }
    }, [rewardCheckerContext.ownTokens, rewardCheckerContext.checked]);
    useEffect(() => {
        document.title = "KW | Reward Checker";
    }, []);
    const onSearch = (value) => {
        if (rewardCheckerContext.wallet !== "") {
            setLoader(true);
            rewardCheckerContext.fetchOwner(value);
        } else {
            setLoader(true);
            rewardCheckerContext.setChecked(true);
        }
    };
    return (
        <MainLayout>
            <div className="wt-checker">
                <h1>
                    Your <span className="its-fine-highlight">WHAT THE... </span> Reward
                </h1>
                <Search
                    placeholder="example.near"
                    onSearch={(e) => {
                        onSearch(e);
                    }}
                    onChange={(e) => rewardCheckerContext.setWallet(e.target.value.toLowerCase())}
                    enterButton
                    value={rewardCheckerContext.wallet}
                />
                {rewardCheckerContext.wallet !== "" && rewardCheckerContext.checked === true && <Divider className="wt-divider" />}
                {rewardCheckerContext.wallet === "" && rewardCheckerContext.checked === true && <Divider className="wt-divider" />}
                {loader && (
                    <div className="loading">
                        <div className="loader"></div>
                    </div>
                )}
                {rewardCheckerContext.ownTokens.length <= 1 && rewardCheckerContext.bonus === false && rewardCheckerContext.wallet !== "" && rewardCheckerContext.checked === true && !loader && (
                    <>
                        <div className="empty-banner">
                            <Empty />
                        </div>
                    </>
                )}
                {rewardCheckerContext.ownTokens.length === 0 && rewardCheckerContext.bonus === false && rewardCheckerContext.wallet === "" && rewardCheckerContext.checked === true && !loader && (
                    <>
                        <div className="empty-banner">
                            <Empty />
                        </div>
                    </>
                )}
                {(rewardCheckerContext.ownTokens.length >= 2 || rewardCheckerContext.bonus === true) && rewardCheckerContext.wallet !== "" && rewardCheckerContext.checked === true && !loader && (
                    <div className="reward-img-container">
                        <WTRewards />
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default WTChecker;
