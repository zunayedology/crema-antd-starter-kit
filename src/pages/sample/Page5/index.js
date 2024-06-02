import React, {useState} from 'react';
import {CarryOutOutlined} from '@ant-design/icons';
import {Tree, Input, Checkbox, Button, Form, Row, Col} from 'antd';

const initialTreeData = [
  {title: 'Ticket 1', key: '0-0', parentKey: null, icon: <CarryOutOutlined />},
];

const buildTree = (list) => {
  const tree = [];
  const lookup = {};

  list.forEach((item) => (lookup[item.key] = {...item, children: []}));

  list.forEach((item) => {
    if (item.parentKey === null) {
      tree.push(lookup[item.key]);
    } else {
      lookup[item.parentKey].children.push(lookup[item.key]);
    }
  });

  return tree;
};

const App = () => {
  const [flatTreeData, setFlatTreeData] = useState(initialTreeData);
  const [selectedNode, setSelectedNode] = useState(null);
  const [form] = Form.useForm();

  const treeData = buildTree(flatTreeData);

  const onSelect = (selectedKeys, {selected, node}) => {
    if (selected) {
      setSelectedNode(node);
      form.setFieldsValue({
        message: node.title,
        isQuestion: node.isQuestion || false,
      });
    } else {
      setSelectedNode(null);
      form.resetFields();
    }
  };

  const addNode = (values) => {
    const newKey = `${selectedNode.key}-${new Date().getTime()}`;
    const newNode = {
      title: values.message,
      key: newKey,
      parentKey: selectedNode.key,
      icon: <CarryOutOutlined />,
      isQuestion: values.isQuestion,
    };

    setFlatTreeData([...flatTreeData, newNode]);
    form.resetFields();
  };

  const modifyNode = (values) => {
    setFlatTreeData(
      flatTreeData.map((node) =>
        node.key === selectedNode.key
          ? {...node, title: values.message, isQuestion: values.isQuestion}
          : node,
      ),
    );
    form.resetFields();
    setSelectedNode(null);
  };

  const deleteNode = () => {
    const deleteNodeAndChildren = (key) => {
      const nodesToDelete = flatTreeData.filter(
        (node) => node.key === key || node.parentKey === key,
      );
      return flatTreeData.filter((node) => !nodesToDelete.includes(node));
    };

    setFlatTreeData(deleteNodeAndChildren(selectedNode.key));
    setSelectedNode(null);
    form.resetFields();
  };

  const handleAddNode = () => {
    form.validateFields().then((values) => {
      addNode(values);
    });
  };

  return (
    <div style={{display: 'flex', height: '100vh'}}>
      <div style={{flex: 1, overflow: 'auto', padding: '16px'}}>
        <Tree showLine onSelect={onSelect} treeData={treeData} />
      </div>
      <div style={{flex: 1, padding: '16px'}}>
        <Form
          form={form}
          layout='vertical'
          onFinish={modifyNode}
          initialValues={{message: '', isQuestion: false}}>
          <Form.Item
            name='message'
            label='Message'
            rules={[{required: true, message: 'Please enter a message'}]}>
            <Input />
          </Form.Item>
          <Form.Item name='isQuestion' valuePropName='checked'>
            <Checkbox>Is it a question?</Checkbox>
          </Form.Item>
          <Form.Item>
            <Row gutter={8}>
              <Col>
                <Button type='primary' htmlType='submit'>
                  Modify
                </Button>
              </Col>
              <Col>
                <Button
                  type='primary'
                  onClick={handleAddNode}
                  disabled={!selectedNode}>
                  Add
                </Button>
              </Col>
              <Col>
                <Button
                  type='danger'
                  onClick={deleteNode}
                  disabled={!selectedNode}>
                  Delete
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default App;
