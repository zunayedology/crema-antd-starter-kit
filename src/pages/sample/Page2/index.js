// eslint-disable no-unused-vars
import React, {useState, useEffect} from 'react';
import {
  Table,
  Space,
  Button,
  Modal,
  Input,
  Form,
  Radio,
  Checkbox,
  Upload,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const generateKeys = (count) => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({length: count}, () => {
    return Array.from(
      {length: 10},
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join('');
  });
};

const initialData = Array.from({length: 10}, (v, i) => {
  const keyCount = Math.floor(Math.random() * 10);
  return {
    key: i,
    id: i + Math.floor(Math.random() * 10),
    userId: `User ${Math.floor(i / 2)}`,
    name: `Name ${i}`,
    keyCount: keyCount,
    keys: generateKeys(keyCount),
    description: `Description ${i}`,
    type: 'Normal',
    medium: i % 2 === 0 ? 'A' : 'B',
    status: i % 2 === 0 ? 'Available' : 'Unavailable',
    createTime: new Date().toLocaleString(),
    updateTime: '',
  };
});

// eslint-disable-next-line react/prop-types
const DetailsTable = ({visible, onClose, data}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // eslint-disable-next-line react/prop-types
    const filtered = data.filter((item) => item.keys.includes(value));
    setFilteredData(filtered);
  };

  const handleDelete = (key) => {
    setFilteredData(filteredData.filter((item) => item.key !== key));
  };

  return (
    <Modal title='Details' visible={visible} onCancel={onClose} footer={null}>
      <Input
        prefix={<SearchOutlined />}
        placeholder='Search by Keys'
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
            title: 'Keys',
            dataIndex: 'keys',
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
          name='keyCount'
          label='Key Count'
          rules={[{required: true, message: 'Please input the key count!'}]}>
          <Input type='number' />
        </Form.Item>
        <Form.Item
          name='description'
          label='Description'
          rules={[{required: true, message: 'Please input the description!'}]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='type'
          label='Type'
          rules={[{required: true, message: 'Please select the type!'}]}>
          <Radio.Group>
            <Radio value='Normal'>Normal</Radio>
            <Radio value='Reward'>Reward</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name='medium'
          label='Medium'
          rules={[{required: true, message: 'Please select the medium!'}]}>
          <Radio.Group>
            <Radio value='A'>A</Radio>
            <Radio value='B'>B</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name='status'
          label='Status'
          rules={[{required: true, message: 'Please select the status!'}]}>
          <Radio.Group>
            <Radio value='Available'>Available</Radio>
            <Radio value='Unavailable'>Unavailable</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

// eslint-disable-next-line react/prop-types
const CreateKeyListModal = ({visible, onClose, onSave}) => {
  const [form] = Form.useForm();
  const [uploadType, setUploadType] = useState('Upload');

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave({
        ...values,
        createTime: new Date().toLocaleString(),
      });
      onClose();
    });
  };

  return (
    <Modal
      title='Create Key List'
      visible={visible}
      onCancel={onClose}
      onOk={handleSave}
      okText='Save'
      cancelText='Cancel'>
      <Form form={form}>
        <Form.Item
          name='name'
          label='Key List Name'
          rules={[
            {required: true, message: 'Please input the key list name!'},
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='description'
          label='Description'
          rules={[{required: true, message: 'Please input the description!'}]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='type'
          label='Type'
          rules={[{required: true, message: 'Please select the type!'}]}>
          <Radio.Group>
            <Radio value='Normal'>Normal</Radio>
            <Radio value='Reward'>Reward</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name='status'
          label='Status'
          rules={[{required: true, message: 'Please select the status!'}]}>
          <Radio.Group>
            <Radio value='Available'>Available</Radio>
            <Radio value='Unavailable'>Unavailable</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name='uploadType'>
          <Radio.Group
            onChange={(e) => setUploadType(e.target.value)}
            value={uploadType}>
            <Radio value='Upload' defaultChecked={true}>
              Upload from CSV
            </Radio>
            <Radio value='AutoGenerate'>Auto Generate Keys</Radio>
          </Radio.Group>
        </Form.Item>
        {uploadType === 'Upload' ? (
          <Form.Item name='csv'>
            <Upload>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        ) : (
          <>
            <Form.Item
              name='keyCount'
              label='Key Count'
              rules={[
                {required: true, message: 'Please input the key count!'},
              ]}>
              <Input type='number' />
            </Form.Item>
            <Form.Item
              name='keyLength'
              label='Key Length'
              rules={[
                {required: true, message: 'Please input the key length!'},
              ]}>
              <Input type='number' />
            </Form.Item>
            <Form.Item
              name='keyFormat'
              label='Key Format'
              rules={[
                {required: true, message: 'Please select the key format!'},
              ]}>
              <Checkbox.Group>
                <Checkbox value='A-Z'>A-Z</Checkbox>
                <Checkbox value='a-z'>a-z</Checkbox>
                <Checkbox value='0-9'>0-9</Checkbox>
              </Checkbox.Group>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};

const Page2 = () => {
  const [data, setData] = useState(initialData);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCreateKeyListModalVisible, setIsCreateKeyListModalVisible] =
    useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [detailsData, setDetailsData] = useState([]);

  const handleEdit = (record) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
  };

  const handleDetails = (record) => {
    const keys = record.keys.map((key, i) => ({key: i, keys: key}));
    setDetailsData(keys);
    setIsDetailsModalVisible(true);
  };

  const handleSave = (updatedRecord) => {
    const newData = data.map((item) =>
      item.key === updatedRecord.key ? updatedRecord : item,
    );
    setData(newData);
  };

  const handleCreateKeyListSave = (newRecord) => {
    const newRecordWithKey = {...newRecord, key: data.length};
    setData([...data, newRecordWithKey]);
  };

  const columns = [
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size='middle'>
          <EditOutlined onClick={() => handleEdit(record)} />
          <DeleteOutlined onClick={() => handleDelete(record.key)} />
        </Space>
      ),
    },
    {title: 'ID', dataIndex: 'id'},
    {title: 'User ID', dataIndex: 'userId'},
    {title: 'Name', dataIndex: 'name'},
    {title: 'Key Count', dataIndex: 'keyCount'},
    {title: 'Description', dataIndex: 'description'},
    {title: 'Type', dataIndex: 'type'},
    {title: 'Medium', dataIndex: 'medium'},
    {title: 'Status', dataIndex: 'status'},
    {title: 'Create Time', dataIndex: 'createTime'},
    {title: 'Update Time', dataIndex: 'updateTime'},
    {
      title: 'Details',
      key: 'details',
      render: (_, record) => (
        <Button size='small' onClick={() => handleDetails(record)}>
          Details
        </Button>
      ),
    },
  ];

  return (
    <>
      <Button
        type='primary'
        size='big'
        style={{width: '25%'}}
        onClick={() => setIsCreateKeyListModalVisible(true)}>
        Create Key List
      </Button>
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
      <CreateKeyListModal
        visible={isCreateKeyListModalVisible}
        onClose={() => setIsCreateKeyListModalVisible(false)}
        onSave={handleCreateKeyListSave}
      />
    </>
  );
};

export default Page2;
