<template>
    <q-item 
    @click="update_task({ id: id , updates: { completed: !task.completed } })" 
    :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
    v-ripple
    clickable>
        <q-item-section side top>
            <q-checkbox :value="task.completed" class="no-pointer-events" />
        </q-item-section>

        <q-item-section>
            <q-item-label
            :class="{ 'text-strike' : task.completed }">
                {{ task.name }}
            </q-item-label>
        </q-item-section>

        <q-item-section side top>
            <q-icon name="event" />
            <q-item-label caption>{{ task.due_date }}</q-item-label>
            <q-item-label caption><small>{{ task_due_time }}</small></q-item-label>
        </q-item-section>

        <q-item-section side top>
            <div class="row">
                <q-btn flat round dense color="primary" icon="edit" @click.stop="show_edit_task = true"></q-btn>
                <q-btn flat round dense color="red" icon="delete" @click.stop="prompt_to_delete(id)"></q-btn>
            </div>    
        </q-item-section>

        <q-dialog v-model="show_edit_task">
			<edit-task :task="task" :id="id" @close="show_edit_task = false" />
		</q-dialog>
    </q-item>
</template>

<script>
    import { mapActions, mapGetters } from "vuex"
    import { date } from 'quasar'
    export default {
        data () {
            return {
                show_edit_task: false
            }
        },
        props: ["task", "id"],
        methods: {
            ...mapActions("tasks", ["update_task", "delete_task"]),
            prompt_to_delete(id){
                this.$q.dialog({
                    title: "Confirm",
                    message: "Are you sure?",
                    ok: {
                        push: true
                    },
                    cancel: {
                        color: "negative"
                    },
                    persistent: true
                }).onOk(() => {
                    this.delete_task(id)
                })
            }
        },
        computed: {
            ...mapGetters("settings", ["settings"]),
            task_due_time(){
                if (this.settings.show_12_hr_time_format){
                    return date.formatDate(this.task.due_date + " " + this.task.due_time, "h:mmA")
                }
                return this.task.due_time
                }
        },
        components: {
            'edit-task': require('components/Tasks/Modals/EditTask.vue').default
        }
    }
</script>

<style>
</style>


