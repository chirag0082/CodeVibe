import {
  CloseOutlined,
  CopyOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import styles from "../../../css/admin/EmployeeRegistration.module.css";
import scrollTop from "../../../utils/scrollTop";
import uploadImageToFirebase from "../../../utils/uploadImageToFirebase";
import useApiRequest from "../../../utils/useApiRequest";

const EmployeeRegistration = ({
  empData,
  setSide,
  setSelectedEmployee,
  onUpdateComplete,
}) => {
  const user = useSelector((store) => store.adminSlice);
  const { error, makeRequest } = useApiRequest();

  const isNotEmptyOrWhitespace = (field) => {
    return (_, value) => {
      if (!value || !value.trim()) {
        return Promise.reject(
          new Error(`${field} cannot be empty or just spaces`)
        );
      }
      return Promise.resolve();
    };
  };
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
    paidLeave: 0,
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

  const [isEditMode, setIsEditMode] = useState(false);
  const [birthDate, setBirthDate] = useState(null);
  const [joinDate, setJoinDate] = useState(null);
  const [resignDate, setResignDate] = useState(null);
  const [isResigned, setIsResigned] = useState(false);
  const [loading, setLoading] = useState(false);

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

      // Check and set resign date
      if (empData.resign_date) {
        setResignDate(new Date(empData.resign_date));
        setIsResigned(true);
      }

      form.setFieldsValue({
        ...mappedObj,
        birthDate: empData.birth_date ? new Date(empData.birth_date) : null,
        joinDate: empData.join_date ? new Date(empData.join_date) : null,
        resignDate: empData.resign_date ? new Date(empData.resign_date) : null,
      });
    }
  }, [empData, form]);

  const handleFileChange = useCallback((name, file) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: file instanceof File ? file : file.originFileObj,
    }));
  }, []);

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
        resignDate: isResigned ? resignDate : null,
        empPhoto: empPhotoUrl,
        panPhoto: panPhotoUrl,
        aadharFront: aadharFrontUrl,
        aadharBack: aadharBackUrl,
        residentProof: residentProofUrl,
      };

      const response = await makeRequest({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/admin/employ`,
        data: submitData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      message.success(response.message);
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
        paidLeave: 0,
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
      setSelectedEmployee(null);
      setBirthDate(null);
      setJoinDate(null);
      setResignDate(null);
      setIsResigned(false);

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
            paidLeave: 0,
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
          onUpdateComplete();
          setBirthDate(null);
          setJoinDate(null);
          setIsEditMode(false);
          scrollTop();
          setSide("1");
        },
      });
    } else {
      form.resetFields();
      setFormData({});
      setBirthDate(null);
      setJoinDate(null);
      onUpdateComplete();
    }
  };

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

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
          disabled={loading}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Employee Code"
                name="empCode"
                rules={[
                  { required: true, message: "Employee code is required" },
                  {
                    validator: isNotEmptyOrWhitespace("Employee code"),
                  },
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
                  {
                    validator: isNotEmptyOrWhitespace("Employee name"),
                  },
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
                    dateFormat="MMM-dd-yyyy"
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
                    dateFormat="MMM-dd-yyyy"
                    className="form-control"
                  />
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            {isEditMode && (
              <Col span={12}>
                <Form.Item>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      id="isResigned"
                      checked={isResigned}
                      onChange={(e) => setIsResigned(e.target.checked)}
                      style={{ marginRight: "10px" }}
                    />
                    <label htmlFor="isResigned">Employee Resigned?</label>
                  </div>
                </Form.Item>
              </Col>
            )}
            {isResigned && (
              <Col span={12}>
                <Form.Item
                  label="Resign Date"
                  name="resignDate"
                  rules={[
                    {
                      required: isResigned,
                      message: "Resign date is required when resigned",
                    },
                    {
                      validator: (_, value) => {
                        if (value && joinDate && value < joinDate) {
                          return Promise.reject(
                            new Error("Resign date must be after join date")
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <div className="custom-datepicker-wrapper">
                    <DatePicker
                      selected={resignDate}
                      onChange={(date) => {
                        setResignDate(date);
                        form.setFieldsValue({ resignDate: date });
                      }}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      placeholderText="Select Resign Date"
                      dateFormat="MMM-dd-yyyy"
                      className="form-control"
                      minDate={joinDate || undefined}
                    />
                  </div>
                </Form.Item>
              </Col>
            )}
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Mobile Number"
                name="mobileNo"
                rules={[
                  { required: true, message: "Mobile number is required" },
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
                  {
                    validator: isNotEmptyOrWhitespace("PAN number"),
                  },
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
                  {
                    validator: isNotEmptyOrWhitespace("Adhar Number"),
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
                rules={[
                  {
                    required: true,
                    message: "Paid Leave is required",
                  },
                  {
                    validator: async (_, value) => {
                      if (isEditMode && !value && value !== 0) {
                        // In edit mode, if no value is provided, use the existing value
                        const existingValue = form.getFieldValue("paidLeave");
                        if (existingValue >= 1) return Promise.resolve();
                      }

                      if (value < 1) {
                        return Promise.reject(
                          "Paid Leave should be at least 1 days"
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input type="number" min="1" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Emp Photo" name="empPhoto">
                <Upload
                  name="empPhoto"
                  fileList={
                    formData.empPhoto
                      ? [
                          {
                            uid: "-1",
                            name: formData.empPhoto.name,
                            status: "done",
                            originFileObj: formData.empPhoto,
                          },
                        ]
                      : []
                  }
                  beforeUpload={() => false}
                  onChange={({ file, fileList }) =>
                    handleFileChange("empPhoto", file)
                  }
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
              <Form.Item
                label="Education"
                name="education"
                rules={[
                  {
                    validator: isNotEmptyOrWhitespace("Education"),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Experience"
                name="experience"
                rules={[
                  {
                    validator: isNotEmptyOrWhitespace("Experience"),
                  },
                ]}
              >
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
                  {
                    validator: isNotEmptyOrWhitespace("Present Address"),
                  },
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
                  {
                    validator: isNotEmptyOrWhitespace("Permanent address"),
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Enter Permanent Address"
                />
              </Form.Item>
            </Col>
          </Row>

          {!isEditMode && (
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
                    {
                      validator: isNotEmptyOrWhitespace("User Name"),
                    },
                  ]}
                >
                  <Input autoComplete="true" />
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
                    {
                      min: 6,
                      message: "Password must be at least 6 characters long",
                    },
                    {
                      pattern: /^[^\s]+$/,
                      message: "Password cannot contain spaces",
                    },
                    {
                      validator: isNotEmptyOrWhitespace("Password"),
                    },
                  ]}
                >
                  <Input.Password autoComplete="current-password" />
                </Form.Item>
              </Col>
            </Row>
          )}

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  icon={<SaveOutlined />}
                  className={[styles.submitButton, "customBtnStyle"]}
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
                  className={[styles.submitButton, "customBtnStyle"]}
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

