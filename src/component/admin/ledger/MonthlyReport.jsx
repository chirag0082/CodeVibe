import {
  Button,
  Card,
  Col,
  DatePicker,
  Row,
  Spin,
  Statistic,
  Table,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import formatINR from "../../../utils/formatINR";
import useApiRequest from "../../../utils/useApiRequest";
import formatINRForPDF from "../../../utils/formatINRForPDF";
import generatePDF from "../../../utils/PdfGenerator";

const MonthlyReport = () => {
  const user = useSelector((store) => store.adminSlice);
  const { loading, makeRequest } = useApiRequest();
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState(null);

  const columns = [
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "Income",
      dataIndex: "in_amount",
      key: "in_amount",
      render: (value) => (
        <span className="font-monospace">{formatINR(value)}</span>
      ),
      align: "right",
    },
    {
      title: "Expenses",
      dataIndex: "out_amount",
      key: "out_amount",
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
        header: "Month",
        field: "month",
      },
      {
        header: "Income",
        field: "in_amount",
        format: (value) => formatINRForPDF(Number(value)),
      },
      {
        header: "Expenses",
        field: "out_amount",
        format: (value) => formatINRForPDF(Number(value)),
      },
      {
        header: "Balance",
        field: "balance",
        format: (value) => formatINRForPDF(Number(value)),
      },
    ];

    generatePDF({
      title: "Company Ledger Monthly Report",
      columns,
      data: data.monthly_data,
      filename: "Company_Ledger_Monthly_Report.pdf",
    });
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await makeRequest({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/admin/ledger/monthly-report/${year}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching monthly report:", error);
    }
  }, [user.token, year]);

  useEffect(() => {
    fetchData();
  }, [fetchData, year]);

  if (!data)
    return <Spin size="large" className="d-flex justify-content-center mt-5" />;

  return (
    <div className="container-fluid py-4">
      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} lg={12}>
          <DatePicker
            className="customDateSelectStyle"
            picker="year"
            onChange={(date) => setYear(date.year())}
          />
        </Col>
        <Button
          type="primary"
          loading={loading}
          disabled={loading}
          className="customBtnStyle"
          onClick={() => handelGeneratePDF()}
        >
          Generate Report
        </Button>
      </Row>

      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Total Income"
              value={formatINR(data.totals.total_in)}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Total Expenses"
              value={formatINR(data.totals.total_out)}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Net Balance"
              value={formatINR(data.totals.net_balance)}
              valueStyle={{
                color:
                  parseFloat(data.totals.net_balance) >= 0
                    ? "#3f8600"
                    : "#cf1322",
              }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Table
          columns={columns}
          dataSource={data.monthly_data}
          rowKey="month"
          pagination={false}
          loading={loading}
          scroll={{ x: "max-content" }}
        />
      </Card>
    </div>
  );
};

export default MonthlyReport;
