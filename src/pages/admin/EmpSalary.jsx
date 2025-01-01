import {
  Button,
  Card,
  Col,
  DatePicker,
  message,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import useApiRequest from "../../utils/useApiRequest";
import formatINR from "../../utils/formatINR";

const { Title } = Typography;

const EmpSalary = () => {
  const user = useSelector((store) => store.adminSlice);
  const { loading, makeRequest } = useApiRequest();
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const columns = [
    {
      title: "Name",
      dataIndex: "emp_name",
      key: "emp_name",
      className: "p-2 border text-center",
    },
    {
      title: "Month Days",
      dataIndex: "month_days",
      key: "month_days",
      className: "p-2 border text-center",
    },
    {
      title: "Work Days",
      dataIndex: "work_days",
      key: "work_days",
      className: "p-2 border text-center",
    },
    {
      title: "Paid Leave",
      dataIndex: "paid_leave",
      key: "paid_leave",
      className: "p-2 border text-center",
    },
    {
      title: "Unpaid Days",
      dataIndex: "unpaid_days",
      key: "unpaid_days",
      className: "p-2 border text-center",
    },
    {
      title: "Paid Days",
      dataIndex: "paid_days",
      key: "paid_days",
      className: "p-2 border text-center",
    },
    {
      title: "Base Salary",
      dataIndex: "salary",
      key: "salary",
      className: "p-2 border text-right",
      render: (value) => formatINR(value),
    },
    {
      title: "Gross Salary",
      dataIndex: "gross_salary",
      key: "gross_salary",
      className: "p-2 border text-right",
      render: (value) => formatINR(value),
    },
    {
      title: "Deductions",
      dataIndex: "deduction",
      key: "deduction",
      className: "p-2 border text-right",
      render: (value) => formatINR(value),
    },
    {
      title: "Net Salary",
      dataIndex: "net_salary",
      key: "net_salary",
      className: "p-2 border text-right",
      render: (value) => formatINR(value),
    },
  ];

  const fetchPayrollData = async (page = 1, month = new Date()) => {
    if (!month) {
      setData([]);
      return;
    }

    try {
      const response = await makeRequest({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/admin/employ/payroll`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: { month: month },
      });

      setData(response.data.data);
    } catch (error) {
      message.error("Failed to fetch payroll data");
      console.error("Error:", error);
      setData([]);
    }
  };

  const handleCalculatePayroll = async () => {
    if (!selectedMonth) {
      message.warning("Please select a month first");
      return;
    }

    try {
      const firstDateOfMonth = selectedMonth.clone().startOf("month");
      const hasInvalidSalary = data.some((dataItem) => dataItem.salary <= 0);

      if (hasInvalidSalary) {
        data.forEach((dataItem) => {
          if (dataItem.salary <= 0) {
            alert(
              `Base salary for ${dataItem.emp_name} is less than or equal to 0 please add salary`
            );
          }
        });
        return;
      }

      await makeRequest({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/admin/employ/payroll`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          salaryMonth: firstDateOfMonth.format("YYYY-MM-DD"),
        },
      });

      message.success("Payroll calculated and saved successfully");
      fetchPayrollData(1, selectedMonth.format("YYYY-MM-DD"));
    } catch (error) {
      message.error("Failed to calculate payroll");
      console.error("Error:", error);
    }
  };

  const handleTableChange = (pagination) => {
    fetchPayrollData(pagination.current, selectedMonth?.format("YYYY-MM-DD"));
  };

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
    if (date) {
      const firstDateOfMonth = date.clone().startOf("month");
      fetchPayrollData(1, firstDateOfMonth.format("YYYY-MM-DD"));
    } else {
      setData([]);
    }
  };

  return (
    <Card className="employee-salary-card">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={16} md={12} lg={10}>
            <Title level={3}>Employee Salary Management</Title>
          </Col>

          <Col xs={24} sm={8} md={12} lg={14} style={{ textAlign: "right" }}>
            <Space>
              <DatePicker
                picker="month"
                value={selectedMonth}
                onChange={handleMonthChange}
                placeholder="Select Month"
                style={{ width: 150 }}
                format="YYYY MMM"
                className="customDateSelectStyle"
              />
              <Button
                type="primary"
                onClick={handleCalculatePayroll}
                loading={loading}
                disabled={!selectedMonth}
                className="customBtnStyle"
              >
                Calculate & Save Payroll
              </Button>
            </Space>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={data}
          onChange={handleTableChange}
          loading={loading}
          rowKey="emp_id"
          scroll={{ x: "max-content" }}
          pagination={false}
          summary={(pageData) => {
            const totalGrossSalary = pageData.reduce(
              (sum, row) => sum + (row.gross_salary || 0),
              0
            );
            const totalDeductions = pageData.reduce(
              (sum, row) => sum + (row.deduction || 0),
              0
            );
            const totalNetSalary = totalGrossSalary - totalDeductions;

            return (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={7}>
                    Total
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={7} className="text-right">
                    {formatINR(totalGrossSalary)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={8} className="text-right">
                    {formatINR(totalDeductions)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={9} className="text-right">
                    {formatINR(totalNetSalary)}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            );
          }}
        />
      </Space>
    </Card>
  );
};

export default EmpSalary;
