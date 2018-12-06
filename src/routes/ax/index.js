import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import UserList from '../components/dataList'
import UserFilter from '../components/dataFilter'
import UserModal from './axModal'
import styles from '../components/dataList.less'
import { DropOption } from '../../components'
import { Modal } from 'antd'

function ax ({location, dispatch, ax, loading }) {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion } = ax
  const { field, keyword } = location.query
  const userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    dataSource:[],
    dispatch:dispatch,
    onOk (data) {
      dispatch({
        type: `ax/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'ax/hideModal',
      })
    },
  }
 const confirm = Modal.confirm
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
    } else if (e.key === '3') {
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
    },
    {
      title: 'A',
      dataIndex: 'a',
      key: 'a',
    }, {
      title: 'X',
      dataIndex: 'x',
      key: 'x',
    },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '3', name: '绑定B' }, { key: '1', name: '编辑' }, { key: '2', name: '删除' }]} />
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
        type: 'ax/delete',
        payload: item,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'ax/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    onBindItem(item){
       dispatch({
        type: 'ax/showModal',
        payload: {
          modalType: 'bind',
          currentItem: item,
        },
      })   	
    },
    columns,
    scrollX,
  }

  const userFilterProps = {
    field,
    keyword,
    isMotion,
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/ax',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/ax',
      }))
    },
    onAdd () {
      dispatch({
        type: 'ax/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'ax/switchIsMotion' })
    },
    selectOptions: [{ value: 'name', name: '名称' }, { value: 'address', name: '地址' }],
  }

  const UserModalGen = () =>
    <UserModal {...userModalProps} />
  return (
    <div className="content-inner">
      <UserFilter {...userFilterProps} />
      <UserList {...userListProps} />
      <UserModalGen />
    </div>
  )
}

ax.propTypes = {
  ax: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ ax, loading }) => ({ ax, loading: loading.models.ax }))(ax)
