import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal } from 'antd'
const FormItem = Form.Item

var md5=require('md5');

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  visible,
  type,
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      let nitem = getFieldsValue();
      nitem = {
      	...nitem,
      	password: md5(nitem.password)
      }      
      
      const data = {
        ...nitem,
        key: item.key,
        id: item._id
      }
      onOk(data)
    })
  }

  const modalOpts = {
    title: `${type === 'create' ? '新建用户' : '修改用户'}`,
    visible,
    onOk: handleOk,
    maskClosable:false,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }
  const dis = (type === 'create' ? false:true);
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="用户名：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('username', {
            initialValue: item.username,
            rules: [
              {
                required: true,
                message: '用户名未填写',
              },
            ],
          })(<Input disabled={dis}/>)}
        </FormItem>
        <FormItem label="密码：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('password', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: '密码未填写',
              },
            ],
          })(<Input type="password" />)}
        </FormItem>
        <FormItem label="权限" hasFeedback {...formItemLayout}>
          {getFieldDecorator('permissions', {
            initialValue: item.permissions == "guest" ? false : true,
            rules: [
              {
                required: true,
                type: 'boolean',
                message: '请选择性别',
              },
            ],
          })(
            <Radio.Group>
              <Radio value>管理员</Radio>
              <Radio value={false}>guest</Radio>
            </Radio.Group>
          )}
        </FormItem>
        
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  type: PropTypes.string,
  item: PropTypes.object,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
