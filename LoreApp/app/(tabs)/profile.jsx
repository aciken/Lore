import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalContext } from '../context/GlobalProvider';

const userData = {
  joinDate: 'Joined June 2024',
  stats: {
    courses: 5,
    following: 120,
    followers: 850,
  },
  overview: {
    streak: 7,
    xp: 12540,
    league: 'No current League',
    top3: 12,
  },
  achievements: [
    { icon: 'star', name: 'First Quest' },
    { icon: 'compass', name: 'Explorer' },
    { icon: 'people', name: 'Team Player' },
    { icon: 'hammer', name: 'Master Crafter' },
    { icon: 'rocket', name: 'Speed Runner' },
    { icon: 'key', name: 'Treasure Hunter' },
  ],
};

const StatBox = ({ icon, value, label, iconColor = '#00DDFF' }) => (
  <View style={styles.statBoxContainer}>
    <View style={styles.statBoxShadow}>
      <LinearGradient
        colors={['#2A3959', '#1E2747']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.statBoxContent}
      >
        <Ionicons name={icon} size={24} color={iconColor} style={{ marginBottom: 4 }} />
        <Text style={styles.statBoxValue}>{value}</Text>
        <Text style={styles.statBoxLabel}>{label}</Text>
      </LinearGradient>
    </View>
  </View>
);

export default function ProfileScreen() {
  const { user } = useGlobalContext();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/modal/settings')}>
            <Ionicons name="settings-outline" size={24} color="#B3B8C8" />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileInfoContainer}>
          <View style={styles.avatarContainer}>
             <View style={styles.avatarCircle}>
                <Ionicons name="person-outline" size={60} color="#00DDFF" />
             </View>
          </View>
          <Text style={styles.name}>{user?.name || 'User'}</Text>
          <Text style={styles.handle}>@{user?.username || 'username'} • {userData.joinDate}</Text>
        </View>

        {/* Main Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.stats.courses}</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.stats.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.stats.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={{ flex: 1, marginRight: 16 }}>
             <View style={styles.buttonShadow}>
                <LinearGradient
                    colors={['#2A3959', '#1E2747']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.buttonBase, styles.addFriendButton]}
                >
                    <Ionicons name="person-add-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.addFriendButtonText}>Add Friends</Text>
                </LinearGradient>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.buttonShadow}>
              <LinearGradient
                  colors={['#2A3959', '#1E2747']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.buttonBase, styles.iconButton]}>
                  <Ionicons name="arrow-up-outline" size={24} color="#FFFFFF" />
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>

        {/* Overview */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.overviewGrid}>
            <StatBox icon="flame-outline" value={userData.overview.streak} label="Day streak" iconColor="#FF9500" />
            <StatBox icon="flash-outline" value={userData.overview.xp} label="Total XP" iconColor="#FFCC00" />
            <StatBox icon="shield-outline" value={userData.overview.league} label="Current League" iconColor="#B3B8C8" />
            <StatBox icon="trophy-outline" value={userData.overview.top3} label="Top 3 finishes" iconColor="#B3B8C8" />
          </View>
        </View>
        
        {/* Achievements */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsContainer}>
            {userData.achievements.map((ach, index) => (
              <View key={index} style={styles.achievementChip}>
                <Ionicons name={ach.icon} size={14} color="#FFCC00" style={{ marginRight: 6 }} />
                <Text style={styles.achievementText}>{ach.name}</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C1126',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'flex-end',
    paddingTop: 16,
    marginBottom: 16,
  },
  profileInfoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatarCircle: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: '#1E2747',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'rgba(0, 221, 255, 0.3)',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  handle: {
    color: '#B3B8C8',
    fontSize: 14,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#B3B8C8',
    fontSize: 14,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: '60%',
    backgroundColor: 'rgba(179, 184, 200, 0.2)',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  buttonShadow: {
    backgroundColor: '#151e35',
    borderRadius: 12,
  },
  buttonBase: {
    transform: [{ translateY: -6 }],
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addFriendButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
  },
  addFriendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 12,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statBoxContainer: {
    width: '48%',
    marginBottom: 16,
  },
  statBoxShadow: {
    backgroundColor: '#151e35',
    borderRadius: 16,
  },
  statBoxContent: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'flex-start',
    transform: [{ translateY: -6 }],
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statBoxValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statBoxLabel: {
    color: '#B3B8C8',
    fontSize: 14,
  },
  achievementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  achievementChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 221, 255, 0.1)',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  achievementText: {
    color: '#00DDFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});