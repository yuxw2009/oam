import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import UserList from '../components/dataList'
import UserFilter from '../components/dataFilter'
import styles from '../components/dataList.less'
import { DropOption } from '../../components'
import { Modal } from 'antd'

function Logs ({location, dispatch, logs, loading }) {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion } = logs
  const { field, keyword } = location.query
  const scrollX = 1200;
  const columns = [
     {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    }, 
     {
      title: '客户端IP',
      dataIndex: 'ip',
      key: 'ip',
    }, 
    {
      title: '模块',
      dataIndex: 'type',
      key: 'type',
    }, 
     {
      title: '操作方式',
      dataIndex: 'method',
      key: 'method',
      render: (text) => <span style={{'textAlign':'left'}}>{text}</span>,
    },   
    {
      title: '操作数据',
      dataIndex: 'options',
      key: 'options',
      width: '42%',
      render: (text) => <span style={{'textAlign':'left'}}>{text}</span>,
    },    
    {
      title: '操作结果',
      dataIndex: 'result',
      key: 'result',
      render: (text) => <span>{text}</span>,
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
    columns,
    scrollX,
  }
  
  return (
    <div className="content-inner">
  
      <UserList {...userListProps} />

    </div>
  )
}

Logs.propTypes = {
  logs: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ logs, loading }) => ({ logs, loading: loading.models.logs }))(Logs)
