import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import UserList from '../components/dataList'
import UserFilter from '../components/dataFilter'
import UserModal from './phoneModal'
import styles from '../components/dataList.less'
import { DropOption } from '../../components'
import { Modal, Row, Col, Button, Popconfirm } from 'antd'

function phone ({location, dispatch, phone, loading }) {
  const { list, pagination, currentItem, modalVisible, axModalVisible, modalType, isMotion, selectedRowKeys } = phone
  const { field, keyword } = location.query;
  const userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    axVisble: axModalVisible,
    onOk (data) {
      dispatch({
        type: `phone/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'phone/hideModal',
      })
    }
  }
 let selectedRows = [];
 const confirm = Modal.confirm;
 const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      userListProps.onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '您确定要删除这条记录吗?',
        onOk () {
          userListProps.onDeleteItem(record)
        },
      })
    }else{
    		 userListProps.onBindItem(record)
    }
  }
const scrollX = 1200;
 const columns = [
     {
      title: 'companyId',
      dataIndex: 'companyid',
      key: 'companyid',
     }, 
  	 {
      title: 'companyName',
      dataIndex: 'companyname',
      key: 'companyname',
    }, {
      title: 'X',
      dataIndex: 'xs',
      key: 'xs',
    },{
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '3', name: '分配a' }, { key: '2', name: '删除' }]} />
      },
    },
  ]

  const userListProps = {
    dataSource: list,
    loading,
    pagination,
    location,
    isMotion, 
    sWidth: 600,
    
    onPageChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    
    onDeleteItem (item) {
      dispatch({
        type: 'phone/delete',
        payload: {
        	  ...item,
        	  xs: [item.xs]
        },
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'phone/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    
    onBindItem (item) {
      dispatch({
        type: 'phone/showModal',
        payload: {
          modalType: 'bind',
          currentItem: item,
        },
      })
    },    
    columns,
    scrollX,
    rowSelection : {
	  onChange: (selectedRowKeys, selectedRow) => {
	  	   dispatch({
	        type: `phone/updateState`,
	        payload: {
            		selectedRowKeys: selectedRow,
          	},
	      })
	  }
	},
  }

  const handleDeleteItems = () => {
  	 let arr = new Array();
  	 selectedRowKeys.forEach((item)=>{
  	 	arr.push(item.xs)
  	 })
     dispatch({
        type: 'phone/delete',
        payload: {
        	  ...selectedRowKeys[0],
        	  xs: arr
        },
      })
  }

  const userFilterProps = {
    field,
    keyword,
    isMotion,
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/phone',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/phone',
      }))
    },
    onAdd () {
      dispatch({
        type: 'phone/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'phone/switchIsMotion' })
    },
    selectOptions: [{ value: 'name', name: '名称' }, { value: 'address', name: '地址' }],
  }

  const UserModalGen = () =>
    <UserModal {...userModalProps} />

  return (
    <div className="content-inner">
      <UserFilter {...userFilterProps} />
      {
         selectedRowKeys.length > 0 &&
           <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
             <Col>
               {`已选择 ${selectedRowKeys.length} 项 `}
                 <Popconfirm title={'Are you sure delete these items?'} onConfirm={handleDeleteItems} placement="left" >
                 <Button type="primary" size="large" style={{ marginLeft: 8 }}>删除</Button>
               </Popconfirm>
             </Col>
           </Row>
      } 
      <UserList {...userListProps} />
      <UserModalGen />
    </div>
  )
}

phone.propTypes = {
  phone: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ phone, loading }) => ({ phone, loading: loading.models.phone }))(phone)
