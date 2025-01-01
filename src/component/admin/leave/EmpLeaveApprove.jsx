import {
  Alert,
  Button,
  Card,
  message,
  Modal,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useApiRequest from "../../../utils/useApiRequest";
const { Text } = Typography;

const EmpLeaveApprove = () => {
  const { loading, error, makeRequest } = useApiRequest();

  const user = useSelector((state) => state.adminSlice);
  const [leaveRequests, setLeaveRequests] = useState([]);

  // Fetch leave requests
  const fetchLeavePendingRequests = useCallback(async () => {
    try {
      const response = await makeRequest({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/admin/employ/leave/pending`,

        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setLeaveRequests(response.data.data);
    } catch (error) {
      message.error("Failed to fetch leave requests");
    }
  }, [user.token]);

  // Handle leave request action (approve/reject)
  const handleLeaveAction = async (leaveId, action) => {
    try {
      await makeRequest({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/admin/employ/leave`,
        data: {
          leaveId,
          action,
        },

        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      message.success(`Leave request ${action.toLowerCase()}d successfully`);
      fetchLeavePendingRequests();
    } catch (error) {
      message.error(`Failed to ${action.toLowerCase()} leave request`);
    }
  };

  // Confirm action modal
  const confirmAction = (leaveId, action) => {
    Modal.confirm({
      title: `Are you sure you want to ${action.toLowerCase()} this leave request?`,
      onOk() {
        handleLeaveAction(leaveId, action);
      },
    });
  };

  // Columns configuration for the table
  const columns = [
    {
      title: "Employee Name",
      dataIndex: "emp_name",
      key: "emp_name",
    },
    {
      title: "Leave Type",
      dataIndex: "leave_type",
      key: "leave_type",
      render: (leaveType) => (
        <Tag color={leaveType === "Paid" ? "blue" : "green"}>{leaveType}</Tag>
      ),
    },
    {
      title: "From",
      dataIndex: "leave_from",
      key: "leave_from",
      render: (date) => moment(date).format("ll"),
    },
    {
      title: "To",
      dataIndex: "leave_to",
      key: "leave_to",
      render: (date) => moment(date).format("ll"),
    },
    {
      title: "Number of Days",
      dataIndex: "no_days",
      key: "no_days",
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
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
      render: (_, record) => (
        <Space size="middle">
          <Button
            color="primary"
            className="customBtnStyle"
            onClick={() => confirmAction(record.id, "Approve")}
            variant="outlined"
          >
            Approve
          </Button>
          <Button
            className="customBtnStyle"
            onClick={() => confirmAction(record.id, "Reject")}
            variant="outlined"
            danger
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  // Fetch leave requests on component mount
  useEffect(() => {
    fetchLeavePendingRequests();
  }, [fetchLeavePendingRequests]);

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        style={{ margin: "20px" }}
      />
    );
  }

  return (
    <Card
      title="Pending Leave Requests"
      extra={
        <Button
          type="primary"
          onClick={fetchLeavePendingRequests}
          className="customBtnStyle"
        >
          Refresh
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={leaveRequests}
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
        scroll={{ x: "max-content" }}
      />
    </Card>
  );
};

export default EmpLeaveApprove;
