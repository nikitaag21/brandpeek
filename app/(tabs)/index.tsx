import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// Constants for the app, such as colors and API data.
const COLORS = {
  primary: '#5B86E5',
  secondary: '#36D1DC',
  text: '#FFFFFF',
  cardBackground: 'rgba(255, 255, 255, 0.1)',
  borderColor: 'rgba(255, 255, 255, 0.2)',
};

const FONT_SIZES = {
  header: 28,
  title: 18,
  subtitle: 14,
};

const SPACING = {
  s: 8,
  m: 16,
  xl: 32,
};

// Mock API data to simulate fetching from a backend service.
const MOCK_BRANDS = [
  {
    id: '1',
    name: 'InnovateX',
    logo: 'https://placehold.co/100x100/5B86E5/FFFFFF?text=IX',
    description: 'Pioneering the future of technology.',
  },
  {
    id: '2',
    name: 'EcoCraft',
    logo: 'https://placehold.co/100x100/36D1DC/FFFFFF?text=EC',
    description: 'Sustainable fashion for a better tomorrow.',
  },
  {
    id: '3',
    name: 'QuantumFit',
    logo: 'https://placehold.co/100x100/A2D2FF/FFFFFF?text=QF',
    description: 'Your partner in health and wellness.',
  },
  {
    id: '4',
    name: 'Aether Studios',
    logo: 'https://placehold.co/100x100/8E7AB5/FFFFFF?text=AS',
    description: 'Bringing imagination to life through art.',
  },
  {
    id: '5',
    name: 'AeroGlide',
    logo: 'https://placehold.co/100x100/C5E0D8/FFFFFF?text=AG',
    description: 'Seamless travel experiences.',
  },
];

// Mock API service to get all brands.
const fetchBrands = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_BRANDS);
    }, 1000); // Simulate network delay
  });
};

const HomeScreen = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch brands on component mount
    fetchBrands()
      .then(data => {
        setBrands(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching brands:', error);
        setLoading(false);
      });
  }, []);

  const renderBrandItem = ({ item }) => (
    <TouchableOpacity
      style={styles.brandCard}
      onPress={() => router.push(`/brand/${item.id}`)}
    >
      <View style={styles.brandCardContent}>
        <Image source={{ uri: item.logo }} style={styles.brandLogo} />
        <View style={styles.brandTextContainer}>
          <Text style={styles.brandName}>{item.name}</Text>
          <Text style={styles.brandDescription}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.headerText}>Top Brands Today</Text>
        </View>
        {loading ? (
          <Text style={styles.loadingText}>Loading brands...</Text>
        ) : (
          <FlatList
            data={brands}
            renderItem={renderBrandItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.brandList}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingTop: SPACING.xl,
    paddingHorizontal: SPACING.m,
  },
  headerText: {
    fontSize: FONT_SIZES.header,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.m,
  },
  loadingText: {
    color: COLORS.text,
    textAlign: 'center',
    marginTop: SPACING.xl,
    fontSize: FONT_SIZES.title,
  },
  brandList: {
    paddingHorizontal: SPACING.m,
    paddingBottom: SPACING.m,
  },
  brandCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SPACING.s,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  brandCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: SPACING.m,
  },
  brandTextContainer: {
    flex: 1,
  },
  brandName: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  brandDescription: {
    fontSize: FONT_SIZES.subtitle,
    color: COLORS.text,
    marginTop: SPACING.s / 2,
  },
});

export default HomeScreen;
