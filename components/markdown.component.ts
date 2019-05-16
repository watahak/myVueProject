import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  name: 'markdown',
  props: ['inlineHtml'],

  template: `
  <div v-html="inlineHtml"></div>
  `
})
export class Markdown extends Vue {

  mounted(){
    console.log('this.$props', this.$props);
  }

}