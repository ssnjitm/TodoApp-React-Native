import { createHomeStyles } from "@/assets/images/styles/home.styles";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";

import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from "react";
import { Alert, FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Todo = Doc<"todos">

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();
  const homeStyles = useMemo(() => createHomeStyles(colors), [colors]);

  const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);
  const [editText, setEditText] = useState("");

  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo)
  const deleteTodo = useMutation(api.todos.deleteTodo)
  const updateTodo = useMutation(api.todos.updateTodo)

  const isLoading = todos === undefined;

  if (isLoading) return <LoadingSpinner />

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id })
    } catch (error) {
      console.log("Error toggling todo:", error);
      Alert.alert("Error", "There was an error toggling the todo item. Please try again.")
    }
  }

  const handleDeleteTodo = async (id: Id<"todos">) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteTodo({ id }) }
    ])
  }

  const handleStartEdit = (todo: Todo) => {
    setEditText(todo.text);
    setEditingId(todo._id);
  }

  const handleSaveEdit = async () => {
    if (!editingId || !editText.trim()) {
      setEditingId(null);
      setEditText("");
      return;
    }

    try {
      await updateTodo({ id: editingId, text: editText.trim() });
      setEditingId(null);
      setEditText("");
    } catch (error) {
      console.log("Error updating todo:", error);
      Alert.alert("Error", "There was an error updating the todo item. Please try again.")
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  }

  const renderTodoItem = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item._id;

    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Checkbox for toggling completion */}
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}
            disabled={isEditing} // Disable when editing
          >
            <LinearGradient
              colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
              style={[
                homeStyles.checkboxInner,
                { borderColor: item.isCompleted ? "transparent" : colors.border },
              ]}
            >
              {item.isCompleted && <Ionicons name="checkmark" size={16} color='#fff' />}
            </LinearGradient>
          </TouchableOpacity>

          {/* Todo Text or Edit Input */}
          {isEditing ? (
            <View style={homeStyles.editContainer}>
              <TextInput
                style={homeStyles.editInput}
                value={editText}
                onChangeText={setEditText}
                autoFocus
                multiline
                placeholder="Edit your todo..."
                placeholderTextColor={colors.textMuted}
                onSubmitEditing={handleSaveEdit}
              />

            </View>
          ) : (
            <View style={homeStyles.todoTextContainer}>
              <Text
                style={[
                  homeStyles.todoText,
                  item.isCompleted && {
                    textDecorationLine: 'line-through',
                    color: colors.textMuted,
                    opacity: 0.6,
                  },
                ]}
              >
                {item.text}
              </Text>
            </View>
          )}

          {/* Action Buttons */}
          <View style={homeStyles.todoActions}>
            {isEditing ? (
              <>
                {/* Save Button */}
                <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.success} style={homeStyles.actionButton}>
                    <Ionicons name="checkmark" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>

                {/* Cancel Button */}
                <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.muted} style={homeStyles.actionButton}>
                    <Ionicons name="close" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {/* Edit Button */}
                <TouchableOpacity onPress={() => handleStartEdit(item)} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.warning} style={homeStyles.actionButton}>
                    <Ionicons name="pencil" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>

                {/* Delete Button */}
                <TouchableOpacity onPress={() => handleDeleteTodo(item._id)} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.danger} style={homeStyles.actionButton}>
                    <Ionicons name="trash" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
          </View>
        </LinearGradient>
      </View>
    )
  }

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <View style={homeStyles.safeArea}>
          {/* Header */}
          <Header />
          <TodoInput />

          {/* Todo List */}
          <FlatList
            data={todos}
            renderItem={renderTodoItem}
            keyExtractor={(item) => item._id}
            style={homeStyles.todoListContent}
            ListEmptyComponent={<EmptyState />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}