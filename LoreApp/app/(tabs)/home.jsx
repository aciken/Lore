import React from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';
import StyledButton from '../../components/StyledButton';

export default function HomeScreen() {
  const { selectedAdventure, setSelectedAdventure } = useGlobalContext();

  const adventures = [
    { 
      id: '1', 
      title: 'Graphit Adventure', 
      section: 'MYSTIC MINES, ZONE 1',
      image: 'GraphitImage.png',
      quests: [
        { id: 'q1-1', title: 'Collect 10 Crystals', type: 'quest', status: 'completed' },
        { id: 'q1-2', title: 'Find the Hidden Tunnel', type: 'quest', status: 'completed' },
        { id: 'q1-3', title: 'Activate the Mine Cart', type: 'quest', status: 'active' },
        { id: 'q1-4', title: 'Defeat the Rock Golem', type: 'boss', status: 'locked' },
        { id: 'q1-5', title: 'Claim the Treasure', type: 'treasure', status: 'locked' },
      ]
    },
    { 
      id: '2', 
      title: 'Ancient Ruins', 
      section: 'DESERT LANDS, ZONE 2',
      image: 'ForestImage.png',
      quests: [
        { id: 'q2-1', title: 'Decipher the Hieroglyphs', type: 'quest', status: 'active' },
        { id: 'q2-2', title: 'Navigate the Maze', type: 'quest', status: 'locked' },
        { id: 'q2-3', title: 'Find the Oasis', type: 'treasure', status: 'locked' },
      ]
    },
    { 
      id: '3', 
      title: 'Speedway Challenge', 
      section: 'URBAN CIRCUIT, ZONE 3',
      image: 'CarImage.png',
      quests: [
        { id: 'q3-1', title: 'Win the First Race', type: 'quest', status: 'active' },
        { id: 'q3-2', title: 'Upgrade Your Car', type: 'quest', status: 'locked' },
        { id: 'q3-3', title: 'Beat the Champion', type: 'boss', status: 'locked' },
      ]
    }
  ];

  const dailyAdventures = [
    {
      id: 'daily-1',
      title: 'Urban Exploration',
      section: 'DOWNTOWN DISTRICT, ZONE A',
      image: 'CityImage.png',
      timeLeft: '2 hours left',
      quests: [
        { id: 'dq1-1', title: 'Find the tallest skyscraper', type: 'quest', status: 'active' },
        { id: 'dq1-2', title: 'Visit the central park', type: 'quest', status: 'locked' },
      ]
    },
    {
      id: 'daily-2',
      title: 'Rooftop Run',
      section: 'SKYLINE PEAK, ZONE B',
      image: 'ParkourImage.png',
      timeLeft: '8 hours left',
      quests: [
        { id: 'dq2-1', title: 'Leap across the twin towers', type: 'quest', status: 'active' },
        { id: 'dq2-2', title: 'Slide down the glass pyramid', type: 'quest', status: 'locked' },
      ]
    },
    {
      id: 'daily-3',
      title: 'Cliffside Challenge',
      section: 'JAGGED COAST, ZONE C',
      image: 'RockImage.png',
      timeLeft: '1 day left',
      quests: [
        { id: 'dq3-1', title: 'Climb the sheer rock face', type: 'quest', status: 'active' },
        { id: 'dq3-2', title: 'Discover the sea cave', type: 'quest', status: 'locked' },
      ]
    }
  ];

  const router = useRouter();

  const getAdventureImage = (imageName) => {
    switch (imageName) {
      case 'GraphitImage.png': return require('../../assets/GraphitImage.png');
      case 'ForestImage.png': return require('../../assets/ForestImage.png');
      case 'MountainImage.png': return require('../../assets/MountainImage.png');
      case 'CarImage.png': return require('../../assets/CarImage.png');
      case 'CityImage.png': return require('../../assets/CityImage.png');
      case 'ParkourImage.png': return require('../../assets/ParkourImage.png');
      case 'RockImage.png': return require('../../assets/RockImage.png');
      default: return require('../../assets/icon.png');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0C1126' }}>
      <StatusBar style="light" />
      
      {/* Header with greeting and streak */}
      <View style={{ 
        paddingHorizontal: 20, 
        paddingTop: 16, 
        paddingBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <View>
          <Text style={{ 
            color: '#FFFFFF', 
            fontSize: 24, 
            fontWeight: 'bold',
          }}>
            Greetings, Adventurer!
          </Text>
          <Text style={{ 
            color: '#B3B8C8', 
            fontSize: 16, 
            marginTop: 2,
            fontWeight: '500'
          }}>
            Your next quest awaits
          </Text>
        </View>
        
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#1E2747',
          paddingVertical: 8,
          paddingHorizontal: 14,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: 'rgba(255, 149, 0, 0.5)',
          shadowColor: "#FF9500",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
        }}>
          <Image
            source={require('../../assets/FireImage.png')}
            style={{ width: 26, height: 26 }}
          />
          <Text style={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            marginLeft: 8,
            fontSize: 16
          }}>1</Text>
        </View>
      </View>
      
      <ScrollView style={{ flex: 1 }}>
        {/* Selected Adventure section */}
        {selectedAdventure ? (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: '/modal/questDetails',
                params: selectedAdventure
              });
            }}
            style={{
              marginTop: 8,
              marginHorizontal: 20,
              marginBottom: 24,
              transform: [{ scale: 1.02 }],
            }}
          >
            <View style={{
              backgroundColor: '#004C6D',
              borderRadius: 20,
            }}>
              <ImageBackground
                source={getAdventureImage(selectedAdventure.image)}
                style={{
                  borderRadius: 20,
                  overflow: 'hidden',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  transform: [{ translateY: -5 }]
                }}
                imageStyle={{ borderRadius: 20, opacity: 1 }}
              >
                <LinearGradient
                  colors={['rgba(12, 17, 38, 0.6)', 'rgba(12, 17, 38, 0.9)']}
                  style={{ 
                    padding: 20,
                    height: 140,
                    justifyContent: 'space-between',
                  }}
                >
                  <View>
                    <Text style={{ 
                      color: '#B3B8C8', 
                      fontSize: 14, 
                      fontWeight: '500',
                      textShadowColor: 'rgba(0, 0, 0, 0.5)',
                      textShadowOffset: { width: 0, height: 1 },
                      textShadowRadius: 2,
                    }}>
                      {selectedAdventure.adventureTitle}
                    </Text>
                    <Text style={{ 
                      color: '#FFFFFF', 
                      fontSize: 20, 
                      fontWeight: 'bold',
                      textShadowColor: 'rgba(0, 0, 0, 0.5)',
                      textShadowOffset: { width: 0, height: 1 },
                      textShadowRadius: 3,
                    }}>
                      {selectedAdventure.title}
                    </Text>
                  </View>

                  <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <Text style={{ color: '#B3B8C8', fontSize: 12 }}>PROGRESS</Text>
                      <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}>
                        {Math.round(selectedAdventure.progress * 100)}%
                      </Text>
                    </View>
                    <View style={{ 
                      height: 10, 
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      borderRadius: 5,
                      overflow: 'hidden',
                      borderWidth: 1,
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    }}>
                      <LinearGradient
                        colors={['#76FF03', '#CCFF90']}
                        style={{ 
                          height: '100%', 
                          width: `${selectedAdventure.progress * 100}%`, 
                          borderRadius: 5,
                        }}
                      />
                    </View>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={{
            marginTop: 8,
            marginHorizontal: 20,
            marginBottom: 24,
          }}>
            <LinearGradient
              colors={['#006C8D', '#0A0F24']}
              style={{ borderRadius: 20 }}
            >
              <LinearGradient
                colors={['#1e2747', '#141a2f']}
                style={{
                  borderRadius: 20,
                  padding: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 140,
                  transform: [{ translateY: -5 }],
                  overflow: 'hidden',
                }}
              >
                <Ionicons
                  name="compass-outline"
                  size={120}
                  color="rgba(0, 221, 255, 0.1)"
                  style={{ position: 'absolute' }}
                />
                <Text style={{ 
                  color: '#FFFFFF', 
                  fontSize: 20, 
                  fontWeight: 'bold',
                  textShadowColor: 'rgba(0, 0, 0, 0.7)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 3,
                }}>
                  Select an Adventure
                </Text>
                <Text style={{ 
                  color: '#B3B8C8', 
                  fontSize: 14, 
                  marginTop: 4,
                  textShadowColor: 'rgba(0, 0, 0, 0.7)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 2,
                }}>
                  A new story awaits.
                </Text>
              </LinearGradient>
            </LinearGradient>
          </View>
        )}
        
        {/* Daily Adventures Section */}
        <View style={{ marginBottom: 32 }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginBottom: 16
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons 
                name="map" 
                size={24} 
                color="#00DDFF"
                style={{ marginRight: 8 }}
              />
              <Text style={{ 
                color: '#FFFFFF', 
                fontSize: 22, 
                fontWeight: 'bold',
              }}>
                Daily Adventures
              </Text>
            </View>
            <StyledButton title="View All" color="blue" />
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 12 }}
          >
            {dailyAdventures.map((adventure, index) => (
              <TouchableOpacity
                key={adventure.id}
                onPress={() => {
                  const firstQuest = adventure.quests[0];
                  if (firstQuest) {
                    const questData = {
                      ...firstQuest,
                      adventureTitle: adventure.title,
                      section: adventure.section,
                      image: adventure.image,
                      duration: '10 mins',
                      difficulty: 'Easy',
                      progress: 0,
                    };
                    router.push({ pathname: '/modal/startAdventure', params: questData });
                  }
                }}
                style={{
                  width: 220,
                  marginRight: 20,
                  height: 140,
                }}
              >
                <ImageBackground
                  source={getAdventureImage(adventure.image)}
                  style={{
                    flex: 1,
                    borderRadius: 20,
                    overflow: 'hidden',
                    borderWidth: 2,
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  }}
                  imageStyle={{ borderRadius: 18 }}
                >
                  <LinearGradient
                    colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
                    style={{
                      flex: 1,
                      padding: 16,
                      justifyContent: 'space-between',
                    }}
                  >
                    <View>
                      <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>{adventure.title}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                        <Ionicons name="time-outline" size={14} color="#B3B8C8" style={{ marginRight: 4 }}/>
                        <Text style={{ color: '#B3B8C8', fontSize: 12 }}>{adventure.timeLeft}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Ionicons name="star-outline" size={16} color="#FFCC00" style={{ marginRight: 6 }}/>
                      <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '500' }}>
                        {adventure.quests[0].title}
                      </Text>
                    </View>
                  </LinearGradient>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Possible Adventures */}
        <View style={{ marginBottom: 32 }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginBottom: 16
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons 
                name="map" 
                size={24} 
                color="#00DDFF"
                style={{ marginRight: 8 }}
              />
              <Text style={{ 
                color: '#FFFFFF', 
                fontSize: 22, 
                fontWeight: 'bold',
              }}>
                Possible Adventures
              </Text>
            </View>
            <StyledButton title="See All" color="blue" />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 12 }}
          >
            {adventures.map((adventure, index) => (
              <TouchableOpacity
                key={adventure.id}
                onPress={() => {
                  router.push({
                    pathname: '/modal/adventureDetails',
                    params: { adventure: JSON.stringify(adventure) }
                  });
                }}
                style={{
                  width: 280,
                  marginRight: 20,
                  height: 170,
                  transform: [{ rotate: index % 2 === 0 ? '1deg' : '-1deg' }],
                  shadowColor: index % 2 === 0 ? "#00FF88" : "#00DDFF",
                  shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                  elevation: 8,
                }}
              >
                <ImageBackground
                  source={getAdventureImage(adventure.image)}
                  style={{
                    borderRadius: 24,
                    height: '100%',
                    width: '100%',
                    borderWidth: 2,
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    overflow: 'hidden',
                  }}
                  imageStyle={{ 
                    borderRadius: 22,
                    resizeMode: 'cover'
                  }}
                >
                  <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: 22
                  }} />
                  
                  <View style={{
                    padding: 20,
                    height: '100%',
                    width: '100%'
                  }}>
                    <Text style={{ 
                      color: '#FFFFFF', 
                      fontSize: 12, 
                      fontWeight: 'bold', 
                      marginBottom: 4,
                      letterSpacing: 1,
                      textShadowColor: 'rgba(0, 0, 0, 0.8)',
                      textShadowOffset: {width: 0, height: 1},
                      textShadowRadius: 3
                    }}>
                      {adventure.section}
                    </Text>
                    
                    <Text style={{ 
                      color: '#FFFFFF', 
                      fontSize: 26, 
                      fontWeight: 'bold',
                      textShadowColor: 'rgba(0, 0, 0, 0.8)',
                      textShadowOffset: {width: 0, height: 1},
                      textShadowRadius: 3
                    }}>
                      {adventure.title}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
} 