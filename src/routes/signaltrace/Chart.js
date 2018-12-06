import React from 'react'
import axios from 'axios'
import styles from './index.less'
import { Modal, Timeline, Layout, Input, message, Button, Spin,  Form, Icon, Checkbox, Select, Option, AutoComplete } from 'antd'
import { config } from '../../utils'
import ReactDOM from 'react-dom'
const { api } = config
const { signaltrace_detail,signaltrace_delete, signaltrace, sip} = api
const { Sider, Content, Header } = Layout;

String.prototype.replaceAll = function(oldStr, newStr){
	return this.split(oldStr).join(newStr);
}
window.signalObj = {
	signalsArr : [],
	signalId : '',
	currIndex: 0,
	detail: '',
	sipList:'',
	myip:'',
	ssip:'',
	sipValue : '10.32.3.213'
} 


class Chart extends React.Component {
  state = {
    myip: '',
    ssip:'',
    id:'',
    currIndex: 0,
    signals:[],
    sipList:[],
    detail:'',
    idisabled: false,
    istrack: false,
    winHeight: 0,
    defaultSipValue:'10.32.3.213',
    loading: false
  }
  
  componentWillMount(){
  	if(window.signalObj.signalId != ''){
		 this.setState({
      	    ...this.state,
      	    idisabled: true,
      	    istrack: true,
      	    currIndex: window.signalObj.currIndex,
      	    detail: window.signalObj.detail,
      	    signals :window.signalObj.signalsArr,
      	    winHeight: window.innerHeight,
      	    defaultSipValue: window.signalObj.sipList[0],
      	    sipList: window.signalObj.sipList,
      	    myip: window.signalObj.myip,
            ssip: window.signalObj.ssip
	     })
  	}else{
       axios.post(sip, {}).then((res)=>{
		   	let data = res.data;
		   	let sipArr = [];
		   	window.signalObj.sipValue = '10.32.3.213';
	      	if(data && data.success) {
	      		data.data.forEach((item)=>{
	      			sipArr.push(item.localip)
	      		})
		    }
	      	window.signalObj.sipList = sipArr;
	      	 this.setState({
	      	    ...this.state,
	      	    idisabled: false,
	      	    winHeight: window.innerHeight,
	      	    defaultSipValue: sipArr[0],
	      	    sipList: sipArr
		     })
	  })	 
	}  
  }
  
  componentDidMount(){
  	  window.onresize = () =>{
      	 this.setState({
      	    ...this.state,
      	    winHeight: window.innerHeight
	     }) 	
	 } 
  }

  
  render() {
    let { myip, ssip,loading, detail, defaultSipValue, signals, idisabled, winHeight, sipList, id, currIndex, istrack } = this.state;
    winHeight = window.innerHeight;
    const dispatch  = this.props.dispatch;
    const onSipValue = (value)=>{
      window.signalObj.sipValue = value;
    }
    const getSignalTraceData = ()=>{
  	  axios.post(signaltrace_detail, {'id': window.signalObj.signalId}).then((res)=>{
           	let data = res.data;
	      	if(data.signals &&  data.signals.length > 0) {
	      		window.signalObj.signalsArr = window.signalObj.signalsArr.concat(data.signals);
	      		window.signalObj.myip = data.signals[0].myip||'';
	      		window.signalObj.ssip = data.signals[0].ssip||'';
	            this.setState({
		      	    ...this.state,
		      	    myip:data.signals[0].myip||'',
		      	    ssip:data.signals[0].ssip||'',
		      	    signals:window.signalObj.signalsArr,
			      	loading: false
			   }) 
		   	   if(detail == ''){
					let ndetail = data.signals[0].detail.replaceAll('<', '');
		      		ndetail = ndetail.replaceAll('>', '');
		      		ndetail = ndetail.replaceAll('\r\n', '<br/>'); 
		            this.setState({
			      	    ...this.state,
			      	    detail:ndetail
				   }) 
			   }			   
			   
		   }	
	
	  })   	
    }
    
    const handClick = () => {
    	      if(window.interVal) clearInterval(window.interVal);
    	      if(window.signalObj.sipValue == ''){
    	      	 message.warning('请选择需要跟踪的SIP地址');
    	      	 return false;
    	      }
    	       window.signalObj.signalsArr = [],
		   window.signalObj.signalId = '',
		   window.signalObj.currIndex =  0,
		   window.signalObj.detail =  '',
			      
		  this.setState({
	      	    ...this.state,
			    myip: '',
			    ssip:'',
			    id:'',
			    currIndex: 0,
			    signals:[],
			    detail:'',
			    istrack: false,
			    loading: true
		  })    	      
	    	  axios.post(signaltrace, {ip: window.signalObj.sipValue, filter_str:ReactDOM.findDOMNode(this.refs.filterInput).value}).then((res)=>{
			   	let data = res.data;
		      	if(data && data.success) {
		      		 window.signalObj.signalsArr = [];
		      		 window.signalObj.signalId = data.id ? data.id : data.data[0].id;
					 this.setState({
				      	    ...this.state,
				      	    id:window.signalObj.signalId,
					      	loading: false,
					      	istrack: true,
					      	idisabled: true
					 })
				     window.interVal = setInterval(()=>{
					   getSignalTraceData();
				     }, 3000)
			    }else{
					this.setState({
				        ...this.state,
				      	 loading: false
					})
					message.error(data.message);
			    }
		  })
	    	  .catch( (error) => {
		  	 message.error('连接超时，请稍后再试');
		  })
    }
    
    const itemClick = (i)=>{
      		let detail = window.signalObj.signalsArr[i].detail.replaceAll('<', '');
      		detail = detail.replaceAll('>', '');
      		detail = detail.replaceAll('\r\n', '<br/>'); 
      		window.signalObj.currIndex = i;
      		window.signalObj.detail = detail;
            this.setState({
	      	    ...this.state,
	      	    currIndex: i,
	      	    detail:detail
		   }) 
    }
    
    const stophandClick = () => {
    	      if(window.interVal) clearInterval(window.interVal);
 	      this.setState({
      	      ...this.state,
      	      loading: false,
      	      istrack: false
		  })   	      
	    	  axios.post(signaltrace_delete, {id: window.signalObj.signalId, ip: window.signalObj.sipValue}).then((res)=>{
				   	let data = res.data;
				   	message.success('信令跟踪已停止');
			      	if(data && data.success) {
						 this.setState({
					      	    ...this.state,
					      	    id: '',
					      	    idisabled: false,
					      	    loading: false
						 })
				    }
		  })
	    	  .catch( (error) => {
		  	 message.error('连接超时，请稍后再试');
		  })
    } 
    
   const detailHtml = () => {
  	 return {__html: detail};
   }
   
   const getDirectionHtml = (arr)=>{
          var res = []
          for(var i = 0; i < arr.length; i++) {
            res.push(<li className= {currIndex == i ? styles.blue: ''}  onClick={itemClick.bind(this,i)}><span>{arr[i].time}</span><span>{arr[i].method}</span><em></em><i className = {arr[i].direction == 'recv' ? styles.recv: styles.send}></i></li>);
          }
          return res;
   }

    return (
	  	<Layout className= {styles.sip_track_layout } style={{background:'#ffffff'}}>
		      <Header style={{padding: '0 0 10px', lineHeight: '35px', marginTop:'-5px', height: 'auto', background:'#ffffff'}}>
	 			<AutoComplete
			      dataSource={sipList}
			      className={styles.filter_input}
			      onSelect={onSipValue}
			      defaultValue={defaultSipValue}
			      disabled={idisabled}
			      filterOption={false}
			      placeholder="请选择sip地址"
			      ref="sipInput" 
			    />
		        <Input ref="filterInput" disabled={idisabled} placeholder="filter" defaultValue="255.255.255.255"  className={styles.filter_input}  style={{marginLeft: '20px'}}/>
		        <Button  type="primary" onClick={handClick} style={{ marginLeft: '20px', display: istrack?'none':'inline-block'}}>跟踪</Button>
		        <Button  type="primary" onClick={stophandClick} style={{ marginLeft: '20px', display: istrack?'inline-block':'none'}}>停止</Button>
		      </Header>
			  <Spin spinning={loading}>  
			      <Layout style={{background: signals.length > 0 ? '#ffffff' :'#f6f6f6', height: winHeight-270 + 'px'}}>
			            <div style={{height:'100%', lineHeight:'100%', position: 'relative', background:'#f6f6f6', textAlign:'center', display: signals.length == 0 && istrack ? 'block' : 'none'}}><div style={{fontSize: '15px', position: 'absolute', left: 0, top:'40%', width: '100%', textAlign: 'center'}}>跟踪已开始, 正在获取跟踪信息...</div></div>
			            <div style={{ height:'100%',display: signals.length > 0 ? 'flex' : 'none' }}>
					        <div style={{ padding: '20px 15px', width: '350px', display: signals.length > 0 ? 'block' : 'none',  marginRight:'6px', background:'#f6f6f6', height:'100%'}}>
					          <div>
					          	<Input value={myip} placeholder="Myip地址" disabled  className={styles.sip_input} style={{float:'left'}} />
					          	<Input value={ssip} disabled placeholder="Ssip地址" className={styles.sip_input} style={{float:'right'}}/>
					          </div>
					          <ul className={styles.direction_box}>
					           {getDirectionHtml(signals)}
					          </ul> 
					        </div>
					        <Content style={{ padding: '20px', background:'#f6f6f6', height:'100%' }} dangerouslySetInnerHTML={detailHtml()}>
					        </Content>
					   </div> 
			      </Layout>
			   </Spin>
		 </Layout> 
    );
  }
}

export default Form.create()(Chart);