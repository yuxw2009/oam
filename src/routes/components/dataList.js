import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './dataList.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'

function list ({sWidth, loading, dataSource, pagination, onPageChange, onDeleteItem, onEditItem, isMotion, location, columns, rowSelection}) {

  const getBodyWrapperProps = {
    page: location.query.page,
    current: pagination.current,
  }
  
  const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }
  
  const selectedRowKeys = [];


  
  return (
    <div>
      <Table
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: sWidth }}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        rowSelection={rowSelection}
        simple
        rowKey={record => record.id || record.xs}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

list.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
  columns: PropTypes.array,
  scollX: PropTypes.number,
}

export default list
