import React from 'react';
import { View, Text } from 'react-native';

export default function NotFound() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>404 - This screen does not exist.</Text>
    </View>
  );
}
