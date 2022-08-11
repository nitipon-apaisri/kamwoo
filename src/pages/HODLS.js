import { Button, Table, Image, Tooltip } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { positiveTokens } from "../assets/positiveATK";
import MainLayout from "../layout";

const HOLDS = () => {
    const [holders, setHolders] = useState([]);
    const [totalOwners, setTotalOwners] = useState([]);
    const [skip, setSkip] = useState(0);
    const [loader, setLoader] = useState(true);
    let skipToken;
    const updateSkipToken = () => {
        skipToken =
            !skipToken &&
            setInterval(
                () => {
                    setSkip((prevCount) => prevCount + 1);
                },
                skip <= 9 ? 200 : 500
            );
        // if (skip >= 10) clearInterval(skipToken);
        if (skip >= totalOwners) clearInterval(skipToken);
    };
    useEffect(() => {
        if (totalOwners.length === 0) {
            getHolders();
        }
    }, [totalOwners]);
    useEffect(() => {
        updateSkipToken();
        if (totalOwners.length !== 0) {
            getHolderTokensInfo();
        }
        return () => clearInterval(skipToken);
    }, [skip, totalOwners]);
    useEffect(() => {
        if (skip <= 9) {
            setLoader(true);
        } else {
            setLoader(false);
        }
    }, [skip]);
    const columns = [
        {
            title: "Holder",
            dataIndex: "holder",
            key: "hold",
            width: "320px",
            ellipsis: true,
            sorter: (a, b) => {
                if (a.holder < b.holder) {
                    return -1;
                }
                if (a.holder > b.holder) {
                    return 1;
                }
                return 0;
            },
            render: (text) => (
                <Tooltip placement="topLeft" title={text}>
                    <p>{text}</p>
                </Tooltip>
            ),
        },
        {
            title: "ATK",
            dataIndex: "tokens",
            key: "hold",
            sorter: (a, b) => {
                if (a.tokens.length < b.tokens.length) {
                    return -1;
                }
                if (a.tokens.length > b.tokens.length) {
                    return 1;
                }
                return 0;
            },
            render: (tokens, row) => (
                <>
                    {tokens.map((token) => (
                        <Image src={`https://paras-cdn.imgix.net/${token.metadata.media}`} alt={token.metadata.title} key={token.metadata.title} width={64} className="holder-token-img" />
                    ))}
                </>
            ),
        },
    ];
    const getHolders = () => {
        axios
            .get("https://api-v2-mainnet.paras.id/collection-stats?collection_id=its-fine-by-kamwoonear")
            .then((holder) => {
                setTotalOwners((name) => [...name, holder.data.data.results.owner_ids]);
            })
            .catch((err) => console.log(err));
    };
    const getHolderTokensInfo = () => {
        axios
            .get(`https://api-v2-mainnet.paras.id/token?creator_id=kamwoo.near&owner_id=${totalOwners[0][skip]}&collection_id=its-fine-by-kamwoonear`)
            .then((res) => {
                if (res.data.data.results.length !== 0) {
                    setHolders((holder) => [...holder, { holder: res.data.data.results[0].owner_id, tokens: res.data.data.results }]);
                }
            })
            .catch((err) => console.log(err));
    };
    return (
        <MainLayout>
            <div className="hold-container">
                {loader && (
                    <div className="loader-wrapper">
                        <div className="loading">
                            <div className="loader"></div>
                        </div>
                    </div>
                )}

                {holders.length !== 0 && !loader && (
                    <div className="table-wrapper">
                        <Table columns={columns} dataSource={holders} rowKey={(row) => row.holder} pagination={{ pageSize: 10 }} />
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default HOLDS;
