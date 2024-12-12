import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  message,
  Row,
  Col,
  Card,
  Modal,
} from "antd";
import {
  UploadOutlined,
  CopyOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import styles from "../../../css/admin/EmployeeRegistration.module.css";
import uploadImageToFirebase from "../../../utils/uploadImageToFirebase";
import { useSelector } from "react-redux";

const EmployeeRegistration = ({ empData, setSide }) => {
  const user = useSelector((store) => store.adminSlice);

  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    emp_id: "",
    empCode: "",
    empName: "",
    birthDate: null,
    gender: "",
    education: "",
    presentAdd: "",
    permanentAdd: "",
    experience: "",
    mobileNo: "",
    alternetNo: "",
    emailAdd: "",
    joinDate: null,
    resignDate: null,
    paidLeave: "",
    panNo: "",
    aadharNo: "",
    userName: "",
    userPassword: "",
    panPhoto: null,
    aadharFront: null,
    aadharBack: null,
    residentProof: null,
    empPhoto: null,
  });

  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [birthDate, setBirthDate] = useState(null);
  const [joinDate, setJoinDate] = useState(null);

  const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const aadharPattern = /^[2-9]{1}[0-9]{11}$/;

  useEffect(() => {
    if (empData) {
      setIsEditMode(true);

      const mappedObj = {
        empCode: empData.emp_code,
        empName: empData.emp_name,
        gender: empData.gender,
        education: empData.education,
        presentAdd: empData.present_add,
        permanentAdd: empData.permanent_add,
        experience: empData.experience,
        mobileNo: empData.mobile_no,
        alternetNo: empData.alternet_no,
        emailAdd: empData.email_add,
        paidLeave: empData.paid_leave,
        panNo: empData.pan_no,
        aadharNo: empData.aadhar_no,
        panPhoto: empData.pan_photo,
        aadharFront: empData.aadhar_front,
        aadharBack: empData.aadhar_back,
        residentProof: empData.resident_proof,
        empPhoto: empData.emp_photo,
      };

      // Set date states
      setBirthDate(empData.birth_date ? new Date(empData.birth_date) : null);
      setJoinDate(empData.join_date ? new Date(empData.join_date) : null);

      form.setFieldsValue({
        ...mappedObj,
        birthDate: empData.birth_date ? new Date(empData.birth_date) : null,
        joinDate: empData.join_date ? new Date(empData.join_date) : null,
      });
    }
  }, [empData, form]);

  const handleFileChange = (name, file) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: file instanceof File ? file : file.originFileObj,
    }));
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const processFileUpload = async (file, existingUrl) => {
        if (file) {
          const uploadResult = await uploadImageToFirebase(file);
          return uploadResult ? uploadResult.secure_url : existingUrl;
        }
        return existingUrl;
      };

      const empPhotoUrl = await processFileUpload(
        formData.empPhoto,
        empData?.emp_photo
      );

      const panPhotoUrl = await processFileUpload(
        formData.panPhoto,
        empData?.pan_photo
      );
      const aadharFrontUrl = await processFileUpload(
        formData.aadharFront,
        empData?.aadhar_front
      );
      const aadharBackUrl = await processFileUpload(
        formData.aadharBack,
        empData?.aadhar_back
      );
      const residentProofUrl = await processFileUpload(
        formData.residentProof,
        empData?.resident_proof
      );

      const submitData = {
        ...values,
        empId: empData?.emp_id,
        birthDate: birthDate,
        joinDate: joinDate,
        empPhoto: empPhotoUrl,
        panPhoto: panPhotoUrl,
        aadharFront: aadharFrontUrl,
        aadharBack: aadharBackUrl,
        residentProof: residentProofUrl,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/employ`,
        submitData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      message.success(response.data.message);
      form.resetFields();

      setFormData({
        emp_id: "",
        empCode: "",
        empName: "",
        birthDate: null,
        gender: "",
        education: "",
        presentAdd: "",
        permanentAdd: "",
        experience: "",
        mobileNo: "",
        alternetNo: "",
        emailAdd: "",
        joinDate: null,
        resignDate: null,
        paidLeave: "",
        panNo: "",
        aadharNo: "",
        userName: "",
        userPassword: "",
        panPhoto: null,
        aadharFront: null,
        aadharBack: null,
        residentProof: null,
        empPhoto: null,
      });

      // Reset date states
      setBirthDate(null);
      setJoinDate(null);

      setIsEditMode(false);
      setSide("1");
      if (empData && empData.onUpdateComplete) {
        empData.onUpdateComplete();
      }
    } catch (error) {
      console.error("Registration/Update failed:", error);
      const errorlog = error.response?.data?.data?.validationErrors;
      if (errorlog && errorlog.length > 0) {
        errorlog.forEach((errorMsg) => {
          message.error(errorMsg);
        });
      } else {
        message.error(
          `${isEditMode ? "Update" : "Registration"} failed. Please try again.`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAddress = () => {
    const presentAdd = form.getFieldValue("presentAdd");
    if (presentAdd) {
      form.setFieldsValue({ permanentAdd: presentAdd });
    } else {
      message.warning("Please enter a present address first.");
    }
  };

  const handleClear = () => {
    // Confirm before clearing in edit mode
    if (isEditMode) {
      Modal.confirm({
        title: "Discard Changes?",
        content:
          "Are you sure you want to discard all changes and reset the form?",
        okText: "Yes, Discard",
        cancelText: "Cancel",
        onOk() {
          form.resetFields();
          setFormData({
            emp_id: "",
            empCode: "",
            empName: "",
            birthDate: null,
            gender: "",
            education: "",
            presentAdd: "",
            permanentAdd: "",
            experience: "",
            mobileNo: "",
            alternetNo: "",
            emailAdd: "",
            joinDate: null,
            resignDate: null,
            paidLeave: "",
            panNo: "",
            aadharNo: "",
            userName: "",
            userPassword: "",
            panPhoto: null,
            aadharFront: null,
            aadharBack: null,
            residentProof: null,
            empPhoto: null,
          });
          window.location.reload();
          setBirthDate(null);
          setJoinDate(null);
          setIsEditMode(false);
          setSide("1");
        },
      });
    } else {
      form.resetFields();
      setFormData({});
      setBirthDate(null);
      setJoinDate(null);
      window.location.reload();
    }
  };

  return (
    <div className={styles.registrationContainer}>
      <Card
        title={isEditMode ? "Edit Employee" : "Employee Registration"}
        className={styles.registrationCard}
        styles={{ textAlign: "center", fontSize: "1.5rem" }}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className={styles.registrationForm}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Employee Code"
                name="empCode"
                rules={[
                  { required: true, message: "Employee code is required" },
                ]}
              >
                <Input placeholder="Enter Employee Code" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Employee Name"
                name="empName"
                rules={[
                  { required: true, message: "Employee name is required" },
                ]}
              >
                <Input placeholder="Enter Full Name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Birth Date"
                name="birthDate"
                rules={[{ required: true, message: "Birth date is required" }]}
              >
                <div className="custom-datepicker-wrapper">
                  <DatePicker
                    selected={birthDate}
                    onChange={(date) => {
                      setBirthDate(date);
                      form.setFieldsValue({ birthDate: date });
                    }}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="Select Birth Date"
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    maxDate={new Date()}
                  />
                </div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: "Gender is required" }]}
              >
                <Select>
                  <Select.Option value="Male">Male</Select.Option>
                  <Select.Option value="Female">Female</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Join Date"
                name="joinDate"
                rules={[{ required: true, message: "Join date is required" }]}
              >
                <div className="custom-datepicker-wrapper">
                  <DatePicker
                    selected={joinDate}
                    onChange={(date) => {
                      setJoinDate(date);
                      form.setFieldsValue({ joinDate: date });
                    }}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="Select Join Date"
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Mobile Number"
                name="mobileNo"
                rules={[
                  { required: true, message: "Mobile number is required" },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Please enter a valid mobile number",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Alternate Number" name="alternetNo">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email Address"
                name="emailAdd"
                rules={[
                  { required: true, message: "Email address is required" },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="PAN Number"
                name="panNo"
                rules={[
                  { required: true, message: "PAN Number is required" },
                  { pattern: panPattern, message: "Invalid PAN number format" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Aadhar Number"
                name="aadharNo"
                rules={[
                  { required: true, message: "Aadhar Number is required" },
                  {
                    pattern: aadharPattern,
                    message: "Invalid Aadhar number format",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Paid Leave"
                name="paidLeave"
                rules={[{ required: true, message: "Paid Leave is required" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Emp Photo" name="empPhoto">
                <Upload
                  name="empPhoto"
                  beforeUpload={() => false}
                  onChange={({ file }) => handleFileChange("empPhoto", file)}
                  accept="image/*"
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="PAN Photo" name="panPhoto">
                <Upload
                  name="panPhoto"
                  beforeUpload={() => false}
                  onChange={({ file }) => handleFileChange("panPhoto", file)}
                  accept=".jpg,.jpeg,.png,.pdf"
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Aadhar Front" name="aadharFront">
                <Upload
                  name="aadharFront"
                  beforeUpload={() => false}
                  onChange={({ file }) => handleFileChange("aadharFront", file)}
                  accept=".jpg,.jpeg,.png,.pdf"
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Aadhar Back" name="aadharBack">
                <Upload
                  name="aadharBack"
                  beforeUpload={() => false}
                  onChange={({ file }) => handleFileChange("aadharBack", file)}
                  accept=".jpg,.jpeg,.png,.pdf"
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Resident Proof" name="residentProof">
                <Upload
                  name="residentProof"
                  beforeUpload={() => false}
                  onChange={({ file }) =>
                    handleFileChange("residentProof", file)
                  }
                  accept=".jpg,.jpeg,.png,.pdf"
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Education" name="education">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Experience" name="experience">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} justify="space-between" align="middle">
            {/* Present Address */}
            <Col xs={24} sm={10} md={10}>
              <Form.Item
                label="Present Address"
                name="presentAdd"
                rules={[
                  { required: true, message: "Present address is required" },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Enter Present Address" />
              </Form.Item>
            </Col>

            {/* Copy Button */}
            <Col xs={24} sm={2} md={2} className={styles.centerCol}>
              <Form.Item>
                <Button
                  type="dashed"
                  icon={<CopyOutlined />}
                  onClick={handleCopyAddress}
                  className={styles.copyAddressButton}
                >
                  Copy
                </Button>
              </Form.Item>
            </Col>

            {/* Permanent Address */}
            <Col xs={24} sm={10} md={10}>
              <Form.Item
                label="Permanent Address"
                name="permanentAdd"
                rules={[
                  { required: true, message: "Permanent address is required" },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Enter Permanent Address"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Username"
                name="userName"
                rules={[
                  {
                    required: empData ? false : true,
                    message: "Username is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Password"
                name="userPassword"
                rules={[
                  {
                    required: empData ? false : true,
                    message: "Password is required",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  icon={<SaveOutlined />}
                  className={styles.submitButton}
                  loading={loading}
                >
                  {isEditMode ? "Update Employee" : "Register Employee"}
                </Button>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Button
                  type="default"
                  block
                  icon={<CloseOutlined />}
                  className={styles.submitButton}
                  onClick={handleClear}
                  disabled={loading}
                >
                  {isEditMode ? "Discard Changes" : "Clear"}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default EmployeeRegistration;
