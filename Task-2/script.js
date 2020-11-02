const app = new Vue({
  el: '#app',
  data: {
    errors: [],
    password: null,
    login: null,

    approve: [],
    errors: {
      username: "",
      password: ""
    },
    approve: {
      username: "",
      password: ""
    }
  },

  methods: {
    checkForm: function (e) {
      this.errors = [];
      this.approve = [];
      if (!this.login) {
        this.errors.username = 'Username required';
      } else if (!this.isLoginValid(this.login)) {
        this.errors.username = 'Username invalid';
      } else {
        this.approve.username = " ";
      }

      if (!this.password) {
        this.errors.password = 'Password required';
      } else if (this.password.length < 5) {
        this.errors.password = 'Password invalid';;
      } else {
        this.approve.password = " ";
      }

      e.preventDefault();
    },

    isLoginValid: function (login) {
      var emailCheckReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailCheckReg.test(login);
    },

    onFocusUser() {
      if (this.approve.username) {
        login.style.outline = "2px solid green"
      }
    },

    onBlurUser() {
      if (this.approve.username) {
        login.style.outline = "none"
      }
    },

    onFocusPass() {
      if (this.approve.password) {
        password.style.outline = "2px solid green"
      }
    },

    onBlurPass() {
      if (this.approve.password) {
        password.style.outline = "none"
      }
    }
  }
})

