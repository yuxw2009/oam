import React from 'react';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import { DatePicker, Button, Spin, message, Select, Option } from 'antd';
import axios from 'axios'
import ReactDOM from 'react-dom'
import { config } from '../../utils'
const { api } = config
const { traffic } = api

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, 
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

window.trafficObj = {
	period : 'hour',
	isloading: false,
	startValue: moment(new Date(new Date().getTime() - 7*24*60*60*1000), dateFormat),
	endValue: moment(new Date(), dateFormat),
	data:{}
}

const dateFormat = 'YYYY-MM-DD HH:mm:ss';
class Echart extends React.Component {	
	 state = {
	    startValue: moment(new Date(new Date().getTime() - 7*24*60*60*1000), dateFormat),
	    endValue: moment(new Date(), dateFormat),
	    endOpen: false,
	    loading: false,
	    winHeight: 0,
	    list:{}
	  };	
	  componentWillMount(){
		 	if(window.trafficObj.data.times){
				 this.setState({
		      	    ...this.state,
		      	    loading: false,
		      	    startValue: window.trafficObj.startValue,
	   			    endValue: window.trafficObj.endValue,
		      	    list: window.trafficObj.data
				})	
		 	}else{
		 		if(window.trafficObj.isloading){
			 		 this.setState({
			      	    ...this.state,
			      	    loading: true,
			      	    list: window.trafficObj.data
					})	
				}
		 		window.trafficObj.period = 'hour';
		 	}
		}	
		
	  requestHandle = () =>{
	 	    const { startValue, endValue, endOpen, list } = this.state;
		  	const from = new Date(startValue).Format("yyyy,MM,dd,hh,mm,ss");
		  	const to = new Date(endValue).Format("yyyy,MM,dd,hh,mm,ss");
		  	if(from.toString().indexOf('1970') >= 0 || to.toString().indexOf('1970') >= 0){
		  		message.warn("请选择起始时间和结束时间");
		  		return;
		  	}
		  	window.trafficObj.isloading = true;
		  	window.trafficObj.data = {};
		    this.setState({
		       ...this.state,
		       loading: true
			})	      		  	
		       axios.post(traffic, {period: window.trafficObj.period, from: from.split(','), to: to.split(',') }).then((res)=>{
				   	let data = res.data;
				   	let sipArr = [];
				   	 window.trafficObj.data = data.data;
				   	 window.trafficObj.isloading = false;
			      	if(data && data.success) {
							 this.setState({
						      	    ...this.state,
						      	    loading: false,
						      	    list: data.data
							  })	      	
				    }else{
						this.setState({
					        ...this.state,
					      	 loading: false
						})
						message.error(data.message);
				    }
			  })	
			  .catch( (error) => {
			  	    message.error('话务统计：连接超时，请稍后再试');
			  	    window.trafficObj.isloading = false;
					this.setState({
				        ...this.state,
				      	 loading: false
					})	
			  })	  	
	  }
	  
	  handClick = ()=>{
	    this.requestHandle();
	  }
	 componentDidMount(){
	  	  window.onresize = () =>{
	      	 this.setState({
	      	    ...this.state,
	      	    winHeight: window.innerHeight
		     }) 	
		 } 
	  }
	  periodChange = (value)=>{
	  	window.trafficObj.period = value;
	  }
	  disabledStartDate = (startValue) => {
	    const endValue = this.state.endValue;
	    if (!startValue || !endValue) {
	      return false;
	    }
	    return startValue.valueOf() > endValue.valueOf();
	  }
	  disabledEndDate = (endValue) => {
	    const startValue = this.state.startValue;
	    if (!endValue || !startValue) {
	      return false;
	    }
	    return endValue.valueOf() <= startValue.valueOf();
	  }
	  onChange = (field, value) => {
	  	window.trafficObj[field] = value;
	    this.setState({
	      [field]: value,
	    });
	  }
	  onStartChange = (value) => {
	    this.onChange('startValue', value);
	  }
	  onEndChange = (value) => {
	    this.onChange('endValue', value);
	  }
	  handleStartOpenChange = (open) => {
	    if (!open) {
	      this.setState({ endOpen: true });
	    }
	  }
	  handleEndOpenChange = (open) => {
	    this.setState({ endOpen: open });
	  }	
	  getOtion = (list) => {
	        const option = {
	            title: {
	                text: '话务统计图'
	            },
	            tooltip : {
	                trigger: 'axis'
	            },
	            legend: {
	                data:['话务统计']
	            },
	            toolbox: {
	                feature: {
	                    saveAsImage: {}
	                }
	            },
	            grid: {
	                left: '0',
	                right: '4%',
	                bottom: '3%',
	                containLabel: true
	            },
	            xAxis : [
	                {
	                    type : 'category',
	                    boundaryGap : true,
	                    data : list.times,
	                    splitLine: {
				            show: false
				        }
	                }
	            ],
	            yAxis : [
	                {
	                    type : 'value'
	                }
	            ],
	            series : [
	                {
	                    name:'话务量',
	                    type:'line',
	                    stack: '总量',
	                    areaStyle: {normal: {}},
	                    data: list.calls
	                }
	            ]
	        };
	        return option;
	  }
    
    render() {
        let { startValue, winHeight, endValue, endOpen, list, loading } = this.state;
        let winWidth = window.innerWidth - 330;
        winHeight = window.innerHeight;
     
        return (
        	      <div>
        	         <div style={{ 'marginBottom': '20px'}}>
        	          <span  style={{ 'marginRight': '5px' }}>Period: </span>
        	          <Select defaultValue="hour" onChange={this.periodChange} ref="periodInput"  style={{ width: 120,  'marginRight': '20px' }}>
				      <Option value="second">second</Option>
				      <Option value="minute">minute</Option>
				      <Option value="hour">hour</Option>
				      <Option value="day">day</Option>
				      <Option value="week">week</Option>
				      <Option value="month">month</Option>
				  </Select>
				  <span  style={{ 'marginRight': '5px', }}>开始时间: </span>
			        <DatePicker
			          disabledDate={this.disabledStartDate}
			          showTime
			         
			          format="YYYY-MM-DD HH:mm:ss"
			          value={startValue}
			          placeholder="开始时间"
			          onChange={this.onStartChange}
			          onOpenChange={this.handleStartOpenChange}
			          style={{ 'marginRight': '20px'}}
			        />
			        <span  style={{ 'marginRight': '5px' }}>结束时间: </span>
			        <DatePicker
			          disabledDate={this.disabledEndDate}
			          showTime
			          format="YYYY-MM-DD HH:mm:ss"
			          value={endValue}
			          placeholder="结束时间"
			          onChange={this.onEndChange}
			          open={endOpen}
			          onOpenChange={this.handleEndOpenChange}
			        />
			        <Button type="primary"  onClick={this.handClick}  style={{ marginLeft: '20px'}}>查询</Button>
           		 </div>
           		  <Spin spinning={loading}>
	           		 <div style={{height:winHeight-270 + 'px', width: '100%', background:'#f6f6f6'}}>
	           		      <div style={{display: list.times ? 'block': 'none', height:'100%', width: '100%'}}>
		                    <ReactEcharts
		                        option={this.getOtion(list)}
		                        style={{height: winHeight-270 + 'px', width: winWidth + 'px'}}
		                        className='react_for_echarts' />
		                   </div>
	                 </div>
                  </Spin>
              </div>
        );
    }
}

export default Echart;