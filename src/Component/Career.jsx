import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../css/career.module.css";
import emailjs from "emailjs-com";
import uploadImageToFirebase from "../utils/uploadImageToFirebase";
import { Upload, Users, Mail, Phone, CheckCircle } from "lucide-react";

function Career() {
  emailjs.init("HZ8NSoUMoP2PDtE0k");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!validTypes.includes(file.type)) {
        setErrorMessage("Please upload a .pdf or .doc file.");
        e.target.value = "";
        return;
      }

      setIsUploading(true);
      setErrorMessage("");

      try {
        const result = await uploadImageToFirebase(file);
        setFileUrl(result.secure_url);
        setFileName(file.name);
      } catch (error) {
        console.error("File upload failed:", error);
        setErrorMessage("File upload failed. Please try again.");
        e.target.value = "";
      } finally {
        setIsUploading(false);
      }
    }
  };

  const onSubmit = async (data) => {
    if (!fileUrl) {
      setErrorMessage("Please upload a valid file.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    const templateParams = {
      name: data.name,
      number: data.number,
      email: data.email,
      fileName: fileName,
      fileUrl: fileUrl,
    };

    try {
      const response = await emailjs.send(
        "service_6hy1dgn",
        "template_mwaiypp",
        templateParams
      );

      reset();
      setFileUrl(null);
      setFileName(null);

      setShowSuccessModal(true);
    } catch (error) {
      console.error("Detailed email sending error:", error);
      setErrorMessage(`Failed to send email: ${error.text || "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const SuccessModal = () => {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <CheckCircle className={styles.successIcon} />
            <h2>Application Submitted Successfully!</h2>
          </div>
          <p>Thank you for your interest in joining our team.</p>
          <p>We will review your application and get back to you soon.</p>
          <button
            onClick={() => setShowSuccessModal(false)}
            className={styles.modalCloseBtn}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {showSuccessModal && <SuccessModal />}
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h1>Join Our Team</h1>
          <p>We're always looking for talented individuals</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              <Users className={styles.inputIcon} />
              Name:
            </label>
            <input
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              type="text"
              placeholder="Enter your name"
              id="name"
            />
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="number">
              <Phone className={styles.inputIcon} />
              Phone Number:
            </label>
            <input
              {...register("number", {
                required: "Phone number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Phone number must be a valid Indian number",
                },
              })}
              type="text"
              id="number"
              placeholder="Enter your contact"
            />
            {errors.number && (
              <p className={styles.error}>{errors.number.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">
              <Mail className={styles.inputIcon} />
              Email:
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Enter your email"
              id="email"
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="file">
              <Upload className={styles.inputIcon} />
              Resume/CV:
            </label>
            <input
              {...register("file", { required: "Resume is required" })}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              id="file"
            />
            {errors.file && (
              <p className={styles.error}>{errors.file.message}</p>
            )}
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            {isUploading && <p>Uploading file...</p>}
            {fileName && <p>Selected file: {fileName}</p>}
          </div>

          <div className={styles.formGroup}>
            <button type="submit" disabled={isLoading || isUploading}>
              {isLoading
                ? "Submitting..."
                : isUploading
                ? "Uploading..."
                : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Career;
