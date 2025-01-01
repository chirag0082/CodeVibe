import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import styles from "../../../css/admin/CompanyLedger.module.css";
import useApiRequest from "../../../utils/useApiRequest";
import formatINR from "../../../utils/formatINR";

const { Option } = Select;

const LedgerManagement = () => {
  const user = useSelector((store) => store.adminSlice);
  const { loading, makeRequest } = useApiRequest();
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    totalPages: 1,
  });

  // Fetch all ledger entries
  const fetchLedgerData = useCallback(async () => {
    try {
      const response = await makeRequest({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/admin/ledger`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: {
          transType: undefined,
          page: pagination.current,
          pageSize: pagination.pageSize,
        },
      });

      setData(response.data.data);

      setPagination((prev) => ({
        ...prev,
        total: response.data.pagination.totalRecords,
        current: response.data.pagination.currentPage,
        pageSize: response.data.pagination.pageSize,
        totalPages: response.data.pagination.totalPages,
      }));
    } catch (error) {
      message.error("Failed to fetch ledger data");
      console.error(error);
    }
  }, [user.tokens, pagination.current, pagination.pageSize]);

  useEffect(() => {
    fetchLedgerData();
  }, [fetchLedgerData]);

  const handleTableChange = (pagination) => {
    setPagination((prev) => ({
      ...prev,
      current: pagination.current,
      pageSize: pagination.pageSize,
    }));
  };

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        transDate: moment(selectedDate).format("YYYY-MM-DD"),
        id: editingRecord?.id,
      };

      const response = await makeRequest({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/admin/ledger`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        data: payload,
      });

      message.success(response.message);
      form.resetFields();
      setSelectedDate(new Date());
      setEditingRecord(null);
      setSelectedDate(null);
      fetchLedgerData();
    } catch (error) {
      message.error("Failed to save ledger entry");
      console.error(error);
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setSelectedDate(new Date(record.trans_date));
    form.setFieldsValue({
      transType: record.trans_type,
      amount: record.amount,
      remarks: record.remarks,
      transMode: record.trans_mode,
    });
  };

  const handleDelete = async (id) => {
    const response = await makeRequest({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}/admin/ledger/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    message.success(response.message);
    fetchLedgerData();
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "trans_date",
      key: "trans_date",
      render: (text) => moment(text).format("ll"),
    },
    {
      title: "Type",
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
      title: "Mode",
      dataIndex: "trans_mode",
      key: "trans_mode",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            gap: 12,
          }}
        >
          <Button
            color="primary"
            variant="outlined"
            className="customBtnStyle"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button color="primary" className="customBtnStyle" danger>
              Delete
            </Button>{" "}
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Card className={styles.formCard}>
        <h1 className={styles.title}>Transaction Management</h1>

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className={styles.form}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                label="Transaction Date"
                required
                className={styles.formItem}
              >
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="ant-input"
                  dateFormat="MMM-dd-yyyy"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Form.Item
                name="transType"
                label="Transaction Type"
                rules={[{ required: true, message: "Please select type" }]}
                className={styles.formItem}
              >
                <Select className={styles.select}>
                  <Option value="INCOME">Income</Option>
                  <Option value="EXPENSE">Expense</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Form.Item
                name="amount"
                label="Amount"
                rules={[{ required: true, message: "Please enter amount" }]}
                className={styles.formItem}
              >
                <InputNumber
                  className={styles.inputNumber}
                  min={1}
                  formatter={(value) =>
                    `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/₹\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Form.Item
                name="transMode"
                label="Transaction Mode"
                className={styles.formItem}
              >
                <Select className={styles.select}>
                  <Option value="CASH">Cash</Option>
                  <Option value="BANK">Bank</Option>
                  <Option value="UPI">UPI</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                name="remarks"
                label="Remarks"
                className={`${styles.formItem} ${styles.remarksItem}`}
              >
                <Input.TextArea rows={4} className={styles.textarea} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className={styles.buttonGroup}>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="customBtnStyle"
              >
                {editingRecord ? "Update" : "Save"}
              </Button>
              {editingRecord && (
                <Button
                  onClick={() => {
                    form.resetFields();
                    setSelectedDate(null);
                    setEditingRecord(null);
                  }}
                  className="customBtnStyle"
                >
                  Cancel
                </Button>
              )}
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card className={styles.tableCard}>
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record) =>
            `${record.trans_date} +  ${record.amount} + ${Math.random()}`
          }
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
          }}
          loading={loading}
          onChange={handleTableChange}
          scroll={{ x: "max-content" }}
        />
      </Card>
    </div>
  );
};

export default LedgerManagement;
