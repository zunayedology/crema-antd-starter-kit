import React, {useState} from 'react';
import {CarryOutOutlined} from '@ant-design/icons';
import {Tree, Input, Checkbox, Button, Form, Row, Col} from 'antd';

const initialTreeData = [
  {
    title: 'Ticket 1',
    key: '0-0',
    parentKey: null,
    icon: <CarryOutOutlined />,
    isLeaf: false,
  },
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
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const treeData = buildTree(flatTreeData);

  const onSelect = (selectedKeys, {selected, node}) => {
    if (selected) {
      setSelectedNode(node);
      form.setFieldsValue({
        message: node.title.replace(' (isLeaf)', ''),
        isQuestion: node.isQuestion || false,
      });
      setIsSaveDisabled(true);
    } else {
      setSelectedNode(null);
      form.resetFields();
      setIsSaveDisabled(true);
    }
  };

  const addNode = () => {
    form.resetFields();
    setSelectedNode(null);
    setIsSaveDisabled(false);
  };

  const saveNode = (values) => {
    const newKey = `0-${new Date().getTime()}`;
    const newNode = {
      title: values.message,
      key: newKey,
      parentKey: null,
      icon: <CarryOutOutlined />,
      isLeaf: false,
      isQuestion: values.isQuestion,
    };

    setFlatTreeData([...flatTreeData, newNode]);
    form.resetFields();
    setIsSaveDisabled(true);
  };

  const applyChanges = (values) => {
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

  const handleSaveNode = () => {
    form.validateFields().then((values) => {
      saveNode(values);
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
          onFinish={applyChanges}
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
                  Apply
                </Button>
              </Col>
              <Col>
                <Button type='primary' onClick={addNode}>
                  Add
                </Button>
              </Col>
              <Col>
                <Button
                  type='primary'
                  onClick={handleSaveNode}
                  disabled={isSaveDisabled}>
                  Save
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
