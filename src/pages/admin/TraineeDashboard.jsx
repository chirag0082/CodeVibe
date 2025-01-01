import { FileTextOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import TraineeList from "../../component/admin/trainee/TraineeList";
import TraineeRegistration from "../../component/admin/trainee/TraineeRegistration";
const { Sider, Content } = Layout;

function TraineeDashboard() {
  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuClick = (key) => {
    setSelectedKey(key);
  };

  const handleEditTrainee = (trainee) => {
    setSelectedTrainee(trainee);
    setSelectedKey("2");
  };

  const handleUpdateComplete = () => {
    setSelectedTrainee(null);
  };

  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Trainee List",
    },
    {
      key: "2",
      icon: <FileTextOutlined />,
      label: "Trainee Registration",
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
            <TraineeList onEditTrainee={handleEditTrainee} />
          )}
          {selectedKey === "2" && (
            <TraineeRegistration
              traineeData={selectedTrainee}
              setSelectedTrainee={setSelectedTrainee}
              onUpdateComplete={handleUpdateComplete}
              setSide={setSelectedKey}
            />
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default TraineeDashboard;
