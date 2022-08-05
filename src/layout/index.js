import { Layout } from "antd";
import "antd/dist/antd.min.css";
const { Header, Footer, Content } = Layout;
const MainLayout = ({ children }) => {
    return (
        <>
            <Layout>
                <Header>
                    <div className="logo" style={{ backgroundImage: `url(./img/kw-logo.png)` }}></div>
                </Header>
                <Content>
                    <div className="main-layout">{children}</div>
                </Content>
                <Footer>
                    <div className="footer-container">
                        <h3>kamwoo</h3>
                    </div>
                </Footer>
            </Layout>
        </>
    );
};

export default MainLayout;
