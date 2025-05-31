import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommunitiesStackParamList } from '../../navigation/types';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<CommunitiesStackParamList, 'CommunityDetail'>;

const MOCK_POSTS = [
  {
    id: '1',
    author: 'John Doe',
    content: 'Looking for study partners for the upcoming midterms!',
    likes: 15,
    comments: 5,
    timestamp: '2h ago',
  },
  {
    id: '2',
    author: 'Jane Smith',
    content: 'Great resources for learning React Native: [link]',
    likes: 32,
    comments: 8,
    timestamp: '4h ago',
  },
];

export const CommunityDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const renderPost = ({ item }: { item: typeof MOCK_POSTS[0] }) => (
    <TouchableOpacity
      style={styles.postCard}
      onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
    >
      <Text style={styles.authorName}>{item.author}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.postStats}>
        <View style={styles.statItem}>
          <Ionicons name="heart-outline" size={16} color="#666" />
          <Text style={styles.statText}>{item.likes}</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="chatbubble-outline" size={16} color="#666" />
          <Text style={styles.statText}>{item.comments}</Text>
        </View>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_POSTS}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a post..."
          multiline
        />
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
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
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
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
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  timestamp: {
    color: '#888',
    fontSize: 12,
    marginLeft: 'auto',
  },
  inputContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    maxHeight: 100,
  },
  postButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 