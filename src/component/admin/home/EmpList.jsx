import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Avatar, Button, Spin, Table, Tag, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EmployeeDetailModal from "./EmployeeDetailModal";
import { useSelector } from "react-redux";

const { Text } = Typography;

const CompactEmployeeList = ({ onEditEmployee }) => {
  const user = useSelector((store) => store.adminSlice);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchEmployees = async (page, pageSize) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/employ`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
        {
          params: {
            page: page,
            limit: pageSize,
          },
        }
      );

      const { data, pagination: apiPagination } = response.data.data;
      setEmployees(data);
      setPagination({
        current: apiPagination.currentPage,
        pageSize: apiPagination.pageSize,
        total: apiPagination.totalCount,
      });
    } catch (err) {
      setError("Failed to fetch employees. Please try again.");
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(pagination.current, pagination.pageSize);
  }, []);

  const handleTableChange = (newPagination) => {
    fetchEmployees(newPagination.current, newPagination.pageSize);
  };

  const columns = [
    {
      title: "Employee",
      dataIndex: "emp_name",
      key: "emp_name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={record.emp_photo ? record.emp_photo : null}
            icon={!record.emp_photo ? <UserOutlined /> : null}
            style={{
              marginRight: 10,
              backgroundColor: record.resign_date ? "#ff4d4f" : "#52c41a",
            }}
          />
          <div>
            <div>{text}</div>
            <Text type="secondary" style={{ fontSize: "0.8em" }}>
              {record.emp_code}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: "Contact",
      key: "contact",
      render: (_, record) => (
        <div>
          <div>
            <MailOutlined style={{ marginRight: 5 }} />
            {record.email_add}
          </div>
          <div>
            <PhoneOutlined style={{ marginRight: 5 }} />
            {record.mobile_no}
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag color={record.resign_date ? "error" : "success"}>
          {record.resign_date ? "Resigned" : "Active"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => setSelectedEmployee(record)}>
          View Details
        </Button>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      render: (_, record) => (
        <Button type="link" onClick={() => onEditEmployee(record)}>
          Edit Details
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" tip="Loading...">
          <div style={{ height: "1px", width: "1px" }}></div>
        </Spin>
      </div>
    );
  }

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
    <>
      <Table
        columns={columns}
        dataSource={employees}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        onChange={handleTableChange}
        rowKey="emp_id"
      />
      <EmployeeDetailModal
        employee={selectedEmployee}
        visible={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      />
    </>
  );
};

export default CompactEmployeeList;
