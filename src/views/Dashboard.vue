<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="12">
          <b-row class="d-flex justify-content-center">
            <b-col cols="12" md="6" lg="2" class="mb-3 px-3">
              <div class="border bg-light shadow py-3 rounded">
                <img src="../assets/user.png" width="64" />
                <h4>Staff</h4>
                <h5>{{ newValue }}</h5>
              </div>
            </b-col>
            <b-col cols="12" md="6" lg="2" class="mb-3 px-3">
              <div class="border bg-light shadow py-3 rounded">
                <img src="../assets/man.png" width="64" />
                <h4>male staff</h4>
                <h5>{{ manValue && manValue.length }}</h5>
              </div>
            </b-col>
            <b-col cols="12" md="6" lg="2" class="mb-3 px-3">
              <div class="border bg-light shadow py-3 rounded">
                <img src="../assets/woman.png" width="64" />
                <h4>female staff</h4>
                <h5>{{ womanValue && womanValue.length }}</h5>
              </div>
            </b-col>
            <b-col cols="12" md="6" lg="2" class="mb-3 px-3">
              <div class="border bg-light shadow py-3 rounded">
                <img src="../assets/smartphone.png" width="64" />
                <h4>section staff</h4>
                <small>Accounting : {{ accountingValue && accountingValue.length }}</small><br>
                <!-- <small>AT : {{ atValue && atValue.length }}</small><br> -->
                <!-- <small>Marketing : {{ marketingValue && marketingValue.length }}</small> -->
              </div>
            </b-col>
            <b-col cols="12" md="6" lg="2" class="mb-3 px-3">
              <div class="border bg-light shadow py-3 rounded">
                <img src="../assets/adult.png" width="64" />
                <h4>staff age</h4>
                <h5>{{ ageValue.toFixed(1) }}</h5>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" class="mt-5">
          <form @submit.prevent="addStaff()" class="border formSize mx-auto p-md-5 p-3">
            <div class="d-flex justify-content-between my-3">
              <div><p class="textSize">Full name create :</p></div>
              <div class="borderBottom">
                <input
                  class="border-0 w-100 px-1 inputSize"
                  type="text"
                  placeholder="Full name"
                  v-model="obj.full_name"
                />
              </div>
            </div>
            <div class="d-flex justify-content-between my-3">
              <div><p class="textSize">Section choose :</p></div>
              <div class="borderBottom">
                <select 
                v-model="obj.section_choose"
                required 
                class="border-0 w-100 text-secondary inputSize">
                  <option hidden selected disabled>Section</option>
                  <option value="Bugalteriya hisobi">Bugalteriya hisobi</option>
                  <option value="At">At</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
            </div>
            <div class="d-flex justify-content-between my-3">
              <div><p class="textSize">Position create :</p></div>
              <div class="borderBottom">
                <input
                  type="text"
                  class="border-0 w-100 px-1 inputSize"
                  placeholder="Lavozimi"
                  v-model="obj.position"
                />
              </div>
            </div>
            <div class="d-flex justify-content-between my-3">
              <div><p class="textSize">Gender :</p></div>
              <div class="borderBottom">
                <form class="d-flex" action="">
                  <div class="mr-2 d-flex align-items-center">
                    <input
                      type="radio"
                      id="male"
                      value="Male"
                      class="mx-1"
                      v-model="obj.gender"
                    />
                    <label for="male" class="my-1 text-secondary inputSize">Male</label>
                  </div>
                  <div class="mx-3 d-flex align-items-center">
                    <input
                      type="radio"
                      id="female"
                      value="Female"
                      class="mx-1"
                      v-model="obj.gender"
                    />
                    <label for="female" class="my-1 text-secondary inputSize">Female</label>
                  </div>
                </form>
              </div>
            </div>
            <div class="d-flex justify-content-between my-3">
              <div><p class="textSize">When born :</p></div>
              <div class="borderBottom">
                <input class="w-100 border-0 px-1 text-secondary inputSize"
                 type="date" v-model="obj.when_born"/>
              </div>
            </div>
            <div>
              <button class="w-100 border-0 p-2 my-2 buttonChange" type="submit">
                + Add
              </button>
            </div>
          </form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import func from 'vue-editor-bridge';
import { mapGetters } from "vuex"
export default {
    data() {
        return{
            obj:{
                id:0,
                full_name: "",
                section_choose: 'Section',
                position: "",
                gender: null,
                when_born: "--.--.--"
            }
        }
    },  
  methods: {
      addStaff(){
          this.obj.id = this.$store.state.staff.length + 1;
          console.log(this.obj)
          this.$http.post('/employees', this.obj)
          .then(() => {
           this.obj = {
                id: 0,
                full_name: "",
                section_choose: 'Section',
                position: "",
                gender: null,
                when_born: "--.--.--"
            }
          })
          .catch((error)=>{
              console.log(error)
          })
      },
        getStaff() {
            this.$http.get("/employees")
                .then((result) => {
                    this.$store.dispatch("getStaff", result.data);
                })
                .catch((error) => {
                    console.log(error);
            });
        },
  },
  computed:{
    ...mapGetters(['staff']),
    newValue: function () {
        return this.$store.state.staff.length
    },
    manValue: function (){
        return this.staff.filter((user) => user.gender === "Male")
    },
    womanValue: function (){
        return this.staff.filter((user)=> user.gender === "Female")
    },
    accountingValue: function (){
      return this.staff.filter((accounting) => accounting.section_choose === "Bugalteriya hisobi")
    },
    atValue: function (){
      return this.staff.filter((at) => at.section_choose === "AT")
    },
    marketingValue: function (){
      return this.staff.filter((marketing) => marketing.section_choose === "Marketing")
    },
    ageValue: function (){
      return (this.staff.reduce((sum, current) => (
        sum + (2021 - +current.when_born.slice(0,4))
      ),0))/this.staff.length 
    },
},

  mounted() {
    this.getStaff()
  }
};
</script>

<style scoped lang='scss'>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
input,
select {
  outline: none;
}
.borderBottom {
  width: 60%;
  padding: 2px 0;
  border-bottom: 2px solid #38b67e;
}
.buttonChange {
  color: white;
  background-color: #38b67e;
  font-size: 20px;
  font-weight: bold;
}
.formSize{
    width: 100%;
    max-width: 580px;
}
.textSize{
    margin-top: 8px;
    font-size: 21px;
    font-weight: 500;
}
.inputSize{
    font-size: 20px;
}
@media screen and (max-width:500px) {
    .textSize{
        font-size: 16px;
    }  
    .inputSize{
     font-size: 16px;
    }
}
@media screen and (max-width:380px) {
    .textSize{
        font-size: 12px;
    }  
     .inputSize{
     font-size: 12px;
    }
}
</style>
