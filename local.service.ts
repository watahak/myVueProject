import { Todo } from './todo';
import axios from 'axios'
import VueAxios from 'vue-axios'

class LocalService {

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
    axios.post('https://api.github.com/markdown/raw', {
      text: rawMd,
      mode: "markdown",
    }, config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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