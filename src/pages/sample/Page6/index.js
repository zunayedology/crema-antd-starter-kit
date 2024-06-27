import React, {useState, useEffect} from 'react';
import {Table, Button, message, Modal, Form, Input, InputNumber} from 'antd';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// eslint-disable-next-line
//debugger;
export const getAccounts = () => axiosInstance.get('/accounts').catch(error => console.log(error));
export const createAccount = (account) => axiosInstance.post('/accounts', account);
export const updateAccount = (id, account) => axiosInstance.put(`/accounts/${id}`, account);
export const deleteAccount = (id) => axiosInstance.delete(`/accounts/${id}`);
export const deposit = (id, amount) => axiosInstance.put(`/accounts/${id}/deposit`, {amount});
export const withdraw = (id, amount) => axiosInstance.put(`accounts/${id}/withdraw`, {amount});

// eslint-disable-next-line react/prop-types
const AccountModal = ({visible, onClose, onRefresh, account}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (account) {
      form.setFieldsValue(account);
    } else {
      form.resetFields();
    }
  }, [account, form]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (account) {
      // eslint-disable-next-line react/prop-types
      await updateAccount(account.id, values);
    } else {
      await createAccount(values);
    }
    onRefresh();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      title={account ? 'Update Account' : 'New Account'}
      onCancel={onClose}
      footer={[
        <Button key='cancel' onClick={onClose}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={handleSubmit}>
          {account ? 'Update' : 'Create'}
        </Button>,
      ]}>
      <Form form={form} layout='vertical'>
        <Form.Item
          name='accountHolderName'
          label='Account Holder Name'
          rules={[{required: true}]}>
          <Input />
        </Form.Item>
        <Form.Item name='balance' label='Balance' rules={[{required: true}]}>
          <InputNumber min={0} style={{width: '100%'}} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

// eslint-disable-next-line react/prop-types
const DepositWithdrawModal = ({visible, onClose, onRefresh, account}) => {
  const [amount, setAmount] = useState();

  const handleDeposit = async () => {
    // eslint-disable-next-line react/prop-types
    await deposit(account?.id, amount);
    message.success('Amount deposited successfully');
    onRefresh();
    onClose();
  };

  const handleWithdraw = async () => {
    // eslint-disable-next-line react/prop-types
    await withdraw(account?.id, amount);
    message.success('Amount withdrawn successfully');
    onRefresh();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      title='Deposit/Withdraw'
      onCancel={onClose}
      footer={[
        <Button key='withdraw' type='danger' onClick={handleWithdraw}>
          Withdraw
        </Button>,
        <Button key='deposit' type='primary' onClick={handleDeposit}>
          Deposit
        </Button>,
      ]}>
      <InputNumber
        min={0}
        value={amount}
        onChange={(value) => setAmount(value)}
        style={{width: '100%'}}
      />
    </Modal>
  );
};

const AccountTable = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isAccountModalVisible, setAccountModalVisible] = useState(false);
  const [isDepositWithdrawModalVisible, setDepositWithdrawModalVisible] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const response = await getAccounts();
    setAccounts(response?.data);
  };

  const handleDelete = async (id) => {
    await deleteAccount(id);
    message.success('Account deleted successfully');
    await fetchAccounts();
  };

  const columns = [
    {title: 'ID', dataIndex: 'id', key: 'id'},
    {
      title: 'Account Holder Name',
      dataIndex: 'accountHolderName',
      key: 'accountHolderName',
    },
    {title: 'Balance', dataIndex: 'balance', key: 'balance'},
    {
      title: 'Deposit/Withdraw',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            onClick={() => {
              setSelectedAccount(record);
              setDepositWithdrawModalVisible(true);
            }}>
            Action
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button
        onClick={() => {
          setSelectedAccount(null);
          setAccountModalVisible(true);
        }}>
        New Account
      </Button>
      <Button
        onClick={() => setAccountModalVisible(true)}
        disabled={!selectedAccount}>
        Update
      </Button>
      <Button
        onClick={() => handleDelete(selectedAccount?.id)}
        disabled={!selectedAccount}>
        Delete
      </Button>
      <Table
        columns={columns}
        dataSource={accounts}
        rowSelection={{
          type: 'radio',
          onChange: (_, selectedRows) => setSelectedAccount(selectedRows[0]),
        }}
        rowKey='id'
      />
      {isAccountModalVisible && (
        <AccountModal
          visible={isAccountModalVisible}
          onClose={() => setAccountModalVisible(false)}
          onRefresh={fetchAccounts}
          account={selectedAccount}
        />
      )}
      {isDepositWithdrawModalVisible && (
        <DepositWithdrawModal
          visible={isDepositWithdrawModalVisible}
          onClose={() => setDepositWithdrawModalVisible(false)}
          onRefresh={fetchAccounts}
          account={selectedAccount}
        />
      )}
    </>
  );
};

export default AccountTable;
