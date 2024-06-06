import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

const AboutUs = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../assets/Icons/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>About Satisfide Job</Text>
      <Text style={styles.paragraph}>
        Satisfide Job is a leading job portal platform dedicated to connecting job seekers with
        opportunities that match their skills and aspirations. Our mission is to simplify the job
        search process and empower individuals to find fulfilling careers.
      </Text>
      <Text style={styles.subtitle}>Our Vision</Text>
      <Text style={styles.paragraph}>
        Our vision is to create a world where every individual finds joy and satisfaction in their
        work. We aim to revolutionize the job market by providing innovative solutions and
        unparalleled support to both job seekers and employers.
      </Text>
      <Text style={styles.subtitle}>Core Values</Text>
      <Text style={styles.paragraph}>
        - Integrity: We believe in transparency and honesty in all our interactions.
      </Text>
      <Text style={styles.paragraph}>
        - Empowerment: We empower individuals to take control of their career paths.
      </Text>
      <Text style={styles.paragraph}>
        - Innovation: We strive for continuous improvement and innovation in our platform.
      </Text>
      <Text style={styles.subtitle}>Company Details</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailLabel}>Founded:</Text>
        <Text style={styles.detailValue}>January 2020</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailLabel}>Location:</Text>
        <Text style={styles.detailValue}>San Francisco, CA</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailLabel}>Team Size:</Text>
        <Text style={styles.detailValue}>20+ employees</Text>
      </View>
      {/* Add more company details */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#333',
  },
  paragraph: {
    marginBottom: 15,
    lineHeight: 20,
    textAlign: 'justify',
    color: '#555',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#333',
  },
  detailValue: {
    color: '#555',
  },
});

export default AboutUs;
