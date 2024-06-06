// eslint-disable no-unused-vars
import React, {useState, useEffect} from 'react';
import {Table, Space, Button, Modal, Input, Form} from 'antd';
import {EditOutlined, DeleteOutlined, SearchOutlined} from '@ant-design/icons';

const initialData = Array.from({length: 10}, (v, i) => ({
  key: i,
  name: `Name ${i}`,
  numberCount: Math.floor(Math.random() * 100),
  description: `Description ${i}`,
  createTime: new Date().toLocaleString(),
  updateTime: '',
}));

// eslint-disable-next-line react/prop-types
const DetailsTable = ({visible, onClose, data}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // eslint-disable-next-line react/prop-types
    const filtered = data.filter((item) => item.number.includes(value));
    setFilteredData(filtered);
  };

  const handleDelete = (key) => {
    setFilteredData(filteredData.filter((item) => item.key !== key));
  };

  return (
    <Modal title='Details' visible={visible} onCancel={onClose} footer={null}>
      <Input
        prefix={<SearchOutlined />}
        placeholder='Search by Number'
        value={searchTerm}
        onChange={handleSearch}
      />
      <Table
        dataSource={filteredData}
        columns={[
          {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size='middle'>
                <Button onClick={() => handleDelete(record.key)}>Delete</Button>
              </Space>
            ),
          },
          {
            title: 'Number',
            dataIndex: 'number',
          },
        ]}
        pagination={{pageSize: 5}}
      />
    </Modal>
  );
};

// eslint-disable-next-line react/prop-types
const EditModal = ({visible, onClose, record, onSave}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(record);
    }
  }, [visible, record, form]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave({...record, ...values, updateTime: new Date().toLocaleString()});
      onClose();
    });
  };

  return (
    <Modal
      title='Edit'
      visible={visible}
      onCancel={onClose}
      onOk={handleSave}
      okText='Save'
      cancelText='Cancel'>
      <Form form={form} initialValues={record}>
        <Form.Item
          name='name'
          label='Name'
          rules={[{required: true, message: 'Please input the name!'}]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='numberCount'
          label='Number Count'
          rules={[{required: true, message: 'Please input the number count!'}]}>
          <Input type='number' />
        </Form.Item>
        <Form.Item
          name='description'
          label='Description'
          rules={[{required: true, message: 'Please input the description!'}]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Page2 = () => {
  const [data, setData] = useState(initialData);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [detailsData, setDetailsData] = useState([]);

  const handleEdit = (record) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
  };

  const handleDetails = () => {
    const customerNumbers = Array.from({length: 3}, (v, i) => ({
      key: i,
      number: `+1234567890${i}`,
    }));
    setDetailsData(customerNumbers);
    setIsDetailsModalVisible(true);
  };

  const handleSave = (updatedRecord) => {
    const newData = data.map((item) =>
      item.key === updatedRecord.key ? updatedRecord : item,
    );
    setData(newData);
  };

  const columns = [
    {
      title: 'Select',
      key: 'select',
      render: () => (
        <Space size='middle'>
          <input type='checkbox' />
        </Space>
      ),
    },
    {
      title: ' ',
      key: 'action1',
      render: (_, record) => (
        <Space size='middle'>
          <EditOutlined onClick={() => handleEdit(record)} />
          <DeleteOutlined onClick={() => handleDelete(record.key)} />
        </Space>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Number Count',
      dataIndex: 'numberCount',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Create Time',
      dataIndex: 'createTime',
    },
    {
      title: 'Update Time',
      dataIndex: 'updateTime',
    },
    {
      title: 'Actions',
      key: 'action2',
      render: (_, record) => (
        <Button onClick={() => handleDetails(record)}>Details</Button>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
      <DetailsTable
        visible={isDetailsModalVisible}
        onClose={() => setIsDetailsModalVisible(false)}
        data={detailsData}
      />
      {currentRecord && (
        <EditModal
          visible={isEditModalVisible}
          onClose={() => setIsEditModalVisible(false)}
          record={currentRecord}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default Page2;
