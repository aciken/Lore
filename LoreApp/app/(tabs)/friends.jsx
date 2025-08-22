import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView, TextInput, Image, TouchableOpacity, Modal, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StyledButton from '../../components/StyledButton';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const friendsData = [
  { id: '1', name: 'Aetheria', online: true, avatar: require('../../assets/ProfileIcon2.png'), level: 12, class: 'Mage', joined: '2 weeks ago', header: require('../../assets/MountainImage.png'), achievements: [{icon: 'star', name: 'First Quest'}, {icon: 'compass', name: 'Explorer'}], stats: {quests: 25, mutual: 3} },
  { id: '2', name: 'Valerius', online: false, avatar: require('../../assets/ProfileIcon2.png'), level: 8, class: 'Warrior', joined: '1 month ago', header: require('../../assets/ForestImage.png'), achievements: [{icon: 'people', name: 'Team Player'}], stats: {quests: 12, mutual: 5} },
  { id: '3', name: 'Seraphina', online: true, avatar: require('../../assets/ProfileIcon2.png'), level: 15, class: 'Archer', joined: '3 days ago', header: require('../../assets/CarImage.png'), achievements: [{icon: 'hammer', name: 'Master Crafter'}, {icon: 'rocket', name: 'Speed Runner'}], stats: {quests: 42, mutual: 2} },
  { id: '4', name: 'Kael', online: false, avatar: require('../../assets/ProfileIcon2.png'), level: 9, class: 'Rogue', joined: '5 days ago', header: require('../../assets/FireImage.png'), achievements: [{icon: 'key', name: 'Treasure Hunter'}], stats: {quests: 18, mutual: 1} },
  { id: '5', name: 'Lyra', online: true, avatar: require('../../assets/ProfileIcon2.png'), level: 11, class: 'Healer', joined: '1 week ago', header: require('../../assets/GraphitImage.png'), achievements: [{icon: 'heart', name: 'Legendary Healer'}, {icon: 'happy', name: 'Kind Soul'}], stats: {quests: 33, mutual: 6} },
];

export default function FriendsScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const openFriendModal = (friend) => {
    setSelectedFriend(friend);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0C1126' }}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>
          Friends & Allies
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Find Friends Button */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24, marginTop: 8 }}>
          <StyledButton 
            title="Find New Friends" 
            color="blue" 
            paddingVertical={12}
            onPress={() => router.push('/modal/findFriends')} 
          />
        </View>

        {/* Friends List */}
        <View style={{ paddingHorizontal: 20 }}>
          {friendsData.map((friend) => (
            <TouchableOpacity
              key={friend.id}
              activeOpacity={0.7}
              onPress={() => openFriendModal(friend)}
              style={styles.friendCardContainer}
            >
              <View style={styles.friendCardShadow}>
                <LinearGradient
                  colors={['#2A3959', '#1C2641']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.friendCard}
                >
                  <View>
                    <Image source={friend.avatar} style={{ width: 48, height: 48, borderRadius: 24 }} />
                    {friend.online && (
                      <View style={styles.onlineIndicator} />
                    )}
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.friendName}>{friend.name}</Text>
                    <Text style={styles.friendLevel}>
                      Lv. {friend.level} {friend.class}
                    </Text>
                  </View>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {selectedFriend && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
            <View style={styles.modalShadow}>
              <View style={styles.modalContent}>
                <ImageBackground source={selectedFriend.header} style={styles.modalHeader} imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                  <LinearGradient
                    colors={['rgba(30, 39, 71, 0.4)', 'rgba(30, 39, 71, 0.9)']}
                    style={styles.headerOverlay}
                  >
                    <Image source={selectedFriend.avatar} style={styles.modalAvatar} />
                    <Text style={styles.modalName}>{selectedFriend.name}</Text>
                    <Text style={styles.modalLevel}>Lv. {selectedFriend.level} {selectedFriend.class}</Text>
                  </LinearGradient>
                </ImageBackground>

                <View style={styles.modalBody}>
                  {/* Stats */}
                  <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>{selectedFriend.stats.quests}</Text>
                      <Text style={styles.statLabel}>Quests Done</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>{selectedFriend.stats.mutual}</Text>
                      <Text style={styles.statLabel}>Mutual Friends</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>{selectedFriend.joined}</Text>
                      <Text style={styles.statLabel}>Joined</Text>
                    </View>
                  </View>
                  
                  <View style={styles.separator} />

                  {/* Achievements */}
                  <Text style={styles.achievementsTitle}>Achievements</Text>
                  <View style={styles.achievementsContainer}>
                    {selectedFriend.achievements.map((ach, index) => (
                      <View key={index} style={styles.achievementChip}>
                        <Ionicons name={ach.icon} size={14} color="#FFCC00" style={{ marginRight: 6 }} />
                        <Text style={styles.achievementText}>{ach.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Actions */}
                <View style={styles.modalFooter}>
                  <StyledButton title="Invite to Party" color="blue" paddingVertical={12} />
                  <TouchableOpacity style={{ marginTop: 12 }}>
                    <Text style={{ color: '#B3B8C8', textAlign: 'center' }}>Remove Friend</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Ionicons name="close-circle" size={32} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  friendCardContainer: {
    marginBottom: 16,
  },
  friendCardShadow: {
    backgroundColor: '#151e35',
    borderRadius: 12,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    transform: [{ translateY: -6 }],
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#76FF03',
    borderWidth: 2,
    borderColor: '#1E2747',
  },
  friendName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  friendLevel: {
    color: '#B3B8C8',
    fontSize: 14,
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#1E2747',
    borderRadius: 20,
    transform: [{ translateY: -6 }],
    overflow: 'hidden', // This will clip the children to the rounded corners
  },
  modalShadow: {
    backgroundColor: '#12182c',
    borderRadius: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  modalHeader: {
    width: '100%',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginBottom: 8,
  },
  modalName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  modalLevel: {
    color: '#B3B8C8',
    fontSize: 16,
    marginTop: 4,
  },
  modalBody: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#B3B8C8',
    fontSize: 12,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(179, 184, 200, 0.2)',
    marginVertical: 12,
  },
  achievementsTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
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
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(179, 184, 200, 0.2)',
  },
});
