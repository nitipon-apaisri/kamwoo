import { Divider } from "antd";
import { useEffect, useState } from "react";
import RewaredCombination from "../components/RewardCombination";
import RewaredCombinationReponsive from "../components/RewardCombinationResponsive";
import MainLayout from "../layout";

const Info = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const updateWindowSize = () => {
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener("resize", updateWindowSize);
    });
    useEffect(() => {
        document.title = "KW | INFO";
    }, []);
    return (
        <MainLayout>
            <div className="info-container">
                <h1 className="info-title">
                    YOUR <span className="its-fine-highlight">WHAT THE...</span> REWARDS
                </h1>
                <Divider />
                <>{width <= 640 ? <RewaredCombinationReponsive /> : <RewaredCombination />}</>
                <Divider />
                <p>
                    * All rights reserved for 1:1 cards in <span className="its-fine-highlight"> It's fine.</span> collection.
                </p>
            </div>
        </MainLayout>
    );
};

export default Info;
