import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import UserList from '../components/dataList'
import styles from '../components/dataList.less'
import { DropOption } from '../../components'
import { Modal } from 'antd'
import Echart from './eChart'

function traffic ({location, dispatch, traffic, loading }) {
  const { list } = traffic
  const { field, keyword } = location.query
  
  return (
    <div className="content-inner" style={{'height':'100%'}}>
        <Echart list={list}/>
    </div>
  )
}

traffic.propTypes = {
  traffic: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ traffic, loading }) => ({ traffic, loading: loading.models.traffic }))(traffic)
