import Vue from 'vue';
import { Component } from 'vue-property-decorator'
import { localService } from '../local.service';
import { Markdown } from './markdown.component';

@Component({
  name: 'git-user',
  components: { Markdown },
  template: `
  <div>
    <div class = "search">
      <b-form-input id="input-large" size="lg" v-model="text" placeholder="Enter Username"></b-form-input>
      <div class="mt-2">Value: {{ text }}</div>

      <b-button variant="outline-primary">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </b-button>
    </div>

    <div class="cardHolder">
      <b-card title="Card title" sub-title="Card subtitle">
        <b-card-text>
          Some quick example text to build on the <em>card title</em> and make up the bulk of the card's
          content.
        </b-card-text>

        <b-card-text>A second paragraph of text in the card.</b-card-text>

        <a href="#" class="card-link">Card link</a>
        <b-link href="#" class="card-link">Another link</b-link>
      </b-card>
    </div>

  <markdown :inlineHtml=myInlineMd></markdown>
  </div>
  `,
  data() {
    return {
      text: ''
    }
  }
})
export class GitUser extends Vue {

  username: string = null;
  selectedProject: number = null;
  userProjects: any[] = null;
  myInlineMd = null;

  getContentsUrl(projObj: any): string {
    return projObj['contents_url'];
  }

  getMdUrl(contentObj: any): string {
    return contentObj['download_url'];
  }

  created() {
    this.username = 'octocat';
    this.selectedProject = 0;

    this.myInlineMd = "<div>hellow im dummy</div>"
    //this.init();
    // localService.postMarkdown(localService.getStubMd()).then(d => {
    //   if (d.data) {
    //     this.myInlineMd = d.data;
    //   }
    // })
  }

  mounted() {

  }

  init() {
    localService.getGitUser(this.username).then(
      (data: object[]) => {
        console.log('aya', data);
        this.userProjects = data;

        // dummy stuff
        let myProj = this.userProjects['data'][this.selectedProject];
        let projContentsUrl = this.getContentsUrl(myProj);
        localService.getMarkdownContents(projContentsUrl).then(
          contents => {
            console.log(contents);
            localService.getUrl(this.getMdUrl(contents['data'])).then(d => {
              const rawMd = d.data;
              console.log("raw", JSON.stringify(rawMd));
              localService.postMarkdown(rawMd).then(d => {
                if (d.data) {
                  // console.log('sasa', JSON.stringify(d['data']));
                  this.myInlineMd = d.data;
                }
              })
            });

          }
        );

      }
    );
  }


}

