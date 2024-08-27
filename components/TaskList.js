import React, { useState, useEffect } from "react"
import { View, Text, FlatList, TouchableOpacity } from "react-native"
import { getTasks, completeTask } from "@/lib/appwrite"
import { FontAwesome5 } from "@expo/vector-icons"

const TaskList = () => {
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		fetchTasks()
	}, [])

	const fetchTasks = async () => {
		const fetchedTasks = await getTasks()
		setTasks(fetchedTasks)
	}

	const handleCompleteTask = async (taskId) => {
		await completeTask(taskId)
		fetchTasks()
	}

	const renderTask = ({ item }) => (
		<View className="bg-gray-800 p-4 rounded-xl mb-3 shadow-md">
			<View className="flex-row items-center mb-2">
				<FontAwesome5 name="tasks" size={20} color="#4c669f" />
				<Text className="text-white text-lg ml-2 flex-1">
					{item.description}
				</Text>
			</View>
			<TouchableOpacity
				className="bg-green-500 p-3 rounded-lg flex-row justify-center items-center"
				onPress={() => handleCompleteTask(item.$id)}
			>
				<FontAwesome5 name="check" size={16} color="white" />
				<Text className="text-white text-center ml-2">Complete Task</Text>
			</TouchableOpacity>
		</View>
	)

	return (
		<View className="mb-6">
			<Text className="text-white text-2xl font-bold mb-4">
				Available Tasks
			</Text>
			<FlatList
				data={tasks}
				renderItem={renderTask}
				keyExtractor={(item) => item.$id}
			/>
		</View>
	)
}

export default TaskList
