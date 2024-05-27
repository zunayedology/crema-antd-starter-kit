import React, {useState} from 'react';
import {CarryOutOutlined} from '@ant-design/icons';
import {Tree, Input, Checkbox, Button, Form, Row, Col} from 'antd';

const initialTreeData = [
  {
    title: 'Ticket 1',
    key: '0-0',
    icon: <CarryOutOutlined />,
    children: [],
  },
  {
    title: 'Ticket 2',
    key: '0-1',
    icon: <CarryOutOutlined />,
    children: [],
  },
];

const Page1 = () => {
  const [treeData, setTreeData] = useState(initialTreeData);
  const [selectedNode, setSelectedNode] = useState(null);
  const [form] = Form.useForm();

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
    const newTreeData = [...treeData];
    const newNode = {
      title: values.message,
      key: `${selectedNode.key}-${new Date().getTime()}`,
      icon: <CarryOutOutlined />,
      isQuestion: values.isQuestion,
      children: [],
    };

    const addNodeToTree = (nodes) => {
      for (let node of nodes) {
        if (node.key === selectedNode.key) {
          if (!node.children) node.children = [];
          node.children.push(newNode);
          return;
        }
        if (node.children) {
          addNodeToTree(node.children);
        }
      }
    };

    addNodeToTree(newTreeData);
    setTreeData(newTreeData);
    form.resetFields();
  };

  const modifyNode = (values) => {
    const newTreeData = [...treeData];

    const modifyNodeInTree = (nodes) => {
      return nodes.map((node) => {
        if (node.key === selectedNode.key) {
          return {
            ...node,
            title: values.message,
            isQuestion: values.isQuestion,
          };
        }
        if (node.children) {
          return {
            ...node,
            children: modifyNodeInTree(node.children),
          };
        }
        return node;
      });
    };

    setTreeData(modifyNodeInTree(newTreeData));
    form.resetFields();
    setSelectedNode(null);
  };

  const deleteNode = () => {
    const newTreeData = [...treeData];

    const deleteNodeFromTree = (nodes, key) => {
      return nodes
        .map((node) => {
          if (node.key === key) return null;
          if (node.children)
            node.children = deleteNodeFromTree(node.children, key);
          return node;
        })
        .filter(Boolean);
    };

    setTreeData(deleteNodeFromTree(newTreeData, selectedNode.key));
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

export default Page1;
