import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { DatePicker, Button, Spin, message, Select, Option } from 'antd';
import axios from 'axios'
import ReactDOM from 'react-dom'
import { config } from '../../utils'
const { api } = config
const { topology } = api
class Echart extends React.Component {	
	 state = {
	    winHeight: 0,
	    loading: true,
	    list:{}
	 };
	 componentWillMount(){
	       axios.post(topology, {}).then((res)=>{
			   	let data = res.data;
		      	if(data && data.success) {
		 			 this.setState({
			      	    ...this.state,
			      	    loading: false,
			      	    list: data.data[0]
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
				this.setState({
			        ...this.state,
			      	 loading: false
				})
				//message.error('连接超时，请稍后再试');
		 })	  
	  }
	 componentDidMount(list){
	  	  window.onresize = () =>{
	      	 this.setState({
	      	    ...this.state,
	      	    winHeight: window.innerHeight
		     }) 	
		 } 
	 }
	getItemName(name){
		return name; //.slice(name.lastIndexOf('.')+1)
	}
    getArrItem(item, x, y) {
  	   return	{  name: this.getItemName(item.name),
  	               tipName:item.name,
  	               status: item.status,
	               x: x,
	               y: y,
			       label: {
			       	   normal: {
		                    show: true
		                }
		           },
	               itemStyle: {
                     normal: {
                        color: item.status == 'online' ? '#108ee9' : '#999999'
                     }
	               } 
		  	 	}
	}
    getLinkItem(sName, tName){
         return   {
				     source:  this.getItemName(sName),
				     target:  this.getItemName(tName),
				     lineStyle: {
				      normal: { curveness: 0.2 }
				     }			     
	            	  } 
    }
    getOtion(list) {
	  	 let option =  {};
	  	 let chatArr = [];
	  	 let linksArr = [];
	  	 let siplen;
	  	 let isChartSip = {};
	  	 let in_sss = {};
	  	 let insssArr = [];
	  	 let outsssArr = [];
	  	 let out_ss = {};
	  	 
	     if(!list.nics )
	  	 return this.getDefaultOptionsData();
	  	 let instertChartArr = (name, status, x, y)=>{
           if(!isChartSip[name]){
            	  chatArr.push(this.getArrItem({
	  	 	  	name:name,
	  	 	  	status: status
	  	 	  }, x, y));
	  	 	  isChartSip[name] = {x:x, y:y};
	  	    } 
	  	 }
	  	 siplen = list.sips.length;
	  	 
	  	 list.sips.forEach((item, index)=>{
	  	 	 chatArr.push(this.getArrItem(item, index*250, 500));
	  	 	 item.in_sss.forEach((subitem, subindex)=>{
	  	 	 	if(typeof  in_sss[subitem] == 'undefined') insssArr.push(subitem);
	  	 	 	in_sss[subitem] = subindex;
	  	 	 	linksArr.push(this.getLinkItem(item.name, subitem));
	  	 	 })
	  	 	 item.out_ss.forEach((subitem, subindex)=>{
	  	 	 	if(typeof  out_ss[subitem] == 'undefined') outsssArr.push(subitem);
	  	 	 	out_ss[subitem] = subindex;
	  	 	 	linksArr.push(this.getLinkItem(subitem , item.name));
	  	 	 })	  	 	 
	  	 })
	  	 
	  	 insssArr.forEach((item,index)=>{
	  	 	 chatArr.push(this.getArrItem({
	  	 	 	name: item,
	  	 	 	status: 'online'
	  	 	 }, (siplen%2 + index) *250 , 300));
           
	  	 })
	  	 
	  	 list.nics.forEach((item,index)=>{
	  	 	 chatArr.push(this.getArrItem(item, (siplen%2 + 1) *250 , 700));
             item.sip_node.forEach((nitem, index)=>{
             	linksArr.push(this.getLinkItem(item.name, nitem));
             })
	  	 })
	  	
	     return this.getOptionsData(chatArr, linksArr);
	  }
    
 	 getOptionsData(chatArr, linksArr){
		return {
			    title: {
			        text: '系统网络拓扑图'
			    },
			    tooltip: {
			    	  show: true
			    },
			    animationDurationUpdate: 1500,
			    animationEasingUpdate: 'quinticInOut',
			    series : [
			        {
			            type: 'graph',
			            layout: 'none',
			            symbol:'rect',
			            symbolSize: [110, 40],
			       　// roam: true, 
			            label: {
			                normal: {
			                    show: true
			                }
			            },
			           edgeSymbol: ['circle', 'arrow'],
			           edgeSymbolSize: [4, 10],
			            edgeLabel: {
			                normal: {
			                    textStyle: {
			                        fontSize: 20
			                    }
			                }
			            },
			            tooltip: {
			                formatter: function (param) {
			                    return [
			                      '节点名称: '+ param.data.tipName,
			                      '当前状态: '+ param.data.status
			                    ].join('<br/>')
			                }
			            },
			            data: chatArr,
			            links: linksArr,
			            lineStyle: {
			                normal: {
			                    opacity: 0.9,
			                    width: 2,
			                    curveness: 0
			                }
			            }
			        }
			    ]
			};	 	
	 }
 	 
  	 getDefaultOptionsData(){
		return {
			    title: {
			        text: '系统网络拓扑图'
			    },
			    tooltip: {
			    	  show: true
			    },
			    animationDurationUpdate: 1500,
			    animationEasingUpdate: 'quinticInOut',
			    series : [],
			    links: [],
	            lineStyle: {
	                normal: {
	                    opacity: 0.9,
	                    width: 2,
	                    curveness: 0
	                }
	            }
			 }
	 }
	  render() {
	      	 let {  winHeight, list, loading } = this.state;
	      	 let winWidth = window.innerWidth - 330;
	      	 winHeight = window.innerHeight;
		     return (
		      <Spin spinning={loading}>  
		        <ReactEcharts
		          option={this.getOtion(list)}
		          style={{width: winWidth + 'px', height: winHeight-200 + 'px',}}
		          className='react_for_echarts' 
		        />
		     </Spin>
		    );
	    }
	}

export default Echart;