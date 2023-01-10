import {reactive, ref} from 'vue'
import {resetObjToPrimitiveType } from '@/utils/tools'
import { test } from 'zora';
// 用于重置对象字段为原始值的函数
/**
 * @description usePage 接受一个otps参数，返回列表所需数据
 * @param{object} opts.searchForm - 默认查询参数
 * @param{function} opts.getLIstApi 获取列表数据的接口
 * @param{function} opts.customQueryParameters - 自定义查询参数
 * @param {function} opts.getListFunc - 执行完 GETlist成功后执行的逻辑 有一个opts参数
 * @param {Function} opts.resetFunc - 执行完reset后执行的逻辑
 * @param {Function} opts.sizeChangeFunc - 执行完sizeChange后执行的逻辑
 * @param {Function} opts.currentChangeFunc - 执行完currentChange后执行的逻辑
 
 */
export const usePage = (opts)=>{
    // searchForm 由外部传入，内部传入导出的数据无法推导类型 无法知道对象内容失去代码提示
    const {
      searchForm = {},
      getListApi,
      customQueryParameters = () => {},
      getListFunc = opts => {},
      resetFunc = () => {},
      sizeChangeFunc = () => {},
      currentChangeFunc = () => {},
    } = opts;
    const page = reactive({
        pageSize:10,
        pageNo:1,
        total:0
    })
    const tableDate= ref([])

    const reset = ()=>{
        Object.assign(searchForm,resetObjToPrimitiveType(searchForm))
        resetFunc()
        handleCurrentChange(1)
    }
    const getList = ()=>{
        const opts ={
            ...page,
            ...searchForm,
            ...customQueryParameters()
        }
        getListApi(opts).then(res=>{
            if(res.code===0){
                tableDate.value=res.data?.rows||[]
                page.total=res.data?.total||0
                getListFunc()
            }
        })
    }
    const handleSizeChange=(size)=>{
        page.pageSize=size
        sizeChangeFunc()
        getList()
    }
    const handleCurrentChange(cur){
        page.pageNo=cur
        currentChangeFunc()
        getList()
    }
    return {
        searchForm,
        reset,
        page,
        tableDate,
        handleSizeChange,
        handleCurrentChange,
    }
}
// 组件内使用
// 查询参数
const searchFORM= reactive({
    createEndTime:"",
    createStartTime:'',
})
// 接收 参训参数、获取列表接口、返回 列表所需要的数据、分页参数、分页函数等
const {reset,page, tableData, handleSizechange,handleCurrentChange}= usePage({
    searchForm,
    getLIstApi:test.getLIstApi
})
// 首次获取数据使用reset方式即可tableData的数据自动更新
reset()