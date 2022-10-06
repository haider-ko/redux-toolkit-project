import {
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  Card,
  Spin,
  Space,
} from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledCard = styled(Card)`
  border-radius: 10px;
`;

const StyledSpace = styled(Space)`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const EditTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [count, setCount] = useState(11);

  //Api Fetching
  useEffect(() => {
    if (isFetching) {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((dataSource) => setDataSource(dataSource));
    }
  }, [isFetching]);

  const handleDelete = (id) => {
    const newData = dataSource.filter((item) => item.id !== id);
    setDataSource(newData);
  };
  const handleAdd = () => {
    const newData = {
      id: count,
      name: `Type your name `,
      email: "Type your email ",
      phone: `Type your phone number`,
      username: `Type your username`,
      website: `Type your website`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.id == item.id);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const defaultColumns = [
    {
      title: "No",
      dataIndex: "id",
      editable: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "E-mail",
      dataIndex: "email",
      editable: true,
    },
    {
      title: "User Name",
      dataIndex: "username",
      editable: true,
    },
    {
      title: "Phone number",
      dataIndex: "phone",
      width: 300,
      editable: true,
    },
    {
      title: "Web Site",
      dataIndex: "website",
      editable: true,
    },

    {
      title: " ",
      dataIndex: "operation",
      align: "center",
      width: 30,
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <DeleteTwoTone />
          </Popconfirm>
        ) : null,
    },
  ];
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <>
      <StyledSpace>
        <Button
          onClick={handleAdd}
          type="primary"
          disabled={dataSource.length === 0}
          shape="round"
          ghost
        >
          Add a row
        </Button>
        <Button
          onClick={() => {
            setIsFetching(true);
          }}
          type="primary"
          shape="round"
          disabled={dataSource.length !== 0}
        >
          Fetch Data
        </Button>
      </StyledSpace>
      <StyledCard
        title={
          dataSource.length === 0
            ? "Click the fetch button to display data"
            : "The given data is fetched from API"
        }
      >
        {isFetching ? (
          <Table
            components={components}
            bordered={false}
            dataSource={dataSource}
            columns={columns}
            loading={dataSource.length === 0 && <Spin />}
          />
        ) : (
          ""
        )}
      </StyledCard>
    </>
  );
};

export default EditTable;
