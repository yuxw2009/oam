import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Select, Option, Radio, Modal , AutoComplete} from 'antd'
import { request, config } from '../../utils'
import  Complete from './Complete'
import ReactDOM from 'react-dom'

const { api } = config
const { phone} = api

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
  dataSource,
  dispatch,
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => { 
  var newItemObj ={};
  
  function handleOk () {
  
    validateFields((errors) => {
      if (errors) {
        return
      }
      
		let newItem = getFieldsValue();
	  	if(type!= "bind"){
	  		if(newItemObj.companyid && newItemObj.a && newItemObj.x){
	  		 newItem = newItemObj;
	  		}else{
	  		 return false;
	  		}
	  	} 
      const data = {
        newItem: newItem,
        oldItem: item,
        type: type
      }
      onOk(data)
    })
  }
  
   const modalOpts = {
    title: `${type === 'create' ? 'AX配置' : (type === 'bind' ? '绑定B' : '修改AX配置')}`,
    visible,
    onOk: handleOk,
    maskClosable:false,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  } 
  
  const dis = (type === 'create' ? false:true);

  function ongetNewItem(value){
  	 newItemObj = value;
  }


  
  if(type != 'bind') {
     return (
	     <Modal {...modalOpts}>
	        <Complete type={type}  item={item}  onSelected={ongetNewItem}/>
	    </Modal>)
	  } else {
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
		          })(<Input disabled />)}
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
