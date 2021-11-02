const DrawerInitiator = {
  init({ button, drawer }) {
    button.addEventListener('click', () => {
      this._toogleMenu(button, drawer);
    });
  },

  _toogleMenu(button, drawer) {
    button.classList.toggle('active');
    drawer.classList.toggle('active');
  },

};

export default DrawerInitiator;
