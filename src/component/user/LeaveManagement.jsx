import { InfoCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Popconfirm,
  Progress,
  Row,
  Select,
  Table,
  Tag,
  Tooltip,
  Typography,
  message,
} from "antd";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import useApiRequest from "../../utils/useApiRequest";
import styles from "../../css/user/LeaveManagement.module.css";
import "../../css/user/datepicker.css";

const { Title, Text } = Typography;

const LEAVE_TYPES = [
  {
    value: "Paid Leave",
    label: "Paid Leave",
    description: "Fully paid time off for personal reasons",
    color: "green",
  },
  {
    value: "Sick Leave",
    label: "Sick Leave",
    description: "Time off for health-related reasons",
    color: "red",
  },
  {
    value: "Unpaid Leave",
    label: "Unpaid Leave",
    description: "Time off without salary compensation",
    color: "orange",
  },
];

const LeaveManagement = () => {
  const { loading, makeRequest } = useApiRequest();

  const [form] = Form.useForm();
  const user = useSelector((store) => store.userSlice);
  const [userDetails, setUserDetails] = useState({});
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState(0);

  const [dateRange, setDateRange] = useState([null, null]);
  const [isSameDate, setIsSameDate] = useState(false);

  const leaveBalancePercentage = useMemo(() => {
    const totalLeave = userDetails.paid_leave ?? 12;
    return Math.round((leaveBalance / totalLeave) * 100);
  }, [leaveBalance, userDetails.paid_leave]);

  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await makeRequest({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/profile`,

        headers: { Authorization: `Bearer ${user.token}` },
        isForUser: true,
      });
      setUserDetails(response.data);
    } catch (error) {
      message.error("Failed to fetch user details");
    }
  }, [user.token]);

  const fetchLeaveHistory = useCallback(async () => {
    try {
      const response = await makeRequest({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/leave/status`,
        headers: { Authorization: `Bearer ${user.token}` },
        isForUser: true,
      });
      setLeaveHistory(response.data.data);
      setLeaveBalance(response.data.leaveBalance);
    } catch (error) {
      message.error("Failed to fetch leave history");
    }
  }, [user.token]);

  useEffect(() => {
    fetchLeaveHistory();
    fetchUserDetails();
  }, [fetchLeaveHistory, fetchUserDetails]);

  const handleDateChange = (update) => {
    setDateRange(update);

    if (update[0] && update[1]) {
      const startDate = moment(update[0]);
      const endDate = moment(update[1]);
      setIsSameDate(startDate.isSame(endDate, "day"));
    } else {
      setIsSameDate(false);
    }
  };

  const handleLeaveSubmit = async (values) => {
    if (!dateRange[0] || !dateRange[1]) {
      message.error("Please select a date range");
      return;
    }
    try {
      const requestData = {
        leaveFrom: moment(dateRange[0]).format("YYYY-MM-DD"),
        leaveTo: moment(dateRange[1]).format("YYYY-MM-DD"),
        leaveType: values.leaveType,
        remark: values.remark,
        isHalfDay: isSameDate ? values.isHalfDay || false : false,
      };

      const requestedDays = isSameDate
        ? values.isHalfDay
          ? 0.5
          : 1
        : moment(requestData.leaveTo).diff(
            moment(requestData.leaveFrom),
            "days"
          ) + 1;

      if (
        (values.leaveType === "Paid Leave" ||
          values.leaveType === "Sick Leave") &&
        requestedDays > leaveBalance
      ) {
        message.error("Insufficient leave balance");
        return;
      }

      await makeRequest({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/leave/request`,
        data: requestData,
        headers: { Authorization: `Bearer ${user.token}` },
        isForUser: true,
      });

      message.success("Leave request submitted successfully");
      form.resetFields();
      setDateRange([null, null]);
      setIsSameDate(false);
      fetchLeaveHistory();
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to submit leave request"
      );
    }
  };

  const handleCancelLeave = async (leaveId) => {
    try {
      await makeRequest({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/leave/request`,
        data: { leaveId },
        headers: { Authorization: `Bearer ${user.token}` },
        isForUser: true,
      });

      message.success("Leave request canceled successfully");
      fetchLeaveHistory();
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to cancel leave request"
      );
    }
  };

  const renderLeaveTypeOption = (leaveType) => (
    <div className={styles.leaveTypeOption}>
      <div
        className={styles.leaveTypeColor}
        style={{ backgroundColor: leaveType.color }}
      />
      <div>
        <Text strong>{leaveType.label}</Text>
        <Text type="secondary" className={styles.leaveTypeDescription}>
          {leaveType.description}
        </Text>
      </div>
    </div>
  );

  const columns = [
    {
      title: "Leave Details",
      dataIndex: "leave_details",
      render: (_, record) => (
        <>
          <div>
            <strong>From:</strong> {moment(record.leave_from).format("ll")}
          </div>
          <div>
            <strong>To:</strong> {moment(record.leave_to).format("ll")}
          </div>
          <div>
            <strong>Days:</strong>{" "}
            {record.is_half_day
              ? `${record.no_days} (Half Day)`
              : record.no_days}
          </div>
        </>
      ),
    },
    {
      title: "Leave Info",
      dataIndex: "leave_info",
      render: (_, record) => {
        const statusColor =
          record.leave_status === "Pending"
            ? "orange"
            : record.leave_status === "Approve"
            ? "green"
            : record.leave_status === "Canceled"
            ? "red"
            : "purple";
        return (
          <div style={{ gap: 10, display: "flex", flexDirection: "column" }}>
            <div>
              <strong>Type:</strong>{" "}
              <Tag
                color={
                  record.leave_type === "Unpaid"
                    ? "blue"
                    : record.leave_type === "Sick"
                    ? "red"
                    : record.leave_type === "Paid"
                    ? "green"
                    : "gray"
                }
              >
                {record.leave_type}
              </Tag>
            </div>
            <div>
              <strong>Status:</strong>{" "}
              <Tag style={{ color: statusColor }}>{record.leave_status}</Tag>
            </div>
          </div>
        );
      },
    },

    {
      title: "Remark",
      dataIndex: "remark",
      render: (remark) => (
        <Text
          style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            maxWidth: "300px",
            display: "block",
            lineHeight: "1.5",
          }}
        >
          {remark}
        </Text>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) =>
        record.leave_status === "Pending" && (
          <Popconfirm
            title="Are you sure you want to cancel this leave request?"
            onConfirm={() => handleCancelLeave(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Cancel Request</Button>
          </Popconfirm>
        ),
    },
  ];

  return (
    <div className={styles.container}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card className={styles.card}>
            <div className={styles.leaveBalance}>
              <div>
                <Title level={4} style={{ margin: 0 }}>
                  Leave Balance
                  <Tooltip title="Total annual leave allocation">
                    <InfoCircleOutlined className={styles.infoIcon} />
                  </Tooltip>
                </Title>
                <Text type="secondary">{leaveBalance} days remaining</Text>
              </div>
              <Progress
                type="circle"
                percent={leaveBalancePercentage}
                size={80}
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
              />
            </div>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Submit Leave Request" className={styles.card}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleLeaveSubmit}
              initialValues={{
                isHalfDay: false,
              }}
            >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item name="dateRange" label="Leave Duration">
                    <div className={styles.customDateRangePicker}>
                      <DatePicker
                        selectsRange
                        startDate={dateRange[0]}
                        endDate={dateRange[1]}
                        onChange={handleDateChange}
                        isClearable
                        placeholderText="Select leave dates"
                        dateFormat="MMM-dd-yyyy"
                        autoComplete="off"
                        onKeyDown={(e) => e.preventDefault()}
                        aria-label="Select leave dates"
                        className="react-datepicker-wrapper"
                        popperClassName="custom-popper"
                        calendarClassName="custom-calendar"
                      />
                    </div>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="leaveType"
                    label="Leave Type"
                    rules={[{ required: true, message: "Select leave type" }]}
                  >
                    <Select
                      placeholder="Choose Leave Type"
                      optionLabelProp="label"
                    >
                      {LEAVE_TYPES.map((leaveType) => (
                        <Select.Option
                          key={leaveType.value}
                          value={leaveType.value}
                          label={leaveType.label}
                        >
                          {renderLeaveTypeOption(leaveType)}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              {isSameDate && (
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item name="isHalfDay" label="Duration">
                      <Select placeholder="Select Duration">
                        <Select.Option value={false}>Full Day</Select.Option>
                        <Select.Option value={true}>Half Day</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              )}

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="remark"
                    label="Reason"
                    rules={[
                      {
                        required: true,
                        message: "Please provide a reason",
                        whitespace: false,
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={3}
                      placeholder="Explain your leave reason"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="customBtnStyle"
                >
                  Submit Leave Request
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col span={24}>
          <Card
            title={
              <Title level={4} style={{ margin: 0 }}>
                Leave History
              </Title>
            }
            className={`${styles.card} ${styles.leaveHistoryCard}`}
          >
            <Table
              columns={columns}
              dataSource={leaveHistory}
              loading={loading}
              rowKey="id"
              pagination={{
                pageSize: 5,
                showSizeChanger: false,
                responsive: true,
                size: "small",
              }}
              scroll={{ x: "max-content" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LeaveManagement;
