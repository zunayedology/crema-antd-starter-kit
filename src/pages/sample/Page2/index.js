// eslint-disable no-unused-vars
import React, {useState} from 'react';
import {Table, Space, Button, Modal, Input} from 'antd';
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

const Page2 = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [detailsData, setDetailsData] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleEdit = (record) => {
    const newData = data.map((item) =>
      item.key === record.key
        ? {...item, updateTime: new Date().toLocaleString()}
        : item,
    );
    setData(newData);
  };

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
  };

  const handleDetails = () => {
    // Simulating customer numbers
    const customerNumbers = Array.from({length: 3}, (v, i) => ({
      key: i,
      number: `+1234567890${i}`,
    }));
    setDetailsData(customerNumbers);
    setIsModalVisible(true);
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
      render: () => <Button onClick={() => handleDetails()}>Details</Button>,
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      <DetailsTable
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        data={detailsData}
      />
    </>
  );
};

export default Page2;
