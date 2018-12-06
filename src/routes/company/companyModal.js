import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal } from 'antd'

var md5=require('md5');

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
      let nitem = getFieldsValue();
      nitem = {
      	...nitem,
      	cdr_pushurl: nitem.cdr_pushurl || '',
      	cdrMode: nitem.cdrMode || '',
      	passwd: md5(nitem.passwd)
      }
      const data = {
        newItem: nitem,
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
        <FormItem  label="ID：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('id', {
            initialValue: item.id,
            rules: [
              {
                required: true,
                message: 'ID未填写',
              },
            ],
          })(<Input placeholder="请填写企业ID, 不能重复" />)}
        </FormItem>      
        <FormItem label="Name：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: 'Name未填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Passwd：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('passwd', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: 'Password未填写',
              },
            ],
          })(<Input/>)}
        </FormItem>
        <FormItem label="cdr_mode：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('cdr_mode', {
            initialValue: item.cdr_mode || ''
          })(<Input />)}
        </FormItem>
          <FormItem label="cdr_pushurl：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('cdr_pushurl', {
            initialValue: item.cdr_pushurl || ''
          })(<Input />)}
        </FormItem>
        
        <FormItem label="needVoip：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('needVoip', {
            initialValue: item.needVoip
          })(
      	    <Radio.Group>
              <Radio value>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>   
          )}
        </FormItem>
        <FormItem label="needPlaytone：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('needPlaytone', {
            initialValue: item.needPlaytone 
          })(
     	    <Radio.Group>
              <Radio value>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>             	
          )}
        </FormItem>      
        <FormItem label="needCompanyname：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('needCompanyname', {
            initialValue: item.needCompanyname
          })(
      	    <Radio.Group>
              <Radio value>是</Radio>
              <Radio value={false}>否</Radio>
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
