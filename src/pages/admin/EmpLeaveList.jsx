import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import EmpAllLeaveList from "../../component/admin/leave/EmpAllLeaveList.jsx";
import EmpLeaveApprove from "../../component/admin/leave/EmpLeaveApprove";
const { Sider, Content } = Layout;

function EmpLeaveList() {
  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuClick = (key) => {
    setSelectedKey(key);
  };

  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Pending List",
    },
    {
      key: "2",
      icon: <TeamOutlined />,
      label: "All List",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ height: "100%", borderRight: 0,paddingTop:"12px"  }}
          onClick={({ key }) => handleMenuClick(key)}
          items={menuItems}
        />
      </Sider>

      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: "#fff",
            borderRadius: 8,
          }}
        >
          {selectedKey === "1" && <EmpLeaveApprove />}
          {selectedKey === "2" && <EmpAllLeaveList />}
        </Content>
      </Layout>
    </Layout>
  );
}

export default EmpLeaveList;
