import React, { useState } from "react";
import MainLayout from "../layout";
import { Input, Space } from "antd";
const { Search } = Input;
const WTChecker = () => {
    const [wallet, setWallet] = useState("");
    return (
        <MainLayout>
            <div className="wt-checker">
                <h1>
                    Find your <span className="its-fine-highlight">It's fine.</span> benefit
                </h1>
                <Search placeholder="input search text" enterButton />
                <p>{wallet}</p>
            </div>
        </MainLayout>
    );
};

export default WTChecker;
