import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
import {list as warehouseList} from './WmsWarehouses.api';
import {list as wareZoneList} from './WmsStorageZones.api'
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '库位编码',
    align:"center",
    dataIndex: 'locationCode'
   },
   {
    title: '储位类别',
    align:"center",
    dataIndex: 'locationCategory'
   },
   {
    title: '库位类型',
    align:"center",
    dataIndex: 'locationType_dictText'
   },
   {
    title: '状态',
    align:"center",
    dataIndex: 'status_dictText'
   },
   {
    title: '所属仓库',
    align:"center",
    dataIndex: 'warehouseName'
   },
   {
    title: '所属库区',
    align:"center",
    dataIndex: 'zoneName'
   },
   {
    title: '巷道',
    align:"center",
    dataIndex: 'locationAisle'
   },
   {
    title: '排',
    align:"center",
    dataIndex: 'locationLine'
   },
   {
    title: '列',
    align:"center",
    dataIndex: 'locationRank'
   },
   {
    title: '层',
    align:"center",
    dataIndex: 'locationLayer'
   },
   {
    title: '长',
    align:"center",
    dataIndex: 'locationLength'
   },
   {
    title: '宽',
    align:"center",
    dataIndex: 'locationWidth'
   },
   {
    title: '容积',
    align:"center",
    dataIndex: 'locationCapacity'
   },
   {
    title: '承重',
    align:"center",
    dataIndex: 'loadCapacity'
   },
   {
    title: '是否可售',
    align:"center",
    dataIndex: 'isSellable_dictText'
   },
];
//搜索表单
export const searchFormSchema: FormSchema[] = [
  {
    label: '所属仓库',
    field: 'warehouseId',               // 对应储位实体的 warehouseId
    component: 'ApiSelect',
    componentProps: {
      api: warehouseList,               // 仓库列表接口（WmsWarehouses.api.ts 导出）
      resultField: 'records',           // 分页数据在 result.records 中
      labelField: 'warehouseName',      // 下拉框显示仓库名称
      valueField: 'id',                 // 提交仓库主键 id
    },
    colProps: {
      span: 6,                          // 占 6 列（1/4 宽度），一行可放 4 个筛选项
    },
  },
  {
    label: '所属库区',
    field: 'zoneId',                    // 对应储位实体的 zoneId
    component: 'ApiSelect',
    componentProps: {
      api: wareZoneList,                // 储区列表接口（WmsStorageZones.api.ts 导出）
      resultField: 'records',           // 分页数据在 result.records 中
      labelField: 'zoneName',           // 下拉框显示储区名称
      valueField: 'id',                 // 提交储区主键 id
    },
    colProps: {
      span: 6,                          // 占 6 列（1/4 宽度），与仓库筛选并排
    },
  }
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '库位编码',
    field: 'locationCode',
    component: 'Input',
    // 启用状态下不允许修改
    dynamicDisabled: ({model}) => model.status === 'ACTIVE',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入库位编码!'},
          ];
     },
  },
  {
    label: '储位类别',
    field: 'locationCategory',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'location_category',
    },
    // 启用状态下不允许修改
    dynamicDisabled: ({model}) => model.status === 'ACTIVE',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请选择储位类别!'},
          ];
     },
  },
  {
    label: '库位类型',
    field: 'locationType',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"location_type"
     },
    // 启用状态下不允许修改
    dynamicDisabled: ({model}) => model.status === 'ACTIVE',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请选择库位类型!'},
          ];
     },
  },
  {
    label: '状态',
    field: 'status',
    defaultValue: "CREATED",
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"dict_item_status"
     },
    // 启用状态下不允许修改
    dynamicDisabled: ({model}) => model.status === 'ACTIVE',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请选择状态!'},
          ];
     },
  },
  {
    label: '所属仓库',
    field: 'warehouseId',
    component: 'ApiSelect',
    componentProps: {
      api: warehouseList,               // 仓库列表接口
      resultField: 'records',           // 分页数据在 result.records 中
      labelField: 'warehouseName',      // 下拉框显示仓库名称
      valueField: 'id',                 // 提交仓库主键 id
    },
    // 启用状态下不允许修改
    dynamicDisabled: ({model}) => model.status === 'ACTIVE',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请选择所属仓库!'},
          ];
     },
  },
  {
    label: '所属库区',
    field: 'zoneId',
    component: 'ApiSelect',
    componentProps: {
      api: wareZoneList,                // 储区列表接口
      resultField: 'records',           // 分页数据在 result.records 中
      labelField: 'zoneName',           // 下拉框显示储区名称
      valueField: 'id',                 // 提交储区主键 id
    },
    // 启用状态下不允许修改
    dynamicDisabled: ({model}) => model.status === 'ACTIVE',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请选择所属库区!'},
          ];
     },
  },
  {
    label: '巷道',
    field: 'locationAisle',
    component: 'Input',
  },
  {
    label: '排',
    field: 'locationLine',
    component: 'Input',
  },
  {
    label: '列',
    field: 'locationRank',
    component: 'Input',
  },
  {
    label: '层',
    field: 'locationLayer',
    component: 'Input',
  },
  {
    label: '长',
    field: 'locationLength',
    component: 'InputNumber',
  },
  {
    label: '宽',
    field: 'locationWidth',
    component: 'InputNumber',
  },
  {
    label: '容积',
    field: 'locationCapacity',
    component: 'InputNumber',
  },
  {
    label: '承重',
    field: 'loadCapacity',
    component: 'InputNumber',
  },
  {
    label: '是否可售',
    field: 'isSellable',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"yn"
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请选择是否可售!'},
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
  locationCode: {title: '库位编码',order: 0,view: 'text', type: 'string',},
  locationCategory: {title: '储位类别',order: 1,view: 'text', type: 'string',},
  locationType: {title: '库位类型',order: 2,view: 'list', type: 'string',dictCode: 'location_type',},
  status: {title: '状态',order: 3,view: 'list', type: 'string',dictCode: 'dict_item_status',},
  warehouseId: {title: '所属仓库',order: 4,view: 'link_table', type: 'string',},
  zoneId: {title: '所属库区',order: 5,view: 'link_table', type: 'string',},
  locationAisle: {title: '巷道',order: 6,view: 'text', type: 'string',},
  locationLine: {title: '排',order: 7,view: 'text', type: 'string',},
  locationRank: {title: '列',order: 8,view: 'text', type: 'string',},
  locationLayer: {title: '层',order: 9,view: 'text', type: 'string',},
  locationLength: {title: '长',order: 10,view: 'number', type: 'number',},
  locationWidth: {title: '宽',order: 11,view: 'number', type: 'number',},
  locationCapacity: {title: '容积',order: 12,view: 'number', type: 'number',},
  loadCapacity: {title: '承重',order: 13,view: 'number', type: 'number',},
  isSellable: {title: '是否可售',order: 14,view: 'list', type: 'string',dictCode: 'yn',},
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
