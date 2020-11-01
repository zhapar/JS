class Github {
  constructor() {
    this.id = "7c4c29e880506afbbd38";
    this.secret = "9fa0859ffe02e74f841e3290ae1316e5f3d71d4f";
  }

  async searchUser(user) {
    const resUser = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.id}&client_secret=${this.secret}`
    );

    const userData = await resUser.json();

    return {
      userData,
    };
  }
}
