<template>
  <div>
    <b-container class="bg-light">
      <b-row>
        <b-col cols="12" class="p-3">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">N_</th>
                  <th scope="col">To'liq ism</th>
                  <th scope="col">
                    <select
                      v-model="sectionValue"
                      required
                      class="border-0 bg-transparent">
                      <option value="" selected>Barcha</option>
                      <option value="Bugalteriya hisobi">Bugalteriya hisobi</option>
                      <option value="AT">AT</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </th>
                  <th scope="col">Lavozim</th>
                  <th scope="col">
                    <select 
                    v-model="genderValue"
                    required
                    class="border-0 bg-transparent">
                      <option value="" selected class="font-weight-bold">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </th>
                  <th scope="col">Tug'ilgan sana</th>
                  <th scope="col">Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="list in filteredProducts" :key="list.id">
                  <th scope="row">{{ list.id }}</th>
                  <td>{{ list.full_name }}</td>
                  <td>{{ list.section_choose }}</td>
                  <td>{{ list.position }}</td>
                  <td>{{ list.gender }}</td>
                  <td>{{ list.when_born }}</td>
                  <!--  -->
                  <td>
                    <b-button
                      @click="editStaff(list.id)"
                      class="bg-transparent border-0"
                    >
                      <img class="mx-2" src="../assets/pencil.png" width="24" />
                    </b-button>
                    <b-modal
                      :id="`my-edit-modal-${list.id}`"
                      title="Edit"
                      centered
                      hide-footer
                    >
                      <form
                        @submit.prevent="saveStaff(list.id)"
                        class="border mx-auto p-md-5 p-3"
                      >
                        <div class="d-flex justify-content-between my-3">
                          <div><p class="textSize">Name change:</p></div>
                          <div class="borderBottom">
                            <input
                              v-model="staffInformation.full_name"
                              class="border-0 w-100 px-1 inputSize"
                              type="text"
                              placeholder="Full name"
                            />
                          </div>
                        </div>
                        <div class="d-flex justify-content-between my-3">
                          <div><p class="textSize">Section change:</p></div>
                          <div class="borderBottom">
                            <select
                              v-model="staffInformation.section_choose"
                              required
                              class="border-0 w-100 text-secondary inputSize"
                            >
                              <option hidden selected disabled>Section</option>
                              <option value="Bugalteriya hisobi">
                                Bugalteriya hisobi
                              </option>
                              <option value="AT">At</option>
                              <option value="Marketing">Marketing</option>
                            </select>
                          </div>
                        </div>
                        <div class="d-flex justify-content-between my-3">
                          <div><p class="textSize">Position create :</p></div>
                          <div class="borderBottom">
                            <input
                              v-model="staffInformation.position"
                              type="text"
                              class="border-0 w-100 px-1 inputSize"
                              placeholder="Lavozimi"
                            />
                          </div>
                        </div>
                        <div class="d-flex justify-content-between my-3">
                          <div><p class="textSize">Gender :</p></div>
                          <div class="borderBottom">
                            <form class="d-flex" action="">
                              <div class="mr-2">
                                <input
                                  type="radio"
                                  id="male"
                                  value="Male"
                                  class="mr-1"
                                  v-model="staffInformation.gender"
                                />
                                <label
                                  for="Male"
                                  class="text-secondary inputSize"
                                  >Male</label
                                >
                              </div>
                              <div class="mx-3">
                                <input
                                  type="radio"
                                  id="female"
                                  value="Female"
                                  class="mx-1"
                                  v-model="staffInformation.gender"
                                />
                                <label
                                  for="Female"
                                  class="text-secondary inputSize"
                                  >Female</label
                                >
                              </div>
                            </form>
                          </div>
                        </div>
                        <div class="d-flex justify-content-between my-3">
                          <div><p class="textSize">When born :</p></div>
                          <div class="borderBottom">
                            <input
                              v-model="staffInformation.when_born"
                              class="w-100 border-0 px-1 text-secondary inputSize"
                              type="date"
                            />
                          </div>
                        </div>
                        <div>
                          <button
                            class="w-100 border-0 p-2 my-2 buttonChange"
                            type="submit"
                          >
                            + Add
                          </button>
                        </div>
                      </form>
                    </b-modal>
                    <!--  -->
                    <b-button
                      v-b-modal.modal-center="`my-delete-modal-${list.id}`"
                      class="bg-transparent border-0"
                    >
                      <img class="mx-2" src="../assets/trash.png" width="24" />
                    </b-button>
                    <b-modal
                      :id="`my-delete-modal-${list.id}`"
                      centered
                      hide-footer
                      title="Delete"
                    >
                      <b-col cols="12">
                        <b-row class="d-flex justify-content-center">
                          <b-col cols="3" class="mx-3">
                            <button
                              @click="cancellist(list.id)"
                              class="bg-dark text-white border-0 rounded px-3 py-2"
                              type="button"
                            >
                              cancel
                            </button>
                          </b-col>
                          <b-col cols="3" class="mx-3">
                            <button
                              @click="deleteStaff(list.id)"
                              class="bg-danger text-white border-0 rounded px-3 py-2"
                              type="button"
                            >
                              delete
                            </button>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-modal>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
// import { use } from 'vue/types/umd';
import { mapGetters } from "vuex"

export default {
  data() {
    return {
      staffInformation: {},
      sectionValue: "",
      genderValue:""

    };
  },
  methods: {
    getStaff() {
      this.$http
        .get("/employees")
        .then((result) => {
          console.log(result);
          this.$store.dispatch("getStaff", result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteStaff(id) {
      this.$http
        .delete(`employees/${id}/`)
        .then((res) => {
          console.log(res);
          this.getStaff();
        })
        .catch((err) => {
          console.log(err);
        });
      this.$bvModal.hide(`my-delete-modal-${id}`);
    },
    cancellist(id) {
      this.$bvModal.hide(`my-delete-modal-${id}`);
    },
    editStaff(id) {
      this.$bvModal.show(`my-edit-modal-${id}`);
      this.$http
        .get(`employees/${id}/`)
        .then((res) => {
          console.log(res);
          this.staffInformation = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.getStaff();
    },
    saveStaff(id) {
      this.$http
        .put(`employees/${id}`, this.staffInformation)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
      this.$bvModal.hide(`my-edit-modal-${id}`);
    },
  },
  computed: {
    ...mapGetters(['staff']),
    filteredProducts: function () {
      if(this.sectionValue) {
        return this.staff.filter((section) => section.section_choose === this.sectionValue);
      } 
        if(this.genderValue){
        return this.staff.filter((user) => user.gender === this.genderValue);
      }
      else {
        return this.staff;
      }
    }
  },
  mounted() {
    this.getStaff();
  },
};
</script>
<style scoped lang="scss">
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
.textSize {
  margin-top: 8px;
  font-size: 19px;
  font-weight: 500;
}
.inputSize {
  font-size: 19px;
}
@media screen and (max-width: 500px) {
  .textSize {
    font-size: 16px;
  }
  .inputSize {
    font-size: 16px;
  }
}
@media screen and (max-width: 380px) {
  .textSize {
    font-size: 12px;
  }
  .inputSize {
    font-size: 12px;
  }
}
</style>
