import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";

const Reward1 = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const updateWindowSize = () => {
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener("resize", updateWindowSize);
    });
    return (
        <div className="reward2-container">
            {width <= 480 ? (
                <div className="responsive-vertical">
                    <div className="result-wrapper">
                        <div className="reward-img" style={{ backgroundImage: `url(./img/wt-rewards/default-character.jpeg)` }}></div>
                        <h4>A Default Characer</h4>
                    </div>
                </div>
            ) : (
                <Row gutter={16} justify="center">
                    <Col className="result-wrapper" span={8}>
                        <div className="reward-img" style={{ backgroundImage: `url(./img/wt-rewards/default-character.jpeg)` }}></div>
                        <h4>A Default Characer</h4>
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default Reward1;
