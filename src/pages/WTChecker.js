import React, { useState } from "react";
import axios from "axios";
import MainLayout from "../layout";
import { Input } from "antd";

const { Search } = Input;
const WTChecker = () => {
    const [wallet, setWallet] = useState("");

    const [tokens, setTokens] = useState([]);
    const onSearch = (value) => {
        axios
            .get(`https://api-v2-mainnet.paras.id/token?creator_id=kamwoo.near&owner_id=${value}&collection_id=its-fine-by-kamwoonear`)
            .then((res) => {
                res.data.data.results.forEach((r) => {
                    if (r.metadata.copies < 2) {
                        setTokens((token) => [...token, r]);
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
                            setTokens([]);
                            setWallet("");
                        }, 100);
                    }}
                    onChange={(e) => setWallet(e.target.value)}
                    enterButton
                    value={wallet}
                />
                <p>{tokens.length}</p>
                {(() => {
                    if (tokens.length > 2) {
                        return <p>type-1</p>;
                    }
                })()}
            </div>
        </MainLayout>
    );
};

export default WTChecker;
