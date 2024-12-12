import {
  CalendarOutlined,
  GlobalOutlined,
  HomeOutlined,
  IdcardOutlined,
  MailOutlined,
  ManOutlined,
  PhoneOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Card,
  Col,
  Divider,
  Image,
  Modal,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import { File } from "lucide-react";
import React from "react";

const { Text, Title, Paragraph } = Typography;

const InformationCard = ({ title, icon, children, color = "blue" }) => (
  <Card
    hoverable
    style={{
      height: "100%",
      borderTop: `4px solid ${color}`,
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      cursor: "default",
    }}
  >
    <Card.Meta
      avatar={React.cloneElement(icon, {
        style: {
          color: color,
          fontSize: "24px",
          marginRight: "12px",
        },
      })}
      title={
        <Title level={4} style={{ margin: 0, color: color }}>
          {title}
        </Title>
      }
    />
    <Divider />
    <div>{children}</div>
  </Card>
);

const InfoItem = ({ label, value, icon, customStyle }) => (
  <Row align="middle" style={{ marginBottom: 8, ...customStyle }}>
    {icon &&
      React.cloneElement(icon, { style: { marginRight: 8, color: "#1890ff" } })}
    <Space direction="vertical" size={0}>
      <Text type="secondary" style={{ fontSize: "12px" }}>
        {label}
      </Text>
      <Text strong>{value || "N/A"}</Text>
    </Space>
  </Row>
);

const EmployeeDetailModal = ({ employee, onClose, visible }) => {
  if (!employee) return null;

  const renderDocumentCard = (title, image, number) => {
    const isPDF = image && image.toLowerCase().includes(".pdf");
    const fallbackImage = "https://via.placeholder.com/300";

    return (
      <Card
        style={{
          height: 350,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        hoverable
        onClick={() => {
          if (image) {
            window.open(image, "_blank", "noopener,noreferrer");
          }
        }}
        cover={
          <div
            style={{
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              padding: "10px",
              overflow: "hidden", // Prevent content from overflowing
            }}
          >
            {isPDF ? (
              <File style={{ fontSize: 100, color: "#555" }} />
            ) : (
              <Image
                alt={title}
                src={image || fallbackImage}
                style={{
                  maxHeight: "100%", // Ensure image doesn't exceed container height
                  maxWidth: "100%", // Ensure image doesn't exceed container width
                  objectFit: "contain", // Maintain aspect ratio
                  objectPosition: "center", // Center the image
                }}
                preview={false}
              />
            )}
          </div>
        }
      >
        {number && <Card.Meta title={title} description={number} />}
      </Card>
    );
  };

  return (
    <Modal
      title={`Employee Details: ${employee.emp_name}`}
      open={visible}
      onCancel={onClose}
      footer={null}
      width="90%"
      style={{ maxWidth: "1400px" }}
    >
      {/* Header */}
      <Card style={{ marginBottom: 16 }}>
        <Row align="middle" justify="space-between">
          <Col>
            <Space>
              <Title level={4} style={{ margin: 0 }}>
                {employee.emp_name}
              </Title>
              <Tag color={employee.resign_date ? "error" : "success"}>
                {employee.resign_date ? "Resigned" : "Active"}
              </Tag>
            </Space>
            <Paragraph type="secondary" style={{ margin: 0 }}>
              Employee Code: {employee.emp_code}
            </Paragraph>
          </Col>
          <Col>
            {employee.emp_photo ? (
              <Image
                src={employee.emp_photo}
                style={{
                  height: 70,
                  width: 70,
                  border: "1px solid black",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <Avatar
                icon={!employee.emp_photo ? <UserOutlined /> : null}
                style={{
                  marginRight: 10,
                  backgroundColor: employee.resign_date ? "#ff4d4f" : "#52c41a",
                }}
              />
            )}
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <InformationCard
                title="Personal Information"
                icon={<UserOutlined />}
                color="#1890ff"
              >
                <InfoItem
                  label="Gender"
                  value={employee.gender}
                  icon={<ManOutlined />}
                />
                <InfoItem
                  label="Birth Date"
                  value={new Date(employee.birth_date).toLocaleDateString()}
                  icon={<CalendarOutlined />}
                />
                <InfoItem
                  label="Email"
                  value={employee.email_add}
                  icon={<MailOutlined />}
                />
                <InfoItem
                  label="Mobile"
                  value={employee.mobile_no}
                  icon={<PhoneOutlined />}
                />
                <InfoItem
                  label="Alternate Mobile"
                  value={employee.alternet_no || "N/A"}
                  icon={<PhoneOutlined />}
                />
              </InformationCard>
            </Col>

            <Col xs={24} md={12}>
              <InformationCard
                title="Professional Information"
                icon={<TeamOutlined />}
                color="#52c41a"
              >
                <InfoItem
                  label="Education"
                  value={employee.education}
                  icon={<IdcardOutlined />}
                />
                <InfoItem
                  label="Join Date"
                  value={new Date(employee.join_date).toLocaleDateString()}
                  icon={<CalendarOutlined />}
                />
                <InfoItem
                  label="Experience"
                  value={employee.experience}
                  icon={<GlobalOutlined />}
                />
                <InfoItem
                  label="Paid Leave"
                  value={`${employee.paid_leave} days`}
                  icon={<CalendarOutlined />}
                />
              </InformationCard>
            </Col>

            <Col xs={24}>
              <InformationCard
                title="Address Information"
                icon={<HomeOutlined />}
                color="#faad14"
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <InfoItem
                      label="Present Address"
                      value={employee.present_add}
                      icon={<HomeOutlined />}
                      customStyle={{
                        border: "1px solid #faad14",
                        borderRadius: "15px",
                        padding: "10px",
                      }}
                    />
                  </Col>
                  <Col xs={24} md={12}>
                    <InfoItem
                      label="Permanent Address"
                      value={employee.permanent_add}
                      icon={<HomeOutlined />}
                      customStyle={{
                        border: "1px solid #faad14",
                        borderRadius: "15px",
                        padding: "10px",
                      }}
                    />
                  </Col>
                </Row>
              </InformationCard>
            </Col>
          </Row>
        </Col>

        <Col xs={24} md={8}>
          <Card title="Documents" style={{ height: "100%" }}>
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={12} md={12}>
                {renderDocumentCard(
                  "PAN Card",
                  employee.pan_photo,
                  `PAN No: ${employee.pan_no}`
                )}
              </Col>
              <Col xs={12} sm={12} md={12}>
                {renderDocumentCard("Resident Proof", employee.resident_proof)}
              </Col>
              <Col xs={12} sm={12} md={12}>
                {renderDocumentCard(
                  "Aadhar Front",
                  employee.aadhar_front,
                  `Aadhar No: ${employee.aadhar_no}`
                )}
              </Col>
              <Col xs={12} sm={12} md={12}>
                {renderDocumentCard("Aadhar Back", employee.aadhar_back)}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default EmployeeDetailModal;
