import {
  Button,
  Card,
  DatePicker,
  Select,
  Space,
  Table,
  Typography,
  message,
} from "antd";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import generatePDF from "../../utils/PdfGenerator";
import useApiRequest from "../../utils/useApiRequest";
import formatINRForPDF from "../../utils/formatINRForPDF";
import formatINR from "../../utils/formatINR";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const EmpSalaryReport = () => {
  const user = useSelector((store) => store.adminSlice);
  const { loading, makeRequest } = useApiRequest();
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState(null);
  const [employees, setEmployees] = useState([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "emp_name",
      key: "emp_name",
      className: "p-2 border text-center",
    },
    {
      title: "Emp Code",
      dataIndex: "emp_code",
      key: "emp_code",
      className: "p-2 border text-center",
    },
    {
      title: "Salary Month",
      dataIndex: "salary_month",
      key: "salary_month",
      className: "p-2 border text-center",
      render: (date) => {
        return moment(date).format("MMM YYYY");
      },
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
      title: "Unpaid Leave",
      dataIndex: "unpaid_leave",
      key: "unpaid_leave",
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

  const fetchPayrollData = async (fromDate, toDate, empId = null) => {
    if (!fromDate || !toDate) {
      setData([]);
      return;
    }

    try {
      const response = await makeRequest({
        url: `${process.env.REACT_APP_API_URL}/admin/employ/report`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: {
          fromMonth: fromDate,
          toMonth: toDate,
          empId: empId,
        },
      });

      setData(response.data.data);
    } catch (error) {
      setData([]);
      console.error("Error fetching data:", error);
      message.error("Failed to fetch payroll data");
    }
  };

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
        setEmployees([]);
        message.error("Failed to fetch employees");
      }
    },
    [user.token]
  );

  const handleRangeChange = (dates, dateStrings) => {
    if (!dates) {
      setDateRange(null);
      setData([]);
      return;
    }

    setDateRange(dates);

    const startMoment = moment(dateStrings[0], "YYYY-MMM");
    const endMoment = moment(dateStrings[1], "YYYY-MMM");

    const fromDate = startMoment.startOf("month").format("YYYY-MM-DD");
    const toDate = endMoment.endOf("month").format("YYYY-MM-DD");

    fetchPayrollData(fromDate, toDate);
  };

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleEmployeeSelect = (value) => {
    if (dateRange) {
      const fromMonth = dateRange[0].startOf("month").format("YYYY-MM-DD");
      const toMonth = dateRange[1].startOf("month").format("YYYY-MM-DD");

      fetchPayrollData(fromMonth, toMonth, value);
    }
  };

  const handelGeneratePDF = () => {
    const columns = [
      { header: "Name", field: "emp_name" },
      { header: "Code", field: "emp_code" },
      {
        header: "Salary Month",
        field: "salary_month",
        format: (value) =>
          new Date(value).toLocaleDateString("en-GB", {
            month: "short",
            year: "numeric",
          }),
      },
      { header: "Month Days", field: "month_days" },
      { header: "Work Days", field: "work_days" },
      { header: "Paid Leave", field: "paid_leave" },
      { header: "Unpaid Leave", field: "unpaid_leave" },
      { header: "Paid Days", field: "paid_days" },
      {
        header: "Salary",
        field: "salary",
        format: (value) => formatINRForPDF(value),
      },
      {
        header: "Gross Salary",
        field: "gross_salary",
        format: (value) => formatINRForPDF(value),
      },
      {
        header: "Deduction",
        field: "deduction",
        format: (value) => formatINRForPDF(value),
      },
      {
        header: "Net Salary",
        field: "net_salary",
        format: (value) => formatINRForPDF(value),
      },
    ];

    generatePDF({
      title: "Employee Salary Report",
      columns,
      data,
      filename: "Employee_Salary_Report.pdf",
    });
  };

  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title level={3}>Employee Salary Report</Title>

          <Space>
            <Select
              showSearch
              style={{ width: 250 }}
              placeholder="Select an employee"
              optionFilterProp="children"
              onChange={handleEmployeeSelect}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              allowClear
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
            <RangePicker
              picker="month"
              value={dateRange}
              onChange={handleRangeChange}
              format="YYYY-MMM"
              allowEmpty={[false, false]}
              className="customDateSelectStyle"
            />
            <Button
              type="primary"
              loading={loading}
              disabled={!dateRange}
              className="customBtnStyle"
              onClick={() => handelGeneratePDF()}
            >
              Generate Report
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey={(record) => `${record.emp_id}-${record.id}`}
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
                  <Table.Summary.Cell index={0} colSpan={9}>
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

export default EmpSalaryReport;
