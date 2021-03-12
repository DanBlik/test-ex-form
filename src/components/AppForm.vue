<template>
    <div class="container">
        <h2 class="title">Форма подачи заявки в отдел сервиса и качества</h2>
        <form class="form" @submit.prevent="submit" ref="form">
            <label for="subsidiary" class="form-label required pb-0">Ваш филиал</label>
            <select class="form-select" id="subsidiary"
                    v-model="subsidiary"
                    :disabled="online ? true : false"
                    name="city"
            >
                <option value="">Выберите город</option>
                <option v-for="city in cities" :value="city.title" :key="city.id">{{city.title}}</option>
            </select>

            <div class="form-check pt-0">
                <input class="form-check-input" type="checkbox" name="online" value="online" id="online"
                       v-model="online"
                       >
                <label class="form-check-label" for="online">
                    Онлайн
                </label>
            </div>

            <div class="form-radio pt-2 pb-0">
                <label class="form-label required pb-0">Тема обращения</label>
                <div class="radio">
                    <input name="theme" type="radio" id="radio_1" value="Недоволен качеством услуг" v-model="theme"><label for="radio_1">Недоволен качеством услуг</label>
                </div>
                <div class="radio">
                    <input name="theme" type="radio" id="radio_2" value="Расторжение договора" v-model="theme"><label for="radio_2">Расторжение договора</label>
                </div>
                <div class="radio">
                    <input name="theme" type="radio" id="radio_3" value="Не приходит письмо" v-model="theme"><label for="radio_3">Не приходит письмо актиации на почту</label>
                </div>
                <div class="radio">
                    <input name="theme" type="radio" id="radio_4" value="Не работает личный кабинет" v-model="theme"><label for="radio_4">Не работает личный кабинет</label>
                </div>
            </div>

            <div class="form-input">
                <input class="input" type="text" placeholder="Другое" v-model.trim="themeAnother">
            </div>

            <div class="form-textarea pt-2">
                <label for="description" class="form-label required pb-0">Описание проблемы</label>
                <textarea class="textarea"
                          name="description"
                          id="description"
                          placeholder="Введите текст"
                          v-model.trim="description"
                ></textarea>
            </div>
            
            <div class="form-file pt-2 pb-2">
                <label class="form-label pb-0 ">Загрузка документов</label>
                <span class="help pb-0">Приложите, пожалуйста, полноэкранный скриншот. <br> Это поможет быстрее решить проблему.</span>
                <input type="file" name="file">
            </div>
            <button class="btn orange" :disabled="!isValidForm">Отправить</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "AppForm",
        data() {
            return {
                subsidiary: '',
                online: false,
                theme: '',
                themeAnother: '',
                description: '',
                cities: []
            }
        },
        beforeMount() {
            this.loadCities()
        },
        methods: {
            submit() {
                let formData = new FormData(this.$refs.form)
                /*for (let pair of formData.entries()) {
                    console.log(pair[0]+ ', ' + pair[1]);
                }
*/
                let xhr = new XMLHttpRequest()
                xhr.open("POST", "https://60254fac36244d001797bfe8.mockapi.io/api/v1/send-form", true)
                xhr.onload = function(err) {
                    if (xhr.status == 200) {
                        console.log("Good")
                    } else {
                        console.log("Error", err)
                    }

                    let responseObj = xhr.response
                    //console.log(responseObj)
                    responseObj.success ? this.$router.push('success') : alert("Ошибка отправки заявки!")
                }
                xhr.send(formData)

                //clear all fields
                this.subsidiary = ''
                this.online = false
                this.theme = ''
                this.themeAnother = ''
                this.description = ''
            },
            async loadCities() {
                let res = await fetch("https://60254fac36244d001797bfe8.mockapi.io/api/v1/city", {
                    method: "GET"
                })
                let data = await res.json()
                this.cities = data.slice()
            }
        },
        computed: {
            isValidForm() {
                if ((this.subsidiary || this.online) && (this.theme || this.themeAnother) && this.description) {
                    return true
                }
                return false
            }
        },
        watch: {
            online: function(val) {
                if (val) {
                    this.subsidiary = ''
                }
            },
            theme: function(val) {
                if (val) {
                    this.themeAnother = ''
                }
            },
            themeAnother: function(val) {
                if (val) {
                    this.theme = ''
                }
            }
        }
    }
</script>

<style scoped>

</style>