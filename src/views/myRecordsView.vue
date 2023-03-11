<template>
<button @click="get_my_records">Test</button>
</template>

<script>
import axios from "axios"
export default {
  name: "my records",
  props: {
    search: String,
    chuniData: Object,
    chuniDataDict: Object,
  },
  data() {
    return {
      myRecords: [],
      myRecordsList: [],
    }
  },
  methods: {
    get_my_records: function () {
      const _this = this
      axios.post('https://www.diving-fish.com/api/maimaidxprober/login',{
        "username": "OsakaShizuku",
        "password": "vocaloid66ccff"
      }).then((resp)=>{
        console.log(resp)
        let cookie = resp.headers['set-cookie']
        console.log(cookie)
      })
    }
  }
}
</script>