import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Carousel from './components/Carousel';

export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Carousel />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
