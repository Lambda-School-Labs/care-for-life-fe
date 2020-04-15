import React from 'react';
import { useNetworkStatus } from 'react-offix-hooks';
import { Text } from 'react-native';

export default function NetworkStatus() {
  const isOnline = useNetworkStatus();

  return <Text>Network status: {isOnline ? 'Online' : 'Offline'}</Text>;
}
