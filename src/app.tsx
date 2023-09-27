import Footer from '@/components/Footer';
import { Question, SelectLang } from '@/components/RightContent';
import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
// import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import React from 'react';
import { AvatarDropdown, AvatarName } from './components/RightContent/AvatarDropdown';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { store } from '@/state';
import { GET_USER_DATA, post } from './services/url';
import { setUser } from './state/reducers/connection';
import ConnectProvider from './components/Provider/ConnectProvider';

const isDev = process.env.NODE_ENV === 'development';
const queryClient = new QueryClient();
const loginPath = '/user/login';
const getLocalStorageUser = (): any => {
  const persistStr = localStorage.getItem('persist:root');
  if (persistStr) {
    try {
      const persistObj = JSON.parse(persistStr);
      const connection = JSON.parse(persistObj.connection);
      return connection;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  } else {
    return undefined;
  }
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  // currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: (uid?: string | number, token?: string) => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async (uid?: string | number, token?: string) => {
    try {
      const loginRes = await post(GET_USER_DATA, { id: uid }, { uid, token });
      if (loginRes.code !== 200) throw loginRes;
      if (!loginRes?.data || loginRes?.data?.length === 0) return loginRes;
      return loginRes?.data?.[0];
    } catch (error) {
      console.log(error);
      // message.error('获取用户数据失败');
      return undefined;
    }
  };
  return {
    fetchUserInfo,
    // currentUser,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  // const { user } = store.getState().connection;
  const con = getLocalStorageUser();
  console.log('获取本地存储数据：', con);
  return {
    actionsRender: () => [<Question key="doc" />, <SelectLang key="SelectLang" />],
    avatarProps: {
      // src: initialState?.currentUser?.avatar,
      src: con?.user?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      // content: initialState?.currentUser?.username,
      content: con?.user?.username,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      // const { location } = history;
      // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
    },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    // links: isDev
    //   ? [
    //       <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
    //         <LinkOutlined />
    //         <span>OpenAPI 文档</span>
    //       </Link>,
    //     ]
    //   : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      // if (!user) return <PageLoading />;
      return (
        //最好不要在这里加provider，会导致子路由加载页面出现卡顿，最好在layouts/index.tsx里配置。
        // <QueryClientProvider client={queryClient}>
          // <Provider store={store}>
            // <PersistGate loading={null} persistor={persistStore(store)}>
              // <ConnectProvider>
                <>
                  {children}
                  <SettingDrawer
                    disableUrlParams
                    enableDarkTheme
                    settings={initialState?.settings}
                    onSettingChange={(settings) => {
                      setInitialState((preInitialState: any) => ({
                        ...preInitialState,
                        settings,
                      }));
                    }}
                  />
                </>
              // </ConnectProvider>
            // </PersistGate>
          // </Provider>
        // </QueryClientProvider>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
