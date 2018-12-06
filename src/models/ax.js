import { create, remove, update,bind_b, getX, query } from '../services/ax'
import { parse } from 'qs'
import { routerRedux } from 'dva/router'

export default {
  namespace: 'ax',
  state: {
    list: [],
    currentItem: {},
    dataSource:[],
    modalVisible: false,
    modalType: 'create',
    inTime:0,
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
	        if (location.pathname === '/ax') {
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
            list: data.data||[],
            pagination: data.page,
          },
        })
      }
    },
    *'delete' ({ payload }, { call, put }) {
      const data = yield call(remove,  payload)
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
    *create ({ payload }, { call, put }) {
      yield put({ type: 'hideModal' })
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
      }else{
      	throw data
      }
    },
     *bind ({ payload }, { select, call, put }) {
       yield put({ type: 'hideModal' })
	   payload.olditem = {};
	   payload.type = 'create';
       const data = yield call(bind_b, payload)
      if (data && data.success) {
      	  yield put(routerRedux.push('/bind'));
      }else{
      	throw data
      }
    }, 
    *getX ({ payload }, { select, call, put }) {
	    const data = yield call(getX, payload)
	    if (data && data.success) {
	    	  console.log('data', data);
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
    addd (state, action) {
       return { ...state, currentItem: action.payload}
    },
    handleSwitchIsMotion (state) {
       localStorage.setItem('antdAdminUserIsMotion', !state.isMotion)
       return { ...state, isMotion: !state.isMotion }
    },
  },

}
