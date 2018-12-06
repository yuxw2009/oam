import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import UserList from '../components/dataList'
import UserFilter from '../components/dataFilter'
import styles from './index.less'
import Chart from './Chart'
import { DropOption } from '../../components'
import { Modal, Timeline, Layout, Input, Button, Spin} from 'antd'

const { Sider, Content, Header } = Layout;

function signaltrace ({location, dispatch, signaltrace }) {
  const {status, isMotion, loading} = signaltrace
  const { field, keyword } = location.query
  return (
    <div className="content-inner">
      <Chart dispatch={dispatch}/>
    </div>
  )
}

signaltrace.propTypes = {
  signaltrace: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ signaltrace, loading }) => ({ signaltrace, loading: loading.models.signaltrace }))(signaltrace)
