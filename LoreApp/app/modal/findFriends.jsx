import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalProvider';

export default function FindFriendsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const router = useRouter();
  const { user } = useGlobalContext();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      console.log("Search query is empty.");
      setSearchResults(null);
      return;
    }
    try {
      const response = await axios.post('https://ad35575f59ce.ngrok-free.app/search-users', {
        username: searchQuery.trim(),
      });
      setSearchResults(response.data ? [response.data] : []);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setSearchResults([]); // Set to empty array to indicate "not found"
      } else {
        console.error('Error searching for users:', error);
      }
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1e2747', '#0c1126']} style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back-circle" size={32} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find Friends</Text>
      </LinearGradient>
      
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#8A92B2" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by username"
            placeholderTextColor="#8A92B2"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#8A92B2" />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity onPress={handleSearch}>
          <View style={styles.buttonShadow}>
            <LinearGradient
              colors={['#00DDFF', '#00AADD']}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Search</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Search Results */}
        {searchResults !== null && (
          <>
            <Text style={styles.sectionTitle}>Search Result</Text>
            {searchResults.length > 0 ? (
              searchResults.map((user) => (
                <View key={user.id} style={styles.userCardContainer}>
                  <View style={styles.userCardShadow}>
                    <LinearGradient
                      colors={['#2A3959', '#1C2641']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.userCard}
                    >
                      <Image source={require('../../assets/ProfileIcon2.png')} style={styles.avatar} />
                      <View style={styles.userInfo}>
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text style={styles.userDetails}>@{user.username}</Text>
                      </View>
                      <TouchableOpacity>
                        <Ionicons name="add-circle-outline" size={32} color="#00DDFF" />
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noResultsText}>User not found.</Text>
            )}
            <View style={{ height: 24 }} />
          </>
        )}

        {/* Incoming Requests */}
        <Text style={styles.sectionTitle}>Incoming Requests</Text>
        {user?.friendRequest?.length > 0 ? (
          user.friendRequest.map((requestUser) => (
            <View key={requestUser.id} style={styles.userCardContainer}>
              <View style={styles.userCardShadow}>
                <LinearGradient 
                  colors={['#2A3959', '#1C2641']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.userCard}
                >
                  <Image source={require('../../assets/ProfileIcon2.png')} style={styles.avatar} />
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{requestUser.name}</Text>
                    <Text style={styles.userDetails}>@{requestUser.username}</Text>
                  </View>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={[styles.actionButton, styles.acceptButton]}>
                      <Text style={styles.actionButtonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, styles.declineButton]}>
                      <Text style={styles.actionButtonText}>Decline</Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyListText}>No incoming requests.</Text>
        )}
        
        <View style={{ height: 24 }} />

        {/* Sent Requests */}
        <Text style={styles.sectionTitle}>Sent Requests</Text>
        {user?.friendRequestSent?.length > 0 ? (
          user.friendRequestSent.map((sentUser) => (
            <View key={sentUser.id} style={styles.userCardContainer}>
              <View style={styles.userCardShadow}>
                <LinearGradient
                  colors={['#2A3959', '#1C2641']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.userCard}
                >
                  <Image source={require('../../assets/ProfileIcon2.png')} style={styles.avatar} />
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{sentUser.name}</Text>
                    <Text style={styles.userDetails}>@{sentUser.username}</Text>
                  </View>
                  <TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyListText}>No sent requests.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C1126',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2747',
    borderRadius: 16,
    paddingHorizontal: 20,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    color: 'white',
    paddingVertical: 14,
    fontSize: 16,
    flex: 1,
  },
  clearButton: {
    padding: 4,
  },
  buttonShadow: {
    backgroundColor: '#006C8D',
    borderRadius: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    transform: [{ translateY: -4 }],
  },
  buttonText: {
    color: '#0C1126',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
  },
  noResultsText: {
    color: '#B3B8C8',
    textAlign: 'center',
    fontSize: 14,
  },
  emptyListText: {
    color: '#8A92B2',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#B3B8C8',
    fontSize: 16,
    marginBottom: 16,
  },
  userCardContainer: {
    marginBottom: 16,
  },
  userCardShadow: {
    backgroundColor: '#151e35',
    borderRadius: 12,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    transform: [{ translateY: -6 }],
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userDetails: {
    color: '#B3B8C8',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginLeft: 8,
  },
  acceptButton: {
    backgroundColor: '#00DDFF',
  },
  declineButton: {
    backgroundColor: '#2A3455',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#2A3455',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  cancelButtonText: {
    color: '#B3B8C8',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
