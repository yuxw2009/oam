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

function sip ({location, dispatch, sip, loading }) {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion } = sip
  const { field, keyword } = location.query
  const userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: `sip/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'sip/hideModal',
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
      title: 'Localip',
      dataIndex: 'localip',
      key: 'localip',
    }, {
      title: 'Localport',
      dataIndex: 'localport',
      key: 'localport',
      render: (text) => <span>{text}</span>,
    }, {
      title: 'Remoteip',
      dataIndex: 'remoteip',
      key: 'remoteip',
    }, {
      title: 'Remoteport',
      dataIndex: 'remoteport',
      key: 'remoteport',
      render: (text) => <span>{text}</span>,
    }, {
      title: 'Das',
      dataIndex: 'das',
      key: 'das',
    }, {
      title: 'Nodes',
      dataIndex: 'nodes',
      key: 'nodes',
      render: (text) => <span>{text.join(';')}</span>,
    },{
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
        type: 'sip/delete',
        payload: item,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'sip/showModal',
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
        pathname: '/sip',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/sip',
      }))
    },
    onAdd() {
      dispatch({
        type: 'sip/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion() {
      dispatch({ type: 'sip/switchIsMotion' })
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

sip.propTypes = {
  sip: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ sip, loading }) => ({ sip, loading: loading.models.sip }))(sip)
