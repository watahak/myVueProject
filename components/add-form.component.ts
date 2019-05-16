import Vue from 'vue';
import { Component } from 'vue-property-decorator'
import { localService } from '../local.service';

@Component({
  name: 'add-form',
  template: `
  <div>
  <h3>Add Todo</h3>
    <b-form-group label="Title" :invalid-feedback="invalidFeedback()" :state="getState()">
      <b-form-input v-model="title" placeholder="title" :state="getState()" ref="title"></b-form-input>
    </b-form-group>
    <div class="d-flex">
      <b-button class="ml-auto" variant="primary" @click="add()">save</b-button>
      <b-button class="ml-2" variant="outline-secondary" @click="goBack()">back</b-button>
    </div>
  </div>
  `
})
export class AddForm extends Vue {
  title: string = '';
  isInvalid: boolean = false;
  isSubmitted: boolean = false;

  add() {
    this.isSubmitted = true;
    if (this.invalidFeedback() == '') {
      localService.add(this.title);
      this.isInvalid = null;
      this.title = '';
      this.isSubmitted = false;
      this.goBack();
    } else {
      this.isInvalid = true;
      this.$refs.title['$el'].focus();
    }
  }

  invalidFeedback() {
    let result = '';
    if (this.title.length == 0) {
      result = 'Please enter something'
    }
    return result;
  }

  getState() {
    let result = null;
    if (this.isInvalid && this.isSubmitted) {
      result = false;
    } if (!this.isInvalid && this.isSubmitted) {
      result = true;
    }
    return result;
  }

  goBack() {
    this.$router.push('/');
  }
}