const NotFoundPage = {
  async render() {
    return `
        <h2 tabindex="0">Page not found</h2>
        <a href='#/' class="center"> return to home</a>
        
        `;
  },

  async afterRender() {
    //
  },
};

export default NotFoundPage;
