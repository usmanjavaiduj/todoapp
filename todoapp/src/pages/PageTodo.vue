<template>
	<q-page padding>
		<div class="q-mb-lg">
			<search></search>
		</div>
		<p v-if="search && !Object.keys(tasks_to_do).length && !Object.keys(tasks_completed).length">No tasks filtered!</p>
		<no-task @show_add_task="show_add_task = true" v-if="!Object.keys(tasks_to_do).length && !search && !settings.show_tasks_in_one_list"></no-task>
		<task-to-do v-if="Object.keys(tasks_to_do).length" :tasks_to_do = "tasks_to_do"></task-to-do>
		<task-completed v-if="Object.keys(tasks_completed).length" :tasks_completed = "tasks_completed"></task-completed>
		
		<div class="absolute-bottom text-center q-mb-lg">
			<q-btn
			@click="show_add_task = true"
			round
			color="primary"
			size="18px"
			icon="add"
			/>
		</div>	

		<q-dialog v-model="show_add_task">
			<add-task @close="show_add_task = false" />
		</q-dialog>
	</q-page>
</template>

<script>
	import { mapGetters, mapState } from "vuex"
	export default {
		data() {
			return {
				show_add_task: false
			}
		},
		computed: {
			...mapGetters("tasks", ["tasks_to_do", "tasks_completed"]),
			...mapGetters("settings", ["settings"]),
			...mapState("tasks", ["search"])
		},
		components: {
			"add-task": require("components/Tasks/Modals/AddTask.vue").default,
			"task-to-do": require("components/Tasks/TaskToDo.vue").default,
			"task-completed": require("components/Tasks/TaskCompleted.vue").default,
			"no-task": require("components/Tasks/NoTask.vue").default,
			"search": require("components/Tasks/Tools/Search.vue").default
		}
	}
</script>

<style>
</style>
