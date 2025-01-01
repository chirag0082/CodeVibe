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
import moment from "moment";
import React from "react";

const { Text, Title } = Typography;

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

const TraineeDetailModal = ({ trainee, onClose, visible }) => {
  if (!trainee) return null;

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
              overflow: "hidden",
            }}
          >
            {isPDF ? (
              <File style={{ fontSize: 100, color: "#555" }} />
            ) : (
              <Image
                alt={title}
                src={image || fallbackImage}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                  objectPosition: "center",
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
      title={`Trainee Details: ${trainee.trainee_name}`}
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
                {trainee.trainee_name}
              </Title>
              <Tag color={trainee.complete_date ? "error" : "success"}>
                {trainee.complete_date ? "Complete" : "Active"}
              </Tag>
            </Space>
          </Col>
          <Col>
            {trainee.trainee_photo ? (
              <Image
                src={trainee.trainee_photo}
                style={{
                  height: 70,
                  width: 70,
                  border: "1px solid black",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <Avatar
                icon={!trainee.trainee_photo ? <UserOutlined /> : null}
                style={{
                  marginRight: 10,
                  backgroundColor: trainee.resign_date ? "#ff4d4f" : "#52c41a",
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
                  value={trainee.gender}
                  icon={<ManOutlined />}
                />
                <InfoItem
                  label="Birth Date"
                  value={moment(trainee.birth_date).format("ll")}
                  icon={<CalendarOutlined />}
                />
                <InfoItem
                  label="Email"
                  value={trainee.email_add}
                  icon={<MailOutlined />}
                />
                <InfoItem
                  label="Mobile"
                  value={trainee.mobile_no}
                  icon={<PhoneOutlined />}
                />
                <InfoItem
                  label="Alternate Mobile"
                  value={trainee.alternet_no || "N/A"}
                  icon={<PhoneOutlined />}
                />
                {trainee.ref_name && (
                  <InfoItem
                    label="Reference Name"
                    value={trainee.ref_name || "N/A"}
                    icon={<UserOutlined />}
                  />
                )}
                {trainee.ref_no && (
                  <InfoItem
                    label="Reference Number"
                    value={trainee.ref_no || "N/A"}
                    icon={<PhoneOutlined />}
                  />
                )}
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
                  value={trainee.education}
                  icon={<IdcardOutlined />}
                />
                <InfoItem
                  label="Join Date"
                  value={moment(trainee.join_date).format("ll")}
                  icon={<CalendarOutlined />}
                />
                <InfoItem
                  label="Experience"
                  value={trainee.experience}
                  icon={<GlobalOutlined />}
                />
                {trainee.complete_date && (
                  <InfoItem
                    label="Complete Date"
                    value={moment(trainee.complete_date).format("ll")}
                    icon={<GlobalOutlined />}
                  />
                )}
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
                      value={trainee.present_add}
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
                      value={trainee.permanent_add}
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
                {renderDocumentCard("Resident Proof", trainee.resident_proof)}
              </Col>
              <Col xs={12} sm={12} md={12}>
                {renderDocumentCard(
                  "Aadhar Front",
                  trainee.aadhar_front,
                  `Aadhar No: ${trainee.aadhar_no}`
                )}
              </Col>
              <Col xs={12} sm={12} md={12}>
                {renderDocumentCard("Aadhar Back", trainee.aadhar_back)}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default TraineeDetailModal;
