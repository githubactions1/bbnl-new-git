import { type } from 'os'

export type District = {
  name: string,
  dst_id:any;
  mandals: Mandal[]
}
export type Mandal = {
  name: string,dst_id:any,mndl_id:any,svms:Sachivalayam[]
}
export type Sachivalayam = {
  name: string,svm_id:any,dst_id:any,mndl_id:any
}