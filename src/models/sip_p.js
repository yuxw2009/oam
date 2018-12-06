import { create, remove, update, query } from '../services/sip_p'
import { parse } from 'qs'
export default {
  namespace: 'sip_p',
  state: {
    list: [],
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    isMotion: localStorage.getItem('antdAdminUserIsMotion') === 'true',
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/sip_p') {
          dispatch({
            type: 'query',
            payload: location.query
          })
        }
      })
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {
      const data = yield call(query, parse(payload))
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data || [],
            pagination: data.page,
          },
        })
      }else{
      		throw data
      }
    },
    *'delete' ({ payload }, { call, put }) {
      const data = yield call(remove,  payload )
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data||[],
            pagination: {
              total: data.page.total,
              current: data.page.current,
            },
          },
        })
      }else{
      	throw data
      }
    },
    *create ({ payload }, { call, put }) {
      yield put({ type: 'hideModal' })
      console.log(payload);
      const data = yield call(create, payload)
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.page.total,
              current: data.page.current,
            },
          },
        })
      }else{
      	throw data
      }
    },
    *update ({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' })
//    const id = yield select(({ sip_p }) => sip_p.currentItem.id)
//    const newUser = { ...payload, id }
//    const data = yield call(update, newUser)
      const data = yield call(update, payload)
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.page.total,
              current: data.page.current,
            },
          },
        })
      }
    },
    *switchIsMotion ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchIsMotion',
      })
    },
  },

  reducers: {
    querySuccess (state, action) {
      const { list, pagination } = action.payload
      return { ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        } }
    },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    handleSwitchIsMotion (state) {
      localStorage.setItem('antdAdminUserIsMotion', !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },
  },

}
