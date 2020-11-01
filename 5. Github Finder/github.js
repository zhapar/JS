class Github {
  constructor() {
    this.id = "7c4c29e880506afbbd38";
    this.secret = "9fa0859ffe02e74f841e3290ae1316e5f3d71d4f";
    this.repos_count = 5;
    this.repos_sort = "created: asc";
  }

  async searchUser(user) {
    const resUser = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.id}&client_secret=${this.secret}`
    );

    const resRepos = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.id}&client_secret=${this.secret}`
    );

    const userData = await resUser.json();
    const repos = await resRepos.json();

    return {
      userData,
      repos,
    };
  }
}
