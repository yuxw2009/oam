import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Select, Option, Modal } from 'antd'
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
        <FormItem label="a：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('a', {
            initialValue: item.a,
            rules: [
              {
                required: true,
                message: '未填写所在地',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="b：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('b', {
            initialValue: item.b,
            rules: [
              {
                required: true,
                message: 'b未填写',
              },
            ],
          })(<Input />)}
        </FormItem>       
        
         <FormItem label="trans：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('trans', {
            initialValue: item.trans||'',
            rules: [
              {
                required: false,
                message: 'trans未填写',
        
              },
            ],
          })(<Input />)}
        </FormItem>  
         <FormItem label="mode：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('mode', {
            initialValue: item.mode,
            rules: [
              {
                required: true,
                message: '请选择mode',
              },
            ],
          })(          	
			<Select>
			  <Option value="dual">dual</Option>
			  <Option value="single">single</Option>
			</Select>  
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
