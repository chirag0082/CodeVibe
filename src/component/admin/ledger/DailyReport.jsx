import { Button, Card, DatePicker, Space, Table, Tag } from "antd";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import useApiRequest from "../../../utils/useApiRequest";
import moment from "moment";
import formatINRForPDF from "../../../utils/formatINRForPDF";
import generatePDF from "../../../utils/PdfGenerator";
import formatINR from "../../../utils/formatINR";

const { RangePicker } = DatePicker;

const DailyReport = () => {
  const user = useSelector((store) => store.adminSlice);
  const { loading, error, makeRequest } = useApiRequest();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalRecords: 0,
    totalPages: 1,
  });
  const [dateRange, setDateRange] = useState([
    dayjs().startOf("month"),
    dayjs().endOf("month"),
  ]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => {
        return moment(date).format("MMM DD,YYYY");
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "INCOME" ? "green" : "red"}>{type}</Tag>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (amount) => (
        <span className="font-monospace">{formatINR(amount)}</span>
      ),
    },
    {
      title: "Opening Balance",
      dataIndex: "opening_balance",
      key: "opening_balance",
      align: "right",
      render: (balance) => (
        <span className="font-monospace">{formatINR(balance)}</span>
      ),
    },
    {
      title: "Closing Balance",
      dataIndex: "closing_balance",
      key: "closing_balance",
      align: "right",
      render: (balance) => (
        <span className="font-monospace">{formatINR(balance)}</span>
      ),
    },
    {
      title: "Payment Mode",
      dataIndex: "payment_mode",
      key: "payment_mode",
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
    },
  ];

  const fetchData = useCallback(
    async (params = {}) => {
      try {
        const [startDate, endDate] = dateRange;

        const response = await makeRequest({
          method: "GET",
          url: `${process.env.REACT_APP_API_URL}/admin/ledger/daily-report`,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          params: {
            startDate: startDate.format("YYYY-MM-DD"),
            endDate: endDate.format("YYYY-MM-DD"),
            page: params.page || pagination.currentPage,
            pageSize: params.pageSize || pagination.pageSize,
          },
        });

        const { transactions, pagination: paginationData } = response.data;

        setData(transactions);
        setPagination((prev) => ({
          ...prev,
          currentPage: paginationData.current_page,
          totalRecords: paginationData.total_records,
          totalPages: paginationData.total_pages,
          pageSize: paginationData.page_size,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    [dateRange, pagination.currentPage, pagination.pageSize]
  );

  const handelGeneratePDF = () => {
    const columns = [
      {
        header: "Date",
        field: "date",
        format: (value) => {
          return moment(value).format("MMM DD,YYYY");
        },
      },
      { header: "Type", field: "type" },
      {
        header: "Amount",
        field: "amount",
        format: (value) => formatINRForPDF(Number(value)),
      },
      {
        header: "Opening Balance",
        field: "opening_balance",
        format: (value) => formatINRForPDF(Number(value)),
      },
      {
        header: "Closing Balance",
        field: "closing_balance",
        format: (value) => formatINRForPDF(Number(value)),
      },
      { header: "Payment Mode", field: "payment_mode" },
      { header: "Remark", field: "remark" },
    ];

    generatePDF({
      title: "Company Ledger Daily Report",
      columns,
      data,
      filename: "Company_Ledger_Daily_Report.pdf",
    });
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTableChange = (tablePagination) => {
    const newPagination = {
      currentPage: tablePagination.current,
      pageSize: tablePagination.pageSize,
    };

    fetchData({
      page: newPagination.currentPage,
      pageSize: newPagination.pageSize,
    });
  };

  const handleDateRangeChange = (dates) => {
    if (dates) {
      setDateRange(dates);
      setPagination((prev) => ({ ...prev, currentPage: 1 })); // Reset to first page
    }
  };

  if (error) {
    return <div>error</div>;
  }

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <Card title="Financial Report">
            <Space direction="vertical" size="large" className="w-100">
              <div className="d-flex justify-content-start align-items-center gap-4">
                <h5 className="mb-0">Select Date Range</h5>
                <RangePicker
                  value={dateRange}
                  onChange={handleDateRangeChange}
                  format="YYYY-MM-DD"
                  allowEmpty={[false, false]}
                  className="customDateSelectStyle"
                />
                <Button
                  type="primary"
                  loading={loading}
                  disabled={loading}
                  className="customBtnStyle"
                  onClick={() => handelGeneratePDF()}
                >
                  Generate Report
                </Button>
              </div>

              <Table
                columns={columns}
                dataSource={data}
                pagination={{
                  current: pagination.currentPage,
                  pageSize: pagination.pageSize,
                  total: pagination.totalRecords,
                  pageSizeOptions: ["5", "10", "20", "50"],
                  showSizeChanger: true,
                  showTotal: (total) => `Total ${total} transactions`,
                }}
                onChange={handleTableChange}
                loading={loading}
                rowKey={(record) =>
                  `${record.date}-${record.remark}-${Date().now}-${
                    record.opening_balance
                  }`
                }
                scroll={{ x: "max-content" }}
                size="middle"
              />
            </Space>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DailyReport;
