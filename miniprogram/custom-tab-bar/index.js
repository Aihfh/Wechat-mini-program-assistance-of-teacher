Component({
	//定义数据
	 data: {
		 selected: 0,
		 color: "#000000",
		 roleId: '',
		 selectedColor: "#1396DB",
		 allList: [{
			 list1: [
				{
					"pagePath": "/pages/Parent/Pfuc/Pfuc",
					"text": "首页",
					"iconPath": "/images/tab/menu.png",
					"selectedIconPath": "/images/tab/menua.png"
				},
				{
					"pagePath": "/pages/Parent/Pmessage/Pmessage",
					"text": "消息",
					"iconPath": "/images/tab/message.png",
					"selectedIconPath": "/images/tab/messagea.png"
				},
				{
					"pagePath": "/pages/Parent/ParentInf/ParentInf",
					"text": "我的",
					"iconPath": "/images/tab/my.png",
					"selectedIconPath": "/images/tab/mya.png"
				}
			 ],
 
			 list2: [ 
				{
					"pagePath": "/pages/Teacher/Tfuc/Tfuc",
					"text": "教师首页",
					"iconPath": "/images/tab/my.png",
					"selectedIconPath": "/images/tab/mya.png"
				},
				{
					"pagePath": "/pages/Teacher/TeacherInf/TeacherInf",
					"text": "教师信息",
					"iconPath": "/images/tab/my.png",
					"selectedIconPath": "/images/tab/mya.png"
				}
      	],
		 }],
		 list: []
	 },
 // 在组件实例进入页面节点树时执行
	 attached() {  //获取用户的类型，进行判断tabBar的List
		 const roleId = wx.getStorageSync('statu')
		 console.log('看看roleid',roleId)
		 if (roleId === 'tea') {
			 this.setData({
				 list: this.data.allList[0].list2
			 })
		 }else if(roleId === 'par'){
			 this.setData({
				 list: this.data.allList[0].list1
			 })
		 }
	 },
	 methods: { 
		 switchTab(e) {  //switchTab的作用根据不同的路径切换tabbar下标
			 const data = e.currentTarget.dataset
			 const url = data.path
			 wx.switchTab({ url })
			 this.setData({
				 selected: data.index
			 })
		 }
	 },
 
 
 
 })
 