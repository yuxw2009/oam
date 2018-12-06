import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal } from 'antd'
const FormItem = Form.Item
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
      const data = {
        newItem: getFieldsValue(),
        oldItem: item,
        type: type
      }
      onOk(data)
    })
  }

  const modalOpts = {
    title: `${type === 'create' ? '添加记录' : '修改记录'}`,
    visible,
    onOk: handleOk,
    maskClosable:false,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="ID：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('id', {
            initialValue: item.id,
            rules: [
              {
                required: true,
                message: 'ID未填写',
              },
            ],
          })(<Input placeholder="请填写节点ID, 不能重复" />)}
        </FormItem>  
        <FormItem label="Name：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: '未填写Name',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="IP：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('localip', {
            initialValue: item.ip,
            rules: [
              {
                required: true,
                message: '未填写IP',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="NIC：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('nic', {
            initialValue: item.localport,
            rules: [
              {
                required: true,
                message: '未填写NIC',
              },
            ],
          })(<Input />)}
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
