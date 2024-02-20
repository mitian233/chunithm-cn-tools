import {reactive, ref, computed} from "vue";
import { defineStore } from 'pinia';
import axios from "axios";

export const store = reactive({
    drawer: false,
    showDrawer() {
        store.drawer = true
    }
})

export const useMusicDataStore = defineStore('musicDataStore',()=>{
    const isLoading = ref(true);
    const chuni_obj = ref({});
    const chuni_data = ref([]);
    const chuni_data_dict = ref({});
    const chuni_records = ref([]);
    const chuniRecordDisplay = computed(() => {
        return chuni_records.value
    })

    async function fetchChuniData() {
        if (chuni_data.value.length === 0) {
            await fetchMusicData()
        }
        return chuni_data.value
    }
    async function fetchMusicData() {
        isLoading.value = true;
        const resp = await axios.get("https://www.diving-fish.com/api/chunithmprober/music_data")//"https://api-mfl.bangdream.moe/chuni/music_data_c3.json")
        try {
            chuni_data.value = resp.data
            chuni_data_dict.value = chuni_data.value.reduce((acc, music) => {
                acc[music.id] = music
                return acc
            }, {})
            setDefaultRecords()
            isLoading.value = false;
            return resp.data
        }catch (e) {
            console.log(err)
            isLoading.value = false;
            return err
        }
    }
    const setDefaultRecords = () => {
        {
            const currentCids = chuni_records.value.map(elem => {return elem.cid});
            let rank = currentCids.length + 1
            for (const m of chuni_data.value) {
                for (let i = 0; i < m.ds.length; i++) {
                    //if (currentCids.indexOf(m.cids[i]) != -1) continue
                    if (m.level[i] === "-") continue
                    chuni_records.value.push(
                        {
                            "id": chuni_data_dict.value[m.id].id,
                            "rank": rank,
                            "ds": m.ds[i],
                            "title": m.title,
                            "level": m.level[i],
                            "mid": m.id,
                            "cid": m.cid,
                            "level_index": i,
                            "level_label": ["Basic", "Advanced", "Expert", "Master", "Ultima", "World's End"][i]+" "+m.level[i],
                            "from": chuni_data_dict.value[m.id].basic_info.from,//version ,
                            "genre": chuni_data_dict.value[m.id].basic_info.genre,
                            "artist": chuni_data_dict.value[m.id].basic_info.artist,
                            "charter": chuni_data_dict.value[m.id].charts[i].charter,
                            "combo": chuni_data_dict.value[m.id].charts[i].combo,
                            "bpm": chuni_data_dict.value[m.id].basic_info.bpm,
                        }
                    )
                    rank++
                }
            }
        }
    }
    return {isLoading, chuni_obj, chuni_data, chuni_data_dict, chuni_records, chuniRecordDisplay, fetchChuniData}
})

export const useTitleDataStore = defineStore('titleDataStore',()=>{
    const titleList = ref([]);
    const listItemMusic = ref([]);
    const listItemNonMusic = ref([]);

    const creatList = () => {
        let idNumber = 1;
        for (let j = 0; j < titleList.value.music.length; j++) {
            listItemMusic.value.push({
                id: idNumber,
                title: titleList.value.music[j].title,
                color: titleList.value.music[j].color,
                obtain: titleList.value.music[j].obtain,
                music: titleList.value.music[j].music,
            })
            idNumber++
        }
        for (let i = 0; i < titleList.value.nonmusic.length; i++) {
            listItemNonMusic.value.push({
                id: idNumber,
                title: titleList.value.nonmusic[i].title,
                color: titleList.value.nonmusic[i].color,
                obtain: titleList.value.nonmusic[i].obtain,
            })
            idNumber++
        }
    }

    const fetchTitleData = async () => {
        if (titleList.value.length === 0) {
            const resp = await axios.get("https://api-mfl.bangdream.moe/chuni/titlelistraw.json")
            titleList.value = resp.data
            creatList()
        }
        return titleList.value
    }

    return {titleList, listItemMusic, listItemNonMusic, fetchTitleData}
})
