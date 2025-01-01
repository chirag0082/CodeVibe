import React, { useState } from "react";
import { Upload, Modal, Button, message } from "antd";
import {
  UploadOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const EnhancedUpload = ({
  label,
  onChange,
  value,
  accept = ".jpg,.jpeg,.png,.pdf",
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      if (file.originFileObj) {
        file.preview = await getBase64(file.originFileObj);
      }
    }
    setPreviewUrl(file.url || file.preview);
    setPreviewOpen(true);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const beforeUpload = (file) => {
    const isValidType = accept
      .split(",")
      .some((type) => file.type.includes(type.replace(".", "")));
    if (!isValidType) {
      message.error(`You can only upload ${accept} files!`);
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("File must be smaller than 5MB!");
    }
    return isValidType && isLt5M;
  };

  const getFileIcon = (file) => {
    if (file.type?.includes("pdf")) {
      return <FilePdfOutlined className="text-red-500" />;
    }
    return <FileImageOutlined className="text-blue-500" />;
  };

  return (
    <div className="space-y-2">
      <Upload
        maxCount={1}
        beforeUpload={beforeUpload}
        onChange={({ file }) => onChange?.(file)}
        showUploadList={false}
        accept={accept}
      >
        <Button
          icon={<UploadOutlined />}
          className="w-full h-12 flex items-center justify-center border-dashed hover:border-blue-500 hover:text-blue-500 transition-colors"
        >
          {label}
        </Button>
      </Upload>

      {value && (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
          <div className="flex items-center space-x-2">
            {getFileIcon(value)}
            <span className="text-sm truncate max-w-[200px]">
              {value.name || "Uploaded file"}
            </span>
          </div>
          <div className="flex space-x-2">
            {(value.type?.includes("image/") ||
              value.url?.includes("image")) && (
              <Button
                type="text"
                icon={<EyeOutlined />}
                onClick={() => handlePreview(value)}
                className="text-blue-500 hover:text-blue-600"
              />
            )}
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => onChange?.(null)}
              className="text-red-500 hover:text-red-600"
            />
          </div>
        </div>
      )}

      <Modal
        open={previewOpen}
        title="Preview"
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="preview" className="w-full" src={previewUrl} />
      </Modal>
    </div>
  );
};

export default EnhancedUpload;
