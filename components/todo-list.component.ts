import Vue from 'vue';
import { Component } from 'vue-property-decorator'
import { localService } from '../local.service';
import { Todo } from '../todo';

@Component({
  name: 'todo-list',
  template: `
  <div>
    <div class="d-flex">
      <b-button variant="primary" class="ml-auto" @click="goToAdd()">add</b-button>
    </div>
    <h3>Entries</h3>
    <b-list-group>
      <b-list-group-item v-for="(todo, i) in todos">
        <div class="d-flex align-items-center">
          <span>{{todo.id}} {{todo.title}}</span>
          <b-button variant="danger" @click="showDeleteConfirm(todo.id)" style="margin-left:auto;" v-b-modal.modal-center>
            <i class="fa fa-trash"></i>
          </b-button>
        </div>
      </b-list-group-item>
      <b-list-group-item v-if="todos.length == 0">
        no entries
      </b-list-group-item>
    </b-list-group>

    <b-modal id="modal-center" centered title="Delete" @ok="onDelete">
      <div class="p-3" v-html="deleteMessage"></div>
    </b-modal>
    
  </div>
  `
})
export class TodoList extends Vue {
  todos: Array<Todo> = [];
  deleteMessage: string = '';
  idToDelete: number = null;

  mounted() {
    this.init();
  }

  init() {
    this.todos = localService.get();
  }

  showDeleteConfirm(id: number) {
    this.idToDelete = id;
    let todo = this.todos.find(t => t.id == id);
    this.deleteMessage = `Do you want to delete item <b>${todo.title}</b>?`;
  }

  onDelete() {
    localService.remove(this.idToDelete);
    this.init();
  }

  goToAdd(){
    this.$router.push('add');
  }

}