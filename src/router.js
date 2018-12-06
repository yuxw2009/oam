import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './routes/app'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/ax').default)
          cb(null, { component: require('./routes/ax/').default })
        }, 'ax')
      },
    childRoutes: [
        {
          path: 'users',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/users').default)
              cb(null, require('./routes/users').default)
            }, 'users')
          },
        }, 
 		{
          path: 'company',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/company').default)
              cb(null, require('./routes/company/').default)
            }, 'company')
          },
        },  
  		{
          path: 'sip',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/sip').default)
              cb(null, require('./routes/sip/').default)
            }, 'sip')
          },
        }, 
	   {
          path: 'signaltrace',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/signaltrace').default)
              cb(null, require('./routes/signaltrace/').default)
            }, 'sip')
          },
        },  
   	   {
          path: 'logs',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/logs').default)
              cb(null, require('./routes/logs/').default)
            }, 'sip')
          },
        },  
   		{
          path: 'sip_p',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/sip_p').default)
              cb(null, require('./routes/sip_p/').default)
            }, 'sip_p')
          },
        },         
		{
          path: 'traffic',
          getComponent (nextState, cb) {
            require.ensure([], require => {
            	
              registerModel(app, require('./models/traffic').default)
              cb(null, require('./routes/traffic/').default)
              
            }, 'traffic')
          },
        }, 
		{
          path: 'topology',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/topology').default)
              cb(null, require('./routes/topology/').default)
            }, 'traffic')
          },
        },         
   		{
          path: 'ax',
          getComponent (nextState, cb) {
            require.ensure([], require => {
            	
              registerModel(app, require('./models/ax').default)
              cb(null, require('./routes/ax/').default)
              
            }, 'add')
          },
        }, 
   		{
          path: 'phone',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/phone').default)
              cb(null, require('./routes/phone/').default)
            }, 'phone')
          },
        }, 
    		{
          path: 'bind',
          getComponent (nextState, cb) {
          	
            require.ensure([], require => {
              registerModel(app, require('./models/bind').default)
              cb(null, require('./routes/bind/').default)
            }, 'bind')
            
          },
        },       
        {
          path: 'login',
          getComponent (nextState, cb) {
             require.ensure([], require => {
             	
               registerModel(app, require('./models/login').default)
               cb(null, require('./routes/login/').default)
               
             }, 'login')
          },
        }, 
        {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error/').default)
            }, 'error')
          },
        },
      ],
    },
  ]
  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
