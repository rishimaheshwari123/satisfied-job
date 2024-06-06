import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { Text, StyleSheet, Dimensions, View, Image } from "react-native";

import HomeScreen from "../screens/Home.jsx";
import JobsScreen from "../screens/Jobs";
import ProfileScreen from "../screens/Profile.jsx";
import AppliedScreen from "../screens/Applied";

const Tab = createBottomTabNavigator();
const windowWidth = Dimensions.get('window').width;

import { useRoute } from '@react-navigation/native';


const TabNavigator = ({ }) => {
    const iconSize = windowWidth * 0.06;

    const route = useRoute();
    const { userLoggedIn, setUserLoggedIn } = route.params || {};



    return (
        <Tab.Navigator
            tabBarOptions={{
                style: {
                    height: 60,
                    borderTopWidth: 0,
                    elevation: 0,
                    backgroundColor: '#f2f2f2',
                },
                labelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                },
                tabStyle: {
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                iconStyle: {
                    marginBottom: 5,
                },
                activeTintColor: '#007bff',
                inactiveTintColor: '#888',
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="home" size={iconSize} color={color} />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={[styles.tabLabel, { color }]}>Home</Text>
                    ),
                    headerShown: true,// Hide the default navigation bar
                    headerStyle: {
                        backgroundColor: '#4080ED',
                        elevation: 0, // Remove shadow on Android
                        shadowOpacity: 0, // Remove shadow on iOS
                        // borderBottomLeftRadius: 15, // Rounded bottom-left corner
                        // borderBottomRightRadius: 15, // Rounded bottom-right corner
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitle: () => (
                        <View style={styles.headerTitleContainer}>
                            <Image source={require("../../assets/Icons/logo.png")} className="w-[40px] h-[40px] rounded-full"></Image>
                            <Text style={styles.headerTitle}>Satisfied Job</Text>
                        </View>
                    ),

                }}
            />
            <Tab.Screen
                name="Jobs"
                component={JobsScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="search" size={iconSize} color={color} />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={[styles.tabLabel, { color }]}>Jobs</Text>
                    ),
                    headerShown: true,// Hide the default navigation bar
                    headerStyle: {
                        backgroundColor: '#4080ED',
                        elevation: 0, // Remove shadow on Android
                        shadowOpacity: 0, // Remove shadow on iOS
                        // borderBottomLeftRadius: 15, // Rounded bottom-left corner
                        // borderBottomRightRadius: 15, // Rounded bottom-right corner
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitle: () => (
                        <View style={styles.headerTitleContainer}>
                            <Image source={require("../../assets/Icons/logo.png")} className="w-[40px] h-[40px] rounded-full"></Image>
                            <Text style={styles.headerTitle}>Satisfied Job</Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Applied"
                component={AppliedScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="check" size={iconSize} color={color} />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={[styles.tabLabel, { color }]}>Applied</Text>
                    ),
                    headerShown: true, // Show the custom header
                    headerStyle: {
                        backgroundColor: '#4080ED',
                        elevation: 0, // Remove shadow on Android
                        shadowOpacity: 0, // Remove shadow on iOS
                        borderBottomLeftRadius: 15, // Rounded bottom-left corner
                        borderBottomRightRadius: 15, // Rounded bottom-right corner
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitle: () => (
                        <View style={styles.headerTitleContainer}>
                            <Image source={require("../../assets/Icons/logo.png")} className="w-[40px] h-[40px] rounded-full"></Image>
                            <Text style={styles.headerTitle}>Applied Jobs</Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                initialParams={{ userLoggedIn, setUserLoggedIn }}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="user-alt" size={iconSize} color={color} />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={[styles.tabLabel, { color }]}>Profile</Text>
                    ),
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#4080ED',
                        elevation: 0, // Remove shadow on Android
                        shadowOpacity: 0, // Remove shadow on iOS
                        borderBottomLeftRadius: 15, // Rounded bottom-left corner
                        borderBottomRightRadius: 15, // Rounded bottom-right corner
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitle: () => (
                        <View style={styles.headerTitleContainer}>
                            <Image source={require("../../assets/Icons/logo.png")} className="w-[40px] h-[40px] rounded-full"></Image>
                            <Text style={styles.headerTitle}>Profile</Text>
                        </View>
                    ),

                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: -9,
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10,
    },
});

export default TabNavigator;
