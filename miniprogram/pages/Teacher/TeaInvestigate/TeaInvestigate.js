// message-list.js
const db = wx.cloud.database()
const _ = db.command
Page({
  // 点击查看未读名单按钮跳转到未读名单页面
  // 页面数据
  data: {
 
		message:[]
  },
	getDDA(){
		db.collection('Prequest').doc(this.data.id).get().then(res => {
			// res.data 包含该记录的数据
			console.log(res.data)
			this.setData({
				message :{
					title :res.data.Pname+'请假审批',
          time :'2023-04-30 13:00',
          content:res.data.Content,
				}
			})
		})
	
	},
  onViewUnreadList1() {
		
		db.collection('Prequest').doc(this.data.id).update({
			data:{
			state : '同意'
			}
		})
		wx.showToast({
			title: '审批成功',
			icon: 'success',
			duration: 2000,
			//显示透明蒙层，防止触摸穿透
			mask:true,
			success: function () {
				setTimeout(function () {
					//要延时执行的代码
					wx.navigateBack({
						delta: 3
					})
				}, 1000) //延迟时间
			}
		})
	},


	onViewUnreadList2() {
		db.collection('Prequest').doc(this.data.id).update({
			data:{
			state : '拒绝'
			}
		})
		wx.showToast({
			title: '审批成功',
			icon: 'success',
			duration: 2000,
			//显示透明蒙层，防止触摸穿透
			mask:true,
			success: function () {
				setTimeout(function () {
					//要延时执行的代码
					wx.navigateBack({
						delta: 2
					})
				}, 1000) //延迟时间
			}
		})
	},

	onLoad(options) {
		console.log(options.id)
		this.setData({
			id : options.id,
		})
		this.getDDA()
		},
});


