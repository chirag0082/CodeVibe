import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import {
  Alert,
  Avatar,
  Button,
  Modal,
  Spin,
  Table,
  Tag,
  Typography,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import useApiRequest from "../../../utils/useApiRequest";
import EmployeeDetailModal from "./EmployeeDetailModal";

const { Text } = Typography;

const EmpList = ({ onEditEmployee }) => {
  const { loading, error, makeRequest } = useApiRequest();

  const user = useSelector((store) => store.adminSlice);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [resignationModalVisible, setResignationModalVisible] = useState(false);
  const [resignationDate, setResignationDate] = useState(new Date());
  const [employeeToResign, setEmployeeToResign] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await makeRequest({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/admin/employ`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: {
          page: pagination.current,
          limit: pagination.pageSize,
        },
      });

      const { data, pagination: apiPagination } = response.data;
      setEmployees(data);
      setPagination({
        current: apiPagination.currentPage,
        pageSize: apiPagination.pageSize,
        total: apiPagination.totalCount,
      });
    } catch (err) {
      console.error("Failed to fetch employees.");
    }
  }, [user.token, pagination.current, pagination.pageSize]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const handleResignEmployee = async () => {
    if (!employeeToResign || !resignationDate) return;

    try {
      await makeRequest({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/admin/employ/resign`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          empId: employeeToResign.emp_id,
          resignDate: resignationDate.toISOString(),
        },
      });

      fetchEmployees(pagination.current, pagination.pageSize);
      setResignationModalVisible(false);
      setEmployeeToResign(null);
      setResignationDate(new Date());
    } catch (err) {
      console.error("Error resigning employee:", err);
    }
  };

  const showResignationModal = (employee) => {
    setEmployeeToResign(employee);
    setResignationDate(new Date());
    setResignationModalVisible(true);
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
        <Button
          color="primary"
          variant="solid"
          className="customBtnStyle"
          onClick={() => setSelectedEmployee(record)}
        >
          View Details
        </Button>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      render: (_, record) => (
        <Button
          color="primary"
          variant="solid"
          className="customBtnStyle"
          onClick={() => onEditEmployee(record)}
        >
          Edit Details
        </Button>
      ),
    },
    {
      title: "Resign",
      key: "resign",
      render: (_, record) => (
        <Button
          className="customBtnStyle"
          danger
          disabled={record.resign_date}
          onClick={() => showResignationModal(record)}
        >
          Resign
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
          pageSizeOptions: ["5", "10", "20", "50"],
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} leaves`,
        }}
        onChange={handleTableChange}
        rowKey="emp_id"
        scroll={{ x: "max-content" }}
      />
      <EmployeeDetailModal
        employee={selectedEmployee}
        visible={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      />
      <Modal
        title={`Resign ${employeeToResign?.emp_name}`}
        open={resignationModalVisible}
        onOk={handleResignEmployee}
        onCancel={() => {
          setResignationModalVisible(false);
          setEmployeeToResign(null);
          setResignationDate(new Date());
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <Text>Select Resignation Date:</Text>
        </div>
        <DatePicker
          selected={resignationDate}
          onChange={(date) => setResignationDate(date)}
          className="form-control"
          dateFormat="MMM-dd-yyyy"
          style={{ width: "100%" }}
        />
      </Modal>
    </>
  );
};

export default EmpList;
