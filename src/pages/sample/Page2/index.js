import React, {useState} from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Space,
  Table,
  Popconfirm,
  message,
} from 'antd';
import {Resizable} from 'react-resizable';
import PropTypes from 'prop-types';
import './style.less';

const ResizableTitle = ({onResize, width, ...restProps}) => {
  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className='react-resizable-handle'
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{enableUserSelectHack: false}}>
      <th {...restProps} />
    </Resizable>
  );
};

const {Option} = Select;

const App = () => {
  const [formData, setFormData] = useState([]);

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const {address, ...restValues} = values;
    setFormData([{...restValues, ...address, key: Date.now()}, ...formData]);
  };

  const handleDelete = (record) => {
    setFormData(formData.filter((item) => item.key !== record.key));
    message.success('Record deleted successfully');
  };

  const [TableColumn, setTableColumn] = useState([
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: 60,
      minwidth: 40,
    },
    {
      title: 'Birth Date',
      dataIndex: 'birthdate',
      key: 'birthdate',
      width: 60,
      minwidth: 40,
    },
    {
      title: 'Birth Month',
      dataIndex: 'month',
      key: 'month',
      width: 60,
      minwidth: 40,
    },
    {
      title: 'Division',
      dataIndex: 'division',
      key: 'division',
      width: 60,
      minwidth: 40,
    },
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
      width: 60,
      minwidth: 40,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <Popconfirm
            title='Are you sure to delete this record?'
            onConfirm={() => handleDelete(record)}
            okText='Yes'
            cancelText='No'>
            <Button type='link'>Delete</Button>
          </Popconfirm>
        </Space>
      ),
      width: 60,
      minwidth: 40,
    },
  ]);
  const components = {
    header: {
      cell: ResizableTitle,
    },
  };
  const handleResize =
    (index) =>
    (e, {size}) => {
      setTableColumn((prevColumns) => {
        const nextColumns = [...prevColumns];
        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width,
        };
        return nextColumns;
      });
    };
  const resizableColumns = TableColumn.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  return (
    <>
      <Form
        name='complex-form'
        onFinish={onFinish}
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}>
        <Form.Item label='Username'>
          <Space>
            <Form.Item
              name='username'
              noStyle
              rules={[{required: true, message: 'Username is required'}]}>
              <Input style={{width: 160}} placeholder='Please input' />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item label='Address'>
          <Input.Group compact>
            <Form.Item
              name={['address', 'division']}
              noStyle
              rules={[{required: true, message: 'Division is required'}]}>
              <Select placeholder='Select division'>
                <Option value='Dhaka'>Dhaka</Option>
                <Option value='Chattogram'>Chattogram</Option>
                <Option value='Sylhet'>Sylhet</Option>
                <Option value='Rajshahi'>Rajshahi</Option>
                <Option value='Khulna'>Khulna</Option>
                <Option value='Barishal'>Barishal</Option>
                <Option value='Rangpur'>Rangpur</Option>
                <Option value='Mymensingh'>Mymensingh</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={['address', 'district']}
              noStyle
              rules={[{required: true, message: 'District is required'}]}>
              <Input style={{width: '50%'}} placeholder='Input district' />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item label='BirthDate' style={{marginBottom: 0}}>
          <Form.Item
            name='birthdate'
            rules={[{required: true}]}
            style={{display: 'inline-block', width: 'calc(50% - 8px)'}}>
            <Input placeholder='Input birth year' />
          </Form.Item>
          <Form.Item
            name='month'
            rules={[{required: true}]}
            style={{
              display: 'inline-block',
              width: 'calc(50% - 10px)',
              margin: '0 8px',
            }}>
            <Input placeholder='Input birth month' />
          </Form.Item>
        </Form.Item>
        <Form.Item label=' ' colon={false}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
      {formData.length > 0 && (
        // <Table columns={resizableColumns} dataSource={formData} pagination={false} components={components}/>

        <Table
          columns={resizableColumns}
          components={components}
          dataSource={formData}
        />
      )}
    </>
  );
};

export default App;

ResizableTitle.propTypes = {
  onResize: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};
