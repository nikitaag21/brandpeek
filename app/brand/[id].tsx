import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';

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
  button: 16,
};

const SPACING = {
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
};

// Mock API data and service for details.
const MOCK_BRANDS = [
    {
      id: '1',
      name: 'InnovateX',
      logo: 'https://placehold.co/150x150/5B86E5/FFFFFF?text=IX',
      description: 'Pioneering the future of technology.',
      details: 'InnovateX is a leading tech company focused on developing cutting-edge solutions for smart cities and sustainable living. We believe in technology that empowers people and protects our planet.',
      followers: '1.2M',
    },
    {
      id: '2',
      name: 'EcoCraft',
      logo: 'https://placehold.co/150x150/36D1DC/FFFFFF?text=EC',
      description: 'Sustainable fashion for a better tomorrow.',
      details: 'EcoCraft specializes in eco-friendly and ethically-sourced clothing. Our mission is to combine style with sustainability, ensuring that every garment tells a story of conscious creation.',
      followers: '850K',
    },
    {
      id: '3',
      name: 'QuantumFit',
      logo: 'https://placehold.co/150x150/A2D2FF/FFFFFF?text=QF',
      description: 'Your partner in health and wellness.',
      details: 'QuantumFit offers personalized fitness and nutrition plans powered by AI. Our platform adapts to your body\'s unique needs, helping you achieve your health goals with scientific precision and support.',
      followers: '5.1M',
    },
    {
      id: '4',
      name: 'Aether Studios',
      logo: 'https://placehold.co/150x150/8E7AB5/FFFFFF?text=AS',
      description: 'Bringing imagination to life through art.',
      details: 'Aether Studios is a creative hub for artists and designers. We produce stunning visual content and digital art, pushing the boundaries of creativity and storytelling in the digital age.',
      followers: '2.4M',
    },
    {
      id: '5',
      name: 'AeroGlide',
      logo: 'https://placehold.co/150x150/C5E0D8/FFFFFF?text=AG',
      description: 'Seamless travel experiences.',
      details: 'AeroGlide is a travel technology company that simplifies flight booking and travel planning. Our intuitive app provides real-time updates and personalized recommendations for a stress-free journey.',
      followers: '780K',
    },
  ];

const fetchBrandDetails = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const brand = MOCK_BRANDS.find(b => b.id === id);
      if (brand) {
        resolve(brand);
      } else {
        reject(new Error('Brand not found'));
      }
    }, 1000); // Simulate network delay
  });
};

const BrandDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Fetch brand details on component mount using the id from navigation params
      fetchBrandDetails(id)
        .then(data => {
          setBrand(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching brand details:', error);
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <LinearGradient colors={['#36D1DC', '#5B86E5']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        {loading || !brand ? (
          <Text style={styles.loadingText}>Loading brand details...</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.detailScrollView}>
            <View style={styles.detailCard}>
              <Image source={{ uri: brand.logo }} style={styles.detailLogo} />
              <Text style={styles.detailName}>{brand.name}</Text>
              <Text style={styles.detailDescription}>{brand.description}</Text>
              <View style={styles.divider} />
              <Text style={styles.detailFullDescription}>{brand.details}</Text>
              <Text style={styles.followersText}>{brand.followers} followers</Text>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
  backButton: {
    position: 'absolute',
    top: Dimensions.get('window').height > 800 ? SPACING.xl : SPACING.l,
    left: SPACING.m,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: SPACING.s,
    borderRadius: SPACING.s,
  },
  backButtonText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.header,
    fontWeight: 'bold',
  },
  detailScrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  detailCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SPACING.m,
    padding: SPACING.l,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  detailLogo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: SPACING.m,
    borderWidth: 2,
    borderColor: COLORS.borderColor,
  },
  detailName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.s,
    textAlign: 'center',
  },
  detailDescription: {
    fontSize: FONT_SIZES.title,
    color: COLORS.text,
    opacity: 0.8,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    width: '80%',
    backgroundColor: COLORS.borderColor,
    marginVertical: SPACING.m,
  },
  detailFullDescription: {
    fontSize: FONT_SIZES.subtitle,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.m,
  },
  followersText: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.l,
  },
  followButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.s,
    borderRadius: SPACING.m,
    borderWidth: 1,
    borderColor: COLORS.text,
  },
  followButtonText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.button,
    fontWeight: 'bold',
  },
});

export default BrandDetailScreen;
