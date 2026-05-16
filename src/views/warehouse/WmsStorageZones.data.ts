import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
import {list} from './WmsStorageZones.api'
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '库区编码',
    align:"center",
    dataIndex: 'zoneCode'
   },
   {
    title: '库区名称',
    align:"center",
    dataIndex: 'zoneName'
   },
   {
    title: '库区类型',
    align:"center",
    dataIndex: 'zoneType_dictText'
   },
   {
    title: '状态',
    align:"center",
    dataIndex: 'status_dictText'
   },
   {
    title: '是否可售库存',
    align:"center",
    dataIndex: 'isSellable_dictText'
   },
   {
    title: '所属仓库',
    align:"center",
    dataIndex: 'warehouseName'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '所属仓库',                  // 表单项左侧显示的标签文字
    field: 'warehouseId',               // 表单字段名（对应后端 WmsStorageZones 实体的 warehouseId 属性）
    component: 'ApiSelect',             // 使用 ApiSelect 组件：通过调用接口获取下拉选项数据
    componentProps: {
      // ===== 以下 4 个属性是 ApiSelect 组件的核心配置 =====
      api: list,                        // 数据源接口：调用哪个 API 获取下拉列表数据
                                        // 这里的 list 是 WmsWarehouses.api.ts 中导出的列表接口方法
      resultField: 'records',           // 结果字段：接口返回的数据结构中，数组数据在哪个字段里
                                        // 例如接口返回 { code: 200, result: { records: [...] } }，则取 records 字段
      labelField: 'warehouseName',      // 显示字段：下拉框中展示给用户看的文本字段
                                        // 用户看到的是仓库名称，如 "北京一号仓"
      valueField: 'warehouseId',                 // 值字段：选中后实际提交给后端的字段值
                                        // 提交的是仓库ID（数字），如 123456
    },
    colProps: {
      span: 12,                         // 栅格布局：占 12 列（Ant Design 24 栅格系统，占一半宽度）
    },
  }
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '库区编码',
    field: 'zoneCode',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入库区编码!'},
          ];
     },
  },
  {
    label: '库区名称',
    field: 'zoneName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入库区名称!'},
          ];
     },
  },
  {
    label: '库区类型',
    field: 'zoneType',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode:"zone_type"
    },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入库区类型!'},
          ];
     },
  },
  {
    label: '状态',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"wms_status"
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入状态: 创建,禁用, 启用!'},
          ];
     },
  },
  {
    label: '是否可售库存',
    field: 'isSellable',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"yn"
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入是否可售库存 0-否, 1-是!'},
          ];
     },
  },
  {
    label: '所属仓库',
    field: 'warehouseName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入所属仓库!'},
          ];
     },
  },
	// TODO 主键隐藏字段，目前写死为ID
	{
	  label: '',
	  field: 'id',
	  component: 'Input',
	  show: false
	},
];

// 高级查询数据
export const superQuerySchema = {
  zoneCode: {title: '库区编码',order: 0,view: 'text', type: 'string',},
  zoneName: {title: '库区名称',order: 1,view: 'text', type: 'string',},
  zoneType: {title: '库区类型',order: 2,view: 'text', type: 'string',},
  status: {title: '状态: 创建,禁用, 启用',order: 3,view: 'list', type: 'string',dictCode: 'dict_item_status',},
  isSellable: {title: '是否可售库存 0-否, 1-是',order: 4,view: 'list', type: 'string',dictCode: 'yn',},
  warehouseId: {title: '所属仓库',order: 5,view: 'link_table', type: 'string',},
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
