/**
 * @param key string
 * @param defaultValue: string
 *
 * @description
 * localStorage를 가져오는 함수
 * 만약 localStorage를 가져와서 JSON.parse 시 에러가 날 경우,
 * defaultValue를 리턴
 */
export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const localStorageValue = localStorage.getItem(key);

    if (localStorageValue === null) {
      return defaultValue;
    }

    return JSON.parse(localStorageValue) as T;
  } catch (err) {
    console.error("JSON.parse localStorage error", err);
    return defaultValue;
  }
};

export const setLocalStorage = (key: string, value: string) => {
  try {
    return localStorage.setItem(key, value);
  } catch (err) {
    console.error("setLocalStorage err", err);
    return;
  }
};

export const removeLocalStorage = (key: string) => {
  try {
    return localStorage.removeItem(key);
  } catch (err: any) {
    console.error("removeLocalStorage", err);
    return;
  }
};
