import Vue from 'vue';
import { Component } from 'vue-property-decorator'
import { localService } from '../local.service';

@Component({
  name: 'git-user',
  template: `
  <div>
  git user works!
  </div>
  `
})
export class GitUser extends Vue {

  username: string = null;
  selectedProject: number = null;
  userProjects: any[] = null;

  getContentsUrl(projObj: any): string {
    return projObj['contents_url'];
  }

  getMdUrl(contentObj: any): string {
    return contentObj['download_url'];
  }

  mounted() {
    this.username = 'octocat';
    this.selectedProject = 0
    this.init();
  }

  init() {
    localService.getGitUser(this.username).then(
      (data: any[]) => {
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
              console.log(JSON.stringify(rawMd));
              localService.postMarkdown(rawMd);
            });

          }
        );

      }
    );
  }


}

