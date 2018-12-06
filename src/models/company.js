import { create, remove, update, query } from '../services/company'
import { parse } from 'qs'
export default {
  namespace: 'company',
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
      	
        if (location.pathname === '/company') {
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
      if (data) {
        localStorage.setItem('companyInfo', JSON.stringify(data.data));
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data||[],
            pagination: data.page,
          },
        })
      }
    },
    *'delete' ({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload })
      if (data && data.success) {
      	localStorage.setItem('companyInfo', JSON.stringify(data.data));
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
    *create ({ payload }, { call, put }) {
      yield put({ type: 'hideModal' })
      const data = yield call(create, payload)
      if (data && data.success) {
      	localStorage.setItem('companyInfo', JSON.stringify(data.data));
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
      const data = yield call(update, payload)
      if (data && data.success) {
      	localStorage.setItem('companyInfo', JSON.stringify(data.data));
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