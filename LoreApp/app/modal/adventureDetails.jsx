import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function AdventureDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const adventure = JSON.parse(params.adventure);

  const getIconForQuest = (quest) => {
    switch (quest.type) {
      case 'boss': return 'skull';
      case 'treasure': return 'key';
      default: return 'star';
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0C1126' }}>
      <LinearGradient colors={['#1e2747', '#0c1126']} style={{ padding: 20, paddingTop: 60 }}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={{ position: 'absolute', top: 40, left: 20, zIndex: 1 }}
        >
          <Ionicons name="arrow-back-circle" size={32} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={{ color: '#FFFFFF', fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}>{adventure.title}</Text>
        <Text style={{ color: '#B3B8C8', fontSize: 16, textAlign: 'center', marginTop: 4 }}>{adventure.section}</Text>
      </LinearGradient>
      
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 40 }}>
        {adventure.quests.map((quest, index) => {
          const isLocked = quest.status === 'locked';
          const isActive = quest.status === 'active';
          const isCompleted = quest.status === 'completed';

          return (
            <TouchableOpacity
              key={quest.id}
              disabled={isLocked && !isActive}
              onPress={() => {
                const questData = {
                  ...quest,
                  adventureTitle: adventure.title,
                  section: adventure.section,
                  image: adventure.image,
                  duration: '10 mins',
                  difficulty: 'Easy',
                  progress: 0,
                };
                router.push({ pathname: '/modal/startAdventure', params: questData });
              }}
              style={{
                alignItems: 'center',
                marginBottom: 30,
                opacity: isLocked && !isActive ? 0.5 : 1,
              }}
            >
              {isActive ? (
                <Image source={require('../../assets/buttonBlueToday.png')} style={{ width: 80, height: 80 }} />
              ) : isLocked ? (
                <Image source={require('../../assets/buttonFinish.png')} style={{ width: 80, height: 80 }} />
              ) : (
                <Image source={require('../../assets/buttonBlueBefore.png')} style={{ width: 80, height: 80 }} />
              )}
              <Text style={{ color: '#FFFFFF', fontWeight: 'bold', marginTop: 8, fontSize: 16 }}>
                {quest.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
