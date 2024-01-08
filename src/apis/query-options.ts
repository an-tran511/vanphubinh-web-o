import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { getPartners } from './partner';
import { getUoms } from './uom';
import { getCategories } from './category';

export const partnersQueryOptions = ({
  deps,
  noMeta = false,
}: {
  deps: string | object;
  noMeta?: boolean;
}) =>
  queryOptions({
    queryKey: ['partners', deps],
    queryFn: () => getPartners(deps),
    placeholderData: keepPreviousData,
    select: (data) => (noMeta ? data.data : data),
  });

export const uomsQueryOptions = ({
  deps,
  noMeta = false,
}: {
  deps: string | object;
  noMeta?: boolean;
}) =>
  queryOptions({
    queryKey: ['uoms', deps],
    queryFn: () => getUoms(deps),
    placeholderData: keepPreviousData,
    select: (data) => (noMeta ? data.data : data),
  });

export const categoriesQueryOptions = ({
  deps,
  noMeta = false,
}: {
  deps: string | object;
  noMeta?: boolean;
}) =>
  queryOptions({
    queryKey: ['categories', deps],
    queryFn: () => getCategories(deps),
    placeholderData: keepPreviousData,
    select: (data) => (noMeta ? data.data : data),
  });
