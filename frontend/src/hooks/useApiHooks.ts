import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryKey,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { get, post, put, patch, del } from "@/api/api";

// get(useQuery) hook
export function useGet<
  TQueryFnData,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  key: TQueryKey,
  url: string,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery<TQueryFnData, TError, TData, TQueryKey>({
    queryKey: key,
    queryFn: () => get<TQueryFnData>(url),
    ...options,
  });
}

// mutation hook
function useMutationHook<TData, TVariables, TError = Error>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, TError, TVariables>,
) {
  return useMutation<TData, TError, TVariables>({
    mutationFn,
    ...options,
  });
}

// post hook
export function usePost<TData, TVariables = any>(
  url: string,
  options?: UseMutationOptions<TData, Error, TVariables>,
) {
  const qc = useQueryClient(); // 쿼리 무효화 필요할 경우
  return useMutationHook<TData, TVariables>((body) => post<TData>(url, body), {
    ...options,
    onSuccess(data, variables, context) {
      options?.onSuccess?.(data, variables, context);
    },
  });
}

// put hook
export function usePut<TData, TVariables = any>(
  url: string,
  options?: UseMutationOptions<TData, Error, TVariables>,
) {
  return useMutationHook<TData, TVariables>(
    (body) => put<TData>(url, body),
    options,
  );
}

// patch hook
export function usePatch<TData, TVariables = any>(
  url: string,
  options?: UseMutationOptions<TData, Error, TVariables>,
) {
  return useMutationHook<TData, TVariables>(
    (body) => patch<TData>(url, body),
    options,
  );
}

// delete hook
export function useDelete<TData = unknown>(
  url: string,
  options?: UseMutationOptions<TData, Error, void>,
) {
  return useMutation<TData, Error, void>({
    mutationFn: () => del<TData>(url),
    ...options,
  });
}
