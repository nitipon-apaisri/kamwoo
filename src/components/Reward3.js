import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";

const Reward3 = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const updateWindowSize = () => {
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener("resize", updateWindowSize);
    });
    return (
        <div className="reward3-container">
            {width <= 480 ? (
                <div className="responsive-vertical">
                    <div className="result-wrapper">
                        <div className="reward-img" style={{ backgroundImage: `url(./img/wt-rewards/default-character.jpeg)` }}></div>
                        <h4>A Default Characer</h4>
                    </div>
                    <div className="result-wrapper">
                        <div className="reward-img" style={{ backgroundImage: `url(./img/wt-rewards/default-vaccin.jpeg)` }}></div>
                        <h4>A Vaccin</h4>
                    </div>
                    <div className="result-wrapper">
                        <div className="reward-img" style={{ backgroundImage: `url(./img/wt-rewards/default-outfit.jpeg)` }}></div>
                        <h4>An Outfit</h4>
                    </div>
                </div>
            ) : (
                <Row gutter={16}>
                    <Col className="result-wrapper" span={8}>
                        <div className="reward-img" style={{ backgroundImage: `url(./img/wt-rewards/default-character.jpeg)` }}></div>
                        <h4>A Default Characer</h4>
                    </Col>
                    <Col className="result-wrapper" span={8}>
                        <div className="reward-img" style={{ backgroundImage: `url(./img/wt-rewards/default-vaccin.jpeg)` }}></div>
                        <h4>A Vaccin</h4>
                    </Col>
                    <Col className="result-wrapper" span={8}>
                        <div className="reward-img" style={{ backgroundImage: `url(./img/wt-rewards/default-outfit.jpeg)` }}></div>
                        <h4>An Outfit</h4>
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default Reward3;
