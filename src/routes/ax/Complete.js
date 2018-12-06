import React from 'react'
import { Form, Icon, Input, Button, Checkbox, Select, Option, AutoComplete } from 'antd';
import { create, remove, update,bind_b, getX, query } from '../../services/ax'
import axios from 'axios'

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
const companyInfo = localStorage.getItem('companyInfo') != 'undefined' ? JSON.parse(localStorage.getItem('companyInfo')) : [];
const companyOptions = companyInfo.map(item => {
	return <Option value={item.id}>{item.name}</Option>;
});

var newItem = {};
class Complete extends React.Component {
  state = {
    dataSource: [],
  }

  render() {
    const { getFieldDecorator, getFieldsValue} = this.props.form;
    const item = this.props.item
    const type = this.props.type
    const onSelected = this.props.onSelected;
    const { dataSource } = this.state;
    const dis = type=="create" ? false : true;
   	const getAField = function(e){
	    newItem.a = e.target.value;
	    onSelected(newItem);
   	}
	const getXField = (value) =>{
		newItem = getFieldsValue();
	    newItem.x = value;
	    onSelected(newItem);
	} 
	const handleChange =  (value) =>{
	   if(!value) return false;
	   newItem.companyid = value;
	   onSelected(newItem);
	   axios.post('/phone', {companyid: value}).then((res)=>{
	   	let data = res.data;
        if(data&&data.success){
        	    let xs = [];
           	data.data.forEach((item)=>{
           		xs.push(item.xs);
           	})
		    this.setState({
      		  dataSource: xs
    		    });
    		  }
	   })
	}
    return (
      <Form layout="horizontal">
        <FormItem label="企业名称：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('companyid', {
          	initialValue: item.companyid,
            rules: [{
            	   required: true,
            	   message: '企业不能为空' }],
          })(
            <Select disabled={dis} onChange={handleChange} placeholder="请选择企业">
		  		{companyOptions}
			</Select>
          )}
        </FormItem>
        <FormItem label="X：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('x', {
          	initialValue: item.x,
            rules: [{ required: true, message: 'X不能为空' }],
          })(
            <AutoComplete
		      dataSource={dataSource}
		      onChange={getXField}
		      disabled={dis}
		      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
		    />
          )}
        </FormItem>
        <FormItem label="A：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('a', {
          	initialValue: item.a,
            rules: [{ required: true, message: 'A不能为空' }],
          })(
            <Input
              onChange={getAField}
            />
          )}
        </FormItem>       
      </Form>
    );
  }
}

export default Form.create()(Complete);