import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Select, Option } from 'antd'
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
      	das: nitem.das || '',
     
      }      
      
      let fieldsData = nitem;
      let arr = new Array();
      fieldsData.nodes = fieldsData.nodes ? fieldsData.nodes: [];
      if(fieldsData.nodes.indexOf(';') > 0 ){
      	fieldsData.nodes = fieldsData.nodes.split(';')
      }else{
      	fieldsData.nodes = [fieldsData.nodes]
      }
      console.log('fieldsData', fieldsData)
      const data = {
        newItem: fieldsData,
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

  const curNodes = item.nodes ? item.nodes.join(';') : '';
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
          })(<Input placeholder="请填写ID, 不能重复" />)}
        </FormItem>       
        <FormItem label="name：" hasFeedback {...formItemLayout}>
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
        <FormItem label="localip：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('localip', {
            initialValue: item.localip,
            rules: [
              {
                required: true,
                message: '未填写localip',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="localport：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('localport', {
            initialValue: item.localport || 5060,
            rules: [
              {
                required: true,
                message: '未填写localport',
              },
            ],
          })(<Input />)}
        </FormItem>            
        <FormItem label="remoteip：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remoteip', {
            initialValue: item.remoteip ,
            rules: [
              {
                required: true,
                message: '未填写remoteip',
              },
            ],
          })(<Input />)}
          </FormItem> 
         <FormItem label="remoteport：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remoteport', {
            initialValue: item.remoteport || 5060,
            rules: [
              {
                required: true,
                message: '未填写remoteport',
              },
            ],
          })(<Input />)}
        </FormItem>            
     	<FormItem label="das：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('das', {
            initialValue: item.das
          })(<Input />)}   
          </FormItem> 
       <FormItem label="nodes：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('nodes', {
            initialValue: curNodes
          })(<Input placeholder="多个用;号隔开"/>)}  
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
