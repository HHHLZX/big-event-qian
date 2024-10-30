import { ViteSSG } from "vite-ssg";
import ElementPlus, { ElMessage, ElMessageBox } from "element-plus";
import locale from "element-plus/dist/locale/zh-cn.js";
import { useRouter, createRouter, createWebHistory } from "vue-router";
import { ref, useSSRContext, resolveComponent, mergeProps, withCtx, createVNode, unref, createTextVNode, openBlock, createBlock, toDisplayString, Fragment, renderList, createCommentVNode } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { User, Lock, Management, HelpFilled, Promotion, PictureFilled, UserFilled, Crop, EditPen, TrendCharts, SwitchButton, CaretBottom, Edit, Delete, Plus, Upload } from "@element-plus/icons-vue";
import axios from "axios";
import { defineStore, createPinia } from "pinia";
import { QuillEditor } from "@vueup/vue-quill";
import { createPersistedState } from "pinia-persistedstate-plugin";
import "echarts";
import ECharts from "vue-echarts";
const useTokenStore = defineStore("token", () => {
  const token = ref("");
  const setToken = (newToken) => {
    token.value = newToken;
  };
  const removeToken = () => {
    token.value = "";
  };
  return {
    token,
    setToken,
    removeToken
  };
}, {
  persist: true
});
const baseURL = "/api";
const instance = axios.create({ baseURL });
instance.interceptors.request.use(
  (config) => {
    let tokenStore = useTokenStore();
    if (tokenStore.token) {
      config.headers.Authorization = tokenStore.token;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);
instance.interceptors.response.use(
  (result) => {
    if (result.data.code === 0) {
      return result.data;
    }
    ElMessage.error(result.data.message || "服务异常");
    return Promise.reject(result.data);
  },
  (err) => {
    if (err.response.status === 401) {
      ElMessage.error("请先登录！");
      router.push("/login");
    } else {
      ElMessage.error("服务异常");
    }
    return Promise.reject(err);
  }
);
const registerService = (registerData) => {
  var params = new URLSearchParams();
  for (let key in registerData) {
    params.append(key, registerData[key]);
  }
  return instance.post("/user/register", params);
};
const loginService = (loginData) => {
  var params = new URLSearchParams();
  for (let key in loginData) {
    params.append(key, loginData[key]);
  }
  return instance.post("/user/login", params);
};
const userInfoGetService = () => {
  return instance.get("/user/userInfo");
};
const userInfoUpdateService = (userInfo) => {
  return instance.put("/user/update", userInfo);
};
const userAvatarUpdateService = (avatarUrl) => {
  let params = new URLSearchParams();
  params.append("avatarUrl", avatarUrl);
  return instance.patch("/user/updateAvatar", params);
};
const userPasswordUpdateService = (updatepasswordData) => {
  return instance.patch("/user/updatePwd", updatepasswordData);
};
const PerformanceListService = () => {
  return instance.get("/performance");
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$a = {
  __name: "Login",
  __ssrInlineRender: true,
  setup(__props) {
    const isRegister = ref(false);
    const registerData = ref({
      username: "",
      password: "",
      rePassword: ""
    });
    const rePasswordValid = (rule, value, callback) => {
      if (value == null || value === "") {
        return callback(new Error("请再次确认密码"));
      } else if (registerData.value.password !== value) {
        return callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    const registerDataRules = ref({
      username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 5, max: 16, message: "用户名的长度必须为5~16位", trigger: "blur" }
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 5, max: 16, message: "密码长度必须为5~16位", trigger: "blur" }
      ],
      rePassword: [
        { validator: rePasswordValid, trigger: "blur" }
      ]
    });
    const register = async () => {
      await registerService(registerData.value);
      ElMessage.success("注册成功!");
    };
    const clearRegisterData = () => {
      registerData.value = {
        username: "",
        old_pwd: "",
        rePassword: ""
      };
    };
    const tokenStore = useTokenStore();
    const router2 = useRouter();
    const login = async () => {
      let result = await loginService(registerData.value);
      ElMessage.success("登录成功!");
      tokenStore.setToken(result.data);
      router2.push("/");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_row = resolveComponent("el-row");
      const _component_el_col = resolveComponent("el-col");
      const _component_el_form = resolveComponent("el-form");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_link = resolveComponent("el-link");
      const _component_el_checkbox = resolveComponent("el-checkbox");
      _push(ssrRenderComponent(_component_el_row, mergeProps({ class: "login-page" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_col, {
              span: 12,
              class: "bg"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_col, {
              span: 6,
              offset: 3,
              class: "form"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (isRegister.value) {
                    _push3(ssrRenderComponent(_component_el_form, {
                      ref: "form",
                      size: "large",
                      autocomplete: "off",
                      model: registerData.value,
                      rules: registerDataRules.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_form_item, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<h1 data-v-c312d60b${_scopeId4}>注册</h1>`);
                              } else {
                                return [
                                  createVNode("h1", null, "注册")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_form_item, { prop: "username" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_input, {
                                  "prefix-icon": unref(User),
                                  placeholder: "请输入用户名",
                                  modelValue: registerData.value.username,
                                  "onUpdate:modelValue": ($event) => registerData.value.username = $event
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_input, {
                                    "prefix-icon": unref(User),
                                    placeholder: "请输入用户名",
                                    modelValue: registerData.value.username,
                                    "onUpdate:modelValue": ($event) => registerData.value.username = $event
                                  }, null, 8, ["prefix-icon", "modelValue", "onUpdate:modelValue"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_form_item, { prop: "password" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_input, {
                                  "prefix-icon": unref(Lock),
                                  type: "password",
                                  placeholder: "请输入密码",
                                  modelValue: registerData.value.password,
                                  "onUpdate:modelValue": ($event) => registerData.value.password = $event
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_input, {
                                    "prefix-icon": unref(Lock),
                                    type: "password",
                                    placeholder: "请输入密码",
                                    modelValue: registerData.value.password,
                                    "onUpdate:modelValue": ($event) => registerData.value.password = $event
                                  }, null, 8, ["prefix-icon", "modelValue", "onUpdate:modelValue"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_form_item, { prop: "rePassword" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_input, {
                                  "prefix-icon": unref(Lock),
                                  type: "password",
                                  placeholder: "请输入再次密码",
                                  modelValue: registerData.value.rePassword,
                                  "onUpdate:modelValue": ($event) => registerData.value.rePassword = $event
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_input, {
                                    "prefix-icon": unref(Lock),
                                    type: "password",
                                    placeholder: "请输入再次密码",
                                    modelValue: registerData.value.rePassword,
                                    "onUpdate:modelValue": ($event) => registerData.value.rePassword = $event
                                  }, null, 8, ["prefix-icon", "modelValue", "onUpdate:modelValue"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_form_item, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_button, {
                                  class: "button",
                                  type: "primary",
                                  "auto-insert-space": "",
                                  onClick: register
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` 注册 `);
                                    } else {
                                      return [
                                        createTextVNode(" 注册 ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_button, {
                                    class: "button",
                                    type: "primary",
                                    "auto-insert-space": "",
                                    onClick: register
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" 注册 ")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_form_item, { class: "flex" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_link, {
                                  type: "info",
                                  underline: false,
                                  onClick: ($event) => {
                                    isRegister.value = false;
                                    clearRegisterData();
                                  }
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` ← 返回 `);
                                    } else {
                                      return [
                                        createTextVNode(" ← 返回 ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_link, {
                                    type: "info",
                                    underline: false,
                                    onClick: ($event) => {
                                      isRegister.value = false;
                                      clearRegisterData();
                                    }
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" ← 返回 ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_form_item, null, {
                              default: withCtx(() => [
                                createVNode("h1", null, "注册")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, { prop: "username" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  "prefix-icon": unref(User),
                                  placeholder: "请输入用户名",
                                  modelValue: registerData.value.username,
                                  "onUpdate:modelValue": ($event) => registerData.value.username = $event
                                }, null, 8, ["prefix-icon", "modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, { prop: "password" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  "prefix-icon": unref(Lock),
                                  type: "password",
                                  placeholder: "请输入密码",
                                  modelValue: registerData.value.password,
                                  "onUpdate:modelValue": ($event) => registerData.value.password = $event
                                }, null, 8, ["prefix-icon", "modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, { prop: "rePassword" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  "prefix-icon": unref(Lock),
                                  type: "password",
                                  placeholder: "请输入再次密码",
                                  modelValue: registerData.value.rePassword,
                                  "onUpdate:modelValue": ($event) => registerData.value.rePassword = $event
                                }, null, 8, ["prefix-icon", "modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, null, {
                              default: withCtx(() => [
                                createVNode(_component_el_button, {
                                  class: "button",
                                  type: "primary",
                                  "auto-insert-space": "",
                                  onClick: register
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 注册 ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, { class: "flex" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_link, {
                                  type: "info",
                                  underline: false,
                                  onClick: ($event) => {
                                    isRegister.value = false;
                                    clearRegisterData();
                                  }
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" ← 返回 ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(_component_el_form, {
                      ref: "form",
                      size: "large",
                      autocomplete: "off",
                      model: registerData.value,
                      rules: registerDataRules.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_form_item, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<h1 data-v-c312d60b${_scopeId4}>登录</h1>`);
                              } else {
                                return [
                                  createVNode("h1", null, "登录")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_form_item, { prop: "username" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_input, {
                                  "prefix-icon": unref(User),
                                  placeholder: "请输入用户名",
                                  modelValue: registerData.value.username,
                                  "onUpdate:modelValue": ($event) => registerData.value.username = $event
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_input, {
                                    "prefix-icon": unref(User),
                                    placeholder: "请输入用户名",
                                    modelValue: registerData.value.username,
                                    "onUpdate:modelValue": ($event) => registerData.value.username = $event
                                  }, null, 8, ["prefix-icon", "modelValue", "onUpdate:modelValue"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_form_item, { prop: "password" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_input, {
                                  name: "password",
                                  "prefix-icon": unref(Lock),
                                  type: "password",
                                  placeholder: "请输入密码",
                                  modelValue: registerData.value.password,
                                  "onUpdate:modelValue": ($event) => registerData.value.password = $event
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_input, {
                                    name: "password",
                                    "prefix-icon": unref(Lock),
                                    type: "password",
                                    placeholder: "请输入密码",
                                    modelValue: registerData.value.password,
                                    "onUpdate:modelValue": ($event) => registerData.value.password = $event
                                  }, null, 8, ["prefix-icon", "modelValue", "onUpdate:modelValue"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_form_item, { class: "flex" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex" data-v-c312d60b${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_el_checkbox, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`记住我`);
                                    } else {
                                      return [
                                        createTextVNode("记住我")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_el_link, {
                                  type: "primary",
                                  underline: false
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`忘记密码？`);
                                    } else {
                                      return [
                                        createTextVNode("忘记密码？")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex" }, [
                                    createVNode(_component_el_checkbox, null, {
                                      default: withCtx(() => [
                                        createTextVNode("记住我")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_el_link, {
                                      type: "primary",
                                      underline: false
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("忘记密码？")
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_form_item, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_button, {
                                  class: "button",
                                  type: "primary",
                                  "auto-insert-space": "",
                                  onClick: login
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`登录`);
                                    } else {
                                      return [
                                        createTextVNode("登录")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_button, {
                                    class: "button",
                                    type: "primary",
                                    "auto-insert-space": "",
                                    onClick: login
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("登录")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_el_form_item, { class: "flex" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_link, {
                                  type: "info",
                                  underline: false,
                                  onClick: ($event) => {
                                    isRegister.value = true;
                                    clearRegisterData();
                                  }
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` 注册 → `);
                                    } else {
                                      return [
                                        createTextVNode(" 注册 → ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_link, {
                                    type: "info",
                                    underline: false,
                                    onClick: ($event) => {
                                      isRegister.value = true;
                                      clearRegisterData();
                                    }
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" 注册 → ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_form_item, null, {
                              default: withCtx(() => [
                                createVNode("h1", null, "登录")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, { prop: "username" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  "prefix-icon": unref(User),
                                  placeholder: "请输入用户名",
                                  modelValue: registerData.value.username,
                                  "onUpdate:modelValue": ($event) => registerData.value.username = $event
                                }, null, 8, ["prefix-icon", "modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, { prop: "password" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  name: "password",
                                  "prefix-icon": unref(Lock),
                                  type: "password",
                                  placeholder: "请输入密码",
                                  modelValue: registerData.value.password,
                                  "onUpdate:modelValue": ($event) => registerData.value.password = $event
                                }, null, 8, ["prefix-icon", "modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, { class: "flex" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex" }, [
                                  createVNode(_component_el_checkbox, null, {
                                    default: withCtx(() => [
                                      createTextVNode("记住我")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_el_link, {
                                    type: "primary",
                                    underline: false
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("忘记密码？")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, null, {
                              default: withCtx(() => [
                                createVNode(_component_el_button, {
                                  class: "button",
                                  type: "primary",
                                  "auto-insert-space": "",
                                  onClick: login
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("登录")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, { class: "flex" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_link, {
                                  type: "info",
                                  underline: false,
                                  onClick: ($event) => {
                                    isRegister.value = true;
                                    clearRegisterData();
                                  }
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 注册 → ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    isRegister.value ? (openBlock(), createBlock(_component_el_form, {
                      key: 0,
                      ref: "form",
                      size: "large",
                      autocomplete: "off",
                      model: registerData.value,
                      rules: registerDataRules.value
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_form_item, null, {
                          default: withCtx(() => [
                            createVNode("h1", null, "注册")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, { prop: "username" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              "prefix-icon": unref(User),
                              placeholder: "请输入用户名",
                              modelValue: registerData.value.username,
                              "onUpdate:modelValue": ($event) => registerData.value.username = $event
                            }, null, 8, ["prefix-icon", "modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, { prop: "password" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              "prefix-icon": unref(Lock),
                              type: "password",
                              placeholder: "请输入密码",
                              modelValue: registerData.value.password,
                              "onUpdate:modelValue": ($event) => registerData.value.password = $event
                            }, null, 8, ["prefix-icon", "modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, { prop: "rePassword" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              "prefix-icon": unref(Lock),
                              type: "password",
                              placeholder: "请输入再次密码",
                              modelValue: registerData.value.rePassword,
                              "onUpdate:modelValue": ($event) => registerData.value.rePassword = $event
                            }, null, 8, ["prefix-icon", "modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, null, {
                          default: withCtx(() => [
                            createVNode(_component_el_button, {
                              class: "button",
                              type: "primary",
                              "auto-insert-space": "",
                              onClick: register
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 注册 ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, { class: "flex" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_link, {
                              type: "info",
                              underline: false,
                              onClick: ($event) => {
                                isRegister.value = false;
                                clearRegisterData();
                              }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" ← 返回 ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["model", "rules"])) : (openBlock(), createBlock(_component_el_form, {
                      key: 1,
                      ref: "form",
                      size: "large",
                      autocomplete: "off",
                      model: registerData.value,
                      rules: registerDataRules.value
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_form_item, null, {
                          default: withCtx(() => [
                            createVNode("h1", null, "登录")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, { prop: "username" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              "prefix-icon": unref(User),
                              placeholder: "请输入用户名",
                              modelValue: registerData.value.username,
                              "onUpdate:modelValue": ($event) => registerData.value.username = $event
                            }, null, 8, ["prefix-icon", "modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, { prop: "password" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              name: "password",
                              "prefix-icon": unref(Lock),
                              type: "password",
                              placeholder: "请输入密码",
                              modelValue: registerData.value.password,
                              "onUpdate:modelValue": ($event) => registerData.value.password = $event
                            }, null, 8, ["prefix-icon", "modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, { class: "flex" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex" }, [
                              createVNode(_component_el_checkbox, null, {
                                default: withCtx(() => [
                                  createTextVNode("记住我")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_link, {
                                type: "primary",
                                underline: false
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("忘记密码？")
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, null, {
                          default: withCtx(() => [
                            createVNode(_component_el_button, {
                              class: "button",
                              type: "primary",
                              "auto-insert-space": "",
                              onClick: login
                            }, {
                              default: withCtx(() => [
                                createTextVNode("登录")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, { class: "flex" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_link, {
                              type: "info",
                              underline: false,
                              onClick: ($event) => {
                                isRegister.value = true;
                                clearRegisterData();
                              }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" 注册 → ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["model", "rules"]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_col, {
                span: 12,
                class: "bg"
              }),
              createVNode(_component_el_col, {
                span: 6,
                offset: 3,
                class: "form"
              }, {
                default: withCtx(() => [
                  isRegister.value ? (openBlock(), createBlock(_component_el_form, {
                    key: 0,
                    ref: "form",
                    size: "large",
                    autocomplete: "off",
                    model: registerData.value,
                    rules: registerDataRules.value
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_form_item, null, {
                        default: withCtx(() => [
                          createVNode("h1", null, "注册")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, { prop: "username" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            "prefix-icon": unref(User),
                            placeholder: "请输入用户名",
                            modelValue: registerData.value.username,
                            "onUpdate:modelValue": ($event) => registerData.value.username = $event
                          }, null, 8, ["prefix-icon", "modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, { prop: "password" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            "prefix-icon": unref(Lock),
                            type: "password",
                            placeholder: "请输入密码",
                            modelValue: registerData.value.password,
                            "onUpdate:modelValue": ($event) => registerData.value.password = $event
                          }, null, 8, ["prefix-icon", "modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, { prop: "rePassword" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            "prefix-icon": unref(Lock),
                            type: "password",
                            placeholder: "请输入再次密码",
                            modelValue: registerData.value.rePassword,
                            "onUpdate:modelValue": ($event) => registerData.value.rePassword = $event
                          }, null, 8, ["prefix-icon", "modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, null, {
                        default: withCtx(() => [
                          createVNode(_component_el_button, {
                            class: "button",
                            type: "primary",
                            "auto-insert-space": "",
                            onClick: register
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 注册 ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, { class: "flex" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_link, {
                            type: "info",
                            underline: false,
                            onClick: ($event) => {
                              isRegister.value = false;
                              clearRegisterData();
                            }
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" ← 返回 ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["model", "rules"])) : (openBlock(), createBlock(_component_el_form, {
                    key: 1,
                    ref: "form",
                    size: "large",
                    autocomplete: "off",
                    model: registerData.value,
                    rules: registerDataRules.value
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_form_item, null, {
                        default: withCtx(() => [
                          createVNode("h1", null, "登录")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, { prop: "username" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            "prefix-icon": unref(User),
                            placeholder: "请输入用户名",
                            modelValue: registerData.value.username,
                            "onUpdate:modelValue": ($event) => registerData.value.username = $event
                          }, null, 8, ["prefix-icon", "modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, { prop: "password" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            name: "password",
                            "prefix-icon": unref(Lock),
                            type: "password",
                            placeholder: "请输入密码",
                            modelValue: registerData.value.password,
                            "onUpdate:modelValue": ($event) => registerData.value.password = $event
                          }, null, 8, ["prefix-icon", "modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, { class: "flex" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex" }, [
                            createVNode(_component_el_checkbox, null, {
                              default: withCtx(() => [
                                createTextVNode("记住我")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_link, {
                              type: "primary",
                              underline: false
                            }, {
                              default: withCtx(() => [
                                createTextVNode("忘记密码？")
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, null, {
                        default: withCtx(() => [
                          createVNode(_component_el_button, {
                            class: "button",
                            type: "primary",
                            "auto-insert-space": "",
                            onClick: login
                          }, {
                            default: withCtx(() => [
                              createTextVNode("登录")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, { class: "flex" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_link, {
                            type: "info",
                            underline: false,
                            onClick: ($event) => {
                              isRegister.value = true;
                              clearRegisterData();
                            }
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 注册 → ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["model", "rules"]))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Login.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const LoginVue = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-c312d60b"]]);
const avatar = "/assets/default-uscRzRXF.png";
const useUserInfoStore = defineStore("userInfo", () => {
  const info = ref({});
  const setInfo = (newInfo) => {
    info.value = newInfo;
  };
  const removeInfo = () => {
    info.value = {};
  };
  return { info, setInfo, removeInfo };
}, {
  persist: true
});
const _sfc_main$9 = {
  __name: "Layout",
  __ssrInlineRender: true,
  setup(__props) {
    const userInfoStore = useUserInfoStore();
    const getUserInfo = async () => {
      let result = await userInfoGetService();
      userInfoStore.info = result.data;
    };
    getUserInfo();
    const tokenStore = useTokenStore();
    const handleCommand = (command) => {
      if (command === "logout") {
        ElMessageBox.confirm(
          "你确认退出登录码？",
          "温馨提示",
          {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(async () => {
          tokenStore.removeToken();
          userInfoStore.removeInfo();
          await router.push("/login");
        }).catch(() => {
          ElMessage({
            type: "info",
            message: "取消退出"
          });
        });
      } else {
        router.push("/user/" + command);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_container = resolveComponent("el-container");
      const _component_el_aside = resolveComponent("el-aside");
      const _component_el_menu = resolveComponent("el-menu");
      const _component_el_sub_menu = resolveComponent("el-sub-menu");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_menu_item = resolveComponent("el-menu-item");
      const _component_el_header = resolveComponent("el-header");
      const _component_el_dropdown = resolveComponent("el-dropdown");
      const _component_el_avatar = resolveComponent("el-avatar");
      const _component_el_dropdown_menu = resolveComponent("el-dropdown-menu");
      const _component_el_dropdown_item = resolveComponent("el-dropdown-item");
      const _component_el_main = resolveComponent("el-main");
      const _component_router_view = resolveComponent("router-view");
      const _component_el_footer = resolveComponent("el-footer");
      _push(ssrRenderComponent(_component_el_container, mergeProps({ class: "layout-container" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_aside, { width: "200px" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="el-aside__logo" data-v-6986bc75${_scopeId2}></div>`);
                  _push3(ssrRenderComponent(_component_el_menu, {
                    "active-text-color": "#ffd04b",
                    "background-color": "#232323",
                    "text-color": "#fff",
                    router: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_sub_menu, { index: "1" }, {
                          title: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_icon, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Management), null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Management))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<span data-v-6986bc75${_scopeId4}>文章分类</span>`);
                            } else {
                              return [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(Management))
                                  ]),
                                  _: 1
                                }),
                                createVNode("span", null, "文章分类")
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_menu_item, { index: "/article/category" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_icon, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(Management), null, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(Management))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<span data-v-6986bc75${_scopeId5}>详细分类</span>`);
                                  } else {
                                    return [
                                      createVNode(_component_el_icon, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Management))
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("span", null, "详细分类")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_menu_item, { index: "/article/category-chart" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_icon, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(HelpFilled), null, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(HelpFilled))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<span data-v-6986bc75${_scopeId5}>图表分析</span>`);
                                  } else {
                                    return [
                                      createVNode(_component_el_icon, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(HelpFilled))
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("span", null, "图表分析")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_menu_item, { index: "/article/category" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_icon, null, {
                                      default: withCtx(() => [
                                        createVNode(unref(Management))
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("span", null, "详细分类")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_menu_item, { index: "/article/category-chart" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_icon, null, {
                                      default: withCtx(() => [
                                        createVNode(unref(HelpFilled))
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("span", null, "图表分析")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_sub_menu, { index: "2" }, {
                          title: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_icon, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Promotion), null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Promotion))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<span data-v-6986bc75${_scopeId4}>文章管理</span>`);
                            } else {
                              return [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(Promotion))
                                  ]),
                                  _: 1
                                }),
                                createVNode("span", null, "文章管理")
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_menu_item, { index: "/article/manage" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_icon, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(Promotion), null, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(Promotion))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<span data-v-6986bc75${_scopeId5}>文章管理</span>`);
                                  } else {
                                    return [
                                      createVNode(_component_el_icon, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Promotion))
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("span", null, "文章管理")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_menu_item, { index: "/article/manage-chart" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_icon, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(PictureFilled), null, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(PictureFilled))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<span data-v-6986bc75${_scopeId5}>图表分析</span>`);
                                  } else {
                                    return [
                                      createVNode(_component_el_icon, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(PictureFilled))
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("span", null, "图表分析")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_menu_item, { index: "/article/manage" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_icon, null, {
                                      default: withCtx(() => [
                                        createVNode(unref(Promotion))
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("span", null, "文章管理")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_menu_item, { index: "/article/manage-chart" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_icon, null, {
                                      default: withCtx(() => [
                                        createVNode(unref(PictureFilled))
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("span", null, "图表分析")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_sub_menu, { index: "3" }, {
                          title: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_icon, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(UserFilled), null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(UserFilled))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<span data-v-6986bc75${_scopeId4}>个人中心</span>`);
                            } else {
                              return [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(UserFilled))
                                  ]),
                                  _: 1
                                }),
                                createVNode("span", null, "个人中心")
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_menu_item, { index: "/user/info" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_icon, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(User), null, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(User))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<span data-v-6986bc75${_scopeId5}>基本资料</span>`);
                                  } else {
                                    return [
                                      createVNode(_component_el_icon, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(User))
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("span", null, "基本资料")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_menu_item, { index: "/user/avatar" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_icon, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(Crop), null, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(Crop))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<span data-v-6986bc75${_scopeId5}>更换头像</span>`);
                                  } else {
                                    return [
                                      createVNode(_component_el_icon, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Crop))
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("span", null, "更换头像")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_menu_item, { index: "/user/password" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_icon, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(EditPen), null, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(EditPen))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<span data-v-6986bc75${_scopeId5}>重置密码</span>`);
                                  } else {
                                    return [
                                      createVNode(_component_el_icon, null, {
                                        default: withCtx(() => [
                                          createVNode(unref(EditPen))
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("span", null, "重置密码")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_menu_item, { index: "/user/info" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_icon, null, {
                                      default: withCtx(() => [
                                        createVNode(unref(User))
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("span", null, "基本资料")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_menu_item, { index: "/user/avatar" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_icon, null, {
                                      default: withCtx(() => [
                                        createVNode(unref(Crop))
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("span", null, "更换头像")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_menu_item, { index: "/user/password" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_icon, null, {
                                      default: withCtx(() => [
                                        createVNode(unref(EditPen))
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("span", null, "重置密码")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_menu_item, { index: "/user/char" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_icon, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(TrendCharts), null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(TrendCharts))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<span data-v-6986bc75${_scopeId4}>绩效分析</span>`);
                            } else {
                              return [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(TrendCharts))
                                  ]),
                                  _: 1
                                }),
                                createVNode("span", null, "绩效分析")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_sub_menu, { index: "1" }, {
                            title: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(Management))
                                ]),
                                _: 1
                              }),
                              createVNode("span", null, "文章分类")
                            ]),
                            default: withCtx(() => [
                              createVNode(_component_el_menu_item, { index: "/article/category" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(unref(Management))
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("span", null, "详细分类")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_menu_item, { index: "/article/category-chart" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(unref(HelpFilled))
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("span", null, "图表分析")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_sub_menu, { index: "2" }, {
                            title: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(Promotion))
                                ]),
                                _: 1
                              }),
                              createVNode("span", null, "文章管理")
                            ]),
                            default: withCtx(() => [
                              createVNode(_component_el_menu_item, { index: "/article/manage" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(unref(Promotion))
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("span", null, "文章管理")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_menu_item, { index: "/article/manage-chart" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(unref(PictureFilled))
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("span", null, "图表分析")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_sub_menu, { index: "3" }, {
                            title: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(UserFilled))
                                ]),
                                _: 1
                              }),
                              createVNode("span", null, "个人中心")
                            ]),
                            default: withCtx(() => [
                              createVNode(_component_el_menu_item, { index: "/user/info" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(unref(User))
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("span", null, "基本资料")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_menu_item, { index: "/user/avatar" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(unref(Crop))
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("span", null, "更换头像")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_menu_item, { index: "/user/password" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(unref(EditPen))
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("span", null, "重置密码")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_menu_item, { index: "/user/char" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(TrendCharts))
                                ]),
                                _: 1
                              }),
                              createVNode("span", null, "绩效分析")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "el-aside__logo" }),
                    createVNode(_component_el_menu, {
                      "active-text-color": "#ffd04b",
                      "background-color": "#232323",
                      "text-color": "#fff",
                      router: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_sub_menu, { index: "1" }, {
                          title: withCtx(() => [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(unref(Management))
                              ]),
                              _: 1
                            }),
                            createVNode("span", null, "文章分类")
                          ]),
                          default: withCtx(() => [
                            createVNode(_component_el_menu_item, { index: "/article/category" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(Management))
                                  ]),
                                  _: 1
                                }),
                                createVNode("span", null, "详细分类")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_menu_item, { index: "/article/category-chart" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(HelpFilled))
                                  ]),
                                  _: 1
                                }),
                                createVNode("span", null, "图表分析")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_sub_menu, { index: "2" }, {
                          title: withCtx(() => [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(unref(Promotion))
                              ]),
                              _: 1
                            }),
                            createVNode("span", null, "文章管理")
                          ]),
                          default: withCtx(() => [
                            createVNode(_component_el_menu_item, { index: "/article/manage" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(Promotion))
                                  ]),
                                  _: 1
                                }),
                                createVNode("span", null, "文章管理")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_menu_item, { index: "/article/manage-chart" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(PictureFilled))
                                  ]),
                                  _: 1
                                }),
                                createVNode("span", null, "图表分析")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_sub_menu, { index: "3" }, {
                          title: withCtx(() => [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(unref(UserFilled))
                              ]),
                              _: 1
                            }),
                            createVNode("span", null, "个人中心")
                          ]),
                          default: withCtx(() => [
                            createVNode(_component_el_menu_item, { index: "/user/info" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(User))
                                  ]),
                                  _: 1
                                }),
                                createVNode("span", null, "基本资料")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_menu_item, { index: "/user/avatar" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(Crop))
                                  ]),
                                  _: 1
                                }),
                                createVNode("span", null, "更换头像")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_menu_item, { index: "/user/password" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(EditPen))
                                  ]),
                                  _: 1
                                }),
                                createVNode("span", null, "重置密码")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_menu_item, { index: "/user/char" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(unref(TrendCharts))
                              ]),
                              _: 1
                            }),
                            createVNode("span", null, "绩效分析")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_container, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_header, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div data-v-6986bc75${_scopeId3}>黑马程序员：<strong data-v-6986bc75${_scopeId3}>${ssrInterpolate(unref(userInfoStore).info.nickname ? unref(userInfoStore).info.nickname : unref(userInfoStore).info.usrename)}</strong></div>`);
                        _push4(ssrRenderComponent(_component_el_dropdown, {
                          placement: "bottom-end",
                          onCommand: handleCommand
                        }, {
                          dropdown: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_dropdown_menu, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_dropdown_item, {
                                      command: "info",
                                      icon: unref(User)
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`基本资料`);
                                        } else {
                                          return [
                                            createTextVNode("基本资料")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_el_dropdown_item, {
                                      command: "avatar",
                                      icon: unref(Crop)
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`更换头像`);
                                        } else {
                                          return [
                                            createTextVNode("更换头像")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_el_dropdown_item, {
                                      command: "password",
                                      icon: unref(EditPen)
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`重置密码`);
                                        } else {
                                          return [
                                            createTextVNode("重置密码")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_el_dropdown_item, {
                                      command: "logout",
                                      icon: unref(SwitchButton)
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`退出登录`);
                                        } else {
                                          return [
                                            createTextVNode("退出登录")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_dropdown_item, {
                                        command: "info",
                                        icon: unref(User)
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("基本资料")
                                        ]),
                                        _: 1
                                      }, 8, ["icon"]),
                                      createVNode(_component_el_dropdown_item, {
                                        command: "avatar",
                                        icon: unref(Crop)
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("更换头像")
                                        ]),
                                        _: 1
                                      }, 8, ["icon"]),
                                      createVNode(_component_el_dropdown_item, {
                                        command: "password",
                                        icon: unref(EditPen)
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("重置密码")
                                        ]),
                                        _: 1
                                      }, 8, ["icon"]),
                                      createVNode(_component_el_dropdown_item, {
                                        command: "logout",
                                        icon: unref(SwitchButton)
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("退出登录")
                                        ]),
                                        _: 1
                                      }, 8, ["icon"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_dropdown_menu, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_dropdown_item, {
                                      command: "info",
                                      icon: unref(User)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("基本资料")
                                      ]),
                                      _: 1
                                    }, 8, ["icon"]),
                                    createVNode(_component_el_dropdown_item, {
                                      command: "avatar",
                                      icon: unref(Crop)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("更换头像")
                                      ]),
                                      _: 1
                                    }, 8, ["icon"]),
                                    createVNode(_component_el_dropdown_item, {
                                      command: "password",
                                      icon: unref(EditPen)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("重置密码")
                                      ]),
                                      _: 1
                                    }, 8, ["icon"]),
                                    createVNode(_component_el_dropdown_item, {
                                      command: "logout",
                                      icon: unref(SwitchButton)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("退出登录")
                                      ]),
                                      _: 1
                                    }, 8, ["icon"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span class="el-dropdown__box" data-v-6986bc75${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_el_avatar, {
                                src: unref(userInfoStore).info.userPic ? unref(userInfoStore).info.userPic : unref(avatar)
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_icon, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(CaretBottom), null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(CaretBottom))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</span>`);
                            } else {
                              return [
                                createVNode("span", { class: "el-dropdown__box" }, [
                                  createVNode(_component_el_avatar, {
                                    src: unref(userInfoStore).info.userPic ? unref(userInfoStore).info.userPic : unref(avatar)
                                  }, null, 8, ["src"]),
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(unref(CaretBottom))
                                    ]),
                                    _: 1
                                  })
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", null, [
                            createTextVNode("黑马程序员："),
                            createVNode("strong", null, toDisplayString(unref(userInfoStore).info.nickname ? unref(userInfoStore).info.nickname : unref(userInfoStore).info.usrename), 1)
                          ]),
                          createVNode(_component_el_dropdown, {
                            placement: "bottom-end",
                            onCommand: handleCommand
                          }, {
                            dropdown: withCtx(() => [
                              createVNode(_component_el_dropdown_menu, null, {
                                default: withCtx(() => [
                                  createVNode(_component_el_dropdown_item, {
                                    command: "info",
                                    icon: unref(User)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("基本资料")
                                    ]),
                                    _: 1
                                  }, 8, ["icon"]),
                                  createVNode(_component_el_dropdown_item, {
                                    command: "avatar",
                                    icon: unref(Crop)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("更换头像")
                                    ]),
                                    _: 1
                                  }, 8, ["icon"]),
                                  createVNode(_component_el_dropdown_item, {
                                    command: "password",
                                    icon: unref(EditPen)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("重置密码")
                                    ]),
                                    _: 1
                                  }, 8, ["icon"]),
                                  createVNode(_component_el_dropdown_item, {
                                    command: "logout",
                                    icon: unref(SwitchButton)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("退出登录")
                                    ]),
                                    _: 1
                                  }, 8, ["icon"])
                                ]),
                                _: 1
                              })
                            ]),
                            default: withCtx(() => [
                              createVNode("span", { class: "el-dropdown__box" }, [
                                createVNode(_component_el_avatar, {
                                  src: unref(userInfoStore).info.userPic ? unref(userInfoStore).info.userPic : unref(avatar)
                                }, null, 8, ["src"]),
                                createVNode(_component_el_icon, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(CaretBottom))
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_main, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_router_view, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_router_view)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_footer, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`大事件 ©2023 Created by 黑马程序员`);
                      } else {
                        return [
                          createTextVNode("大事件 ©2023 Created by 黑马程序员")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_header, null, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createTextVNode("黑马程序员："),
                          createVNode("strong", null, toDisplayString(unref(userInfoStore).info.nickname ? unref(userInfoStore).info.nickname : unref(userInfoStore).info.usrename), 1)
                        ]),
                        createVNode(_component_el_dropdown, {
                          placement: "bottom-end",
                          onCommand: handleCommand
                        }, {
                          dropdown: withCtx(() => [
                            createVNode(_component_el_dropdown_menu, null, {
                              default: withCtx(() => [
                                createVNode(_component_el_dropdown_item, {
                                  command: "info",
                                  icon: unref(User)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("基本资料")
                                  ]),
                                  _: 1
                                }, 8, ["icon"]),
                                createVNode(_component_el_dropdown_item, {
                                  command: "avatar",
                                  icon: unref(Crop)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("更换头像")
                                  ]),
                                  _: 1
                                }, 8, ["icon"]),
                                createVNode(_component_el_dropdown_item, {
                                  command: "password",
                                  icon: unref(EditPen)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("重置密码")
                                  ]),
                                  _: 1
                                }, 8, ["icon"]),
                                createVNode(_component_el_dropdown_item, {
                                  command: "logout",
                                  icon: unref(SwitchButton)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("退出登录")
                                  ]),
                                  _: 1
                                }, 8, ["icon"])
                              ]),
                              _: 1
                            })
                          ]),
                          default: withCtx(() => [
                            createVNode("span", { class: "el-dropdown__box" }, [
                              createVNode(_component_el_avatar, {
                                src: unref(userInfoStore).info.userPic ? unref(userInfoStore).info.userPic : unref(avatar)
                              }, null, 8, ["src"]),
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(CaretBottom))
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_main, null, {
                      default: withCtx(() => [
                        createVNode(_component_router_view)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_footer, null, {
                      default: withCtx(() => [
                        createTextVNode("大事件 ©2023 Created by 黑马程序员")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_aside, { width: "200px" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "el-aside__logo" }),
                  createVNode(_component_el_menu, {
                    "active-text-color": "#ffd04b",
                    "background-color": "#232323",
                    "text-color": "#fff",
                    router: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_sub_menu, { index: "1" }, {
                        title: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(Management))
                            ]),
                            _: 1
                          }),
                          createVNode("span", null, "文章分类")
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_el_menu_item, { index: "/article/category" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(Management))
                                ]),
                                _: 1
                              }),
                              createVNode("span", null, "详细分类")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_menu_item, { index: "/article/category-chart" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(HelpFilled))
                                ]),
                                _: 1
                              }),
                              createVNode("span", null, "图表分析")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_sub_menu, { index: "2" }, {
                        title: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(Promotion))
                            ]),
                            _: 1
                          }),
                          createVNode("span", null, "文章管理")
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_el_menu_item, { index: "/article/manage" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(Promotion))
                                ]),
                                _: 1
                              }),
                              createVNode("span", null, "文章管理")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_menu_item, { index: "/article/manage-chart" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(PictureFilled))
                                ]),
                                _: 1
                              }),
                              createVNode("span", null, "图表分析")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_sub_menu, { index: "3" }, {
                        title: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(UserFilled))
                            ]),
                            _: 1
                          }),
                          createVNode("span", null, "个人中心")
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_el_menu_item, { index: "/user/info" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(User))
                                ]),
                                _: 1
                              }),
                              createVNode("span", null, "基本资料")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_menu_item, { index: "/user/avatar" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(Crop))
                                ]),
                                _: 1
                              }),
                              createVNode("span", null, "更换头像")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_menu_item, { index: "/user/password" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(EditPen))
                                ]),
                                _: 1
                              }),
                              createVNode("span", null, "重置密码")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_menu_item, { index: "/user/char" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(TrendCharts))
                            ]),
                            _: 1
                          }),
                          createVNode("span", null, "绩效分析")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_el_container, null, {
                default: withCtx(() => [
                  createVNode(_component_el_header, null, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createTextVNode("黑马程序员："),
                        createVNode("strong", null, toDisplayString(unref(userInfoStore).info.nickname ? unref(userInfoStore).info.nickname : unref(userInfoStore).info.usrename), 1)
                      ]),
                      createVNode(_component_el_dropdown, {
                        placement: "bottom-end",
                        onCommand: handleCommand
                      }, {
                        dropdown: withCtx(() => [
                          createVNode(_component_el_dropdown_menu, null, {
                            default: withCtx(() => [
                              createVNode(_component_el_dropdown_item, {
                                command: "info",
                                icon: unref(User)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("基本资料")
                                ]),
                                _: 1
                              }, 8, ["icon"]),
                              createVNode(_component_el_dropdown_item, {
                                command: "avatar",
                                icon: unref(Crop)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("更换头像")
                                ]),
                                _: 1
                              }, 8, ["icon"]),
                              createVNode(_component_el_dropdown_item, {
                                command: "password",
                                icon: unref(EditPen)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("重置密码")
                                ]),
                                _: 1
                              }, 8, ["icon"]),
                              createVNode(_component_el_dropdown_item, {
                                command: "logout",
                                icon: unref(SwitchButton)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("退出登录")
                                ]),
                                _: 1
                              }, 8, ["icon"])
                            ]),
                            _: 1
                          })
                        ]),
                        default: withCtx(() => [
                          createVNode("span", { class: "el-dropdown__box" }, [
                            createVNode(_component_el_avatar, {
                              src: unref(userInfoStore).info.userPic ? unref(userInfoStore).info.userPic : unref(avatar)
                            }, null, 8, ["src"]),
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(unref(CaretBottom))
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_main, null, {
                    default: withCtx(() => [
                      createVNode(_component_router_view)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_footer, null, {
                    default: withCtx(() => [
                      createTextVNode("大事件 ©2023 Created by 黑马程序员")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Layout.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const LayoutVue = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-6986bc75"]]);
const articleCategoryListService = () => {
  return instance.get("/category");
};
const articleCategoryAddService = (categoryModel) => {
  return instance.post("/category", categoryModel);
};
const articleCategoryUpdateService = (categoryModel) => {
  return instance.put("/category", categoryModel);
};
const articleCategoryDeleteService = (id) => {
  return instance.delete("/category?id=" + id);
};
const articleListService = (params) => {
  return instance.get("/article", { params });
};
const articleListsService = () => {
  return instance.get("/article/lists", { params: "" });
};
const articleAddService = (articleModel) => {
  return instance.post("/article", articleModel);
};
const articleUpdateService = (articleModel) => {
  return instance.put("/article", articleModel);
};
const articleDeleteService = (id) => {
  return instance.delete("/article?id=" + id);
};
const _sfc_main$8 = {
  __name: "ArticleCategory",
  __ssrInlineRender: true,
  setup(__props) {
    const categorys = ref([
      {
        "id": 3,
        "categoryName": "美食",
        "categoryAlias": "my",
        "createTime": "2023-09-02 12:06:59",
        "updateTime": "2023-09-02 12:06:59"
      },
      {
        "id": 4,
        "categoryName": "娱乐",
        "categoryAlias": "yl",
        "createTime": "2023-09-02 12:08:16",
        "updateTime": "2023-09-02 12:08:16"
      },
      {
        "id": 5,
        "categoryName": "军事",
        "categoryAlias": "js",
        "createTime": "2023-09-02 12:08:33",
        "updateTime": "2023-09-02 12:08:33"
      }
    ]);
    const getAllCategory = async () => {
      let result = await articleCategoryListService();
      categorys.value = result.data;
    };
    getAllCategory();
    const dialogVisible = ref(false);
    const categoryModel = ref({
      categoryName: "",
      categoryAlias: ""
    });
    const rules = {
      categoryName: [
        { required: true, message: "请输入分类名称", trigger: "blur" }
      ],
      categoryAlias: [
        { required: true, message: "请输入分类别名", trigger: "blur" }
      ]
    };
    const addCategory = async () => {
      let result = await articleCategoryAddService(categoryModel.value);
      ElMessage.success(result.message ? result.message : "添加成功");
      clearcategoryModel();
      dialogVisible.value = false;
      getAllCategory();
    };
    const clearcategoryModel = () => {
      categoryModel.value = {
        categoryName: "",
        categoryAlias: ""
      };
    };
    const title = ref("");
    const updateCategoryEcho = (row) => {
      title.value = "修改分类";
      dialogVisible.value = true;
      categoryModel.value.categoryName = row.categoryName;
      categoryModel.value.categoryAlias = row.categoryAlias;
      categoryModel.value.id = row.id;
    };
    const updateCategory = async () => {
      let result = await articleCategoryUpdateService(categoryModel.value);
      ElMessage.success(result.message ? result.message : "修改成功");
      dialogVisible.value = false;
      getAllCategory();
    };
    const deleteCategory = (row) => {
      ElMessageBox.confirm(
        "你确认删除该分类信息吗？",
        "温馨提示",
        {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(async () => {
        let result = await articleCategoryDeleteService(row.id);
        ElMessage.success(result.message ? result.message : "删除成功");
        getAllCategory();
      }).catch(() => {
        ElMessage({
          type: "info",
          message: "取消删除"
        });
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = resolveComponent("el-card");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_table = resolveComponent("el-table");
      const _component_el_table_column = resolveComponent("el-table-column");
      const _component_el_empty = resolveComponent("el-empty");
      const _component_el_dialog = resolveComponent("el-dialog");
      const _component_el_form = resolveComponent("el-form");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_input = resolveComponent("el-input");
      _push(ssrRenderComponent(_component_el_card, mergeProps({ class: "page-container" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="header" data-v-80b3a88a${_scopeId}><span data-v-80b3a88a${_scopeId}>文章分类</span><div class="extra" data-v-80b3a88a${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: ($event) => {
                dialogVisible.value = true;
                title.value = "添加分类";
              }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`添加分类`);
                } else {
                  return [
                    createTextVNode("添加分类")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "header" }, [
                createVNode("span", null, "文章分类"),
                createVNode("div", { class: "extra" }, [
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: ($event) => {
                      dialogVisible.value = true;
                      title.value = "添加分类";
                    }
                  }, {
                    default: withCtx(() => [
                      createTextVNode("添加分类")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table, {
              data: categorys.value,
              style: { "width": "100%" }
            }, {
              empty: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_empty, { description: "没有数据" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_empty, { description: "没有数据" })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "序号",
                    width: "100",
                    type: "index"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "分类名称",
                    prop: "categoryName"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "分类别名",
                    prop: "categoryAlias"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "操作",
                    width: "100"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, {
                          icon: unref(Edit),
                          circle: "",
                          plain: "",
                          type: "primary",
                          onClick: ($event) => updateCategoryEcho(row)
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_button, {
                          icon: unref(Delete),
                          circle: "",
                          plain: "",
                          type: "danger",
                          onClick: ($event) => deleteCategory(row)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_button, {
                            icon: unref(Edit),
                            circle: "",
                            plain: "",
                            type: "primary",
                            onClick: ($event) => updateCategoryEcho(row)
                          }, null, 8, ["icon", "onClick"]),
                          createVNode(_component_el_button, {
                            icon: unref(Delete),
                            circle: "",
                            plain: "",
                            type: "danger",
                            onClick: ($event) => deleteCategory(row)
                          }, null, 8, ["icon", "onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_table_column, {
                      label: "序号",
                      width: "100",
                      type: "index"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "分类名称",
                      prop: "categoryName"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "分类别名",
                      prop: "categoryAlias"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "操作",
                      width: "100"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_button, {
                          icon: unref(Edit),
                          circle: "",
                          plain: "",
                          type: "primary",
                          onClick: ($event) => updateCategoryEcho(row)
                        }, null, 8, ["icon", "onClick"]),
                        createVNode(_component_el_button, {
                          icon: unref(Delete),
                          circle: "",
                          plain: "",
                          type: "danger",
                          onClick: ($event) => deleteCategory(row)
                        }, null, 8, ["icon", "onClick"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_dialog, {
              modelValue: dialogVisible.value,
              "onUpdate:modelValue": ($event) => dialogVisible.value = $event,
              title: title.value,
              width: "30%"
            }, {
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="dialog-footer" data-v-80b3a88a${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_button, {
                    onClick: ($event) => {
                      dialogVisible.value = false;
                      clearcategoryModel();
                    }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`取消`);
                      } else {
                        return [
                          createTextVNode("取消")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "primary",
                    onClick: ($event) => title.value === "添加分类" ? addCategory() : updateCategory()
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 确认 `);
                      } else {
                        return [
                          createTextVNode(" 确认 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</span>`);
                } else {
                  return [
                    createVNode("span", { class: "dialog-footer" }, [
                      createVNode(_component_el_button, {
                        onClick: ($event) => {
                          dialogVisible.value = false;
                          clearcategoryModel();
                        }
                      }, {
                        default: withCtx(() => [
                          createTextVNode("取消")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_el_button, {
                        type: "primary",
                        onClick: ($event) => title.value === "添加分类" ? addCategory() : updateCategory()
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" 确认 ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form, {
                    model: categoryModel.value,
                    rules,
                    "label-width": "100px",
                    style: { "padding-right": "30px" }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_form_item, {
                          label: "分类名称",
                          prop: "categoryName"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_input, {
                                modelValue: categoryModel.value.categoryName,
                                "onUpdate:modelValue": ($event) => categoryModel.value.categoryName = $event,
                                minlength: "1",
                                maxlength: "10"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_input, {
                                  modelValue: categoryModel.value.categoryName,
                                  "onUpdate:modelValue": ($event) => categoryModel.value.categoryName = $event,
                                  minlength: "1",
                                  maxlength: "10"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_form_item, {
                          label: "分类别名",
                          prop: "categoryAlias"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_input, {
                                modelValue: categoryModel.value.categoryAlias,
                                "onUpdate:modelValue": ($event) => categoryModel.value.categoryAlias = $event,
                                minlength: "1",
                                maxlength: "15"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_input, {
                                  modelValue: categoryModel.value.categoryAlias,
                                  "onUpdate:modelValue": ($event) => categoryModel.value.categoryAlias = $event,
                                  minlength: "1",
                                  maxlength: "15"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_form_item, {
                            label: "分类名称",
                            prop: "categoryName"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: categoryModel.value.categoryName,
                                "onUpdate:modelValue": ($event) => categoryModel.value.categoryName = $event,
                                minlength: "1",
                                maxlength: "10"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, {
                            label: "分类别名",
                            prop: "categoryAlias"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: categoryModel.value.categoryAlias,
                                "onUpdate:modelValue": ($event) => categoryModel.value.categoryAlias = $event,
                                minlength: "1",
                                maxlength: "15"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form, {
                      model: categoryModel.value,
                      rules,
                      "label-width": "100px",
                      style: { "padding-right": "30px" }
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_form_item, {
                          label: "分类名称",
                          prop: "categoryName"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              modelValue: categoryModel.value.categoryName,
                              "onUpdate:modelValue": ($event) => categoryModel.value.categoryName = $event,
                              minlength: "1",
                              maxlength: "10"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, {
                          label: "分类别名",
                          prop: "categoryAlias"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              modelValue: categoryModel.value.categoryAlias,
                              "onUpdate:modelValue": ($event) => categoryModel.value.categoryAlias = $event,
                              minlength: "1",
                              maxlength: "15"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["model"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_table, {
                data: categorys.value,
                style: { "width": "100%" }
              }, {
                empty: withCtx(() => [
                  createVNode(_component_el_empty, { description: "没有数据" })
                ]),
                default: withCtx(() => [
                  createVNode(_component_el_table_column, {
                    label: "序号",
                    width: "100",
                    type: "index"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "分类名称",
                    prop: "categoryName"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "分类别名",
                    prop: "categoryAlias"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "操作",
                    width: "100"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_button, {
                        icon: unref(Edit),
                        circle: "",
                        plain: "",
                        type: "primary",
                        onClick: ($event) => updateCategoryEcho(row)
                      }, null, 8, ["icon", "onClick"]),
                      createVNode(_component_el_button, {
                        icon: unref(Delete),
                        circle: "",
                        plain: "",
                        type: "danger",
                        onClick: ($event) => deleteCategory(row)
                      }, null, 8, ["icon", "onClick"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["data"]),
              createVNode(_component_el_dialog, {
                modelValue: dialogVisible.value,
                "onUpdate:modelValue": ($event) => dialogVisible.value = $event,
                title: title.value,
                width: "30%"
              }, {
                footer: withCtx(() => [
                  createVNode("span", { class: "dialog-footer" }, [
                    createVNode(_component_el_button, {
                      onClick: ($event) => {
                        dialogVisible.value = false;
                        clearcategoryModel();
                      }
                    }, {
                      default: withCtx(() => [
                        createTextVNode("取消")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      type: "primary",
                      onClick: ($event) => title.value === "添加分类" ? addCategory() : updateCategory()
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 确认 ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ]),
                default: withCtx(() => [
                  createVNode(_component_el_form, {
                    model: categoryModel.value,
                    rules,
                    "label-width": "100px",
                    style: { "padding-right": "30px" }
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_form_item, {
                        label: "分类名称",
                        prop: "categoryName"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: categoryModel.value.categoryName,
                            "onUpdate:modelValue": ($event) => categoryModel.value.categoryName = $event,
                            minlength: "1",
                            maxlength: "10"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, {
                        label: "分类别名",
                        prop: "categoryAlias"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: categoryModel.value.categoryAlias,
                            "onUpdate:modelValue": ($event) => categoryModel.value.categoryAlias = $event,
                            minlength: "1",
                            maxlength: "15"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["model"])
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "title"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/article/ArticleCategory.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const ArticleCategoryVue = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-80b3a88a"]]);
const _sfc_main$7 = {
  __name: "ArticleCategoryChart",
  __ssrInlineRender: true,
  setup(__props) {
    const categorys = ref([
      {
        "id": 4,
        "categoryName": "人文",
        "categoryAlias": "rw",
        "createUser": 30,
        "articleQuantity": 4,
        "createTime": "2024-06-18 21:19:50",
        "updateTime": "2024-06-18 21:19:50"
      },
      {
        "id": 5,
        "categoryName": "军事",
        "categoryAlias": "js",
        "createUser": 30,
        "articleQuantity": 1,
        "createTime": "2024-06-18 21:20:08",
        "updateTime": "2024-06-18 21:20:08"
      },
      {
        "id": 6,
        "categoryName": "时事",
        "categoryAlias": "ss",
        "createUser": 30,
        "articleQuantity": 0,
        "createTime": "2024-06-18 21:20:57",
        "updateTime": "2024-06-18 21:20:57"
      },
      {
        "id": 7,
        "categoryName": "美食",
        "categoryAlias": "ms",
        "createUser": 30,
        "articleQuantity": 1,
        "createTime": "2024-06-18 21:21:12",
        "updateTime": "2024-06-18 21:21:12"
      },
      {
        "id": 8,
        "categoryName": "旅游",
        "categoryAlias": "ly",
        "createUser": 30,
        "articleQuantity": 4,
        "createTime": "2024-06-18 21:21:29",
        "updateTime": "2024-06-18 21:21:29"
      },
      {
        "id": 9,
        "categoryName": "历史",
        "categoryAlias": "ls",
        "createUser": 30,
        "articleQuantity": 0,
        "createTime": "2024-06-18 22:22:44",
        "updateTime": "2024-06-18 22:22:44"
      },
      {
        "id": 11,
        "categoryName": "文化",
        "categoryAlias": "wenhua",
        "createUser": 30,
        "articleQuantity": 0,
        "createTime": "2024-06-18 23:03:43",
        "updateTime": "2024-06-19 12:47:31"
      }
    ]);
    const option = ref({
      tooltip: {
        trigger: "item"
      },
      legend: {
        top: "5%",
        left: "center"
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2
          },
          label: {
            show: false,
            position: "center"
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold"
            }
          },
          labelLine: {
            show: false
          },
          // 数据
          data: []
        }
      ]
    });
    const getAllCategory = async () => {
      let result = await articleCategoryListService();
      categorys.value = result.data;
      updateOptionData();
    };
    getAllCategory();
    const data = ref([
      { value: 1048, name: "人文" },
      { value: 735, name: "军事" },
      { value: 580, name: "时事" },
      { value: 484, name: "美食" },
      { value: 300, name: "旅游" },
      { value: 300, name: "历史" },
      { value: 300, name: "文化" }
    ]);
    const updateOptionData = () => {
      data.value = categorys.value.map((category) => ({
        value: category.articleQuantity,
        name: category.categoryName
      }));
      option.value.series[0].data = data;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_e_charts = resolveComponent("e-charts");
      _push(ssrRenderComponent(_component_e_charts, mergeProps({
        class: "chart",
        option: option.value,
        autoresize: ""
      }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/article/ArticleCategoryChart.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const ArticleCategoryChart = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-d641949b"]]);
const _sfc_main$6 = {
  __name: "ArticleManage",
  __ssrInlineRender: true,
  setup(__props) {
    const categorys = ref([
      {
        "id": 3,
        "categoryName": "美食",
        "categoryAlias": "my",
        "createTime": "2023-09-02 12:06:59",
        "updateTime": "2023-09-02 12:06:59"
      },
      {
        "id": 4,
        "categoryName": "娱乐",
        "categoryAlias": "yl",
        "createTime": "2023-09-02 12:08:16",
        "updateTime": "2023-09-02 12:08:16"
      },
      {
        "id": 5,
        "categoryName": "军事",
        "categoryAlias": "js",
        "createTime": "2023-09-02 12:08:33",
        "updateTime": "2023-09-02 12:08:33"
      }
    ]);
    const categoryId = ref("");
    const state = ref("");
    const articles = ref([
      {
        "id": 5,
        "title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "createTime": "2023-09-03 11:55:30",
        "updateTime": "2023-09-03 11:55:30"
      },
      {
        "id": 5,
        "title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "createTime": "2023-09-03 11:55:30",
        "updateTime": "2023-09-03 11:55:30"
      },
      {
        "id": 5,
        "title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "草稿",
        "categoryId": 2,
        "createTime": "2023-09-03 11:55:30",
        "updateTime": "2023-09-03 11:55:30"
      }
    ]);
    const pageNum = ref(1);
    const total = ref(20);
    const pageSize = ref(5);
    const onSizeChange = (size) => {
      pageSize.value = size;
      getArticles();
    };
    const onCurrentChange = (num) => {
      pageNum.value = num;
      getArticles();
    };
    const getArticleCategoryList = async () => {
      let result = await articleCategoryListService();
      categorys.value = result.data;
    };
    getArticleCategoryList();
    const getArticles = async () => {
      let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        categoryId: categoryId.value ? categoryId.value : null,
        state: state.value ? state.value : null
      };
      let result = await articleListService(params);
      articles.value = result.data.items;
      for (let i = 0; i < articles.value.length; i++) {
        let article = articles.value[i];
        for (let j = 0; j < categorys.value.length; j++) {
          if (article.categoryId === categorys.value[j].id) {
            article.categoryName = categorys.value[j].categoryName;
          }
        }
      }
      total.value = result.data.total;
    };
    getArticles();
    const visibleDrawer = ref(false);
    const articleModel = ref({
      title: "",
      categoryId: "",
      coverImg: "",
      content: "",
      state: ""
    });
    const tokenStore = useTokenStore();
    const uploadSuccess = (img) => {
      console.log(img.data);
      articleModel.value.coverImg = img.data;
    };
    const addArticle = async (state2) => {
      articleModel.value.state = state2;
      let result = await articleAddService(articleModel.value);
      ElMessage.success(result.message ? result.message : "添加成功");
      getArticles();
      visibleDrawer.value = false;
    };
    const updateArticle = async () => {
      let result = await articleUpdateService(articleModel.value);
      ElMessage.success(result.message ? result.message : "更新成功");
      getArticles();
      visibleDrawer.value = false;
    };
    const deletArticle = (row) => {
      ElMessageBox.confirm(
        "你确认删除该文章信息吗？",
        "温馨提示",
        {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(async () => {
        let result = await articleDeleteService(row.id);
        ElMessage.success(result.message ? result.message : "删除成功");
        getArticles();
      }).catch(() => {
        ElMessage({
          type: "info",
          message: "取消删除"
        });
      });
    };
    const title_t = ref("");
    const showupdateArticle = (row) => {
      title_t.value = "修改文章";
      visibleDrawer.value = true;
      articleModel.value = row;
    };
    const quillEditorRef = ref(null);
    const clear = () => {
      articleModel.value.content = " ";
      articleModel.value = {
        title: "",
        categoryId: "",
        coverImg: "",
        content: "",
        state: ""
      };
      if (quillEditorRef.value) {
        quillEditorRef.value.setText("");
      }
      visibleDrawer.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = resolveComponent("el-card");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_form = resolveComponent("el-form");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_select = resolveComponent("el-select");
      const _component_el_option = resolveComponent("el-option");
      const _component_el_table = resolveComponent("el-table");
      const _component_el_table_column = resolveComponent("el-table-column");
      const _component_el_empty = resolveComponent("el-empty");
      const _component_el_pagination = resolveComponent("el-pagination");
      const _component_el_drawer = resolveComponent("el-drawer");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_upload = resolveComponent("el-upload");
      const _component_el_icon = resolveComponent("el-icon");
      _push(ssrRenderComponent(_component_el_card, mergeProps({ class: "page-container" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="header" data-v-2976efcf${_scopeId}><span data-v-2976efcf${_scopeId}>文章管理</span><div class="extra" data-v-2976efcf${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: ($event) => {
                clear();
                visibleDrawer.value = true;
                title_t.value = "添加文章";
              }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`添加文章`);
                } else {
                  return [
                    createTextVNode("添加文章")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "header" }, [
                createVNode("span", null, "文章管理"),
                createVNode("div", { class: "extra" }, [
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: ($event) => {
                      clear();
                      visibleDrawer.value = true;
                      title_t.value = "添加文章";
                    }
                  }, {
                    default: withCtx(() => [
                      createTextVNode("添加文章")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, { inline: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "文章分类：" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_select, {
                          style: { "width": "240px" },
                          placeholder: "请选择",
                          modelValue: categoryId.value,
                          "onUpdate:modelValue": ($event) => categoryId.value = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(categorys.value, (c) => {
                                _push5(ssrRenderComponent(_component_el_option, {
                                  key: c.id,
                                  label: c.categoryName,
                                  value: c.id
                                }, null, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(categorys.value, (c) => {
                                  return openBlock(), createBlock(_component_el_option, {
                                    key: c.id,
                                    label: c.categoryName,
                                    value: c.id
                                  }, null, 8, ["label", "value"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_select, {
                            style: { "width": "240px" },
                            placeholder: "请选择",
                            modelValue: categoryId.value,
                            "onUpdate:modelValue": ($event) => categoryId.value = $event
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(categorys.value, (c) => {
                                return openBlock(), createBlock(_component_el_option, {
                                  key: c.id,
                                  label: c.categoryName,
                                  value: c.id
                                }, null, 8, ["label", "value"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "发布状态：" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_select, {
                          style: { "width": "240px" },
                          placeholder: "请选择",
                          modelValue: state.value,
                          "onUpdate:modelValue": ($event) => state.value = $event
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_option, {
                                label: "已发布",
                                value: "已发布"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_option, {
                                label: "草稿",
                                value: "草稿"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_option, {
                                  label: "已发布",
                                  value: "已发布"
                                }),
                                createVNode(_component_el_option, {
                                  label: "草稿",
                                  value: "草稿"
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_select, {
                            style: { "width": "240px" },
                            placeholder: "请选择",
                            modelValue: state.value,
                            "onUpdate:modelValue": ($event) => state.value = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_option, {
                                label: "已发布",
                                value: "已发布"
                              }),
                              createVNode(_component_el_option, {
                                label: "草稿",
                                value: "草稿"
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, {
                          type: "primary",
                          onClick: getArticles
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`搜索`);
                            } else {
                              return [
                                createTextVNode("搜索")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_button, {
                          onClick: ($event) => {
                            categoryId.value = "";
                            state.value = "";
                          }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`重置`);
                            } else {
                              return [
                                createTextVNode("重置")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_button, {
                            type: "primary",
                            onClick: getArticles
                          }, {
                            default: withCtx(() => [
                              createTextVNode("搜索")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_button, {
                            onClick: ($event) => {
                              categoryId.value = "";
                              state.value = "";
                            }
                          }, {
                            default: withCtx(() => [
                              createTextVNode("重置")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, { label: "文章分类：" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          style: { "width": "240px" },
                          placeholder: "请选择",
                          modelValue: categoryId.value,
                          "onUpdate:modelValue": ($event) => categoryId.value = $event
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(categorys.value, (c) => {
                              return openBlock(), createBlock(_component_el_option, {
                                key: c.id,
                                label: c.categoryName,
                                value: c.id
                              }, null, 8, ["label", "value"]);
                            }), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "发布状态：" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          style: { "width": "240px" },
                          placeholder: "请选择",
                          modelValue: state.value,
                          "onUpdate:modelValue": ($event) => state.value = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_option, {
                              label: "已发布",
                              value: "已发布"
                            }),
                            createVNode(_component_el_option, {
                              label: "草稿",
                              value: "草稿"
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_button, {
                          type: "primary",
                          onClick: getArticles
                        }, {
                          default: withCtx(() => [
                            createTextVNode("搜索")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_button, {
                          onClick: ($event) => {
                            categoryId.value = "";
                            state.value = "";
                          }
                        }, {
                          default: withCtx(() => [
                            createTextVNode("重置")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table, {
              data: articles.value,
              style: { "width": "100%" }
            }, {
              empty: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_empty, { description: "没有数据" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_empty, { description: "没有数据" })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "文章标题",
                    width: "400",
                    prop: "title"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "分类",
                    prop: "categoryName"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "发表时间",
                    prop: "createTime"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "状态",
                    prop: "state"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "操作",
                    width: "100"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, {
                          icon: unref(Edit),
                          onClick: ($event) => showupdateArticle(row),
                          circle: "",
                          plain: "",
                          type: "primary"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_button, {
                          icon: unref(Delete),
                          onClick: ($event) => deletArticle(row),
                          circle: "",
                          plain: "",
                          type: "danger"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_button, {
                            icon: unref(Edit),
                            onClick: ($event) => showupdateArticle(row),
                            circle: "",
                            plain: "",
                            type: "primary"
                          }, null, 8, ["icon", "onClick"]),
                          createVNode(_component_el_button, {
                            icon: unref(Delete),
                            onClick: ($event) => deletArticle(row),
                            circle: "",
                            plain: "",
                            type: "danger"
                          }, null, 8, ["icon", "onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_table_column, {
                      label: "文章标题",
                      width: "400",
                      prop: "title"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "分类",
                      prop: "categoryName"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "发表时间",
                      prop: "createTime"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "状态",
                      prop: "state"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "操作",
                      width: "100"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_button, {
                          icon: unref(Edit),
                          onClick: ($event) => showupdateArticle(row),
                          circle: "",
                          plain: "",
                          type: "primary"
                        }, null, 8, ["icon", "onClick"]),
                        createVNode(_component_el_button, {
                          icon: unref(Delete),
                          onClick: ($event) => deletArticle(row),
                          circle: "",
                          plain: "",
                          type: "danger"
                        }, null, 8, ["icon", "onClick"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_pagination, {
              "current-page": pageNum.value,
              "onUpdate:currentPage": ($event) => pageNum.value = $event,
              "page-size": pageSize.value,
              "onUpdate:pageSize": ($event) => pageSize.value = $event,
              "page-sizes": [3, 5, 10, 15],
              layout: "jumper, total, sizes, prev, pager, next",
              background: "",
              total: total.value,
              onSizeChange,
              onCurrentChange,
              style: { "margin-top": "20px", "justify-content": "flex-end" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_drawer, {
              modelValue: visibleDrawer.value,
              "onUpdate:modelValue": ($event) => visibleDrawer.value = $event,
              title: title_t.value,
              direction: "rtl",
              size: "50%"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form, {
                    model: articleModel.value,
                    "label-width": "100px"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_form_item, { label: "文章标题" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_input, {
                                modelValue: articleModel.value.title,
                                "onUpdate:modelValue": ($event) => articleModel.value.title = $event,
                                placeholder: "请输入标题"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_input, {
                                  modelValue: articleModel.value.title,
                                  "onUpdate:modelValue": ($event) => articleModel.value.title = $event,
                                  placeholder: "请输入标题"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_form_item, { label: "文章分类" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_select, {
                                placeholder: "请选择",
                                modelValue: articleModel.value.categoryId,
                                "onUpdate:modelValue": ($event) => articleModel.value.categoryId = $event
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    ssrRenderList(categorys.value, (c) => {
                                      _push6(ssrRenderComponent(_component_el_option, {
                                        key: c.id,
                                        label: c.categoryName,
                                        value: c.id
                                      }, null, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      (openBlock(true), createBlock(Fragment, null, renderList(categorys.value, (c) => {
                                        return openBlock(), createBlock(_component_el_option, {
                                          key: c.id,
                                          label: c.categoryName,
                                          value: c.id
                                        }, null, 8, ["label", "value"]);
                                      }), 128))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_select, {
                                  placeholder: "请选择",
                                  modelValue: articleModel.value.categoryId,
                                  "onUpdate:modelValue": ($event) => articleModel.value.categoryId = $event
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(categorys.value, (c) => {
                                      return openBlock(), createBlock(_component_el_option, {
                                        key: c.id,
                                        label: c.categoryName,
                                        value: c.id
                                      }, null, 8, ["label", "value"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (title_t.value === "修改文章") {
                          _push4(ssrRenderComponent(_component_el_form_item, { label: "文章状态" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_select, {
                                  placeholder: "请选择",
                                  modelValue: articleModel.value.state,
                                  "onUpdate:modelValue": ($event) => articleModel.value.state = $event
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_el_option, {
                                        label: "已发布",
                                        value: "已发布"
                                      }, null, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_el_option, {
                                        label: "草稿",
                                        value: "草稿"
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_el_option, {
                                          label: "已发布",
                                          value: "已发布"
                                        }),
                                        createVNode(_component_el_option, {
                                          label: "草稿",
                                          value: "草稿"
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_select, {
                                    placeholder: "请选择",
                                    modelValue: articleModel.value.state,
                                    "onUpdate:modelValue": ($event) => articleModel.value.state = $event
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_option, {
                                        label: "已发布",
                                        value: "已发布"
                                      }),
                                      createVNode(_component_el_option, {
                                        label: "草稿",
                                        value: "草稿"
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(_component_el_form_item, { label: "文章封面" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_upload, {
                                class: "avatar-uploader",
                                "auto-upload": true,
                                "show-file-list": false,
                                action: "/api/upload",
                                name: "file",
                                headers: { "Authorization": unref(tokenStore).token },
                                "on-success": uploadSuccess
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (articleModel.value.coverImg) {
                                      _push6(`<img${ssrRenderAttr("src", articleModel.value.coverImg)} class="avatar" data-v-2976efcf${_scopeId5}>`);
                                    } else {
                                      _push6(ssrRenderComponent(_component_el_icon, { class: "avatar-uploader-icon" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(Plus), null, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(Plus))
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    }
                                  } else {
                                    return [
                                      articleModel.value.coverImg ? (openBlock(), createBlock("img", {
                                        key: 0,
                                        src: articleModel.value.coverImg,
                                        class: "avatar"
                                      }, null, 8, ["src"])) : (openBlock(), createBlock(_component_el_icon, {
                                        key: 1,
                                        class: "avatar-uploader-icon"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Plus))
                                        ]),
                                        _: 1
                                      }))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_upload, {
                                  class: "avatar-uploader",
                                  "auto-upload": true,
                                  "show-file-list": false,
                                  action: "/api/upload",
                                  name: "file",
                                  headers: { "Authorization": unref(tokenStore).token },
                                  "on-success": uploadSuccess
                                }, {
                                  default: withCtx(() => [
                                    articleModel.value.coverImg ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      src: articleModel.value.coverImg,
                                      class: "avatar"
                                    }, null, 8, ["src"])) : (openBlock(), createBlock(_component_el_icon, {
                                      key: 1,
                                      class: "avatar-uploader-icon"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Plus))
                                      ]),
                                      _: 1
                                    }))
                                  ]),
                                  _: 1
                                }, 8, ["headers"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_form_item, { label: "文章内容" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="editor" data-v-2976efcf${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(QuillEditor), {
                                ref_key: "quillEditorRef",
                                ref: quillEditorRef,
                                theme: "snow",
                                content: articleModel.value.content,
                                "onUpdate:content": ($event) => articleModel.value.content = $event,
                                contentType: "html"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", {
                                  ref: "editor",
                                  class: "editor"
                                }, [
                                  createVNode(unref(QuillEditor), {
                                    ref_key: "quillEditorRef",
                                    ref: quillEditorRef,
                                    theme: "snow",
                                    content: articleModel.value.content,
                                    "onUpdate:content": ($event) => articleModel.value.content = $event,
                                    contentType: "html"
                                  }, null, 8, ["content", "onUpdate:content"])
                                ], 512)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_form_item, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (title_t.value === "添加文章") {
                                _push5(ssrRenderComponent(_component_el_button, {
                                  type: "primary",
                                  onClick: ($event) => addArticle("已发布")
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`发布`);
                                    } else {
                                      return [
                                        createTextVNode("发布")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (title_t.value === "添加文章") {
                                _push5(ssrRenderComponent(_component_el_button, {
                                  type: "info",
                                  onClick: ($event) => addArticle("草稿")
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`草稿`);
                                    } else {
                                      return [
                                        createTextVNode("草稿")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (title_t.value === "修改文章") {
                                _push5(ssrRenderComponent(_component_el_button, {
                                  type: "success",
                                  onClick: ($event) => updateArticle()
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`修改`);
                                    } else {
                                      return [
                                        createTextVNode("修改")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                title_t.value === "添加文章" ? (openBlock(), createBlock(_component_el_button, {
                                  key: 0,
                                  type: "primary",
                                  onClick: ($event) => addArticle("已发布")
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("发布")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])) : createCommentVNode("", true),
                                title_t.value === "添加文章" ? (openBlock(), createBlock(_component_el_button, {
                                  key: 1,
                                  type: "info",
                                  onClick: ($event) => addArticle("草稿")
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("草稿")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])) : createCommentVNode("", true),
                                title_t.value === "修改文章" ? (openBlock(), createBlock(_component_el_button, {
                                  key: 2,
                                  type: "success",
                                  onClick: ($event) => updateArticle()
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("修改")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_form_item, { label: "文章标题" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: articleModel.value.title,
                                "onUpdate:modelValue": ($event) => articleModel.value.title = $event,
                                placeholder: "请输入标题"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "文章分类" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_select, {
                                placeholder: "请选择",
                                modelValue: articleModel.value.categoryId,
                                "onUpdate:modelValue": ($event) => articleModel.value.categoryId = $event
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(categorys.value, (c) => {
                                    return openBlock(), createBlock(_component_el_option, {
                                      key: c.id,
                                      label: c.categoryName,
                                      value: c.id
                                    }, null, 8, ["label", "value"]);
                                  }), 128))
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          title_t.value === "修改文章" ? (openBlock(), createBlock(_component_el_form_item, {
                            key: 0,
                            label: "文章状态"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_select, {
                                placeholder: "请选择",
                                modelValue: articleModel.value.state,
                                "onUpdate:modelValue": ($event) => articleModel.value.state = $event
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_option, {
                                    label: "已发布",
                                    value: "已发布"
                                  }),
                                  createVNode(_component_el_option, {
                                    label: "草稿",
                                    value: "草稿"
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          createVNode(_component_el_form_item, { label: "文章封面" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_upload, {
                                class: "avatar-uploader",
                                "auto-upload": true,
                                "show-file-list": false,
                                action: "/api/upload",
                                name: "file",
                                headers: { "Authorization": unref(tokenStore).token },
                                "on-success": uploadSuccess
                              }, {
                                default: withCtx(() => [
                                  articleModel.value.coverImg ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: articleModel.value.coverImg,
                                    class: "avatar"
                                  }, null, 8, ["src"])) : (openBlock(), createBlock(_component_el_icon, {
                                    key: 1,
                                    class: "avatar-uploader-icon"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Plus))
                                    ]),
                                    _: 1
                                  }))
                                ]),
                                _: 1
                              }, 8, ["headers"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "文章内容" }, {
                            default: withCtx(() => [
                              createVNode("div", {
                                ref: "editor",
                                class: "editor"
                              }, [
                                createVNode(unref(QuillEditor), {
                                  ref_key: "quillEditorRef",
                                  ref: quillEditorRef,
                                  theme: "snow",
                                  content: articleModel.value.content,
                                  "onUpdate:content": ($event) => articleModel.value.content = $event,
                                  contentType: "html"
                                }, null, 8, ["content", "onUpdate:content"])
                              ], 512)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, null, {
                            default: withCtx(() => [
                              title_t.value === "添加文章" ? (openBlock(), createBlock(_component_el_button, {
                                key: 0,
                                type: "primary",
                                onClick: ($event) => addArticle("已发布")
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("发布")
                                ]),
                                _: 1
                              }, 8, ["onClick"])) : createCommentVNode("", true),
                              title_t.value === "添加文章" ? (openBlock(), createBlock(_component_el_button, {
                                key: 1,
                                type: "info",
                                onClick: ($event) => addArticle("草稿")
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("草稿")
                                ]),
                                _: 1
                              }, 8, ["onClick"])) : createCommentVNode("", true),
                              title_t.value === "修改文章" ? (openBlock(), createBlock(_component_el_button, {
                                key: 2,
                                type: "success",
                                onClick: ($event) => updateArticle()
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("修改")
                                ]),
                                _: 1
                              }, 8, ["onClick"])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form, {
                      model: articleModel.value,
                      "label-width": "100px"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_form_item, { label: "文章标题" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              modelValue: articleModel.value.title,
                              "onUpdate:modelValue": ($event) => articleModel.value.title = $event,
                              placeholder: "请输入标题"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, { label: "文章分类" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_select, {
                              placeholder: "请选择",
                              modelValue: articleModel.value.categoryId,
                              "onUpdate:modelValue": ($event) => articleModel.value.categoryId = $event
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(categorys.value, (c) => {
                                  return openBlock(), createBlock(_component_el_option, {
                                    key: c.id,
                                    label: c.categoryName,
                                    value: c.id
                                  }, null, 8, ["label", "value"]);
                                }), 128))
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        title_t.value === "修改文章" ? (openBlock(), createBlock(_component_el_form_item, {
                          key: 0,
                          label: "文章状态"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_select, {
                              placeholder: "请选择",
                              modelValue: articleModel.value.state,
                              "onUpdate:modelValue": ($event) => articleModel.value.state = $event
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_option, {
                                  label: "已发布",
                                  value: "已发布"
                                }),
                                createVNode(_component_el_option, {
                                  label: "草稿",
                                  value: "草稿"
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        createVNode(_component_el_form_item, { label: "文章封面" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_upload, {
                              class: "avatar-uploader",
                              "auto-upload": true,
                              "show-file-list": false,
                              action: "/api/upload",
                              name: "file",
                              headers: { "Authorization": unref(tokenStore).token },
                              "on-success": uploadSuccess
                            }, {
                              default: withCtx(() => [
                                articleModel.value.coverImg ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: articleModel.value.coverImg,
                                  class: "avatar"
                                }, null, 8, ["src"])) : (openBlock(), createBlock(_component_el_icon, {
                                  key: 1,
                                  class: "avatar-uploader-icon"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Plus))
                                  ]),
                                  _: 1
                                }))
                              ]),
                              _: 1
                            }, 8, ["headers"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, { label: "文章内容" }, {
                          default: withCtx(() => [
                            createVNode("div", {
                              ref: "editor",
                              class: "editor"
                            }, [
                              createVNode(unref(QuillEditor), {
                                ref_key: "quillEditorRef",
                                ref: quillEditorRef,
                                theme: "snow",
                                content: articleModel.value.content,
                                "onUpdate:content": ($event) => articleModel.value.content = $event,
                                contentType: "html"
                              }, null, 8, ["content", "onUpdate:content"])
                            ], 512)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, null, {
                          default: withCtx(() => [
                            title_t.value === "添加文章" ? (openBlock(), createBlock(_component_el_button, {
                              key: 0,
                              type: "primary",
                              onClick: ($event) => addArticle("已发布")
                            }, {
                              default: withCtx(() => [
                                createTextVNode("发布")
                              ]),
                              _: 1
                            }, 8, ["onClick"])) : createCommentVNode("", true),
                            title_t.value === "添加文章" ? (openBlock(), createBlock(_component_el_button, {
                              key: 1,
                              type: "info",
                              onClick: ($event) => addArticle("草稿")
                            }, {
                              default: withCtx(() => [
                                createTextVNode("草稿")
                              ]),
                              _: 1
                            }, 8, ["onClick"])) : createCommentVNode("", true),
                            title_t.value === "修改文章" ? (openBlock(), createBlock(_component_el_button, {
                              key: 2,
                              type: "success",
                              onClick: ($event) => updateArticle()
                            }, {
                              default: withCtx(() => [
                                createTextVNode("修改")
                              ]),
                              _: 1
                            }, 8, ["onClick"])) : createCommentVNode("", true)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["model"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_form, { inline: "" }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, { label: "文章分类：" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        style: { "width": "240px" },
                        placeholder: "请选择",
                        modelValue: categoryId.value,
                        "onUpdate:modelValue": ($event) => categoryId.value = $event
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(categorys.value, (c) => {
                            return openBlock(), createBlock(_component_el_option, {
                              key: c.id,
                              label: c.categoryName,
                              value: c.id
                            }, null, 8, ["label", "value"]);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "发布状态：" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        style: { "width": "240px" },
                        placeholder: "请选择",
                        modelValue: state.value,
                        "onUpdate:modelValue": ($event) => state.value = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_option, {
                            label: "已发布",
                            value: "已发布"
                          }),
                          createVNode(_component_el_option, {
                            label: "草稿",
                            value: "草稿"
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, null, {
                    default: withCtx(() => [
                      createVNode(_component_el_button, {
                        type: "primary",
                        onClick: getArticles
                      }, {
                        default: withCtx(() => [
                          createTextVNode("搜索")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_button, {
                        onClick: ($event) => {
                          categoryId.value = "";
                          state.value = "";
                        }
                      }, {
                        default: withCtx(() => [
                          createTextVNode("重置")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_el_table, {
                data: articles.value,
                style: { "width": "100%" }
              }, {
                empty: withCtx(() => [
                  createVNode(_component_el_empty, { description: "没有数据" })
                ]),
                default: withCtx(() => [
                  createVNode(_component_el_table_column, {
                    label: "文章标题",
                    width: "400",
                    prop: "title"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "分类",
                    prop: "categoryName"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "发表时间",
                    prop: "createTime"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "状态",
                    prop: "state"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "操作",
                    width: "100"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_button, {
                        icon: unref(Edit),
                        onClick: ($event) => showupdateArticle(row),
                        circle: "",
                        plain: "",
                        type: "primary"
                      }, null, 8, ["icon", "onClick"]),
                      createVNode(_component_el_button, {
                        icon: unref(Delete),
                        onClick: ($event) => deletArticle(row),
                        circle: "",
                        plain: "",
                        type: "danger"
                      }, null, 8, ["icon", "onClick"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["data"]),
              createVNode(_component_el_pagination, {
                "current-page": pageNum.value,
                "onUpdate:currentPage": ($event) => pageNum.value = $event,
                "page-size": pageSize.value,
                "onUpdate:pageSize": ($event) => pageSize.value = $event,
                "page-sizes": [3, 5, 10, 15],
                layout: "jumper, total, sizes, prev, pager, next",
                background: "",
                total: total.value,
                onSizeChange,
                onCurrentChange,
                style: { "margin-top": "20px", "justify-content": "flex-end" }
              }, null, 8, ["current-page", "onUpdate:currentPage", "page-size", "onUpdate:pageSize", "total"]),
              createVNode(_component_el_drawer, {
                modelValue: visibleDrawer.value,
                "onUpdate:modelValue": ($event) => visibleDrawer.value = $event,
                title: title_t.value,
                direction: "rtl",
                size: "50%"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form, {
                    model: articleModel.value,
                    "label-width": "100px"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_form_item, { label: "文章标题" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: articleModel.value.title,
                            "onUpdate:modelValue": ($event) => articleModel.value.title = $event,
                            placeholder: "请输入标题"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, { label: "文章分类" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_select, {
                            placeholder: "请选择",
                            modelValue: articleModel.value.categoryId,
                            "onUpdate:modelValue": ($event) => articleModel.value.categoryId = $event
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(categorys.value, (c) => {
                                return openBlock(), createBlock(_component_el_option, {
                                  key: c.id,
                                  label: c.categoryName,
                                  value: c.id
                                }, null, 8, ["label", "value"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      title_t.value === "修改文章" ? (openBlock(), createBlock(_component_el_form_item, {
                        key: 0,
                        label: "文章状态"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_select, {
                            placeholder: "请选择",
                            modelValue: articleModel.value.state,
                            "onUpdate:modelValue": ($event) => articleModel.value.state = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_option, {
                                label: "已发布",
                                value: "已发布"
                              }),
                              createVNode(_component_el_option, {
                                label: "草稿",
                                value: "草稿"
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(_component_el_form_item, { label: "文章封面" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_upload, {
                            class: "avatar-uploader",
                            "auto-upload": true,
                            "show-file-list": false,
                            action: "/api/upload",
                            name: "file",
                            headers: { "Authorization": unref(tokenStore).token },
                            "on-success": uploadSuccess
                          }, {
                            default: withCtx(() => [
                              articleModel.value.coverImg ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: articleModel.value.coverImg,
                                class: "avatar"
                              }, null, 8, ["src"])) : (openBlock(), createBlock(_component_el_icon, {
                                key: 1,
                                class: "avatar-uploader-icon"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Plus))
                                ]),
                                _: 1
                              }))
                            ]),
                            _: 1
                          }, 8, ["headers"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, { label: "文章内容" }, {
                        default: withCtx(() => [
                          createVNode("div", {
                            ref: "editor",
                            class: "editor"
                          }, [
                            createVNode(unref(QuillEditor), {
                              ref_key: "quillEditorRef",
                              ref: quillEditorRef,
                              theme: "snow",
                              content: articleModel.value.content,
                              "onUpdate:content": ($event) => articleModel.value.content = $event,
                              contentType: "html"
                            }, null, 8, ["content", "onUpdate:content"])
                          ], 512)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_form_item, null, {
                        default: withCtx(() => [
                          title_t.value === "添加文章" ? (openBlock(), createBlock(_component_el_button, {
                            key: 0,
                            type: "primary",
                            onClick: ($event) => addArticle("已发布")
                          }, {
                            default: withCtx(() => [
                              createTextVNode("发布")
                            ]),
                            _: 1
                          }, 8, ["onClick"])) : createCommentVNode("", true),
                          title_t.value === "添加文章" ? (openBlock(), createBlock(_component_el_button, {
                            key: 1,
                            type: "info",
                            onClick: ($event) => addArticle("草稿")
                          }, {
                            default: withCtx(() => [
                              createTextVNode("草稿")
                            ]),
                            _: 1
                          }, 8, ["onClick"])) : createCommentVNode("", true),
                          title_t.value === "修改文章" ? (openBlock(), createBlock(_component_el_button, {
                            key: 2,
                            type: "success",
                            onClick: ($event) => updateArticle()
                          }, {
                            default: withCtx(() => [
                              createTextVNode("修改")
                            ]),
                            _: 1
                          }, 8, ["onClick"])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["model"])
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "title"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/article/ArticleManage.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const ArticleManageVue = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-2976efcf"]]);
const _sfc_main$5 = {
  __name: "ArticleChart",
  __ssrInlineRender: true,
  setup(__props) {
    const articles = ref([
      {
        "id": 40,
        "title": "东莞一人游玩攻略",
        "content": "东莞一人游玩",
        "coverImg": "https://rockstar-big-event.oss-cn-guangzhou.aliyuncs.com/87b05338-f29d-4cb9-8abc-05c35c1837de.png",
        "state": "已发布",
        "categoryId": 8,
        "articleViews": 18,
        "like": 15,
        "createTime": "2024-06-25T01:53:01",
        "updateTime": "2024-06-25T01:53:01"
      },
      {
        "id": 41,
        "title": "姜萍阿里巴巴12名",
        "content": "姜萍阿里巴巴奥数12名姜萍阿里巴巴奥数12名姜萍",
        "coverImg": "https://rockstar-big-event.oss-cn-guangzhou.aliyuncs.com/45d07a5a-2b47-425d-8159-138721b1ce33.png",
        "state": "已发布",
        "categoryId": 6,
        "articleViews": 12,
        "like": 95,
        "createTime": "2024-06-25T13:57:38",
        "updateTime": "2024-06-25T13:58:22"
      },
      {
        "id": 42,
        "title": "秦始皇的统一大业",
        "content": "秦始皇的统一大业秦始皇的统一大业秦始皇的统一大业",
        "coverImg": "https://rockstar-big-event.oss-cn-guangzhou.aliyuncs.com/e3145462-e184-4cf6-ac85-98394ea286d0.png",
        "state": "已发布",
        "categoryId": 9,
        "articleViews": 67,
        "like": 38,
        "createTime": "2024-06-25T14:09:55",
        "updateTime": "2024-06-25T14:09:55"
      },
      {
        "id": 43,
        "title": "汉服文化的流行",
        "content": "汉服文化的流行汉服文化的流行汉服文化的流行汉服文化的流行",
        "coverImg": "https://rockstar-big-event.oss-cn-guangzhou.aliyuncs.com/f352f99a-6abe-4d40-9693-f7091155baaf.png",
        "state": "已发布",
        "categoryId": 11,
        "articleViews": 70,
        "like": 48,
        "createTime": "2024-06-25T14:12:27",
        "updateTime": "2024-06-25T14:12:27"
      },
      {
        "id": 44,
        "title": "汉武帝的统一大业",
        "content": "汉武帝的统一大业汉武帝的统一大业汉武帝的统一大业汉武帝的统一大业汉武帝的统一大业汉武帝的统一大业",
        "coverImg": "https://rockstar-big-event.oss-cn-guangzhou.aliyuncs.com/816665ff-ce25-4fc4-9266-d5378c3d80ba.png",
        "state": "已发布",
        "categoryId": 9,
        "articleViews": 18,
        "like": 27,
        "createTime": "2024-06-25T14:41:39",
        "updateTime": "2024-06-25T14:41:39"
      }
    ]);
    const categorys = ref([
      {
        "id": 3,
        "categoryName": "美食",
        "categoryAlias": "my",
        "createTime": "2023-09-02 12:06:59",
        "updateTime": "2023-09-02 12:06:59"
      },
      {
        "id": 4,
        "categoryName": "娱乐",
        "categoryAlias": "yl",
        "createTime": "2023-09-02 12:08:16",
        "updateTime": "2023-09-02 12:08:16"
      },
      {
        "id": 5,
        "categoryName": "军事",
        "categoryAlias": "js",
        "createTime": "2023-09-02 12:08:33",
        "updateTime": "2023-09-02 12:08:33"
      }
    ]);
    const option = ref({
      aria: {
        show: true
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999"
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ["点赞数", "浏览量"]
      },
      xAxis: [
        {
          type: "category",
          data: [],
          axisLabel: {
            rotate: 0,
            // 旋转标签 90 度使其纵向排列
            // margin_top: 0,
            // 如果需要，还可以设置其他属性来调整标签的显示，比如 margin、textStyle 等
            textStyle: {
              // 设置文本样式，比如字体大小、颜色等
              fontSize: 13,
              // 根据需要调整字体大小
              color: "#333"
              // 设置文本颜色
            },
            interval: 0
            // 设置标签的间隔为 0，以确保所有标签都显示（注意这可能会导致标签重叠）
            // 如果标签重叠，你可以考虑使用 interval 属性来控制显示的间隔
            // 或者使用 axisTick 的属性来隐藏刻度线以减少视觉干扰
          },
          axisPointer: {
            type: "shadow"
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          name: "点赞数",
          min: 0,
          max: 120,
          interval: 20,
          axisLabel: {
            formatter: "{value} 赞"
          }
        },
        {
          type: "value",
          name: "浏览量",
          min: 0,
          max: 120,
          interval: 20,
          axisLabel: {
            formatter: "{value} 次"
          }
        }
      ],
      series: [
        {
          name: "浏览量",
          type: "bar",
          tooltip: {
            valueFormatter: function(value) {
              return value + " 次";
            }
          },
          data: [
            2,
            4.9,
            7,
            23.2,
            25.6,
            76.7,
            235.6,
            162.2,
            32.6,
            20,
            6.4,
            3.3
          ]
        },
        {
          name: "点赞数",
          type: "bar",
          tooltip: {
            valueFormatter: function(value) {
              return value + " 赞";
            }
          },
          data: [
            2.6,
            5.9,
            9,
            26.4,
            28.7,
            70.7,
            175.6,
            182.2,
            48.7,
            18.8,
            6,
            2.3
          ]
        }
      ]
    });
    const getArticleCategoryList = async () => {
      let result = await articleCategoryListService();
      categorys.value = result.data;
    };
    getArticleCategoryList();
    const getArticles = async () => {
      let result = await articleListsService();
      articles.value = result.data;
      updateOptionData();
    };
    getArticles();
    const dataviews = ref([]);
    const datalike = ref([]);
    const title = ref([]);
    const updateOptionData = () => {
      dataviews.value = [];
      articles.value.forEach((article) => {
        dataviews.value.push(article.articleViews);
      });
      option.value.series[0].data = dataviews;
      datalike.value = [];
      articles.value.forEach((article) => {
        datalike.value.push(article.like);
      });
      option.value.series[1].data = datalike;
      title.value = [];
      articles.value.forEach((article) => {
        title.value.push(article.title);
      });
      option.value.xAxis[0].data = title;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_e_charts = resolveComponent("e-charts");
      _push(ssrRenderComponent(_component_e_charts, mergeProps({
        class: "chart",
        option: option.value,
        autoresize: ""
      }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/article/ArticleChart.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const ArticleManageCharVue = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-d16a21eb"]]);
const _sfc_main$4 = {
  __name: "UserInfo",
  __ssrInlineRender: true,
  setup(__props) {
    const userInfoStore = useUserInfoStore();
    const userInfo = ref({ ...userInfoStore.info });
    const rules = {
      nickname: [
        { required: true, message: "请输入用户昵称", trigger: "blur" },
        {
          pattern: /^\S{2,10}$/,
          message: "昵称必须是2-10位的非空字符串",
          trigger: "blur"
        }
      ],
      email: [
        { required: true, message: "请输入用户邮箱", trigger: "blur" },
        { type: "email", message: "邮箱格式不正确", trigger: "blur" }
      ]
    };
    const updateUserInfo = async () => {
      let result = await userInfoUpdateService(userInfo.value);
      ElMessage.success(result.message ? result.message : "修改成功");
      userInfoStore.info.nickname = userInfo.value.nickname;
      userInfoStore.info.email = userInfo.value.email;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = resolveComponent("el-card");
      const _component_el_row = resolveComponent("el-row");
      const _component_el_col = resolveComponent("el-col");
      const _component_el_form = resolveComponent("el-form");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_button = resolveComponent("el-button");
      _push(ssrRenderComponent(_component_el_card, mergeProps({ class: "page-container" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="header"${_scopeId}><span${_scopeId}>基本资料</span></div>`);
          } else {
            return [
              createVNode("div", { class: "header" }, [
                createVNode("span", null, "基本资料")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_row, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_col, { span: 12 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_form, {
                          model: userInfo.value,
                          rules,
                          "label-width": "100px",
                          size: "large"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "登录名称" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input, {
                                      modelValue: userInfo.value.username,
                                      "onUpdate:modelValue": ($event) => userInfo.value.username = $event,
                                      disabled: ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input, {
                                        modelValue: userInfo.value.username,
                                        "onUpdate:modelValue": ($event) => userInfo.value.username = $event,
                                        disabled: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_form_item, {
                                label: "用户昵称",
                                prop: "nickname"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input, {
                                      modelValue: userInfo.value.nickname,
                                      "onUpdate:modelValue": ($event) => userInfo.value.nickname = $event
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input, {
                                        modelValue: userInfo.value.nickname,
                                        "onUpdate:modelValue": ($event) => userInfo.value.nickname = $event
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_form_item, {
                                label: "用户邮箱",
                                prop: "email"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input, {
                                      modelValue: userInfo.value.email,
                                      "onUpdate:modelValue": ($event) => userInfo.value.email = $event
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input, {
                                        modelValue: userInfo.value.email,
                                        "onUpdate:modelValue": ($event) => userInfo.value.email = $event
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_form_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_button, {
                                      type: "primary",
                                      onClick: updateUserInfo
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`提交修改`);
                                        } else {
                                          return [
                                            createTextVNode("提交修改")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_button, {
                                        type: "primary",
                                        onClick: updateUserInfo
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("提交修改")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_form_item, { label: "登录名称" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: userInfo.value.username,
                                      "onUpdate:modelValue": ($event) => userInfo.value.username = $event,
                                      disabled: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_form_item, {
                                  label: "用户昵称",
                                  prop: "nickname"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: userInfo.value.nickname,
                                      "onUpdate:modelValue": ($event) => userInfo.value.nickname = $event
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_form_item, {
                                  label: "用户邮箱",
                                  prop: "email"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: userInfo.value.email,
                                      "onUpdate:modelValue": ($event) => userInfo.value.email = $event
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_form_item, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_button, {
                                      type: "primary",
                                      onClick: updateUserInfo
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("提交修改")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_form, {
                            model: userInfo.value,
                            rules,
                            "label-width": "100px",
                            size: "large"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "登录名称" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: userInfo.value.username,
                                    "onUpdate:modelValue": ($event) => userInfo.value.username = $event,
                                    disabled: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_form_item, {
                                label: "用户昵称",
                                prop: "nickname"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: userInfo.value.nickname,
                                    "onUpdate:modelValue": ($event) => userInfo.value.nickname = $event
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_form_item, {
                                label: "用户邮箱",
                                prop: "email"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: userInfo.value.email,
                                    "onUpdate:modelValue": ($event) => userInfo.value.email = $event
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_form_item, null, {
                                default: withCtx(() => [
                                  createVNode(_component_el_button, {
                                    type: "primary",
                                    onClick: updateUserInfo
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("提交修改")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["model"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_col, { span: 12 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_form, {
                          model: userInfo.value,
                          rules,
                          "label-width": "100px",
                          size: "large"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_form_item, { label: "登录名称" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  modelValue: userInfo.value.username,
                                  "onUpdate:modelValue": ($event) => userInfo.value.username = $event,
                                  disabled: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, {
                              label: "用户昵称",
                              prop: "nickname"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  modelValue: userInfo.value.nickname,
                                  "onUpdate:modelValue": ($event) => userInfo.value.nickname = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, {
                              label: "用户邮箱",
                              prop: "email"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  modelValue: userInfo.value.email,
                                  "onUpdate:modelValue": ($event) => userInfo.value.email = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, null, {
                              default: withCtx(() => [
                                createVNode(_component_el_button, {
                                  type: "primary",
                                  onClick: updateUserInfo
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("提交修改")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["model"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_row, null, {
                default: withCtx(() => [
                  createVNode(_component_el_col, { span: 12 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_form, {
                        model: userInfo.value,
                        rules,
                        "label-width": "100px",
                        size: "large"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "登录名称" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: userInfo.value.username,
                                "onUpdate:modelValue": ($event) => userInfo.value.username = $event,
                                disabled: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, {
                            label: "用户昵称",
                            prop: "nickname"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: userInfo.value.nickname,
                                "onUpdate:modelValue": ($event) => userInfo.value.nickname = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, {
                            label: "用户邮箱",
                            prop: "email"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: userInfo.value.email,
                                "onUpdate:modelValue": ($event) => userInfo.value.email = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, null, {
                            default: withCtx(() => [
                              createVNode(_component_el_button, {
                                type: "primary",
                                onClick: updateUserInfo
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("提交修改")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["model"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/user/UserInfo.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "UserAvatar",
  __ssrInlineRender: true,
  setup(__props) {
    const tokenStore = useTokenStore();
    const uploadRef = ref();
    const userInfoStore = useUserInfoStore();
    const imgUrl = ref(userInfoStore.info.userPic);
    const uploadSuccess = (result) => {
      imgUrl.value = result.data;
    };
    const updateAvatar = async () => {
      let result = await userAvatarUpdateService(imgUrl.value);
      ElMessage.success(result.message ? result.message : "修改成功");
      console.log(imgUrl.value);
      userInfoStore.info.userPic = imgUrl.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = resolveComponent("el-card");
      const _component_el_row = resolveComponent("el-row");
      const _component_el_col = resolveComponent("el-col");
      const _component_el_upload = resolveComponent("el-upload");
      const _component_el_button = resolveComponent("el-button");
      _push(ssrRenderComponent(_component_el_card, mergeProps({ class: "page-container" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="header" data-v-59d5bb48${_scopeId}><span data-v-59d5bb48${_scopeId}>更换头像</span></div>`);
          } else {
            return [
              createVNode("div", { class: "header" }, [
                createVNode("span", null, "更换头像")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_row, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_col, { span: 12 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_upload, {
                          ref_key: "uploadRef",
                          ref: uploadRef,
                          class: "avatar-uploader",
                          "show-file-list": false,
                          "auto-upload": "true",
                          action: "/api/upload",
                          name: "file",
                          headers: { "Authorization": unref(tokenStore).token },
                          "on-success": uploadSuccess
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` &gt; `);
                              if (imgUrl.value) {
                                _push5(`<img${ssrRenderAttr("src", imgUrl.value)} class="avatar" data-v-59d5bb48${_scopeId4}>`);
                              } else {
                                _push5(`<img width="278" data-v-59d5bb48${_scopeId4}>`);
                              }
                            } else {
                              return [
                                createTextVNode(" > "),
                                imgUrl.value ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: imgUrl.value,
                                  class: "avatar"
                                }, null, 8, ["src"])) : (openBlock(), createBlock("img", {
                                  key: 1,
                                  width: "278"
                                }))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<br data-v-59d5bb48${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_el_button, {
                          type: "primary",
                          icon: unref(Plus),
                          size: "large",
                          onClick: ($event) => uploadRef.value.$el.querySelector("input").click()
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` 选择图片 `);
                            } else {
                              return [
                                createTextVNode(" 选择图片 ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_button, {
                          type: "success",
                          icon: unref(Upload),
                          size: "large",
                          onClick: updateAvatar
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` 上传头像 `);
                            } else {
                              return [
                                createTextVNode(" 上传头像 ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_upload, {
                            ref_key: "uploadRef",
                            ref: uploadRef,
                            class: "avatar-uploader",
                            "show-file-list": false,
                            "auto-upload": "true",
                            action: "/api/upload",
                            name: "file",
                            headers: { "Authorization": unref(tokenStore).token },
                            "on-success": uploadSuccess
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" > "),
                              imgUrl.value ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: imgUrl.value,
                                class: "avatar"
                              }, null, 8, ["src"])) : (openBlock(), createBlock("img", {
                                key: 1,
                                width: "278"
                              }))
                            ]),
                            _: 1
                          }, 8, ["headers"]),
                          createVNode("br"),
                          createVNode(_component_el_button, {
                            type: "primary",
                            icon: unref(Plus),
                            size: "large",
                            onClick: ($event) => uploadRef.value.$el.querySelector("input").click()
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 选择图片 ")
                            ]),
                            _: 1
                          }, 8, ["icon", "onClick"]),
                          createVNode(_component_el_button, {
                            type: "success",
                            icon: unref(Upload),
                            size: "large",
                            onClick: updateAvatar
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 上传头像 ")
                            ]),
                            _: 1
                          }, 8, ["icon"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_col, { span: 12 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_upload, {
                          ref_key: "uploadRef",
                          ref: uploadRef,
                          class: "avatar-uploader",
                          "show-file-list": false,
                          "auto-upload": "true",
                          action: "/api/upload",
                          name: "file",
                          headers: { "Authorization": unref(tokenStore).token },
                          "on-success": uploadSuccess
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" > "),
                            imgUrl.value ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: imgUrl.value,
                              class: "avatar"
                            }, null, 8, ["src"])) : (openBlock(), createBlock("img", {
                              key: 1,
                              width: "278"
                            }))
                          ]),
                          _: 1
                        }, 8, ["headers"]),
                        createVNode("br"),
                        createVNode(_component_el_button, {
                          type: "primary",
                          icon: unref(Plus),
                          size: "large",
                          onClick: ($event) => uploadRef.value.$el.querySelector("input").click()
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" 选择图片 ")
                          ]),
                          _: 1
                        }, 8, ["icon", "onClick"]),
                        createVNode(_component_el_button, {
                          type: "success",
                          icon: unref(Upload),
                          size: "large",
                          onClick: updateAvatar
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" 上传头像 ")
                          ]),
                          _: 1
                        }, 8, ["icon"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_row, null, {
                default: withCtx(() => [
                  createVNode(_component_el_col, { span: 12 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_upload, {
                        ref_key: "uploadRef",
                        ref: uploadRef,
                        class: "avatar-uploader",
                        "show-file-list": false,
                        "auto-upload": "true",
                        action: "/api/upload",
                        name: "file",
                        headers: { "Authorization": unref(tokenStore).token },
                        "on-success": uploadSuccess
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" > "),
                          imgUrl.value ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: imgUrl.value,
                            class: "avatar"
                          }, null, 8, ["src"])) : (openBlock(), createBlock("img", {
                            key: 1,
                            width: "278"
                          }))
                        ]),
                        _: 1
                      }, 8, ["headers"]),
                      createVNode("br"),
                      createVNode(_component_el_button, {
                        type: "primary",
                        icon: unref(Plus),
                        size: "large",
                        onClick: ($event) => uploadRef.value.$el.querySelector("input").click()
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" 选择图片 ")
                        ]),
                        _: 1
                      }, 8, ["icon", "onClick"]),
                      createVNode(_component_el_button, {
                        type: "success",
                        icon: unref(Upload),
                        size: "large",
                        onClick: updateAvatar
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" 上传头像 ")
                        ]),
                        _: 1
                      }, 8, ["icon"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/user/UserAvatar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const UserAvatarVUe = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-59d5bb48"]]);
const _sfc_main$2 = {
  __name: "UserResetPassword",
  __ssrInlineRender: true,
  setup(__props) {
    const userInfoStore = useUserInfoStore();
    const userInfo = ref({ ...userInfoStore.info });
    const updatepasswordData = ref({
      old_pwd: "",
      new_pwd: "",
      re_pwd: ""
    });
    const rePasswordValid = (rule, value, callback) => {
      if (value == null || value === "") {
        return callback(new Error("请再次确认密码"));
      } else if (updatepasswordData.value.old_pwd !== value) {
        return callback(new Error("两次输入新密码不一致"));
      } else {
        callback();
      }
    };
    const rules = {
      nickname: [
        { required: true, message: "请输入用户昵称", trigger: "blur" },
        {
          pattern: /^\S{2,10}$/,
          message: "昵称必须是2-10位的非空字符串",
          trigger: "blur"
        }
      ],
      old_pwd: [
        { required: true, message: "请输入原密码", trigger: "blur" },
        { min: 5, max: 16, message: "密码长度必须为5~16位", trigger: "blur" }
      ],
      new_pwd: [
        { required: true, message: "请输入新密码", trigger: "blur" },
        { min: 5, max: 16, message: "密码长度必须为5~16位", trigger: "blur" }
      ],
      re_pwd: [
        { validator: rePasswordValid, trigger: "blur" }
      ]
    };
    const updateUserPassword = async () => {
      let result = await userPasswordUpdateService(updatepasswordData.value);
      ElMessage.success(result.message ? result.message : "修改成功");
      await router.push("/login");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = resolveComponent("el-card");
      const _component_el_row = resolveComponent("el-row");
      const _component_el_col = resolveComponent("el-col");
      const _component_el_form = resolveComponent("el-form");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_button = resolveComponent("el-button");
      _push(ssrRenderComponent(_component_el_card, mergeProps({ class: "page-container" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="header"${_scopeId}><span${_scopeId}>重置密码</span></div>`);
          } else {
            return [
              createVNode("div", { class: "header" }, [
                createVNode("span", null, "重置密码")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_row, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_col, { span: 12 }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_form, {
                          model: updatepasswordData.value,
                          rules,
                          "label-width": "100px",
                          size: "large"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_form_item, { label: "登录名称" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input, {
                                      modelValue: userInfo.value.username,
                                      "onUpdate:modelValue": ($event) => userInfo.value.username = $event,
                                      disabled: ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input, {
                                        modelValue: userInfo.value.username,
                                        "onUpdate:modelValue": ($event) => userInfo.value.username = $event,
                                        disabled: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_form_item, {
                                label: "原密码",
                                prop: "password"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input, {
                                      type: "password",
                                      modelValue: updatepasswordData.value.old_pwd,
                                      "onUpdate:modelValue": ($event) => updatepasswordData.value.old_pwd = $event
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input, {
                                        type: "password",
                                        modelValue: updatepasswordData.value.old_pwd,
                                        "onUpdate:modelValue": ($event) => updatepasswordData.value.old_pwd = $event
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_form_item, {
                                label: "新密码",
                                prop: "newpassword"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input, {
                                      type: "password",
                                      modelValue: updatepasswordData.value.new_pwd,
                                      "onUpdate:modelValue": ($event) => updatepasswordData.value.new_pwd = $event
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input, {
                                        type: "password",
                                        modelValue: updatepasswordData.value.new_pwd,
                                        "onUpdate:modelValue": ($event) => updatepasswordData.value.new_pwd = $event
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_form_item, {
                                label: "确认新密码",
                                prop: "repassword"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_input, {
                                      type: "password",
                                      modelValue: updatepasswordData.value.re_pwd,
                                      "onUpdate:modelValue": ($event) => updatepasswordData.value.re_pwd = $event
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_input, {
                                        type: "password",
                                        modelValue: updatepasswordData.value.re_pwd,
                                        "onUpdate:modelValue": ($event) => updatepasswordData.value.re_pwd = $event
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_el_form_item, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_button, {
                                      type: "primary",
                                      onClick: updateUserPassword
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`提交修改`);
                                        } else {
                                          return [
                                            createTextVNode("提交修改")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_button, {
                                        type: "primary",
                                        onClick: updateUserPassword
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("提交修改")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_form_item, { label: "登录名称" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      modelValue: userInfo.value.username,
                                      "onUpdate:modelValue": ($event) => userInfo.value.username = $event,
                                      disabled: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_form_item, {
                                  label: "原密码",
                                  prop: "password"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      type: "password",
                                      modelValue: updatepasswordData.value.old_pwd,
                                      "onUpdate:modelValue": ($event) => updatepasswordData.value.old_pwd = $event
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_form_item, {
                                  label: "新密码",
                                  prop: "newpassword"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      type: "password",
                                      modelValue: updatepasswordData.value.new_pwd,
                                      "onUpdate:modelValue": ($event) => updatepasswordData.value.new_pwd = $event
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_form_item, {
                                  label: "确认新密码",
                                  prop: "repassword"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_input, {
                                      type: "password",
                                      modelValue: updatepasswordData.value.re_pwd,
                                      "onUpdate:modelValue": ($event) => updatepasswordData.value.re_pwd = $event
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_el_form_item, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_button, {
                                      type: "primary",
                                      onClick: updateUserPassword
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("提交修改")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_form, {
                            model: updatepasswordData.value,
                            rules,
                            "label-width": "100px",
                            size: "large"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_form_item, { label: "登录名称" }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    modelValue: userInfo.value.username,
                                    "onUpdate:modelValue": ($event) => userInfo.value.username = $event,
                                    disabled: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_form_item, {
                                label: "原密码",
                                prop: "password"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    type: "password",
                                    modelValue: updatepasswordData.value.old_pwd,
                                    "onUpdate:modelValue": ($event) => updatepasswordData.value.old_pwd = $event
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_form_item, {
                                label: "新密码",
                                prop: "newpassword"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    type: "password",
                                    modelValue: updatepasswordData.value.new_pwd,
                                    "onUpdate:modelValue": ($event) => updatepasswordData.value.new_pwd = $event
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_form_item, {
                                label: "确认新密码",
                                prop: "repassword"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_input, {
                                    type: "password",
                                    modelValue: updatepasswordData.value.re_pwd,
                                    "onUpdate:modelValue": ($event) => updatepasswordData.value.re_pwd = $event
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_form_item, null, {
                                default: withCtx(() => [
                                  createVNode(_component_el_button, {
                                    type: "primary",
                                    onClick: updateUserPassword
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("提交修改")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["model"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_col, { span: 12 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_form, {
                          model: updatepasswordData.value,
                          rules,
                          "label-width": "100px",
                          size: "large"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_form_item, { label: "登录名称" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  modelValue: userInfo.value.username,
                                  "onUpdate:modelValue": ($event) => userInfo.value.username = $event,
                                  disabled: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, {
                              label: "原密码",
                              prop: "password"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  type: "password",
                                  modelValue: updatepasswordData.value.old_pwd,
                                  "onUpdate:modelValue": ($event) => updatepasswordData.value.old_pwd = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, {
                              label: "新密码",
                              prop: "newpassword"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  type: "password",
                                  modelValue: updatepasswordData.value.new_pwd,
                                  "onUpdate:modelValue": ($event) => updatepasswordData.value.new_pwd = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, {
                              label: "确认新密码",
                              prop: "repassword"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  type: "password",
                                  modelValue: updatepasswordData.value.re_pwd,
                                  "onUpdate:modelValue": ($event) => updatepasswordData.value.re_pwd = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_form_item, null, {
                              default: withCtx(() => [
                                createVNode(_component_el_button, {
                                  type: "primary",
                                  onClick: updateUserPassword
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("提交修改")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["model"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_row, null, {
                default: withCtx(() => [
                  createVNode(_component_el_col, { span: 12 }, {
                    default: withCtx(() => [
                      createVNode(_component_el_form, {
                        model: updatepasswordData.value,
                        rules,
                        "label-width": "100px",
                        size: "large"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "登录名称" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: userInfo.value.username,
                                "onUpdate:modelValue": ($event) => userInfo.value.username = $event,
                                disabled: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, {
                            label: "原密码",
                            prop: "password"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                type: "password",
                                modelValue: updatepasswordData.value.old_pwd,
                                "onUpdate:modelValue": ($event) => updatepasswordData.value.old_pwd = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, {
                            label: "新密码",
                            prop: "newpassword"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                type: "password",
                                modelValue: updatepasswordData.value.new_pwd,
                                "onUpdate:modelValue": ($event) => updatepasswordData.value.new_pwd = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, {
                            label: "确认新密码",
                            prop: "repassword"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                type: "password",
                                modelValue: updatepasswordData.value.re_pwd,
                                "onUpdate:modelValue": ($event) => updatepasswordData.value.re_pwd = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, null, {
                            default: withCtx(() => [
                              createVNode(_component_el_button, {
                                type: "primary",
                                onClick: updateUserPassword
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("提交修改")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["model"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/user/UserResetPassword.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "UserChart",
  __ssrInlineRender: true,
  setup(__props) {
    const performances = ref([
      {
        "id": 1,
        "date": "2024-06-03",
        "userId": 30,
        "viewsPf": 18,
        "likePf": 6,
        "articlePf": 30
      },
      {
        "id": 2,
        "date": "2024-06-24",
        "userId": 30,
        "viewsPf": 100,
        "likePf": 68,
        "articlePf": 60
      }
    ]);
    const option = ref({
      title: {
        text: "员工业绩"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      legend: {
        data: ["浏览量", "点赞数", "文章数", "总业绩"]
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["2024-06-03", "2024-06-24", "2024-06-20", "2024-06-21", "2024-06-22", "2024-06-23", "2024-06-19"],
          axisLabel: {
            rotate: 90,
            // 旋转标签 90 度使其纵向排列
            // margin_top: 0,
            // 如果需要，还可以设置其他属性来调整标签的显示，比如 margin、textStyle 等
            textStyle: {
              // 设置文本样式，比如字体大小、颜色等
              fontSize: 13,
              // 根据需要调整字体大小
              color: "#333"
              // 设置文本颜色
            },
            interval: 0
            // 设置标签的间隔为 0，以确保所有标签都显示（注意这可能会导致标签重叠）
            // 如果标签重叠，你可以考虑使用 interval 属性来控制显示的间隔
            // 或者使用 axisTick 的属性来隐藏刻度线以减少视觉干扰
          }
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "浏览量",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series"
          },
          data: [100, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "点赞数",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series"
          },
          data: [100, 182, 191, 234, 290, 330, 310]
        },
        {
          name: "文章数",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series"
          },
          data: [100, 232, 201, 154, 190, 330, 410]
        },
        {
          name: "总业绩",
          type: "line",
          silent: true,
          // 设置该系列为不可交互
          // stack: 'Total',
          label: {
            show: true,
            position: "top"
          },
          areaStyle: {
            color: "rgba(255,255,255,0)"
            // 设置区域颜色为红色
          },
          emphasis: {
            focus: "series"
          },
          data: [100, 232, 201, 154, 190, 330, 410]
        }
      ]
    });
    const getPerformanceList = async () => {
      let result = await PerformanceListService();
      performances.value = result.data;
      updatePerformance();
      console.log(option);
    };
    getPerformanceList();
    const article_pf = ref([]);
    const views_pf = ref([]);
    const like_pf = ref([]);
    const date_pf = ref([]);
    const pf = ref([]);
    const updatePerformance = () => {
      date_pf.value = [];
      performances.value.forEach((performance) => {
        date_pf.value.push(performance.date);
      });
      option.value.xAxis[0].data = date_pf;
      views_pf.value = [];
      let views_pf_i = 0;
      performances.value.forEach((performance) => {
        views_pf_i = views_pf_i + performance.viewsPf;
        views_pf.value.push(views_pf_i);
      });
      option.value.series[0].data = views_pf;
      like_pf.value = [];
      let like_pf_i = 0;
      performances.value.forEach((performance) => {
        like_pf_i = like_pf_i + performance.likePf;
        like_pf.value.push(like_pf_i);
      });
      option.value.series[1].data = like_pf;
      article_pf.value = [];
      let article_pf_i = 0;
      performances.value.forEach((performance) => {
        article_pf_i = article_pf_i + performance.articlePf;
        article_pf.value.push(article_pf_i);
      });
      option.value.series[2].data = article_pf;
      pf.value = [];
      let pf_i = 0;
      performances.value.forEach((performance) => {
        pf_i = pf_i + 10 + performance.articlePf + performance.likePf + performance.viewsPf;
        pf.value.push(pf_i);
      });
      option.value.series[3].data = pf;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_e_charts = resolveComponent("e-charts");
      _push(ssrRenderComponent(_component_e_charts, mergeProps({
        class: "chart",
        option: option.value,
        autoresize: ""
      }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/user/UserChart.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const UserCharVue = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-b2d90ae1"]]);
const routes = [
  { path: "/login", component: LoginVue },
  {
    path: "/",
    component: LayoutVue,
    redirect: "/article/manage",
    children: [
      { path: "/article/category", component: ArticleCategoryVue },
      { path: "/article/category-chart", component: ArticleCategoryChart },
      { path: "/article/manage", component: ArticleManageVue },
      { path: "/article/manage-chart", component: ArticleManageCharVue },
      { path: "/user/info", component: _sfc_main$4 },
      { path: "/user/avatar", component: UserAvatarVUe },
      { path: "/user/password", component: _sfc_main$2 },
      { path: "/user/char", component: UserCharVue }
    ]
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_router_view = resolveComponent("router-view");
  _push(ssrRenderComponent(_component_router_view, _attrs, null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
const createApp = ViteSSG(
  App,
  { routes: router.routes },
  // 使用你的路由配置
  ({ app, router: router2, routes: routes2, isClient, initialState }) => {
    const pinia = createPinia();
    const persist = createPersistedState();
    app.component("ECharts", ECharts);
    app.use(pinia);
    pinia.use(persist);
    app.use(router2);
    app.use(ElementPlus, { locale });
  }
);
export {
  createApp
};
