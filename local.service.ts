import { Todo } from './todo';
import axios from 'axios'
import VueAxios from 'vue-axios'

class LocalService {

  getStubMd() {
    return "## Welcome to GitHub Pages\n\nYou can use the [editor on GitHub](https://github.com/violet-org/boysenberry-repo/edit/master/README.md) to maintain and preview the content for your website in Markdown files.\n\nWhenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.\n\n### Markdown\n\nMarkdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for\n\n```markdown\nSyntax highlighted code block\n\n# Header 1\n## Header 2\n### Header 3\n\n- Bulleted\n- List\n\n1. Numbered\n2. List\n\n**Bold** and _Italic_ and `Code` text\n\n[Link](url) and ![Image](src)\n```\n\nFor more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).\n\n### Jekyll Themes\n\nYour Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/violet-org/boysenberry-repo/settings). The name of this theme is saved in the Jekyll `_config.yml` configuration file.\n\n### Support or Contact\n\nHaving trouble with Pages? Check out our [documentation](https://help.github.com/categories/github-pages-basics/) or [contact support](https://github.com/contact) and we’ll help you sort it out.\n"
  }

  async getGitUser(username: string) {
    const data = await axios
      .get('https://api.github.com/users/' + username + '/repos');
    return data;
  }

  async getMarkdownContents(repoContentsUrl: string) {
    // demo url "https://api.github.com/repos/octocat/boysenberry-repo-1/contents/{+path}"
    const mdUrl = repoContentsUrl.split("{")[0] + 'README.md';
    const data = await axios.get(mdUrl);
    return data;
  }

  async getUrl(url: string) {
    const data = await axios.get(url);
    return data;
  }

  async postMarkdown(rawMd: string) {
    const config = {
      headers: { 'Content-Type': 'text/plain' }
    }
    const data = await axios
      // .post('https://api.github.com/markdown', {
      //   text: "Hello world github/linguist#1 **cool**, and#1!",
      //   mode: "gfm",
      //   context: "github/gollum"
      // }, config)
      .post('https://api.github.com/markdown', {
        text: rawMd,
        mode: "gfm",
        context: "github/gollum"
      }, config)
    console.log('reteieved processed', data);

    return data;
  }


  get(): Array<Todo> {
    let todos = JSON.parse(localStorage.getItem('todos'));
    return todos ? todos : [];
  }

  add(title: string) {
    let todos = this.get();
    if (!todos) todos = [];
    let maxId = Math.max(...todos.map(t => t.id));
    todos.push({ id: maxId > 0 ? maxId + 1 : 1, title: title });
    this.save(todos);
  }

  remove(id: number) {
    let todos = this.get();
    let indexToDelete = todos.findIndex(t => t.id == id);
    todos.splice(indexToDelete, 1);
    this.save(todos);
  }

  save(todos: Array<Todo>) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

export const localService = new LocalService();