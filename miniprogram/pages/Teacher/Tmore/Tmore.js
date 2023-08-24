// message-list.js
const db = wx.cloud.database()
const _ = db.command
// 获取消息列表数据
Page({
  // 点击查看未读名单按钮跳转到未读名单页面
  // 页面数据
  data: {
		id:'',
		flag : '',
    // message:{
    //   title :'四月份家长会',
    //   time :'2022-04-11 14:00',
    //   content:'请各位家长于四月二十三日下午两点准时到达七年级三班参加家长会',
    //   images:['../../images/jx1 (1).png','../../images/jx1 (4).jpeg']
		// },
		message:[]
    
	},
	getDAta(){
		db.collection('Information').doc(this.data.id).get().then(res => {
			// res.data 包含该记录的数据
			console.log(res.data)
			this.setData({
				message :{
					title :res.data.Title,
          time :res.data.UpTime,
					content:res.data.Content,
					images:res.data.Imageurl
				},
				flag : res.data.flag
			})
		})
	},

  // onViewUnreadList() {
  //   wx.navigateTo({
  //     url: '/pages/unread-list/unread-list?id=' + messageId,
  //   });
	// },
	onViewUnreadList() {
		db.collection('Information').where({
    flag : this.data.flag
		}).update({
			data:{
			Readed : '是'
			}
		})
		// db.collection('ReadStatus').where({
		// 	flag : this.data.flag
		// 	}).update({
		// 	data:{
		// 	readed : '是'
		// 	}
		// })
		console.log(this.data.flag)
		var flag = this.data.flag
		wx.showToast({
			title: '正在查询',
			icon: 'success',
			duration: 2000,
			//显示透明蒙层，防止触摸穿透
			mask:true,
			success: function () {
				setTimeout(function () {
					//要延时执行的代码
					wx.navigateTo({
						url: '../../Teacher/Unreaded/Unreaded?flag='+flag,
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
		this.getDAta()
		},
});


