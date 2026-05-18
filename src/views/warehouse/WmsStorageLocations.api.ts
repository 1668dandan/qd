import {defHttp} from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
  list = '/warehouse/wmsStorageLocations/list',
  save='/warehouse/wmsStorageLocations/add',
  edit='/warehouse/wmsStorageLocations/edit',
  deleteOne = '/warehouse/wmsStorageLocations/delete',
  deleteBatch = '/warehouse/wmsStorageLocations/deleteBatch',
  importExcel = '/warehouse/wmsStorageLocations/importExcel',
  exportXls = '/warehouse/wmsStorageLocations/exportXls',
  enable = '/warehouse/wmsStorageLocations/enable',
  disable = '/warehouse/wmsStorageLocations/disable',
}
/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;
/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;
/**
 * 列表接口
 * @param params
 */
export const list = (params) =>
  defHttp.get({url: Api.list, params});

/**
 * 删除单个
 */
export const deleteOne = (params,handleSuccess) => {
  return defHttp.delete({url: Api.deleteOne, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
/**
 * 批量删除
 * @param params
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({url: Api.deleteBatch, data: params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    }
  });
}
/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({url: url, params});
}
/**
 * 启用储位
 */
export const enable = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认启用',
    content: '是否启用该储位？',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.put({url: Api.enable, data: params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    }
  });
}
/**
 * 禁用储位
 */
export const disable = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认禁用',
    content: '是否禁用该储位？',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.put({url: Api.disable, data: params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    }
  });
}
