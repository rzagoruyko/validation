window.addEventListener('DOMContentLoaded', function () {
  initValidation();
});

function initValidation() {
  var errorClass = 'js-error';
  var regEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;
  var regNumber = /^[0-9]+$/;
  var regPassword = /^(?=(?:.*[a-z]){2})(?=(?:.*[A-Z]){2})(?=(?:.*\d){2}|(?:.*[!@#$%^&*-]){2}).{8,}$/;
  var formElement = document.querySelectorAll('[data-main-form]');

  formElement.forEach(function(form) {
    var requireInputs = form.querySelectorAll('[data-require]');
    var successFlag;

    form.setAttribute('novalidate', 'novalidate');

    form.addEventListener('submit', function (event) {
      successFlag = true;

      validateInputs();

      if(!successFlag) {
        event.preventDefault();
      }
    });

    function validateInputs() {
      requireInputs.forEach(function(input) {
        var row = input.closest('[data-validate-row]');

        if(input.dataset.require == 'text') {
          valid(row, input, !input.value.length);
        }

        if(input.dataset.require == 'email') {
          valid(row, input, !regEmail.test(input.value));
        }

        if(input.dataset.require == 'number') {
          valid(row, input, !regNumber.test(input.value));
        }

        if (input.dataset.require == 'password') {
          valid(row, input, !regPassword.test(input.value));
        }

        if (input.dataset.require == 'confirm-password') {
          valid(row, input, form.querySelector('[data-require="password"]').value !== input.value);
        }

        if(input.dataset.require == 'checkbox') {
          valid(row, input, !input.checked);
        }

        if(input.dataset.require == 'radio') {
          valid(row, input, !row.querySelector('[type="radio"]:checked'));
        }

        if(input.dataset.require == 'select') {
          valid(row, input, input.selectedIndex === 0);
        }
      });
      
      return successFlag;
    }

    function valid(row, input, state) {
      if(state) {
        successFlag = false;
        row.classList.add(errorClass);

        input.addEventListener('focus', function (e) {
          row.classList.remove(errorClass);
        },{once: true});
      }
    }
  });
}