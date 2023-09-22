import { useModel, history } from '@umijs/max';
import { PropsWithChildren, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { useAppDispatch, useAppSelector, store } from '@/state';
import { login, setUser } from '@/state/reducers/connection';

const loginPath = '/user/login';

export default function ConnectProvider({ children }: PropsWithChildren) {
  const { initialState, setInitialState } = useModel('@@initialState');
  const dispatch = useAppDispatch();
  const { uid, token } = useAppSelector((state) => state.connection);
  const fetchUserInfo = async (uid?: string | number, token?: string) => {
    const userInfo = await initialState?.fetchUserInfo?.(uid, token);
    if (userInfo) {
      flushSync(() => {
        // setInitialState((s: any) => ({
        //   ...s,
        //   currentUser: userInfo,
        // }));
        dispatch(setUser({ ...userInfo }));
      });
    }
    return userInfo;
  };
  const getUserInfo = async () => {
    // 如果不是登录页面，执行
    const { location } = history;

    console.log('用户uid:', uid, '用户token:', token);
    if (!uid || !token) {
      history.push(loginPath);
      return;
    }
    const currentUser = await fetchUserInfo(uid, token);
    console.log('用户数据', currentUser, location.pathname);

    if (location.pathname !== loginPath) {
      if (!currentUser) {
        history.push(loginPath);
      }
    } else {
      if (currentUser) {
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
      }
    }
  };
  useEffect(() => {
    // console.log('获取用户数据');
    getUserInfo();
  }, [token]);
  return <>{children}</>;
}
