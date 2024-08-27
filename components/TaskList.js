import React, { useState, useEffect } from "react"
import { View, Text, FlatList, TouchableOpacity } from "react-native"
import { getTasks, completeTask } from "@/lib/appwrite"

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
		fetchTasks() // Refresh the task list
	}

	const renderTask = ({ item }) => (
		<View className="bg-gray-700 p-4 rounded-lg mb-2">
			<Text className="text-white text-lg mb-2">{item.description}</Text>
			<TouchableOpacity
				className="bg-blue-500 p-2 rounded"
				onPress={() => handleCompleteTask(item.$id)}
			>
				<Text className="text-white text-center">Complete Task</Text>
			</TouchableOpacity>
		</View>
	)

	return (
		<View className="mb-4">
			<Text className="text-white text-xl font-bold mb-2">Available Tasks</Text>
			<FlatList
				data={tasks}
				renderItem={renderTask}
				keyExtractor={(item) => item.$id}
			/>
		</View>
	)
}

export default TaskList
