import { client } from '@/utils/client';
import { IPartner, ListResponse } from '@/utils/interfaces/list';
export type PostType = {
  id: string;
  title: string;
  body: string;
};

export const getPartners = async () => {
  const response = await client.url('/partners').get();
  return response as ListResponse<IPartner>;
};
