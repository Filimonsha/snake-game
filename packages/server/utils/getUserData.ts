import type { TUserFull, TUserProfile } from '../types/user';

export const getUserProfileData = (user: TUserFull): TUserProfile => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userProfile } = user;
  return userProfile;
}
