import { Input, Select, Checkbox, Button, DatePicker, Form } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { getCarByID, updateCarValue } from "../services/requests";
import CustomFormItem from "../components/CustomFormItem";

function CarEdit() {
  const [fields, setFields] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const formRef = useRef();
  const { id } = useParams();
  useEffect(() => {
    getCarByID(id)
      .then((data) => {
        setFields(data);
      })
      .catch((err) => console.error("Error fetching", err));
  }, [id]);

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const data = Object.keys(values).map((key) => ({
          defineId: fields.find((field) => field.dataIndex === key)?.defineId,
          name: key,
          value: values[key],
        }));
        updateCarValue(id, data)
          .then(() => {
            navigate("/car");
          })
          .catch((error) => console.error("Error updating car:", error));
      })
      .catch((errorInfo) => console.error("Validation eror:", errorInfo));
  };
  const initialValues = fields.reduce((acc, field) => {
    acc[field.dataIndex] =
      field.columnType === "DATE" && field.value
        ? moment(field.value)
        : field.value || "";
    return acc;
  }, {});

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [fields]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <span className="flex items-center justify-between">
        <h4>Edit Car</h4>
        <small className="flex gap-x-1">
          <Button onClick={onSubmit} type="primary">
            추가
          </Button>
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            닫기
          </Button>
        </small>
      </span>
      <Form
        form={form}
        ref={formRef}
        layout="vertical"
        className="flex gap-x-2"
      >
        {fields.map((field) => (
          <CustomFormItem key={field.dataIndex} field={field} />
        ))}
      </Form>
    </div>
  );
}
export default CarEdit;
