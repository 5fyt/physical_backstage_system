type menuItem = {
  title: string
  path: string
  icon: string
}
export interface MenuOption extends menuItem {
  children?: menuItem[]
}

let menuList: MenuOption[] = [
  {
    title: '首页',
    path: '/dashboard',
    icon: 'DashboardOutlined'
  },
  {
    title: '人员管理',
    path: 'manage',
    icon: 'DesktopOutlined',
    children: [
      {
        title: '医生管理',
        path: '/manage/user',
        icon: 'TeamOutlined'
      }
    ]
  },
  {
    title: '业务管理',
    path: 'business',
    icon: 'MailOutlined',
    children: [
      {
        title: '体检套餐',
        path: '/business/goods',
        icon: 'InboxOutlined'
      },
      {
        title: '促销规则',
        path: '/business/rules',
        icon: 'InteractionOutlined'
      },
      {
        title: '客户档案',
        path: '/business/customer',
        icon: 'FileProtectOutlined'
      },
      {
        title: '订单管理',
        path: '/business/order',
        icon: 'FunnelPlotOutlined'
      }
    ]
  },
  {
    title: '体检管理',
    path: 'physical',
    icon: 'AppstoreOutlined',
    children: [
      {
        title: '体检预约',
        path: '/physical/reserve',
        icon: 'HourglassOutlined'
      },
      {
        title: '体检签到',
        path: '/physical/checkIn',
        icon: 'CheckOutlined'
      },
      {
        title: '预约设置',
        path: '/physical/settings',
        icon: 'RadiusSettingOutlined'
      },
      {
        title: '医生检查',
        path: '/physical/examine',
        icon: 'ReadOutlined'
      },
      {
        title: '检查报告',
        path: '/physical/report',
        icon: 'FileOutlined'
      }
    ]
  },
  {
    title: '系统设置',
    path: 'settings',
    icon: 'SettingOutlined',
    children: [
      {
        title: '人员限流',
        path: '/settings/limiting',
        icon: 'GoldOutlined'
      }
    ]
  }
]
const type = localStorage.getItem('type')
menuList =
  type === 'doctor'
    ? menuList.filter((item, index) => index === 0 || index === 2)
    : menuList.filter((item) => item.title !== '体检管理')
export default menuList
