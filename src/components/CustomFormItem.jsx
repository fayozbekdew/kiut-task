import { Form, Input, Select, Checkbox, DatePicker, TimePicker } from "antd";

const { Option } = Select;

const CustomFormItem = ({ field }) => {
  const isRequired = field.createRequired || field.required;
  const parsedProps = field.uiFieldProperties
    ? JSON.parse(field.uiFieldProperties)
    : {};
  const width = parsedProps.width || 300;
  const label = field.title;

  return (
    <Form.Item
      key={field.dataIndex}
      label={label}
      name={field.dataIndex}
      rules={
        isRequired ? [{ required: true, message: `${label} required` }] : []
      }
      style={{ width: width }}
    >
      {field.columnType === "STRING" || field.columnType === "TEXT" ? (
        <Input type="text" />
      ) : field.columnType === "DOUBLE" ? (
        <Input type="number" step="any" />
      ) : field.columnType === "BOOLEAN" ? (
        <Checkbox>Check</Checkbox>
      ) : field.columnType === "SELECTION" && field.selectionDetails ? (
        <Select className={`w-${width}`}>
          {Object.values(field.selectionDetails).map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      ) : field.columnType === "DATE" ? (
        <DatePicker style={{ width: width }} format="YYYY-MM-DD" />
      ) : field.columnType === "TIME" ? (
        <TimePicker className={`w-${width}`} format="HH:mm:ss" />
      ) : (
        <Input />
      )}
    </Form.Item>
  );
};

export default CustomFormItem;
