import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommunitiesStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<CommunitiesStackParamList, 'CommunityList'>;

const MOCK_COMMUNITIES = [
  {
    id: '1',
    name: 'Computer Science',
    description: 'For CS students and enthusiasts',
    memberCount: 1200,
  },
  {
    id: '2',
    name: 'Campus Life',
    description: 'Everything about campus life and events',
    memberCount: 3500,
  },
  {
    id: '3',
    name: 'Study Groups',
    description: 'Find study partners and groups',
    memberCount: 800,
  },
];

export const CommunitiesScreen: React.FC<Props> = ({ navigation }) => {
  const renderItem = ({ item }: { item: typeof MOCK_COMMUNITIES[0] }) => (
    <TouchableOpacity
      style={styles.communityCard}
      onPress={() => navigation.navigate('CommunityDetail', { communityId: item.id })}
    >
      <View style={styles.cardContent}>
        <Text style={styles.communityName}>{item.name}</Text>
        <Text style={styles.communityDescription}>{item.description}</Text>
        <Text style={styles.memberCount}>{item.memberCount} members</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_COMMUNITIES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  communityCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    padding: 16,
  },
  communityName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  communityDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  memberCount: {
    fontSize: 12,
    color: '#888',
  },
}); 