import {
  FileTextOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import EmpLiList from "../../component/admin/home/EmpList";
// import EmployeeRegistration from "../../component/admin/home/EmpRegistration";
import EmployeeRegistration from "../../component/admin/home/EmpRegistrationNew";
import SalaryForm from "../../component/admin/home/SalaryForm";
const { Sider, Content } = Layout;

function AdminDashboard() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuClick = (key) => {
    setSelectedKey(key);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setSelectedKey("2");
  };

  const handleUpdateComplete = () => {
    setSelectedEmployee(null);
  };

  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Employee List",
    },
    {
      key: "2",
      icon: <FileTextOutlined />,
      label: "Employee Registration",
    },
    {
      key: "3",
      icon: <TeamOutlined />,
      label: "Salary Management",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ height: "100%", borderRight: 0, paddingTop: "12px" }}
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
          {selectedKey === "1" && (
            <EmpLiList onEditEmployee={handleEditEmployee} />
          )}
          {selectedKey === "2" && (
            <EmployeeRegistration
              empData={selectedEmployee}
              setSelectedEmployee={setSelectedEmployee}
              onUpdateComplete={handleUpdateComplete}
              setSide={setSelectedKey}
            />
          )}
          {selectedKey === "3" && <SalaryForm />}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminDashboard;
