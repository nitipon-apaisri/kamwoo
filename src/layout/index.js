import { Layout } from "antd";
import "antd/dist/antd.min.css";
import { Link } from "react-router-dom";
const { Header, Footer, Content } = Layout;
const MainLayout = ({ children }) => {
    return (
        <>
            <Layout>
                <Header>
                    <Link to="/">
                        <div className="logo" style={{ backgroundImage: `url(./img/kw-logo.png)` }}></div>
                    </Link>
                    <ul>
                        <Link to="/events-calendar">Events</Link>
                        <Link to="/info">Combinations</Link>
                        <Link to="/holds">Hodls</Link>
                    </ul>
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
