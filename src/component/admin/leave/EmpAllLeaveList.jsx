import {
  Button,
  Card,
  message,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useApiRequest from "../../../utils/useApiRequest";
import moment from "moment";

const EmpAllLeaveList = () => {
  const { loading, makeRequest } = useApiRequest();
  const [leaveList, setLeaveList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const user = useSelector((store) => store.adminSlice);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "emp_name",
      key: "emp_name",
      render: (text) => text || "N/A",
    },
    {
      title: "Leave From",
      dataIndex: "leave_from",
      key: "leave_from",
      render: (date) => (date ? moment(date).format("ll") : "N/A"),
    },
    {
      title: "Leave To",
      dataIndex: "leave_to",
      key: "leave_to",
      render: (date) => (date ? moment(date).format("ll") : "N/A"),
    },
    {
      title: "Number of Days",
      dataIndex: "no_days",
      key: "no_days",
      render: (days) => days || "0",
    },
    {
      title: "Leave Type",
      dataIndex: "leave_type",
      key: "leave_type",
      render: (type) => (
        <Tag
          color={
            type === "Paid"
              ? "blue"
              : type === "Sick"
              ? "red"
              : type === "Unpaid"
              ? "green"
              : "gray"
          }
        >
          {type}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "leave_status",
      key: "leave_status",
      render: (status) => {
        const statusColors = {
          Approve: "green",
          Pending: "orange",
          Reject: "red",
          Canceled: "purple",
        };
        return (
          <Tag style={{ color: statusColors[status] || "default" }}>
            {status === "Approve"
              ? "Approved"
              : status === "Reject"
              ? "Rejected"
              : status || "Unknown"}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure you want to delete this leave request?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="customBtnStyle" danger size="large">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchLeaveList = useCallback(
    async (params = {}) => {
      try {
        const response = await makeRequest({
          method: "GET",
          url: `${process.env.REACT_APP_API_URL}/admin/employ/leave`,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          params: {
            page: pagination.current,
            limit: pagination.pageSize,
            emp_id: selectedEmployeeId,
            ...params,
          },
        });

        const { data, total } = response.data;
        setLeaveList(data || []);
        setPagination((prev) => ({
          ...prev,
          total: total || 0,
        }));
      } catch (error) {
        message.error(
          error.response?.data?.message || "Failed to fetch leave history"
        );
        setLeaveList([]);
      }
    },
    [user.token, selectedEmployeeId, pagination.current, pagination.pageSize]
  );

  const fetchEmployees = useCallback(
    async (searchTerm = "") => {
      try {
        const response = await makeRequest({
          method: "GET",
          url: `${process.env.REACT_APP_API_URL}/admin/employ`,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          params: {
            page: 1,
            limit: 100,
            search: searchTerm,
          },
        });

        setEmployees(
          Array.isArray(response.data.data) ? response.data.data : []
        );
      } catch (error) {
        message.error("Failed to fetch employees");
        setEmployees([]);
      }
    },
    [user.token]
  );

  const handleDelete = async (id) => {
    try {
      await makeRequest({
        method: "DELETE",
        url: `${process.env.REACT_APP_API_URL}/admin/employ/leave/${id}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      message.success("Leave request deleted successfully");
      fetchLeaveList();
    } catch (error) {
      message.error("Error deleting leave request");
    }
  };

  useEffect(() => {
    fetchLeaveList();
  }, [fetchLeaveList]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const handleEmployeeSelect = (value) => {
    setSelectedEmployeeId(value); // Now directly storing the employee ID
    fetchLeaveList({ emp_id: value }); // Using emp_id in the request
  };

  return (
    <Card
      title="Employee Leave Management"
      extra={
        <Space>
          <Select
            showSearch
            style={{ width: 250 }}
            placeholder="Search Employee"
            optionFilterProp="children"
            onChange={handleEmployeeSelect}
            allowClear
            value={selectedEmployeeId}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          >
            {employees.map((emp) => (
              <Select.Option
                key={emp.emp_id}
                value={emp.emp_id}
                label={emp.emp_name}
              >
                {emp.emp_name}
              </Select.Option>
            ))}
          </Select>
        </Space>
      }
    >
      <Table
        columns={columns}
        dataSource={leaveList}
        rowKey="id"
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          pageSizeOptions: ["5", "10", "20", "50"],
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} leaves`,
        }}
        onChange={handleTableChange}
        scroll={{ x: "max-content" }}
      />
    </Card>
  );
};

export default EmpAllLeaveList;
