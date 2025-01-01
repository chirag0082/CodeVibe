import { FileTextOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import LedgerManagement from "../../component/admin/ledger/LedgerManagement";
import LedgerReport from "../../component/admin/ledger/LedgerReport";
import MonthlyReport from "../../component/admin/ledger/MonthlyReport";
import YearlyReport from "../../component/admin/ledger/YearlyReport";
import DailyReport from "../../component/admin/ledger/DailyReport";
const { Sider, Content } = Layout;

function CompanyLedger() {
  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuClick = (key) => {
    setSelectedKey(key);
  };

  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Transaction Entry",
    },
    {
      key: "2",
      icon: <FileTextOutlined />,
      label: "Ledger Report",
    },
    {
      key: "3",
      icon: <FileTextOutlined />,
      label: "Daily Report",
    },
    {
      key: "4",
      icon: <FileTextOutlined />,
      label: "Monthly Report",
    },
    {
      key: "5",
      icon: <FileTextOutlined />,
      label: "Yearly Report",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ height: "100%", borderRight: 0,paddingTop:"12px" }}
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
            borderRadius: 16,
          }}
        >
          {selectedKey === "1" && <LedgerManagement />}
          {selectedKey === "2" && <LedgerReport />}
          {selectedKey === "3" && <DailyReport />}
          {selectedKey === "4" && <MonthlyReport />}
          {selectedKey === "5" && <YearlyReport />}
        </Content>
      </Layout>
    </Layout>
  );
}

export default CompanyLedger;
