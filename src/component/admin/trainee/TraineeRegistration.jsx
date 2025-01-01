import React, { useState, useEffect, useCallback } from "react";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CloseOutlined,
  CopyOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import styles from "../../../css/admin/EmployeeRegistration.module.css";
import useApiRequest from "../../../utils/useApiRequest";
import { useSelector } from "react-redux";
import uploadImageToFirebase from "../../../utils/uploadImageToFirebase";

const TraineeRegistration = ({
  traineeData,
  setSelectedTrainee,
  onUpdateComplete,
  setSide,
}) => {
  const user = useSelector((store) => store.adminSlice);
  const { makeRequest } = useApiRequest();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [birthDate, setBirthDate] = useState(null);
  const [joinDate, setJoinDate] = useState(null);
  const [completeDate, setCompleteDate] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const [formFiles, setFormFiles] = useState({
    aadharFront: null,
    aadharBack: null,
    residentProof: null,
    traineePhoto: null,
  });

  const handleFileChange = useCallback((name, file) => {
    setFormFiles((prev) => ({
      ...prev,
      [name]: file instanceof File ? file : file?.originFileObj,
    }));
  }, []);

  useEffect(() => {
    if (traineeData) {
      const mappedData = {
        traineeName: traineeData.trainee_name,
        gender: traineeData.gender,
        education: traineeData.education,
        mobileNo: traineeData.mobile_no,
        alternetNo: traineeData.alternet_no,
        emailAdd: traineeData.email_add,
        presentAdd: traineeData.present_add,
        permanentAdd: traineeData.permanent_add,
        experience: traineeData.experience,
        aadharNo: traineeData.aadhar_no,
        refName: traineeData.ref_name,
        refNumber: traineeData.ref_number,
        birthDate: traineeData.birth_date
          ? new Date(traineeData.birth_date)
          : null,
        joinDate: traineeData.join_date
          ? new Date(traineeData.join_date)
          : null,
        completeDate: traineeData.complete_date
          ? new Date(traineeData.complete_date)
          : null,
      };
      setFormFiles({
        aadharFront: traineeData.aadharFront,
        aadharBack: traineeData.aadharBack,
        residentProof: traineeData.residentProof,
        traineePhoto: traineeData.traineePhoto,
      });

      if (traineeData.complete_date) {
        setCompleteDate(new Date(traineeData.complete_date));
        setIsCompleted(true);
      }

      setBirthDate(mappedData.birthDate);
      setJoinDate(mappedData.joinDate);
      setCompleteDate(mappedData.completeDate);
      form.setFieldsValue(mappedData);
    }
  }, [traineeData, form]);

  const processFileUpload = async (file, existingUrl) => {
    if (file) {
      const uploadResult = await uploadImageToFirebase(file);
      return uploadResult ? uploadResult.secure_url : existingUrl;
    }
    return existingUrl;
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const traineePhotoUrl = await processFileUpload(
        formFiles.traineePhoto,
        traineeData?.trainee_photo
      );

      const aadharFrontUrl = await processFileUpload(
        formFiles.aadharFront,
        traineeData?.aadhar_front
      );

      const aadharBackUrl = await processFileUpload(
        formFiles.aadharBack,
        traineeData?.aadhar_back
      );

      const residentProofUrl = await processFileUpload(
        formFiles.residentProof,
        traineeData?.resident_proof
      );

      const submitData = {
        traineeId: traineeData?.trainee_id,
        traineeName: values.traineeName,
        birthDate,
        joinDate,
        completeDate: isCompleted ? completeDate : null,
        gender: values.gender,
        education: values.education,
        mobileNo: values.mobileNo,
        alternetNo: values.alternetNo,
        emailAdd: values.emailAdd,
        presentAdd: values.presentAdd,
        permanentAdd: values.permanentAdd,
        experience: values.experience,
        aadharNo: values.aadharNo,
        refName: values.refName,
        refNumber: values.refNumber,
        aadharFront: aadharFrontUrl,
        aadharBack: aadharBackUrl,
        residentProof: residentProofUrl,
        traineePhoto: traineePhotoUrl,
      };

      const response = await makeRequest({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/admin/trainee`,
        data: submitData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      message.success(response.data.message || "Operation successful");
      form.resetFields();
      setBirthDate(null);
      setJoinDate(null);
      setCompleteDate(null);
      setFormFiles({
        aadharFront: null,
        aadharBack: null,
        residentProof: null,
        traineePhoto: null,
      });
      setSelectedTrainee(null);
      setIsCompleted(false);

      onUpdateComplete();
      setSide("1");
    } catch (error) {
      console.error("Submission error:", error);
      message.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    Modal.confirm({
      title: "Clear Form",
      content: "Are you sure you want to clear all fields?",
      onOk() {
        form.resetFields();
        setBirthDate(null);
        setJoinDate(null);
        setCompleteDate(null);
        setFormFiles({
          aadharFront: null,
          aadharBack: null,
          residentProof: null,
          traineePhoto: null,
        });
        onUpdateComplete();
      },
    });
  };

  const handleCopyAddress = () => {
    const presentAdd = form.getFieldValue("presentAdd");
    if (presentAdd) {
      form.setFieldValue("permanentAdd", presentAdd);
    } else {
      message.warning("Please enter present address first");
    }
  };

  const handleCompleteCheckboxChange = async (e) => {
    const checked = e.target.checked;
    setIsCompleted(checked);
    if (!checked) {
      try {
        await makeRequest({
          method: "POST",
          url: `${process.env.REACT_APP_API_URL}/admin/trainee/complete-null`,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          data: {
            traineeId: traineeData.trainee_id,
          },
        });

        message.success("Employee resignation status updated.");
        setCompleteDate(null); // Clear resignation date
      } catch (err) {
        console.error("Error updating resignation status:", err);
        message.error("Failed to update resignation status.");
      }
    }
  };

  return (
    <div className={styles.registrationContainer}>
      <Card
        title={traineeData ? "Edit Trainee" : "Trainee Registration"}
        className={styles.registrationCard}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          disabled={loading}
          className={styles.registrationForm}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="traineeName"
                rules={[
                  { required: true, message: "Please enter trainee name" },
                  { whitespace: true, message: "Name cannot be empty" },
                ]}
              >
                <Input placeholder="Enter trainee name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Birth Date"
                name="birthDate"
                rules={[
                  { required: true, message: "Please select birth date" },
                ]}
              >
                <div className="w-full">
                  <DatePicker
                    selected={birthDate}
                    onChange={(date) => {
                      setBirthDate(date);
                      form.setFieldValue("birthDate", date);
                    }}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    dateFormat="MMM-dd-yyyy"
                    className="w-full p-2 border rounded"
                    placeholderText="Select birth date"
                    maxDate={new Date()}
                  />
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: "Please select gender" }]}
              >
                <Select placeholder="Select gender">
                  <Select.Option value="Male">Male</Select.Option>
                  <Select.Option value="Female">Female</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Education"
                name="education"
                rules={[{ required: true, message: "Please enter education" }]}
              >
                <Input placeholder="Enter education details" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Mobile Number"
                name="mobileNo"
                rules={[
                  { required: true, message: "Please enter mobile number" },
                  {
                    pattern: /^\d{10}$/,
                    message: "Please enter valid 10-digit mobile number",
                  },
                ]}
              >
                <Input placeholder="Enter mobile number" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Alternate Number" name="alternetNo">
                <Input placeholder="Enter alternate number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="emailAdd"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Please enter valid email" },
                ]}
              >
                <Input placeholder="Enter email address" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Join Date"
                name="joinDate"
                rules={[{ required: true, message: "Please select join date" }]}
              >
                <div className="w-full">
                  <DatePicker
                    selected={joinDate}
                    onChange={(date) => {
                      setJoinDate(date);
                      form.setFieldValue("joinDate", date);
                    }}
                    dateFormat="MM/dd/yyyy"
                    className="w-full p-2 border rounded"
                    placeholderText="Select join date"
                  />
                </div>
              </Form.Item>
            </Col>
          </Row>

          {traineeData && (
            <Col xs={24} sm={12}>
              <Form.Item className={styles.resignedCheckbox}>
                <input
                  type="checkbox"
                  id="isCompleted"
                  checked={isCompleted}
                  onChange={handleCompleteCheckboxChange}
                />
                <label htmlFor="isCompleted">Trainee Complete?</label>
              </Form.Item>
            </Col>
          )}

          {/* Complete Date - Only shown in edit mode */}
          {isCompleted && (
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Complete Date" name="completeDate">
                  <div className="w-full">
                    <DatePicker
                      selected={completeDate}
                      onChange={(date) => {
                        setCompleteDate(date);
                        form.setFieldValue("completeDate", date);
                      }}
                      dateFormat="MM/dd/yyyy"
                      className="w-full p-2 border rounded"
                      placeholderText="Select complete date"
                      minDate={joinDate} // Cannot be before join date
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>
          )}

          <Row gutter={16}>
            <Col span={11}>
              <Form.Item
                label="Present Address"
                name="presentAdd"
                rules={[
                  { required: true, message: "Please enter present address" },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Enter present address" />
              </Form.Item>
            </Col>

            <Col span={2} className={styles.centerCol}>
              <Button
                icon={<CopyOutlined />}
                onClick={handleCopyAddress}
                type="dashed"
              />
            </Col>

            <Col span={11}>
              <Form.Item
                label="Permanent Address"
                name="permanentAdd"
                rules={[
                  { required: true, message: "Please enter permanent address" },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Enter permanent address"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Experience"
                name="experience"
                rules={[{ required: true, message: "Please enter experience" }]}
              >
                <Input placeholder="Enter experience" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Aadhar Number"
                name="aadharNo"
                rules={[
                  { required: true, message: "Please enter Aadhar number" },
                  {
                    pattern: /^\d{12}$/,
                    message: "Please enter valid 12-digit Aadhar number",
                  },
                ]}
              >
                <Input placeholder="Enter Aadhar number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Aadhar Front">
                <Upload
                  beforeUpload={() => false}
                  onChange={({ file }) => handleFileChange("aadharFront", file)}
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Upload Aadhar Front</Button>
                </Upload>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Aadhar Back">
                <Upload
                  beforeUpload={() => false}
                  onChange={({ file }) => handleFileChange("aadharBack", file)}
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Upload Aadhar Back</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Resident Proof">
                <Upload
                  beforeUpload={() => false}
                  onChange={({ file }) =>
                    handleFileChange("residentProof", file)
                  }
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>
                    Upload Resident Proof
                  </Button>
                </Upload>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Trainee Photo">
                <Upload
                  name="traineePhoto"
                  beforeUpload={() => false}
                  onChange={({ file }) =>
                    handleFileChange("traineePhoto", file)
                  }
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Upload Photo</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Reference Name" name="refName">
                <Input placeholder="Enter reference name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Reference Number" name="refNumber">
                <Input placeholder="Enter reference number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} className="mt-6">
            <Col span={12}>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={loading}
                block
                className="customBtnStyle"
              >
                {traineeData ? "Update Trainee" : "Register Trainee"}
              </Button>
            </Col>
            <Col span={12}>
              <Button
                onClick={handleClear}
                icon={<CloseOutlined />}
                block
                className="customBtnStyle"
              >
                Clear Form
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default TraineeRegistration;
