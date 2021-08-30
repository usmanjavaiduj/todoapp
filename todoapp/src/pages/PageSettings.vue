<template>
	<q-page padding>
		<q-list bordered padding>
			<q-item-label header>Settings</q-item-label>

			<q-item tag="label" v-ripple>
				<q-item-section>
				<q-item-label>Show 12 hour time format</q-item-label>
				</q-item-section>
				<q-item-section side >
				<q-toggle color="blue" v-model="show_12_hr_time_format" val="battery" />
				</q-item-section>
			</q-item>

			<q-item tag="label" v-ripple>
				<q-item-section>
				<q-item-label>Show tasks in one list</q-item-label>
				</q-item-section>
				<q-item-section side >
				<q-toggle color="blue" v-model="show_tasks_in_one_list" val="battery" />
				</q-item-section>
			</q-item>
		</q-list>
	</q-page>
</template>

<script>
	import { mapGetters, mapActions } from "vuex"
	export default {
		computed: {
			...mapGetters("settings", ["settings"]),
			show_12_hr_time_format: {
				get(){
					return this.settings.show_12_hr_time_format
				},
				set(value){
					this.set_show_12_hr_time_format(value)
				}
			},
			show_tasks_in_one_list: {
				get(){
					return this.settings.show_tasks_in_one_list
				},
				set(value){
					this.set_show_tasks_in_one_list(value)
				}
			}
		},
		methods: {
			...mapActions("settings", ["set_show_12_hr_time_format", "set_show_tasks_in_one_list"]),
		}
	}
</script>

<style>
</style>
