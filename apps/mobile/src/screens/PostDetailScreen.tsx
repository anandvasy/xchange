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
import { CommunitiesStackParamList } from '../navigation/types';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<CommunitiesStackParamList, 'PostDetail'>;

const MOCK_COMMENTS = [
  {
    id: '1',
    author: 'Alice Johnson',
    content: 'I would love to join the study group!',
    likes: 5,
    timestamp: '1h ago',
  },
  {
    id: '2',
    author: 'Bob Wilson',
    content: 'Count me in as well.',
    likes: 3,
    timestamp: '45m ago',
  },
];

export const PostDetailScreen: React.FC<Props> = () => {
  const renderComment = ({ item }: { item: typeof MOCK_COMMENTS[0] }) => (
    <View style={styles.commentCard}>
      <Text style={styles.commentAuthor}>{item.author}</Text>
      <Text style={styles.commentContent}>{item.content}</Text>
      <View style={styles.commentStats}>
        <TouchableOpacity style={styles.likeButton}>
          <Ionicons name="heart-outline" size={16} color="#666" />
          <Text style={styles.likeCount}>{item.likes}</Text>
        </TouchableOpacity>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.postCard}>
        <Text style={styles.authorName}>John Doe</Text>
        <Text style={styles.postContent}>
          Looking for study partners for the upcoming midterms!
        </Text>
        <View style={styles.postStats}>
          <TouchableOpacity style={styles.statButton}>
            <Ionicons name="heart-outline" size={20} color="#666" />
            <Text style={styles.statText}>15</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#666" />
            <Text style={styles.statText}>5</Text>
          </TouchableOpacity>
          <Text style={styles.postTimestamp}>2h ago</Text>
        </View>
      </View>

      <Text style={styles.commentsHeader}>Comments</Text>

      <FlatList
        data={MOCK_COMMENTS}
        renderItem={renderComment}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.commentsContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={20} color="#fff" />
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
  postCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  postTimestamp: {
    color: '#888',
    fontSize: 12,
    marginLeft: 'auto',
  },
  commentsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 16,
  },
  commentsContainer: {
    padding: 16,
  },
  commentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commentContent: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  commentStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    marginLeft: 4,
    color: '#666',
    fontSize: 12,
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
  sendButton: {
    backgroundColor: '#6366F1',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 