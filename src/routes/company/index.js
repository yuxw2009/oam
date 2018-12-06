import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import UserList from '../components/dataList'
import UserFilter from '../components/dataFilter'
import UserModal from './companyModal'
import styles from '../components/dataList.less'
import { DropOption } from '../../components'
import { Modal } from 'antd'

function company ({location, dispatch, company, loading }) {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion } = company
  const { field, keyword } = location.query
  const userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: `company/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'company/hideModal',
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
          userListProps.onDeleteItem(record.id)
        },
      })
    }
  }
  const scrollX = 1200;

 const columns = [
     {
      title: 'companyId',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'companyName',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Password',
      dataIndex: 'passwd',
      key: 'passwd',
    }, {
      title: 'cdrMode',
      dataIndex: 'cdr_mode',
      key: 'cdr_mode',
      render: (text) => <span>{text}</span>,
    },{
      title: 'cdrPushUrl',
      dataIndex: 'cdr_pushurl',
      key: 'cdr_pushurl',
    }, {
      title: 'needVoip',
      dataIndex: 'needVoip',
      key: 'needVoip',
      render: (text) => <span>{text?'true':'false'}</span>,
    }, {
      title: 'needPlaytone',
      dataIndex: 'needPlaytone',
      key: 'needPlaytone',
      render: (text) => <span>{text?'true':'false'}</span>,
    },{
      title: 'needCompanyname',
      dataIndex: 'needCompanyname',
      key: 'needCompanyname',
      render: (text) => <span>{text?'true':'false'}</span>,
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
    onDeleteItem (id) {
      dispatch({
        type: 'company/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'company/showModal',
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
        pathname: '/company',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/company',
      }))
    },
    onAdd () {
      dispatch({
        type: 'company/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'company/switchIsMotion' })
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

company.propTypes = {
  company: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ company, loading }) => ({ company, loading: loading.models.company }))(company)
