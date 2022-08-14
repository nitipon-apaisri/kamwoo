import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { DJ, positiveTokens, positiveTokensSS1, positiveTokensSS2 } from "../assets/positiveATK";
const RewardCheckerContext = createContext();

const RewardCheckerProvider = (props) => {
    const [rewardSet, setRewardSet] = useState("");
    const [wallet, setWallet] = useState("");
    const [ownTokens, setOwnTokens] = useState([]);
    const [ownPositiveTokens, setOwnPositiveTokens] = useState([]);
    const [bonus, setBonus] = useState(false);
    const [ownPositiveSS1, setOwnPositiveSS1] = useState(false);
    const [ownPositiveSS2, setOwnPositiveSS2] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (wallet === "") {
            setOwnPositiveTokens([]);
            setChecked(false);
            setBonus(false);
        }
    }, [wallet]);

    useEffect(() => {
        for (let i = 0; i < ownTokens.length; i++) {
            const findOwnPositiveTokens = positiveTokens.find((positiveToken) => positiveToken === ownTokens[i].token_series_id);
            if (findOwnPositiveTokens !== undefined) {
                setOwnPositiveTokens((token) => [...token, findOwnPositiveTokens]);
            }
        }
    }, [ownTokens]);

    useEffect(() => {
        if (ownPositiveSS1 === true && ownPositiveSS2 === true) {
            setBonus(true);
        }
    }, [ownPositiveSS1, ownPositiveSS2]);
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
        if (ownTokens.length >= 2 && ownPositiveTokens.length === 0) {
            setRewardSet("BASE");
        } else if (wallet !== "" && checked === true && ownPositiveTokens.length >= 2) {
            setRewardSet("FS");
        } else if (ownTokens.length >= 1 && ownPositiveTokens.length === 1) {
            setRewardSet("MS");
        }
    }, [ownPositiveTokens, ownPositiveSS1, ownPositiveSS2, checked, wallet, ownTokens]);
    const fetchOwner = (id) => {
        if (wallet !== "") {
            setChecked(true);
            setOwnPositiveSS1(false);
            setOwnPositiveSS2(false);
            setOwnPositiveTokens([]);
            setOwnTokens([]);
            setBonus(false);
            axios
                .get(`https://api-v2-mainnet.paras.id/token?creator_id=kamwoo.near&owner_id=${id}&collection_id=its-fine-by-kamwoonear`)
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
            axios
                .get(`https://api-v2-mainnet.paras.id/token?creator_id=kamwoo.near&owner_id=${id}&collection_id=event-by-kw-by-kamwoonear`)
                .then((res) => {
                    if (res.data.data.results.length !== 0) {
                        res.data.data.results.forEach((r) => {
                            if (r.metadata.copies < 2) {
                                const ownDJ = DJ.find((token) => token === r.token_series_id);
                                if (ownDJ !== undefined) {
                                    setRewardSet("");
                                    setBonus(true);
                                }
                            }
                        });
                    }
                })
                .catch((err) => console.log(err));
        }
    };
    return (
        <RewardCheckerContext.Provider
            value={{ rewardSet, bonus, wallet, ownTokens, ownPositiveTokens, checked, ownPositiveSS1, ownPositiveSS2, setRewardSet, setBonus, setWallet, setOwnTokens, fetchOwner }}
        >
            {props.children}
        </RewardCheckerContext.Provider>
    );
};

export { RewardCheckerContext, RewardCheckerProvider };
