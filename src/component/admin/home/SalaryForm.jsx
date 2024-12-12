import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Card,
  Table,
  message,
  Row,
  Col,
  Button,
} from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";

const SalaryForm = () => {
  const [form] = Form.useForm();
  const user = useSelector((store) => store.adminSlice);

  const [employees, setEmployees] = useState([]);
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [effectiveDate, setEffectiveDate] = useState(null);

  const fetchEmployees = async (searchTerm = "") => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/employ`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          params: {
            page: 1,
            limit: 100,
            search: searchTerm,
          },
        }
      );

      setEmployees(
        Array.isArray(response.data.data.data) ? response.data.data.data : []
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setEmployees([]);
      message.error("Failed to fetch employees");
    }
  };

  const fetchSalaryRecords = async (empId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/employ/salary/user/${empId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSalaryRecords(response.data.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
      setLoading(true);

      const values = await form.validateFields();

      const payload = {
        empId: values.empId,
        salary: parseFloat(values.salary),
        effectiveDate: moment(effectiveDate)
          .startOf("month")
          .format("YYYY-MM-DD"),

        ...(isEditing && { salaryId: values.salaryId }),
      };
      console.log("payload::: ", payload);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/employ/salary`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      message.success(
        isEditing
          ? "Salary record updated successfully"
          : "Salary record created successfully"
      );

      if (selectedEmployee) {
        fetchSalaryRecords(selectedEmployee.emp_id);
      }

      form.resetFields();
      setEffectiveDate(null);
      setIsEditing(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error(
        error.response?.data?.message || "Failed to save salary record"
      );
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
  };

  const columns = [
    // {
    //   title: "Salary ID",
    //   dataIndex: "salary_id",
    //   key: "salary_id",
    // },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      render: (text) => `₹${parseFloat(text).toFixed(2)}`,
    },
    {
      title: "Effective Date",
      dataIndex: "effective_date",
      key: "effective_date",
      render: (text) => moment(text).format("YYYY-MM"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button type="link" onClick={() => handleEditRecord(record)}>
          Edit
        </Button>
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
                  required: true,
                  message: "Please select effective date",
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
                  dateFormat="yyyy MMM"
                  showMonthYearPicker
                  placeholderText="Select Month and Year"
                  customInput={
                    <Input
                      style={{ width: "100%" }}
                      value={
                        effectiveDate
                          ? moment(effectiveDate).format("YYYY-MM")
                          : ""
                      }
                    />
                  }
                />
              </div>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                {isEditing ? "Update Salary" : "Create Salary"}
              </Button>
              {isEditing && (
                <Button
                  onClick={() => {
                    form.resetFields();
                    setIsEditing(false);
                    setEffectiveDate(null);
                  }}
                  style={{ marginLeft: 8 }}
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
              />
            </Card>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default SalaryForm;
