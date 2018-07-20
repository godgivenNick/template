fetch('main-form.json')
  .then(function (response) {
   return response.text();
})
.then(function (data) {
  console.log(data);
})
