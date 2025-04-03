import { Input, Select, Checkbox, Button, DatePicker, Form } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomFormItem from "../components/CustomFormItem";
import { addCar, getCarFields } from "../services/requests";
const { Option } = Select;

function CarAdd() {
  const [fields, setFields] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const data = Object.keys(values).map((key) => ({
          defineId: fields.find((field) => field.dataIndex === key)?.defineId,
          name: key,
          value: values[key],
        }));

        addCar(data)
          .then(() => {
            navigate("/car");
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
          });
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
      });
  };

  useEffect(() => {
    getCarFields()
      .then((res) => {
        const sortedFields = res.sort((a, b) => a.columnOrder - b.columnOrder);
        setFields(sortedFields);
      })
      .catch((error) => {
        console.error("Error fetching fields:", error);
      });
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <span className="flex items-center justify-between">
        <h4>차량 </h4>
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
      <Form form={form} layout="vertical" className="flex gap-x-2">
        {fields.map((field) => (
          <CustomFormItem key={field.dataIndex} field={field} />
        ))}
      </Form>
    </div>
  );
}
export default CarAdd;
