<template>
  <div>
    <div class="wrapper">
      <p class="header">Zadanie:</p>
      <p>Korzystając z przygotowanego środowiska, zaprogramuj aplikację do wrzucania plików na serwer.</p>
      <p>Aplikacja ma oferować dwie funkcje:</p>
      <ul>
        <li>Wrzucanie wybranego z dysku pliku do folderu na serwerze</li>
        <li>Lista plików w folderze</li>
      </ul>
    </div>

    <div class="wrapper">
      <p class="header">Rozwiązanie:</p>

      <p><u>Wrzuć pliki na serwer</u></p>

      <form @submit="uploadFiles">
        <input
          type="file"
          name="file-input"
          multiple
          @change="e => {
            const listItems = [];
            for(let i=0; i < e.target.files.length; i++) {
              listItems.push(e.target.files.item(i))
            }
            files = [...listItems];
          }"
          required
        >
        <button v-bind:disabled="isBtnDisabled">Upload files</button>
      </form>

      <br/>
      <p><u>Lista plików na serwerze</u></p>
      <div v-if="Array.isArray(listItems) && listItems.length">
        <ul>
          <li v-for="item in listItems" :key="item.name">
            {{ item.name }}
          </li>
        </ul>
      </div>

      <div v-else>
        <h5> Brak plików na serwerze. Wrzuć swój pierwszy plik :) </h5>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Test',
  data() {
      return {
        files: [],
        // info: null,
        isBtnDisabled: false,
        listItems: []
      };
    },
    created: function() {
      axios
        .all([
          axios.get('/api/info'),
          axios.get('/api/file-list')
        ])
        .then(axios.spread((info, list) => {
          this.$emit('loadNotification', info.data.msg);
          this.listItems = [...list.data.fileList];
        }))
        .catch(() => {
          this.$emit('loadNotification', "Server is not responding");
        });
    },
  methods: {
    uploadFiles(e) {
      e.preventDefault();
      this.isBtnDisabled = true;

      const formData = new FormData();
      this.files.forEach((el) => {
        formData.append('userfile[]', el);
      });

      axios({
          method: "post",
          url: '/api/create-file',
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        this.$emit('loadNotification', res.data.msg)
        this.isBtnDisabled = false;

        axios
          .get('/api/file-list')
          .then(res => {
            this.listItems = [...res.data.fileList];
          })
          .catch(() => {
            this.$emit('loadNotification', "Error while reading file list.");
        });
      })
      .catch(() => {
        this.$emit('loadNotification', "Server is not responding")
        this.isBtnDisabled = false;
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
    padding: 20px;
}
.header {
  font-weight: bold;
}
</style>
