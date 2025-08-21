import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const StyledButton = ({ title, onPress, color = 'blue', paddingVertical = 8 }) => {
  const colors = {
    blue: {
      gradient: ['#00DDFF', '#00AADD'],
      text: '#0C1126',
      shadow: '#006C8D',
    },
    green: {
      gradient: ['#76FF03', '#64DD17'],
      text: '#0C1126',
      shadow: '#4CAF50',
    },
  };

  const theme = colors[color];

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={{ backgroundColor: theme.shadow, borderRadius: 10 }}>
        <LinearGradient
          colors={theme.gradient}
          style={{
            paddingVertical: paddingVertical,
            paddingHorizontal: 16,
            borderRadius: 10,
            transform: [{ translateY: -4 }],
          }}
        >
          <Text style={{
            color: theme.text,
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
            {title}
          </Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

export default StyledButton;
