import React, { lazy, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../pages/home';
import Favorite from '../pages/favorite';
import Settings from '../pages/settings';

import { darkTheme, lightTheme } from '../styles/themeMode';

const Tab = createBottomTabNavigator();

const Router = () => {

    //Theme Mode
    const themeMode = useSelector(state => state.themeModeReducer.themeMode)
    const theme = themeMode === 'dark' ? darkTheme : lightTheme

    return (
        <SafeAreaView style={{ height: '100%' }}>
            <Tab.Navigator
                initialRouteName='Home'
                safeAreaInsets={{ //Fixed Bottom-Tab jump bug
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}

                screenOptions={{
                    tabBarActiveTintColor: theme.tabBarA,
                    tabBarInactiveTintColor: theme.tabBarInA,
                    tabBarShowLabel: true,
                    tabBarLabelPosition: 'blow-icon',
                    tabBarStyle: { backgroundColor: theme.bg },
                    tabBarLabelStyle: { paddingBottom: 5 },
                    tabBarHideOnKeyboard: true,
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" size={24} color={color} />
                        ),
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name="Favorite"
                    component={Favorite}
                    options={{
                        tabBarLabel: 'Favorite',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="heart" size={24} color={color} />
                        ),
                        tabBarBadge: 3,
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        tabBarLabel: 'Settings',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="cog" size={24} color={color} />
                        ),
                        headerShown: false
                    }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    )
}

export default Router