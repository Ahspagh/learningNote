import jsynchronzied from '@/utils/jsynchronized';
import { getDicts } from '@/api/system/dict/data';

const dictionary = {
  state: {
    identity_type: [],
    company_type: [],
    form_type: [],
    issuing_address: [],
  },
  actions: {
    // 获取身份证明类型
    GetIdentityType({ commit, state }) {
      return getDictionary({ commit, state }, 'identity_type');
    },

    // 获取企业类型
    GetCompanyType({ commit, state }) {
      return getDictionary({ commit, state }, 'company_type');
    },

    // 获取表单类型
    GetFormType({ commit, state }) {
      return getDictionary({ commit, state }, 'form_type');
    },
    // 获取签发地区
    GetIssuingAddress({ commit, state }) {
      return getDictionary({ commit, state }, 'issuing_address');
    },
  },
};

// 获取字典信息
let getDictionary = async function ({ commit, state }, type) {
  return await jsynchronzied(async () => {
    let options;
    if (state[type] && state[type].length > 0) {
      options = state[type];
    } else {
      let res = await getDicts(type);
      options = res.data.map(item => {
        return {
          value: item.dictValue,
          label: item.dictLabel,
        };
      });
      state[type] = options;
    }
    return options;
  }, type);
};

export default dictionary;
