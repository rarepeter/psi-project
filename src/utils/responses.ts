export interface ResponseJson<TData> {
  meta?: {
    pagination?: {
      totalCount?: number;
    };
  };
  data: TData;
}

export const constructResponseJson = <TData>(
  data: NonNullable<TData>,
): ResponseJson<TData> => {
  const responseJson: ResponseJson<TData> = {
    data,
  };

  return responseJson;
};

export const constructResponseJsonWithPagination = <TData>(
  data: NonNullable<TData>,
  totalCount: number,
): ResponseJson<TData> => {
  const responseJsonWithPagination: ResponseJson<TData> = {
    data,
    meta: { pagination: { totalCount } },
  };

  return responseJsonWithPagination;
};
