import { Button, message, Select, Table, Tag } from "antd";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import generatePDF from "../../../utils/PdfGenerator";
import formatINR from "../../../utils/formatINR";
import formatINRForPDF from "../../../utils/formatINRForPDF";
import useApiRequest from "../../../utils/useApiRequest";

const { Option } = Select;

const LedgerReport = () => {
  const user = useSelector((store) => store.adminSlice);
  const { loading, error, makeRequest } = useApiRequest();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalRecords: 0,
    totalPages: 1,
  });
  const [filter, setFilter] = useState("ALL");

  const fetchLedgerData = useCallback(
    async (params = {}) => {
      try {
        const response = await makeRequest({
          method: "GET",
          url: `${process.env.REACT_APP_API_URL}/admin/ledger`,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          params: {
            transType: filter === "ALL" ? undefined : filter,
            page: params.page || pagination.currentPage,
            pageSize: params.pageSize || pagination.pageSize,
            ...params,
          },
        });

        const { data: ledgerData, pagination: paginationData } = response.data;
        setData(ledgerData);
        setPagination((prev) => ({
          ...prev,
          currentPage: paginationData.currentPage,
          totalRecords: paginationData.totalRecords,
          totalPages: paginationData.totalPages,
          pageSize: paginationData.pageSize,
        }));
      } catch (error) {
        message.error("Failed to fetch ledger data");
      }
    },
    [user.token, filter, pagination.currentPage, pagination.pageSize]
  );

  const handleFilterChange = (value) => {
    setFilter(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
    fetchLedgerData({ page: 1, transType: value });
  };

  const handleTableChange = (tablePagination) => {
    // Convert Ant Design's pagination format to our API's format
    const newPagination = {
      currentPage: tablePagination.current,
      pageSize: tablePagination.pageSize,
    };

    fetchLedgerData({
      page: newPagination.currentPage,
      pageSize: newPagination.pageSize,
    });
  };

  useEffect(() => {
    fetchLedgerData();
  }, [fetchLedgerData]);

  const columns = [
    {
      title: "Transaction Date",
      dataIndex: "trans_date",
      key: "trans_date",
      render: (date) => moment(date).format("MMM-DD-YYYY"),
    },
    {
      title: "Transaction Type",
      dataIndex: "trans_type",
      key: "trans_type",
      render: (type) => (
        <Tag color={type === "INCOME" ? "green" : "red"}>{type}</Tag>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => formatINR(text),
    },
    {
      title: "Transaction Mode",
      dataIndex: "trans_mode",
      key: "trans_mode",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
    },
  ];

  const handleGeneratePDF = () => {
    const columns = [
      {
        header: "Transaction Date",
        field: "trans_date",
        format: (value) => moment(value).format("MMM DD YYYY"),
      },
      { header: "Transaction Type", field: "trans_type" },
      {
        header: "Amount",
        field: "amount",
        format: (value) => formatINRForPDF(value),
      },
      { header: "Transaction Mode", field: "trans_mode" },
      { header: "Remarks", field: "remarks" },
    ];

    generatePDF({
      title: "Company Ledger Report",
      columns,
      data,
      filename: "Company_Ledger_Report.pdf",
    });
  };

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Company Ledger</h2>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <Select
          value={filter}
          onChange={handleFilterChange}
          style={{ width: 200 }}
        >
          <Option value="ALL">All</Option>
          <Option value="INCOME">Income</Option>
          <Option value="EXPENSE">Expense</Option>
        </Select>
        <Button
          type="primary"
          onClick={() => fetchLedgerData()}
          className="customBtnStyle"
          disabled={loading}
        >
          Refresh
        </Button>
        <Button
          type="primary"
          loading={loading}
          disabled={loading}
          className="customBtnStyle"
          onClick={handleGeneratePDF}
        >
          Generate Report
        </Button>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        rowKey={(record) =>
          `${record.trans_date} +  ${record.amount} + ${Math.random()}`
        }
        pagination={{
          current: pagination.currentPage,
          pageSize: pagination.pageSize,
          total: pagination.totalRecords,
          pageSizeOptions: ["5", "10", "20", "50"],
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} transactions`,
        }}
        onChange={handleTableChange}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default LedgerReport;
