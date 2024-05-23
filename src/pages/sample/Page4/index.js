// TABLE PROPS -
// * resizable columns
// * dummy data from API
// * row selection with radio

import React from 'react';
import {Button, Space, Table, message} from 'antd';
import {Resizable} from 'react-resizable';
import PropTypes from 'prop-types';
import axios from 'axios';
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

ResizableTitle.propTypes = {
  onResize: PropTypes.func.isRequired,
  width: PropTypes.number,
};

class Page4 extends React.Component {
  state = {
    selectedRowKey: null,
    loading: false,
    data: [],
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 150,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 200,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 150,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 150,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 200,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 150,
      },
    ],
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=10');
      const users = response.data.results.map((user, index) => ({
        key: index,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        status: this.getRandomStatus(),
      }));
      this.setState({data: users});
    } catch (error) {
      message.error('Failed to fetch data');
      console.error(error);
    }
  };

  getRandomStatus = () => {
    const statuses = ['Paused', 'Running', 'Inactive'];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  };

  start = () => {
    this.setState({loading: true});
    setTimeout(() => {
      this.setState({
        selectedRowKey: null,
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = (selectedRowKey) => {
    console.log('selectedRowKey changed: ', selectedRowKey);
    this.setState({selectedRowKey});
  };

  handleResize =
    (index) =>
    (e, {size}) => {
      this.setState(({columns}) => {
        const nextColumns = [...columns];
        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width,
        };
        return {columns: nextColumns};
      });
    };

  render() {
    const {loading, selectedRowKey, columns, data} = this.state;
    const hasSelected = selectedRowKey !== null;

    const components = {
      header: {
        cell: ResizableTitle,
      },
    };

    const resizableColumns = columns.map((col, index) => ({
      ...col,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));

    return (
      <Space direction='vertical' style={{width: '100%'}}>
        <div style={{marginBottom: 16}}>
          <Button
            type='primary'
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
            style={{marginRight: 10}}>
            Action
          </Button>
        </div>
        <Table
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [selectedRowKey],
            onChange: (selectedKeys) => this.onSelectChange(selectedKeys[0]),
          }}
          components={components}
          columns={resizableColumns}
          dataSource={data}
          scroll={{x: 'max-content'}}
        />
      </Space>
    );
  }
}

export default Page4;
