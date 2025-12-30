import { createHomeStyles } from "@/assets/images/styles/home.styles";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";




export default function Index() {
  const { toggleDarkMode, colors } = useTheme();
  const homeStyles = useMemo(() => createHomeStyles(colors), [colors]);

  // const todos = useQuery(api.todos.getTodos);
  // console.log(todos);

  // const addTodo = useMutation(api.todos.addTodo);
  // const clearAllTodos = useMutation(api.todos.clearAllTodos);
  
  return (
    
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
    <StatusBar barStyle={colors.statusBarStyle}/>
    <SafeAreaView style={homeStyles.safeArea}>
    <View style={homeStyles.safeArea}>
      
        {/* header  */}

        <TouchableOpacity onPress={toggleDarkMode}>
          <Text style={homeStyles.title}>toggle the mdoe</Text>
        </TouchableOpacity>
    </View>
    </SafeAreaView>
    </LinearGradient>


   

  );
}
