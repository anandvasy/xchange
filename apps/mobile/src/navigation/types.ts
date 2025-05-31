import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Communities: NavigatorScreenParams<CommunitiesStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

export type CommunitiesStackParamList = {
  CommunityList: undefined;
  CommunityDetail: { communityId: string };
  PostDetail: { postId: string };
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  Settings: undefined;
  EditProfile: undefined;
}; 