import MainLayout from "../layout";
import { Badge, Calendar } from "antd";
const getListData = (value) => {
    let listData;
    switch (value.date()) {
        case 12:
            listData = [
                {
                    type: "warning",
                    content: "ลงทะเบียนเพื่อรับของรางวัลสำหรับคอลเลคชั่น WHAT THE...",
                },
            ];
            break;

        case 18:
            listData = [
                {
                    type: "warning",
                    content: "ประมูลตัว It's fine. #200",
                },
            ];

            break;

        case 26:
            listData = [
                {
                    type: "warning",
                    content: "หมดเวลาสำหรับลงทะเบียนเพื่อรับของรางวัลของคอลเลคชั่น WHAT THE...",
                },
            ];
            break;
        case 30:
            listData = [
                {
                    type: "warning",
                    content: "หมุนวงล้อสำหรับสุ่มตัว Default ของผู้ที่ได้รับ reward",
                },
            ];
            break;

        default:
    }
    switch (value.month() === 8 && value.date()) {
        case 1:
            listData = [
                {
                    type: "warning",
                    content: "เริ่ม mint WHAT THE...",
                },
            ];
            break;
        case 2:
            listData = [
                {
                    type: "warning",
                    content: "Roadmap & How To สำหรับคอลเลคชั่น WHAT THE...",
                },
            ];
            break;

        default:
    }

    return listData || [];
};

const EventCalendar = () => {
    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };
    return (
        <MainLayout>
            <div className="kw-calendar">
                <Calendar dateCellRender={dateCellRender} />
            </div>
        </MainLayout>
    );
};

export default EventCalendar;
