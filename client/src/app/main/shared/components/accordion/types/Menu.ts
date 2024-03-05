import { type } from 'os'

export type Menu = {
  id:number,
  name: string, 
  iconClass: string, 
  active: boolean,
  submenu: SubMenu[],
  vid_ct:number,test_ct:number
}
export type SubMenu = {
  name: string,iconClass:string, url: string,vid_dur?:any,isViewed:boolean,test:any,type:string,testDesc?:string
}