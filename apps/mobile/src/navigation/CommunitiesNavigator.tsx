import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommunitiesStackParamList } from './types';
import { CommunitiesScreen } from '../screens/communities/CommunitiesScreen';
import { CommunityDetailScreen } from '../screens/communities/CommunityDetailScreen';
import { PostDetailScreen } from '../screens/PostDetailScreen';

const Stack = createNativeStackNavigator<CommunitiesStackParamList>();

export const CommunitiesNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CommunityList"
        component={CommunitiesScreen}
        options={{ title: 'Communities' }}
      />
      <Stack.Screen
        name="CommunityDetail"
        component={CommunityDetailScreen}
        options={({ route }) => ({ title: route.params.communityId })}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{ title: 'Post' }}
      />
    </Stack.Navigator>
  );
}; 