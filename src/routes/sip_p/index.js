import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import UserList from '../components/dataList'
import UserFilter from '../components/dataFilter'
import UserModal from './sipModal'
import styles from '../components/dataList.less'
import { DropOption } from '../../components'
import { Modal } from 'antd'

function sip_p ({location, dispatch, sip_p, loading }) {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion } = sip_p
  const { field, keyword } = location.query
  const userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: `sip_p/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'sip_p/hideModal',
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
    }
    
  }

const scrollX = 1200;
 const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, 
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
    }, {
      title: 'NIC',
      dataIndex: 'nic',
      key: 'nic',
      render: (text) => <span>{text}</span>,
    },{
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: '删除' }]} />
      },
    }
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
        type: 'sip_p/delete',
        payload: item,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'sip_p/showModal',
        payload: {
          modalType: 'update',
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
        pathname: '/sip_p',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/sip_p',
      }))
    },
    onAdd () {
      dispatch({
        type: 'sip_p/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'sip_p/switchIsMotion' })
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

sip_p.propTypes = {
  sip_p: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ sip_p, loading }) => ({ sip_p, loading: loading.models.sip_p }))(sip_p)
