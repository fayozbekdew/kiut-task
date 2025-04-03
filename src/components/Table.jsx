import React, { useState } from "react";
import { Table, Space } from "antd";
import { Link } from "react-router-dom";
import { DeleteIcon, EditIcon, OptionsIcon } from "../assets";

const TableComponent = ({ headers, data, deleteFn }) => {
  const [selectionType, setSelectionType] = useState("checkbox");
  const columns = [
    ...headers.map((header) => {
      const uiProperties = header.uiColumnProperties
        ? JSON.parse(header.uiColumnProperties)
        : null;
      return {
        title: header.title,
        dataIndex: header.dataIndex || header.id,
        key: header.id,
        order: uiProperties?.order,
      };
    }),
    {
      title: "실행",
      dataIndex: "actions",
      key: "actions",
      order: 99999,
      render: (text, record) => (
        <Space size="middle">
          <Link
            to={`/car/edit/${record.objectUUID}`}
            className="flex items-center gap-x-1 border border-gray rounded-lg p-1"
          >
            <img src={EditIcon} alt="edit" className="w-4 h-4" />
            수정
          </Link>
          <button
            className="flex items-center gap-x-1 border border-red rounded-lg p-1 text-red"
            onClick={() => deleteFn(record.objectUUID)}
          >
            <img src={DeleteIcon} alt="delete" className="w-5 h-5" />
            삭제
          </button>
          <button className="flex items-center gap-x-1 border border-gray rounded-lg p-1">
            <img src={OptionsIcon} alt="options" className="w-4 h-4" />
          </button>
        </Space>
      ),
    },
  ].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div>
      <Table
        rowKey="objectUUID"
        rowSelection={{ type: selectionType }}
        columns={columns}
        dataSource={data.length ? data : []}
        pagination={{
          pageSize: 10,
          total: data.length,
          position: ["bottomCenter"],
        }}
      />
    </div>
  );
};

export default TableComponent;
