import { useCallback, useState, useEffect } from 'react';
import qs from 'qs';
import ck from 'camelcase-keys';

import {
  Resource,
  failure,
  initial,
  loaded,
  loading,
} from '../utils/Resource';

export default <T>(
  endpoint: string,
  params?: object
): [Resource<T>, () => void] => {
  const [resource, setResource] = useState<Resource<T>>(initial());
  const [refreshCount, setCount] = useState<number>(0);
  const url = params ? `${endpoint}?${qs.stringify(params)}` : endpoint;
  useEffect((): void => {
    const fetchResource = async (): Promise<void> => {
      const res = await fetch(url);
      if (res.status !== 200) {
        const error = await res.text();
        return setResource(failure(error));
      }
      const json = await res.json()
        .then(json => ck(json, { deep: true }) as T);
      setResource(loaded(json));
    };
    setResource(loading());
    fetchResource().catch(() => {
      setResource(failure());
    });
  }, [url, refreshCount]);
  const refresh = useCallback(() => {
    setCount(prev => prev + 1);
  }, [setCount]);
  return [resource, refresh];
};
