import React, { useState } from "react";
import {
  Card,
  DatePicker,
  Table,
  Statistic,
  Row,
  Col,
  Spin,
  Button,
} from "antd";
import { DollarOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import useApiRequest from "../../../utils/useApiRequest";
import formatINRForPDF from "../../../utils/formatINRForPDF";
import generatePDF from "../../../utils/PdfGenerator";
import formatINR from "../../../utils/formatINR";

const { RangePicker } = DatePicker;

const YearlyReport = () => {
  const user = useSelector((store) => store.adminSlice);
  const { loading, makeRequest } = useApiRequest();
  const [data, setData] = useState(null);

  const columns = [
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Income",
      dataIndex: "income",
      key: "income",
      render: (value) => (
        <span className="font-monospace">{formatINR(value)}</span>
      ),
      align: "right",
    },
    {
      title: "Expenses",
      dataIndex: "expenses",
      key: "expenses",
      render: (value) => (
        <span className="font-monospace">{formatINR(value)}</span>
      ),
      align: "right",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (value) => (
        <span
          className={[
            parseFloat(value) >= 0 ? "text-success" : "text-danger",
            "font-monospace",
          ].join(" ")}
        >
          {formatINR(value)}
        </span>
      ),
      align: "right",
    },
  ];

  const handelGeneratePDF = () => {
    const columns = [
      {
        header: "Year",
        field: "year",
      },
      {
        header: "Income",
        field: "income",
        format: (value) => formatINRForPDF(Number(value)),
      },
      {
        header: "Expenses",
        field: "expenses",
        format: (value) => formatINRForPDF(Number(value)),
      },
      {
        header: "Balance",
        field: "balance",
        format: (value) => formatINRForPDF(Number(value)),
      },
    ];

    generatePDF({
      title: "Company Ledger Yearly Report",
      columns,
      data: data.yearly_data,
      filename: "Company_Ledger_Yearly_Report.pdf",
    });
  };

  const handleDateRangeChange = async (dates) => {
    if (!dates || dates.length !== 2) return;

    try {
      const [start, end] = dates;

      const startDate = start.startOf("year");
      const endDate = end.endOf("year");

      const response = await makeRequest({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/admin/ledger/yearly-report`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: {
          startDate: startDate.format("YYYY-MM-DD"),
          endDate: endDate.format("YYYY-MM-DD"),
        },
      });

      setData(response.data);
    } catch (error) {
      console.error("Error fetching yearly report:", error);
    }
  };

  return (
    <div className="container-fluid py-4">
      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} lg={12} className="">
          <RangePicker
            onChange={handleDateRangeChange}
            picker="year"
            format="YYYY"
            className="customDateSelectStyle"
          />
          <Button
            type="primary"
            loading={loading}
            disabled={loading}
            className="customBtnStyle mx-2"
            onClick={() => handelGeneratePDF()}
          >
            Generate Report
          </Button>
        </Col>
      </Row>

      {data && (
        <>
          <Row gutter={[16, 16]} className="mb-4">
            <Col xs={24} md={8}>
              <Card>
                <Statistic
                  title="Total Income"
                  value={formatINR(data.totals.total_income)}
                  prefix={<DollarOutlined />}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <Statistic
                  title="Total Expenses"
                  value={formatINR(data.totals.total_expenses)}
                  prefix={<DollarOutlined />}
                  valueStyle={{ color: "#cf1322" }}
                />
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <Statistic
                  title="Net Balance"
                  value={formatINR(data.totals.net_balance)}
                  prefix={<DollarOutlined />}
                  valueStyle={{
                    color:
                      !data.totals.net_balance >= 0 ? "#3f8600" : "#cf1322",
                  }}
                />
              </Card>
            </Col>
          </Row>

          <Card>
            <div className="mb-3">
              <strong>Period:</strong> {data.totals.period}
            </div>
            <Table
              columns={columns}
              dataSource={data.yearly_data}
              rowKey="year"
              pagination={false}
              loading={loading}
              scroll={{ x: "max-content" }}
            />
          </Card>
        </>
      )}

      {!data && !loading && (
        <Card>
          <div className="text-center py-5">
            Please select a year range to view the report
          </div>
        </Card>
      )}

      {loading && (
        <Spin size="large" className="d-flex justify-content-center mt-5" />
      )}
    </div>
  );
};

export default YearlyReport;
