import { Row, Col } from "antd";
import { useContext, useEffect, useState } from "react";
import { RewardCheckerContext } from "../store/rewardChecker";

const WTRewards = () => {
    const [rewardsSet, setRewardsSet] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);
    const rewardContext = useContext(RewardCheckerContext);
    const updateWindowSize = () => {
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener("resize", updateWindowSize);
    });
    useEffect(() => {
        setRewardsSet([]);
        switch (rewardContext.rewardSet) {
            case "MS":
                if (rewardsSet.length === 0) {
                    setRewardsSet((reward) => [...reward, "default-character", "default-vaccin"]);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rewardContext.rewardSet]);
    return (
        <>
            {width <= 480 ? (
                <>
                    {rewardsSet.map((row, index) => (
                        <div className="responsive-vertical" key={row}>
                            <div className="result-wrapper">
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
                                            return <p>A Syringe</p>;
                                        }
                                    })()}
                                </>
                            </div>
                        </div>
                    ))}
                    {rewardContext.bonus && (
                        <Col className="result-wrapper">
                            <div className="reward-img" style={{ backgroundImage: `url(./img/wt-rewards/special-reward.jpeg)` }}></div>
                            <p>Special Bonus</p>
                        </Col>
                    )}
                </>
            ) : (
                <Row gutter={16}>
                    {rewardsSet.map((row, index) => (
                        <>
                            <Col className="result-wrapper" span={rewardContext.bonus ? 6 : 8} key={row}>
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
                                            return <p>A Syringe</p>;
                                        }
                                    })()}
                                </>
                            </Col>
                        </>
                    ))}
                    {rewardContext.bonus && (
                        <Col className="result-wrapper" span={6}>
                            <div className="reward-img" style={{ backgroundImage: `url(./img/wt-rewards/special-reward.jpeg)` }}></div>
                            <p>Special Bonus</p>
                        </Col>
                    )}
                </Row>
            )}
        </>
    );
};

export default WTRewards;
