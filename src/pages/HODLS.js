import { Table, Image, Tooltip, Input } from "antd";
import { useContext, useEffect, useState } from "react";
import MainLayout from "../layout";
import { HodlContext } from "../store/hodlContext";

const HOLDS = () => {
    const [loader, setLoader] = useState(true);
    const hodlContext = useContext(HodlContext);
    useEffect(() => {
        if (hodlContext.skip <= 9) {
            setLoader(true);
        } else {
            setLoader(false);
        }
    }, [hodlContext.skip]);
    const columns = [
        {
            title: "Holder",
            dataIndex: "holder",
            key: "hold",
            width: "35%",
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

    const searchTable = (value) => {
        const currValue = value.target.value;
        hodlContext.setSearchValue(currValue);
        const filteredData = hodlContext.holders.filter((name) => name.holder.includes(currValue));
        hodlContext.setSearchResults(filteredData);
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

                {!loader && (
                    <div className="table-wrapper">
                        <div className="search-table">
                            <h3>
                                Total hodls: {hodlContext.holders.length} / {hodlContext.totalOwners[0].length}
                            </h3>
                            <Input
                                value={hodlContext.searchValue}
                                onChange={(e) => {
                                    searchTable(e);
                                }}
                                placeholder="Search by holder"
                            />
                        </div>
                        <Table columns={columns} dataSource={!hodlContext.searchValue ? hodlContext.holders : hodlContext.searchResults} rowKey={(row) => row.holder} pagination={{ pageSize: 10 }} />
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default HOLDS;
