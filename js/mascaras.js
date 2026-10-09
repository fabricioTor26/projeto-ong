/* Máscaras de CPF, telefone e CEP + mensagem de cadastro realizado */
(function () {
  "use strict";

  var so = function (v) { return v.replace(/\D/g, ""); };

  var mascaras = {
    cpf: function (v) {
      v = so(v).slice(0, 11);
      return v.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    },
    telefone: function (v) {
      v = so(v).slice(0, 11);
      if (v.length > 10) return v.replace(/(\d{2})(\d{5})(\d{1,4})/, "($1) $2-$3");
      return v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
    },
    cep: function (v) { return so(v).slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2"); }
  };

  document.querySelectorAll("[data-mascara]").forEach(function (el) {
    el.addEventListener("input", function () {
      el.value = mascaras[el.dataset.mascara](el.value);
    });
  });

  var form = document.getElementById("form-cadastro");
  var aviso = document.getElementById("mensagem");

  if (form && aviso) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var primeiroNome = form.elements["nome"].value.trim().split(" ")[0];
      aviso.textContent = "Cadastro realizado com sucesso, " + primeiroNome + "! Obrigado por fazer parte.";
      aviso.hidden = false;
      aviso.scrollIntoView({ behavior: "smooth", block: "center" });
      form.reset();
      setTimeout(function () { aviso.hidden = true; }, 6000);
    });
  }
})();
