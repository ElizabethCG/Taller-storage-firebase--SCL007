const inputLoader = document.getElementById('myImgInput');

inputLoader.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const storageRef = firebase.storage().ref('images/' + file.name);
  const uploadTask = storageRef.put(file);

  uploadTask.on('state_changed', function (snapshot) {
  },
    function error(err) {
    },
    function complete() {
      storageRef.getDownloadURL().then(function (url) {
        const imgKey = firebase.database().ref('myImages/').push().key;
        const updates = {};
        const dataImg = {
          url: url,
          data: document.getElementById('dataInput').value,
        };
        updates['/myImages/' + imgKey] = dataImg;
        firebase.database().ref().update(updates);
        document.getElementById('container').innerHTML = `
    <div>
    <h1>${dataImg.data}</h1>
      <img src="${url}"/>
    </div>
  ` + document.getElementById('container').innerHTML;
      });
    });
});
