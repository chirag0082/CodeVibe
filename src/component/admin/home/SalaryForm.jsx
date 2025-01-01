import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Popconfirm,
  Row,
  Select,
  Table,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import useApiRequest from "../../../utils/useApiRequest";
import formatINR from "../../../utils/formatINR";

const SalaryForm = () => {
  const { loading, makeRequest } = useApiRequest();
  const user = useSelector((store) => store.adminSlice);

  const [form] = Form.useForm();
  const [employees, setEmployees] = useState([]);
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [effectiveDate, setEffectiveDate] = useState(null);
  const [originalEffectiveDate, setOriginalEffectiveDate] = useState(null);

  const fetchEmployees = async (searchTerm = "") => {
    try {
      const response = await makeRequest({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/admin/employ/only`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setEmployees(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      setEmployees([]);
      message.error("Failed to fetch employees");
    }
  };

  const fetchSalaryRecords = async (empId) => {
    try {
      const response = await makeRequest({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/admin/employ/salary/user/${empId}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setSalaryRecords(response.data.data);
    } catch (error) {
      message.error("Failed to fetch salary records");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEmployeeSelect = (value) => {
    const employee = employees.find((emp) => emp.emp_id === value);
    setSelectedEmployee(employee);

    fetchSalaryRecords(value);

    form.setFieldsValue({
      empId: employee.emp_id,
      empName: employee.emp_name,
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        empId: values.empId,
        salary: parseFloat(values.salary),
        effectiveDate: moment(effectiveDate || originalEffectiveDate)
          .startOf("month")
          .format("YYYY-MM-DD"),

        ...(isEditing && { salaryId: values.salaryId }),
      };

      const response = await makeRequest({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/admin/employ/salary`,
        data: payload,
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      if (selectedEmployee) {
        fetchSalaryRecords(selectedEmployee.emp_id);
      }

      message.success(response.message);
      form.resetFields();
      setEffectiveDate(null);
      setOriginalEffectiveDate(null);
      setIsEditing(false);
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to save salary record"
      );
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      const response = await makeRequest({
        method: "DELETE",
        url: `${process.env.REACT_APP_API_URL}/admin/employ/salary/${id}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      message.success(response.message ?? "Salary record deleted successfully");
      fetchSalaryRecords(selectedEmployee.emp_id);
      form.resetFields();
      setEffectiveDate(null);
      setOriginalEffectiveDate(null);
      setIsEditing(false);
    } catch (error) {
      console.error("error::: ", error);
    }
  };

  const handleEditRecord = (record) => {
    setIsEditing(true);
    const effectiveDate = moment(record.effective_date).toDate();

    form.setFieldsValue({
      salaryId: record.salary_id,
      empId: selectedEmployee.emp_id,
      empName: selectedEmployee.emp_name,
      salary: record.salary,
    });

    setEffectiveDate(effectiveDate);
    setOriginalEffectiveDate(effectiveDate);
  };

  const columns = [
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      render: (text) => formatINR(text),
    },
    {
      title: "Effective Date",
      dataIndex: "effective_date",
      key: "effective_date",
      render: (text) => moment(text).format("YYYY-MMM"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div style={{ display: "flex", gap: 5 }}>
          <Button
            onClick={() => handleEditRecord(record)}
            className="customBtnStyle"
            color="primary"
            variant="outlined"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => handleDeleteRecord(record.salary_id)}
            okText="Yes"
            cancelText="No"
          >
            <Button color="danger" variant="solid" className="customBtnStyle">
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Card title="Salary Management" loading={loading}>
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="salaryId" style={{ display: "none" }}>
              <Input />
            </Form.Item>

            <Form.Item
              name="empId"
              label="Select Employee"
              rules={[{ required: true, message: "Please select an employee" }]}
            >
              <Select
                showSearch
                placeholder="Search employee by name or ID"
                optionFilterProp="children"
                onChange={handleEmployeeSelect}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {Array.isArray(employees) &&
                  employees.map((emp) => (
                    <Select.Option
                      key={emp.emp_id}
                      value={emp.emp_id}
                      label={`${emp.emp_name}`}
                    >
                      {emp.emp_name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item name="empName" label="Employee Name">
              <Input disabled />
            </Form.Item>

            <Form.Item
              name="salary"
              label="Salary"
              rules={[
                { required: true, message: "Please input salary" },
                {
                  validator: (_, value) =>
                    value > 0
                      ? Promise.resolve()
                      : Promise.reject("Salary must be a positive number"),
                },
              ]}
            >
              <Input
                type="number"
                prefix="₹"
                step="0.01"
                placeholder="Enter salary"
              />
            </Form.Item>

            <Form.Item
              name="effectiveDate"
              label="Effective Date"
              rules={[
                {
                  validator: (_, value) => {
                    // Allow submission if already editing and no new date is selected
                    if (isEditing && (effectiveDate || originalEffectiveDate)) {
                      return Promise.resolve();
                    }

                    // Otherwise, require a date
                    return value || effectiveDate || originalEffectiveDate
                      ? Promise.resolve()
                      : Promise.reject("Please select effective date");
                  },
                },
              ]}
            >
              <div>
                <DatePicker
                  selected={effectiveDate}
                  onChange={(date) => {
                    setEffectiveDate(date);
                    form.setFieldsValue({
                      effectiveDate: date
                        ? moment(date).format("YYYY MMM")
                        : "",
                    });
                  }}
                  dateFormat="yyyy-MMM"
                  showMonthYearPicker
                  placeholderText="Select Month and Year"
                  customInput={
                    <Input
                      style={{ width: "100%" }}
                      value={
                        effectiveDate
                          ? moment(effectiveDate).format("YYYY-MM")
                          : isEditing && originalEffectiveDate
                          ? moment(originalEffectiveDate).format("YYYY-MM")
                          : ""
                      }
                    />
                  }
                />
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="customBtnStyle"
              >
                {isEditing ? "Update Salary" : "Create Salary"}
              </Button>
              {isEditing && (
                <Button
                  onClick={() => {
                    form.resetFields();
                    setIsEditing(false);
                    setEffectiveDate(null);
                    setOriginalEffectiveDate(null);
                  }}
                  style={{ marginLeft: 8 }}
                  className="customBtnStyle"
                >
                  Cancel
                </Button>
              )}
            </Form.Item>
          </Form>
        </Col>

        <Col xs={24} md={12}>
          {selectedEmployee && (
            <Card
              title={`Salary Records for ${selectedEmployee.emp_name}`}
              loading={loading}
            >
              <Table
                dataSource={salaryRecords}
                columns={columns}
                rowKey="salary_id"
                pagination={{
                  pageSize: 5,
                  showSizeChanger: false,
                }}
                locale={{
                  emptyText: "No salary records found",
                }}
                scroll={{ x: "max-content" }}
              />
            </Card>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default SalaryForm;
