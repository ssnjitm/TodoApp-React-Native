import { createHomeStyles } from "@/assets/images/styles/home.styles";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useQuery } from "convex/react";
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo } from "react";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";




export default function Index() {
  const { toggleDarkMode, colors } = useTheme();
  const homeStyles = useMemo(() => createHomeStyles(colors), [colors]);

  const todos = useQuery(api.todos.getTodos);
  console.log(todos);

  // const addTodo = useMutation(api.todos.addTodo);
  // const clearAllTodos = useMutation(api.todos.clearAllTodos);


  const isLoading =todos=== undefined

  if(isLoading ) return  <LoadingSpinner/>
  
  return (
    
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
    <StatusBar barStyle={colors.statusBarStyle}/>
    <SafeAreaView style={homeStyles.safeArea}>
    <View style={homeStyles.safeArea}>
      
        {/* header  */}
        <Header/>
        <TodoInput/>
      {/* displaying our todos */}
          { todos?.map(todo => (
            <Text key={todo._id}>
              {todo.text}
            </Text>
          ))}


        {/* <TouchableOpacity onPress={toggleDarkMode}>
          <Text style={homeStyles.title}>toggle the mdoe</Text>
        </TouchableOpacity> */}
    </View>
    </SafeAreaView>
    </LinearGradient>


   

  );
}
