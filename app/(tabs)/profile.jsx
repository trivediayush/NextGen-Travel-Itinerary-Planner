import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Share, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from './../../configs/FirebaseConfig'; // Adjust path based on your project structure

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          fullName: user.displayName || 'User Name',
          email: user.email || 'No Email Provided',
          photoURL: user.photoURL || null,
        });
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      console.log('Attempting to sign out...');
      await auth.signOut();
      console.log('Sign-out successful');
      router.replace('/auth/sign-up'); // Use replace to navigate to sign-up screen
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this amazing app developed by Ayush, Sanskar and Aditya!', // Update with dynamic app link if available
      });
    } catch (error) {
      console.error('Error sharing the app:', error);
    }
  };

  const renderProfileImage = () => {
    if (user?.photoURL) {
      return <Image source={{ uri: user.photoURL }} style={styles.userImage} />;
    }
    return <Image source={require('./../../assets/images/1.jpg')} style={styles.userImage} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user ? (
        <View style={styles.userIntroContainer}>
          {renderProfileImage()}
          <Text style={styles.userName}>{user.fullName}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading user data...</Text>
      )}
      <TouchableOpacity
        style={[styles.signOutButton, isSigningOut && styles.disabledButton]}
        onPress={handleSignOut}
        disabled={isSigningOut}
        accessibilityLabel="Sign out of the application"
      >
        {isSigningOut ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.shareButton} onPress={handleShare} accessibilityLabel="Share this app">
        <Text style={styles.shareButtonText}>Share App</Text>
      </TouchableOpacity>
      <Text style={styles.footer}>Developed by Ayush T, Sanskar U, Aditya B</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 35,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  userIntroContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 2,
  },
  userName: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    marginBottom: 5,
    color: '#333',
  },
  userEmail: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#666',
  },
  loadingText: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  signOutButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  signOutButtonText: {
    color: '#fff',
    fontFamily: 'outfit-medium',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
  },
  shareButton: {
    backgroundColor: '#4682B4',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontFamily: 'outfit-medium',
    fontSize: 16,
  },
  footer: {
    fontFamily: 'outfit-medium',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});

export default Profile;  