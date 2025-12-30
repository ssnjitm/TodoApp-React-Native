// import { Ionicons } from "@expo/vector-icons"
import useTheme from "@/hooks/useTheme"
import { Ionicons } from "@expo/vector-icons"
import { Tabs } from 'expo-router'
import React from 'react'

const TabsLayout = () => {
  const {colors}=useTheme();
  return (
  <Tabs 
  screenOptions={{
    tabBarActiveTintColor:colors.textMuted,
    tabBarInactiveTintColor:colors.border,
    tabBarStyle:{
        backgroundColor:colors.surface
        ,
        borderTopWidth:1,
        borderTopColor:"yellow",
        height:100,
        paddingBottom:50,
        paddingTop:10
    },
     tabBarLabelStyle:{
        fontSize:12,
        fontWeight:"600",
     },
    headerShown:false
  }}>

    <Tabs.Screen 
    name="index"
    options={
        {
            title:"Todos",
            tabBarIcon:({color,size})=>(<Ionicons name='flash-outline' size={size} color={color} />)
        }
    } />

    <Tabs.Screen 
    name="settings"
    options={
        {
            title:"Settings",
            tabBarIcon:({color,size})=>(<Ionicons name='settings' size={size} color={color} />)
        }
    } />

  </Tabs>
  )
}

export default TabsLayout