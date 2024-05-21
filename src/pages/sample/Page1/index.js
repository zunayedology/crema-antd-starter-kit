// import React, {useEffect, useState} from 'react';
// import {
//   Col,
//   Table,
//   Checkbox,
//   Card,
//   Menu,
//   Button,
//   Dropdown,
//   Input,
//   // Modal,
//   Divider,
//   Radio,
//   Spin,
//   Form,
//   Select,
//   DatePicker,
//   message,
//   Row,
//   Typography,
// } from 'antd';
// const {Search} = Input;
// const {Text} = Typography;
// import {DownOutlined, SearchOutlined} from '@ant-design/icons';
// import AppRowContainer from '../../../../@crema/core/AppRowContainer/AppRowSimpleContainer';
// import PropTypes from 'prop-types';
// // import ActionButton from '../../Common/ActionButton';
// import moment from 'moment';
// // import ReactDOM from 'react-dom';
// import {useNavigate} from 'react-router-dom';
// const {RangePicker} = DatePicker;
// import {
//   getManageCampaignPageableTableData,
//   // updateUserData,
//   // SaveUserTableData,
//   DeleteManageCampaginTableData,
//   getUserCampaignNumberListPauseData,
//   getUserCampaignNumberListStopData,
//   getUserCampaignNumberListResumeData,
//   // updateUserTabsInfoData,
// } from '../../../../redux/actions';
// import {useDispatch} from 'react-redux';
// import '../../Common/Settings.style.less';
// const {Option} = Select;
// import CommonModal from 'pages/mobireach/Common/commonModal';
// import CampaignSummaryModal from 'pages/mobireach/CampaignReport/CampaignSummaryModal';
// import CampaignDetailsSummaryModal from 'pages/mobireach/CampaignReport/CampaignDetailsSummaryModal';
// import {Resizable} from 'react-resizable';

// const ResizableTitle = ({onResize, width, ...restProps}) => {
//   if (!width) {
//     return <th {...restProps} />;
//   }

//   return (
//     <Resizable
//       width={width}
//       height={0}
//       handle={
//         <span
//           className='react-resizable-handle'
//           onClick={(e) => {
//             e.stopPropagation();
//           }}
//         />
//       }
//       onResize={onResize}
//       draggableOpts={{enableUserSelectHack: false}}>
//       <th {...restProps} />
//     </Resizable>
//   );
// };

// // const DeleteTableRowForm = ({visible, onCancel, onDelete, initialData}) => {
// //   return (
// //     <Modal
// //       visible={visible}
// //       title='Delete Ad Profile'
// //       okText='Delete'
// //       cancelText='Cancel'
// //       onCancel={onCancel}
// //       onOk={() => {
// //         onDelete(initialData);
// //       }}>
// //       <p>Are you sure you want to delete?</p>
// //     </Modal>
// //   );
// // };

// function onChange(pagination, filters, sorter, extra) {
//   console.log('params', pagination, filters, sorter, extra);
// }

// const ManageCampaign = () => {
//   const navigate = useNavigate();

//   const dispatch = useDispatch();
//   const token = localStorage.getItem('token');
//   const header = {
//     'Content-Type': 'application/json',
//     Authorization: 'Bearer ' + token,
//   };

//   const [pageableTableData, SetPageableTableData] = useState([]);
//   const [pageNumber, setPageNumber] = useState(1);
//   const pageSize = 10;
//   const [pageableObject, setPageableObject] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isRefresh, setIsRefresh] = useState(true);

//   const [deleteModalVisible, setDeleteModalVisible] = useState(false);
//   const [summaryModalVisible, setSummaryModalVisible] = useState(false);
//   // const [selectedRowIdToDelete, setSelectedRowIdToDelete] = useState(null);

//   const [selectedRowID, setSelectedRowID] = useState(null);
//   const [selectedRowKey, setSelectedRowKey] = useState(null);

//   const [nameSearch, setNameSearch] = useState('');
//   const [filterVisible, setFilterVisible] = useState(false);

//   const [isPauseButtonDisabled, setIsPauseButtonDisabled] = useState(true);
//   const [isResumeButtonDisabled, setIsResumeButtonDisabled] = useState(true);
//   const [isStopButtonDisabled, setIsStopButtonDisabled] = useState(true);
//   const [isModifyButtonDisabled, setIsModifyButtonDisabled] = useState(true);
//   const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = useState(true);
//   const [pauseButtonVisible, setPauseButtonVisible] = useState(false);
//   const [resumeButtonVisible, setResumeButtonVisible] = useState(false);
//   const [stopButtonVisible, setStopButtonVisible] = useState(false);
//   const [summaryDetailsVisible, setSummaryDetailsVisible] = useState(false);

//   const [searchRequestDto, setSearchRequestDto] = useState({
//     advisorName: null,
//     campaignName: null,
//     status: null,
//     startDate: null,
//     endDate: null,
//   });
//   const showFilterCard = () => {
//     setFilterVisible(true);
//   };

//   const hideFilterCard = () => {
//     setFilterVisible(false);
//     setSearchRequestDto({
//       advisorName: null,
//       campaignName: null,
//       status: null,
//       startDate: null,
//       endDate: null,
//     });
//   };
//   const handleFilterApply = (values) => {
//     // Handle filter apply logic (you'll implement this later)
//     console.log('Applied filters:', values);
//     // hideFilterCard();
//   };

//   useEffect(() => {
//     if (pageNumber && pageSize && isRefresh) {
//       (async () => {
//         try {
//           setIsLoading(true);
//           const res = await dispatch(
//             getManageCampaignPageableTableData(
//               header,
//               pageNumber,
//               pageSize,
//               searchRequestDto,
//             ),
//           );
//           if (res?.success) {
//             SetPageableTableData(res?.data?.dataList);
//             setPageableObject(res?.data?.pageable);
//             setIsLoading(false);
//           } else if (!res?.success) {
//             res?.data?.forEach((error) => {
//               message.error(error);
//             });
//             setIsLoading(false);
//           } else {
//             SetPageableTableData([]);
//             setPageableObject([]);
//             setIsLoading(false);
//           }
//         } catch (error) {
//           console.log('Manage Camapaign -' + error);
//           setIsLoading(false);
//         } finally {
//           // setIsLoading(false);
//           setIsRefresh(false);
//         }
//       })();
//     }
//   }, [dispatch, pageNumber, pageSize, nameSearch, isRefresh]);

//   useEffect(() => {
//     if (selectedRowID !== null) {
//       const selectedRowData = pageableTableData?.find(
//         (row) => row.id === selectedRowID,
//       );
//       if (selectedRowData) {
//         setIsPauseButtonDisabled(!selectedRowData.isPauseAble);
//         setIsResumeButtonDisabled(!selectedRowData.isResumeAble);
//         setIsStopButtonDisabled(!selectedRowData.isStopAble);
//         setIsModifyButtonDisabled(!selectedRowData.isModifyAble);
//         setIsDeleteButtonDisabled(!selectedRowData.isDeleteAble);
//       }
//     }
//   }, [selectedRowID, pageableTableData]);

//   const openDeleteModal = () => {
//     setDeleteModalVisible(true);
//   };
//   const openPauseModal = () => {
//     setPauseButtonVisible(true);
//   };
//   const openStopModal = () => {
//     setStopButtonVisible(true);
//   };
//   const openResumeModal = () => {
//     setResumeButtonVisible(true);
//   };

//   const openSummaryDetailsVisible = (e) => {
//     const key = e.target.value;
//     setSelectedRowKey(key);
//     setSelectedRowID(key !== null ? key : null);
//     setSummaryDetailsVisible(true);
//   };
//   const onRadioChange = (e) => {
//     const key = e.target.value;
//     setSelectedRowKey(key);
//     setSelectedRowID(key !== null ? key : null);
//   };
//   const openSummaryModal = () => {
//     setSummaryModalVisible(true);
//   };

//   const handleInputChange = () => {
//     setSearchRequestDto({...searchRequestDto, campaignName: nameSearch});
//     setPageNumber(1);
//     setIsRefresh(true);
//   };

//   const onDelete = async (values) => {
//     try {
//       const res = await dispatch(DeleteManageCampaginTableData(header, values));
//       // const updatedData = pageableTableData.filter((item) => item.id !== values);
//       // SetPageableTableData(updatedData);
//       if (res.success) {
//         setDeleteModalVisible(false);
//         setIsRefresh(true);
//         message.success('Successfully Deleted.');
//       } else {
//         setDeleteModalVisible(false);
//         message.error('Sorry! Not able to delete.');
//       }
//     } catch (errr) {
//       console.log('Delete function issue');
//     }
//   };
//   const handlePauseButtonClick = async () => {
//     try {
//       if (selectedRowID) {
//         console.log('selectedRowID::' + selectedRowID);

//         console.log('Before dispatch');
//         const res = await dispatch(
//           getUserCampaignNumberListPauseData(header, selectedRowID),
//         );
//         if (res?.success) {
//           setPauseButtonVisible(false);
//           message.success('Successfully done.');
//           setIsRefresh(true);
//         } else {
//           setPauseButtonVisible(false);
//           res?.data?.forEach((error) => {
//             message.error(error, 5);
//           });
//         }

//         console.log('After dispatch');
//         // console.log('Campaign paused successfully:', response);
//       } else {
//         console.error('Selected row ID is undefined or null.');
//       }
//     } catch (error) {
//       console.error('Error pausing campaign:', error);
//     }
//   };

//   const handleResumeButtonClick = async () => {
//     try {
//       if (selectedRowID) {
//         console.log('selectedRowID::' + selectedRowID);

//         console.log('Before dispatch');
//         dispatch(getUserCampaignNumberListResumeData(header, selectedRowID));
//         setResumeButtonVisible(false);
//         setIsRefresh(true);

//         console.log('After dispatch');
//         // console.log('Campaign paused successfully:', response);
//       } else {
//         console.error('Selected row ID is undefined or null.');
//       }
//     } catch (error) {
//       console.error('Error Resuming campaign:', error);
//     }
//   };

//   const handleStopButtonClick = async () => {
//     try {
//       if (selectedRowID) {
//         console.log('selectedRowID::' + selectedRowID);

//         console.log('Before dispatch');
//         dispatch(getUserCampaignNumberListStopData(header, selectedRowID));
//         setStopButtonVisible(false);
//         setIsRefresh(true);

//         console.log('After dispatch');
//         // console.log('Campaign paused successfully:', response);
//       } else {
//         console.error('Selected row ID is undefined or null.');
//       }
//     } catch (error) {
//       console.error('Error Stopping campaign:', error);
//     }
//   };

//   // const handlePauseButtonClick = async (values) => {

//   //     if (selectedRowID) {
//   //       const response = await dispatch(
//   //         getUserCampaignNumberListPauseData(header, selectedRowIdToDelete.id),
//   //       );
//   //       if (response && response.success) {
//   //         message.success("Successfully Deleted Medium");
//   //         dispatch(getMediumsTableData(header));
//   //       }else {
//   //         message.error("Failed to delete Medium");
//   //       }
//   //       console.log('Deleted Medium ID:: ' + selectedRowIdToDelete.id);
//   //     }
//   //   setDeleteModalVisible(false);

//   // };
//   const [ManageCampaign, setManageCampaign] = useState([
//     {
//       title: '',
//       dataIndex: 'radio',
//       key: 'radio',
//       render: (text, record) => (
//         <Radio
//           value={record.id}
//           checked={selectedRowKey === record.id}
//           onChange={onRadioChange}
//         />
//       ),

//       width: 50,
//       align: 'center',
//     },
//     {
//       title: 'Advertiser',
//       dataIndex: 'advisor',
//       sorter: (a, b) => a.advisor.length - b.advisor.length,
//       sortDirections: ['descend'],
//       ellipsis: true,
//       minWidth: 60,
//       width: 75,
//     },
//     {
//       title: 'Campaign Name',
//       dataIndex: 'name',
//       sorter: (a, b) => a.name.length - b.name.length,
//       sortDirections: ['descend'],
//       minWidth: 60,
//       width: 90,
//       ellipsis: true,
//       render: (text) => (
//         <Text underline onClick={openSummaryDetailsVisible}>
//           {text}
//         </Text>
//       ),
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       sorter: (a, b) => a.status.length - b.status.length,
//       sortDirections: ['descend'],
//       minWidth: 60,
//       width: 70,
//     },
//     {
//       title: 'Channels',
//       dataIndex: 'channels',
//       sorter: (a, b) => a.channels.length - b.channels.length,
//       sortDirections: ['descend'],
//       ellipsis: true,
//       minWidth: 60,
//       width: 75,
//     },
//     {
//       title: 'Impressions',
//       dataIndex: 'impression',
//       // sorter: (a, b) => a.impression.length - b.impression.length,
//       // sortDirections: ['descend'],
//       ellipsis: true,
//       minWidth: 50,
//       width: 60,
//     },
//     {
//       title: 'Reach',
//       dataIndex: 'reach',
//       // sorter: (a, b) => a.reach.length - b.reach.length,
//       // sortDirections: ['descend'],
//       minWidth: 50,
//       width: 60,
//     },
//     {
//       title: 'Spent',
//       dataIndex: 'spent',
//       render: (text) => (text ? parseFloat(text).toFixed(5) : 0.0),
//       minWidth: 50,
//       width: 60,
//     },
//     {
//       title: 'Est. Impressions',
//       dataIndex: 'estImpression',
//       ellipsis: true,
//       minWidth: 60,
//       width: 75,
//     },
//     {
//       title: 'SMS Count',
//       dataIndex: 'totalSmsCount',
//       ellipsis: true,
//       minWidth: 60,
//       width: 75,
//     },
//     {
//       title: 'Est. Budget',
//       dataIndex: 'estBudget',
//       render: (text) => (text ? parseFloat(text).toFixed(5) : 0.0),
//       ellipsis: true,
//       minWidth: 60,
//       width: 75,
//     },
//     {
//       title: 'Start Date',
//       dataIndex: 'startDate',
//       sorter: (a, b) => moment(a.startDate) - moment(b.startDate),
//       sortDirections: ['ascend', 'descend'],
//       render: (text) => moment(text).format('YYYY-MM-DD'),
//       ellipsis: true,
//       minWidth: 60,
//       width: 75,
//     },
//     {
//       title: 'End Date',
//       dataIndex: 'endDate',
//       sorter: (a, b) => moment(a.endDate) - moment(b.endDate),
//       sortDirections: ['ascend', 'descend'],
//       render: (text) => moment(text).format('YYYY-MM-DD'),
//       ellipsis: true,
//       minWidth: 60,
//       width: 75,
//     },
//   ]);
//   const components = {
//     header: {
//       cell: ResizableTitle,
//     },
//   };
//   const handleResize =
//     (index) =>
//     (e, {size}) => {
//       setManageCampaign((prevColumns) => {
//         const nextColumns = [...prevColumns];
//         nextColumns[index] = {
//           ...nextColumns[index],
//           width: size.width,
//         };
//         return nextColumns;
//       });
//     };
//   const resizableColumns = ManageCampaign.map((col, index) => ({
//     ...col,
//     onHeaderCell: (column) => ({
//       width: column.width,
//       onResize: handleResize(index),
//     }),
//   }));

//   const [visibleColumns, setVisibleColumns] = useState(
//     ManageCampaign.map((column) => column.dataIndex),
//   );
//   const handleMenuClick = (e) => {
//     const {key} = e;
//     if (key === 'all') {
//       setVisibleColumns(ManageCampaign.map((column) => column.dataIndex));
//     } else {
//       const dataIndex = key;
//       if (visibleColumns.includes(dataIndex)) {
//         setVisibleColumns(visibleColumns.filter((item) => item !== dataIndex));
//       } else {
//         setVisibleColumns([...visibleColumns, dataIndex]);
//       }
//     }
//   };

//   const menu = (
//     <Menu onClick={handleMenuClick}>
//       <Menu.Item key='all'>
//         <Checkbox checked={visibleColumns.length === ManageCampaign.length}>
//           Select All
//         </Checkbox>
//       </Menu.Item>
//       {ManageCampaign.map((column) => (
//         <Menu.Item key={column.dataIndex}>
//           <Checkbox checked={visibleColumns.includes(column.dataIndex)}>
//             {column.title}
//           </Checkbox>
//         </Menu.Item>
//       ))}
//     </Menu>
//   );
//   const validateDateRange = async (_, dateRange) => {
//     if (!dateRange) return;
//     const [startDate, endDate] = dateRange;

//     if (startDate && endDate && startDate.isAfter(endDate)) {
//       throw new Error('End date must be equal to or later than start date');
//     }
//   };

//   const handleDateChange = (dates) => {
//     try {
//       console.log('Date access-', dates);
//       if (!dates || dates.length !== 2) {
//         message.error('Invalid dates:' + dates);
//         return;
//       }
//       console.log('Check-', dates);
//       const [startDate, endDate] = dates;
//       setSearchRequestDto({
//         ...searchRequestDto,
//         startDate: startDate ? startDate.format('YYYY-MM-DD') : undefined,
//         endDate: endDate ? endDate.format('YYYY-MM-DD') : undefined,
//       });
//     } catch (error) {
//       console.error('Error during date change:');
//     }
//   };

//   const handleRefresh = () => {
//     setPageNumber(1);
//     setNameSearch(null);
//     setSelectedRowID(null);
//     setSelectedRowKey(null);
//     setSearchRequestDto({
//       advisorName: null,
//       campaignName: null,
//       status: null,
//       startDate: null,
//       endDate: null,
//     });
//     hideFilterCard();
//     setIsRefresh(true);
//     handleAdvanceFIlter;
//   };

//   const handleAdvanceFIlter = () => {
//     setPageNumber(1);
//     setIsRefresh(true);
//   };

//   const handlePageNext = (newPage) => {
//     setPageNumber(newPage);
//     setIsRefresh(true);
//   };

//   return (
//     <>
//       <AppRowContainer>
//         <Col xs={24} lg={24} key='input-d'>
//           <Card>
//             <div className='ManageNumberListItem'>
//               <h1>Manage Campaign</h1>
//               <div>
//                 <Search
//                   placeholder='search campaign name'
//                   value={nameSearch}
//                   onChange={(e) => setNameSearch(e.target.value)}
//                   onSearch={handleInputChange}
//                   style={{width: 300, fontSize: 14, color: '#1677ff'}}
//                   enterButton
//                 />
//                 <Button
//                   type='primary'
//                   onClick={showFilterCard}
//                   icon={<SearchOutlined />}>
//                   Advance
//                 </Button>
//                 {/* <Button type='primary' onClick={onOpenAddModal}>
//                 + New User
//               </Button> */}
//               </div>
//             </div>
//             <Divider />
//             {filterVisible && (
//               <Card
//                 title='Advance Filters'
//                 extra={<Button onClick={hideFilterCard}>Close</Button>}
//                 style={{marginBottom: 16}}>
//                 <Form layout='vertical' onFinish={handleFilterApply}>
//                   <Row>
//                     <Col span={12}>
//                       <Form.Item label='Advertiser Name'>
//                         <Input
//                           style={{width: '80%', marginRight: '5%'}}
//                           value={searchRequestDto?.advisorName}
//                           placeholder='Please Input Advertiser Name'
//                           onChange={(e) =>
//                             setSearchRequestDto({
//                               ...searchRequestDto,
//                               advisorName: e?.target?.value,
//                             })
//                           }
//                         />
//                       </Form.Item>
//                     </Col>
//                     <Col span={12}>
//                       <Form.Item label='Status'>
//                         <Select
//                           placeholder='Select status'
//                           value={searchRequestDto?.status}
//                           style={{width: '80%', marginRight: '5%'}}
//                           onChange={(e) =>
//                             setSearchRequestDto({
//                               ...searchRequestDto,
//                               status: e,
//                             })
//                           }>
//                           <Option value={6}>Scheduled</Option>
//                           <Option value={255}>Incomplete</Option>
//                           <Option value={10}>Complete</Option>
//                           <Option value={1}>Running</Option>
//                           <Option value={0}>Pause</Option>
//                           <Option value={4}>Processing</Option>
//                           <Option value={5}>Pending Approval</Option>
//                           <Option value={13}>Stopped</Option>
//                           <Option value={20}>Rejected</Option>
//                           <Option value={9}>Expired</Option>
//                         </Select>
//                       </Form.Item>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col span={12}>
//                       <Form.Item
//                         label='Start/End Date'
//                         rules={[
//                           {
//                             required: true,
//                             message: 'Please select start and end date',
//                           },
//                           {validator: validateDateRange},
//                         ]}>
//                         <RangePicker onChange={handleDateChange} />
//                       </Form.Item>
//                     </Col>
//                     <Col span={12}>
//                       <Form.Item>
//                         <Button
//                           style={{margin: '15px', alignItems: 'right'}}
//                           type='primary'
//                           htmlType='submit'
//                           onClick={handleAdvanceFIlter}>
//                           Apply Filters
//                         </Button>
//                       </Form.Item>
//                     </Col>
//                   </Row>
//                 </Form>
//               </Card>
//             )}
//             <div className='ManageNumberListItem'>
//               <div>
//                 <Button
//                   style={{marginRight: 3}}
//                   type='primary'
//                   disabled={!selectedRowID || isPauseButtonDisabled}
//                   className='user_button'
//                   onClick={openPauseModal}>
//                   Pause
//                 </Button>
//                 <Button
//                   style={{marginRight: 3}}
//                   type='primary'
//                   disabled={!selectedRowID || isResumeButtonDisabled}
//                   className='user_button'
//                   onClick={openResumeModal}>
//                   Resume
//                 </Button>
//                 <Button
//                   style={{marginRight: 3}}
//                   type='primary'
//                   disabled={!selectedRowID || isStopButtonDisabled}
//                   className='user_button'
//                   onClick={openStopModal}>
//                   Stop
//                 </Button>
//                 <Button
//                   style={{marginRight: 3}}
//                   type='primary'
//                   disabled={!selectedRowID || isModifyButtonDisabled}
//                   className='user_button'
//                   onClick={() =>
//                     navigate(
//                       `/mobireach/Campaigns/CreateCampaign/${selectedRowID}`,
//                     )
//                   }>
//                   Modify
//                 </Button>
//                 <Button
//                   style={{marginRight: 3}}
//                   type='primary'
//                   className='user_button'
//                   disabled={!selectedRowID || isDeleteButtonDisabled}
//                   onClick={openDeleteModal}>
//                   Delete
//                 </Button>
//                 <Button
//                   style={{marginRight: 3}}
//                   type='primary'
//                   className='user_button'
//                   disabled={!selectedRowID || isDeleteButtonDisabled}
//                   onClick={openSummaryModal}>
//                   Summary
//                 </Button>
//                 <Button
//                   style={{marginRight: 3}}
//                   type='primary'
//                   className='user_button'
//                   onClick={() => handleRefresh()}>
//                   Refresh
//                 </Button>
//               </div>

//               <Dropdown overlay={menu} trigger={['click']}>
//                 <a
//                   className='ant-dropdown-link'
//                   onClick={(e) => e.preventDefault()}>
//                   Filter <DownOutlined />
//                 </a>
//               </Dropdown>
//             </div>
//             <CommonModal
//               visible={deleteModalVisible}
//               onCancel={() => {
//                 setDeleteModalVisible(false);
//               }}
//               action={onDelete}
//               selectedID={selectedRowID}
//               actionTitle={'Delete Campaign'}
//               actionButtonText={'Delete'}
//             />
//             <CommonModal
//               visible={stopButtonVisible}
//               onCancel={() => {
//                 setStopButtonVisible(false);
//               }}
//               action={handleStopButtonClick}
//               selectedID={selectedRowID}
//               actionTitle={'Stop Campaign'}
//               actionButtonText={'Stop'}
//             />
//             <CommonModal
//               visible={pauseButtonVisible}
//               onCancel={() => {
//                 setPauseButtonVisible(false);
//               }}
//               action={handlePauseButtonClick}
//               selectedID={selectedRowID}
//               actionTitle={'Pause Campaign'}
//               actionButtonText={'Pause'}
//             />
//             <CommonModal
//               visible={resumeButtonVisible}
//               onCancel={() => {
//                 setResumeButtonVisible(false);
//               }}
//               action={handleResumeButtonClick}
//               selectedID={selectedRowID}
//               actionTitle={'Resume Campaign'}
//               actionButtonText={'Resume'}
//             />
//             {summaryModalVisible && (
//               <CampaignSummaryModal
//                 visible={summaryModalVisible}
//                 onCancel={() => {
//                   setSummaryModalVisible(false);
//                 }}
//                 selectedID={selectedRowID}
//               />
//             )}

//             {summaryDetailsVisible && (
//               <CampaignDetailsSummaryModal
//                 visible={summaryDetailsVisible}
//                 onCancel={() => {
//                   setSummaryDetailsVisible(false);
//                 }}
//                 selectedID={selectedRowID}
//               />
//             )}
//             {/* <DeleteTableRowForm
//               visible={deleteModalVisible}
//               onCancel={() => {
//                 setDeleteModalVisible(false);
//               }}
//               onDelete={onDelete}
//               initialData={selectedRowIdToDelete}
//             /> */}
//             {isLoading ? (
//               <div className='Spincenter'>
//                 <Spin />
//               </div>
//             ) : (
//               <div style={{marginTop: 16, overflowX: 'auto'}}>
//                 <Table
//                   size='small'
//                   bordered
//                   pagination={{
//                     current: pageNumber,
//                     pageSize: pageSize,
//                     onChange: (newPage) => handlePageNext(newPage),
//                     showSizeChanger: false,
//                     total: pageableObject?.totalElements,
//                   }}
//                   onRow={(record) => ({
//                     onClick: () => onRadioChange({target: {value: record.id}}), // Call onRadioChange on row click
//                   })}
//                   columns={resizableColumns.filter((column) =>
//                     visibleColumns.includes(column.dataIndex),
//                   )}
//                   components={components}
//                   dataSource={pageableTableData?.map((row, index) => ({
//                     ...row,
//                     key: index,
//                   }))}
//                   onChange={onChange}
//                 />
//               </div>
//             )}
//           </Card>
//         </Col>
//       </AppRowContainer>
//     </>
//   );
// };

// export default ManageCampaign;
// const customStyle = `
//   .ant-btn {
//     height: 33px;
//   }
// `;

// const styleTag = document.createElement('style');
// styleTag.type = 'text/css';
// styleTag.appendChild(document.createTextNode(customStyle));
// document.head.appendChild(styleTag);

// // DeleteTableRowForm.propTypes = {
// //   visible: PropTypes.bool,
// //   onCancel: PropTypes.func,
// //   onDelete: PropTypes.func,
// //   initialData: PropTypes.object,
// // };
// ResizableTitle.propTypes = {
//   onResize: PropTypes.func.isRequired,
//   width: PropTypes.number.isRequired,
// };
