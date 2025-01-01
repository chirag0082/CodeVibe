import { FileTextOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import EmpSalary from "./EmpSalary";
import EmpSalaryReport from "./EmpSalaryReport";
const { Sider, Content } = Layout;

function EmpSalaryPage() {
  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuClick = (key) => {
    setSelectedKey(key);
  };

  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Employee Salary Management",
    },
    {
      key: "2",
      icon: <FileTextOutlined />,
      label: "Employee Salary Report",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ height: "100%", borderRight: 0 ,paddingTop:"12px" }}
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
          {selectedKey === "1" && <EmpSalary />}
          {selectedKey === "2" && <EmpSalaryReport />}
        </Content>
      </Layout>
    </Layout>
  );
}

export default EmpSalaryPage;
