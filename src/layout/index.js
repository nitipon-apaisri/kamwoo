import "antd/dist/antd.min.css";
const MainLayout = ({ children }) => {
    return (
        <>
            <div className="main-layout">{children}</div>
            <footer>
                <div className="footer-container">
                    <h1>kamwoo</h1>
                </div>
            </footer>
        </>
    );
};

export default MainLayout;
