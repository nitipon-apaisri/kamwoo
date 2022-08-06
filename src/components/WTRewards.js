import { Row, Col } from "antd";
import { useEffect, useState } from "react";

const WTRewards = ({ reward }) => {
    console.log(reward);
    const [rewardsSet, setRewardsSet] = useState([]);
    useEffect(() => {
        setRewardsSet([]);
        switch (reward) {
            case "MS":
                if (rewardsSet.length === 0) {
                    setRewardsSet((reward) => [...reward, "default-character", "default-outfit"]);
                }
                break;
            case "FS":
                if (rewardsSet.length === 0) {
                    setRewardsSet((reward) => [...reward, "default-character", "default-outfit", "default-vaccin"]);
                }
                break;
            case "BASE":
                if (rewardsSet.length === 0) {
                    setRewardsSet((reward) => [...reward, "default-character"]);
                }
                break;
            default:
                setRewardsSet([]);
        }
    }, [reward]);
    return (
        <>
            <Row gutter={16}>
                {rewardsSet.map((row, index) => (
                    <>
                        <Col className="result-wrapper" span={8} key={row}>
                            <div className="reward-img" style={{ backgroundImage: `url(./img/wt-rewards/${row}.jpeg)` }}></div>
                            <>
                                {(() => {
                                    if (row === "default-character") {
                                        return <p>A Default Character</p>;
                                    }
                                    if (row === "default-outfit") {
                                        return <p>An outfit</p>;
                                    }
                                    if (row === "default-vaccin") {
                                        return <p>A Vaccin</p>;
                                    }
                                })()}
                            </>
                        </Col>
                    </>
                ))}
            </Row>
        </>
    );
};

export default WTRewards;
