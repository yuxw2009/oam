import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Select, Option, Radio, Modal } from 'antd'
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
    title: `${type === 'create' ? '添加号码段' : '修改号码段'}`,
    visible,
    onOk: handleOk,
    maskClosable:false,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }
  
  var phoneChange = (e)=>{
  	 let a =  e.target.value;
  	 let b = a.replace(/([^\u0000-\u00FF]|[a-zA-Z]|[\\s~·`!！@#￥$%^……&*（()）;])/g, ""); 
     e.target.value = b;
  }
  
  const companyInfo = localStorage.getItem('companyInfo') != 'undefined' ? JSON.parse(localStorage.getItem('companyInfo')) : [];
  const companyOptions = companyInfo.map(item => {
	return <Option value={item.id}>{item.name}</Option>;
  });
  
  if(type !== 'bind'){
	  return (
	    <Modal {...modalOpts}>
	      <Form layout="horizontal">
	        <FormItem label="企业名称：" hasFeedback {...formItemLayout}>
	          {getFieldDecorator('companyid', {
	            initialValue: item.companyid,
	            rules: [
	              {
	                required: true,
	                message: '请选择企业',
	              },
	            ],
	          })(<Select placeholder="请选择企业">
	  				{companyOptions}
				</Select>)}
	        </FormItem>
	        <FormItem label="号码段：" hasFeedback {...formItemLayout}>
	          {getFieldDecorator('num_str', {
	            initialValue: item.num_str,
	            rules: [
	              {
	                required: true,
	                message: '未填写号码段',
	              },
	            ],
	          })(<Input onKeyUp={phoneChange} placeholder="请输入号码段，如：1,2,3,6-9" />)}
	        </FormItem>
	      </Form>
	    </Modal>
	  )
  }else{
	  return (
	    <Modal {...modalOpts}>
	      <Form layout="horizontal" disabled>
	        <FormItem label="企业名称：" hasFeedback {...formItemLayout}>
	          {getFieldDecorator('companyid', {
	            initialValue: item.companyid,
	            rules: [
	              {
	                required: true,
	                message: '请选择企业',
	              },
	            ],
	          })(<Select placeholder="请选择企业" disabled>
	  				{companyOptions}
				</Select >)}
	        </FormItem>   
	        <FormItem label="x：" hasFeedback {...formItemLayout}>
	          {getFieldDecorator('x', {
	            initialValue: item.xs,
	            rules: [
	              {
	                required: true,
	                message: 'x',
	              },
	            ],
	          })(<Input disabled/>)}
	        </FormItem>
	        <FormItem label="a：" hasFeedback {...formItemLayout}>
	          {getFieldDecorator('a', {
	            initialValue: item.a,
	            rules: [
	              {
	                required: true,
	                message: 'a',
	              },
	            ],
	          })(<Input/>)}
	        </FormItem>	 
	      </Form>
	    </Modal>
	  )  	
  }
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
