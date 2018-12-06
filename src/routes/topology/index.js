import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import UserList from '../components/dataList'
import styles from '../components/dataList.less'
import { DropOption } from '../../components'
import { Modal } from 'antd'
import Echart from './eChart'

function topology ({location, dispatch, topology, loading }) {
  const { list } = topology
  const { field, keyword } = location.query
  return (
    <div className="content-inner" style={{'height':'100%'}}>
        <Echart />
    </div>
  )
}

topology.propTypes = {
  topology: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ topology, loading }) => ({ topology, loading: loading.models.topology }))(topology)
