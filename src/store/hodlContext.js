import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
const HodlContext = createContext();

const HodlProvider = (props) => {
    const [holders, setHolders] = useState([]);
    const [totalOwners, setTotalOwners] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [skip, setSkip] = useState(0);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        updateSkipToken();
        if (totalOwners.length !== 0) {
            getHolderTokensInfo();
        }
        return () => clearInterval(skipToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [skip, totalOwners]);

    useEffect(() => {
        if (totalOwners.length === 0) {
            getHolders();
        }
    }, [totalOwners]);

    let skipToken;
    const updateSkipToken = () => {
        skipToken =
            !skipToken &&
            setInterval(
                () => {
                    setSkip((prevCount) => prevCount + 1);
                },
                skip <= 9 ? 200 : 100
            );
        // if (skip >= 10) clearInterval(skipToken);
        if (skip >= totalOwners) clearInterval(skipToken);
    };

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

    return <HodlContext.Provider value={{ searchValue, searchResults, totalOwners, holders, skip, getHolderTokensInfo, setSearchValue, setSearchResults }}>{props.children}</HodlContext.Provider>;
};

export { HodlContext, HodlProvider };
