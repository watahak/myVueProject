import Vue from 'vue';
import { Component } from 'vue-property-decorator'
import { localService } from '../local.service';
import { Markdown } from './markdown.component';

@Component({
  name: 'git-user',
  components: { Markdown },
  template: `
  <div>
  git user works!
  <markdown :inlineHtml=myInlineMd></markdown>
  </div>
  `,
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
    //this.init();

    // this.myInlineMd = localService.getStubMd();

    localService.postMarkdown(localService.getStubMd()).then(d => {
      if (d.data) {
        this.myInlineMd = d.data;
      }
    })
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

