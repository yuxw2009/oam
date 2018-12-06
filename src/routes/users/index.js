import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import UserList from '../components/dataList'
import UserFilter from '../components/dataFilter'
import UserModal from './UserModal'
import styles from '../components/dataList.less'
import { DropOption } from '../../components'
import { Modal } from 'antd'

function Users ({ location, dispatch, users, loading }) {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion } = users
  const { field, keyword } = location.query
  const userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: `users/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
    	
      dispatch({
        type: 'users/hideModal',
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
          userListProps.onDeleteItem(record._id)
        },
      })
    }
  }
 const scrollX = 1200;
 const columns = [
     {
      title: '管理员名称',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    // render: (text) => <span>{text}岁</span>,
    }, {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
      render: (text) => <span>{text}</span>
    },{
      title: '权限',
      dataIndex: 'permissions',
      key: 'permissions',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: '删除' }]} />
      },
    },
  ]
 
  const userListProps = {
    dataSource: list,
    loading,
    pagination,
    location,
    isMotion,
    sWidth: 500,
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
    onDeleteItem (id) {
      dispatch({
        type: 'users/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    columns,
  }


  const userFilterProps = {
    field,
    keyword,
    isMotion,
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/users',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/users',
      }))
    },
    onAdd () {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'users/switchIsMotion' })
    },
    selectOptions: [{ value: 'name', name: '用户名' }],
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

Users.propTypes = {
  users: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ users, loading }) => ({ users, loading: loading.models.users }))(Users)
