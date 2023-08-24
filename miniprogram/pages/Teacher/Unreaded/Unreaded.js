const db = wx.cloud.database()
const _ = db.command
var namelist=[]
Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag: '',
    // unreadList: [
    //   {name:'王涵'},
    //   {name:'李欣'}
		// ] // 未读名单数组
		unreadList: [] // 未读名单数组
  },
  backlast(){
    wx.navigateBack({
    delta :1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
	 console.log(options.flag)
     this.setData({
       flag : options.flag
		 });
		 db.collection('ReadStatus').where({
			 flag : this.data.flag,
			 readed:'否'
		 }).get().then(res => {
			// res.data 包含该记录的数据
			console.log(res.data)
			namelist= res.data
			namelist.forEach((item,idx)=>{
				console.log('2321321321321数',item)
				// console.log('次数',res.data[idx])
				// var nnlist = item.Pname
				var oldData = this.data.unreadList
				console.log('kkk',oldData)
        var newData = oldData.concat(item)
    this.setData({
      unreadList: newData
    })

			})


			// this.setData({
			// 	unreadList:
			// })
			// this.setData({
			// 	message :{
			// 		title :res.data.Title,
      //     time :res.data.Uptime,
			// 		content:res.data.Content,
			// 		images:res.data.Imageurl
			// 	},
			// 	flag : res.data.flag
			// })
		})
  }
});
