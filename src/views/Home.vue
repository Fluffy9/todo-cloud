<template>
  <div class="w-100 h-100">
    <div class="container d-flex w-100 h-100 text-center" v-if="!skynet['mysky']">
        <b-spinner class="my-auto mx-auto" variant="primary" label="Spinning"></b-spinner>
    </div>
    <login v-else-if="!skynet['user']"></login>
    <div v-else>
      <b-navbar toggleable="sm" type="dark" variant="dark">
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

        <b-navbar-brand>TODO ☁</b-navbar-brand>

        <b-collapse id="nav-text-collapse" is-nav>
          <!-- <b-navbar-nav>
            <b-nav-text>Navbar text</b-nav-text>
          </b-navbar-nav> -->
        </b-collapse>
      </b-navbar>
      <div class="mt-5 text-light">
        <b-row>
          <b-col cols="2"></b-col>
          <b-col cols="8">
            <h1>My Tasks</h1>
            <br /><br />
            <i class="text-muted">Please wait until the data is saved before leaving the page</i>
            <b-form @submit.prevent="addTODO">
              <b-input-group class="mb-3">
                <b-form-input
                  v-model="task"
                  class="bg-dark text-primary"
                ></b-form-input>
                <b-input-group-append>
                  <b-button
                    class="text-white"
                    size="sm"
                    text="Button"
                    variant="outline-primary"
                    type="submit"
                    >Add Item</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-form>
            <br /><br />

            <!-- Task list -->
            <p>Unfinished Tasks - {{ unfinished["length"] }}</p>
            <task-list v-model="unfinished"></task-list>
            <br />
          </b-col>
          <b-col cols="2"></b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";
import TaskList from "@/components/TaskList.vue";
import { BIcon } from "bootstrap-vue";

export default {
  name: "Home",
  components: {
    Login,
    BIcon,
    TaskList,
  },
  data() {
    return {
      task: "",
      unfinished: [],
    };
  },
  methods: {
    addTODO() {
      if(this.unfinished.includes(this.task)){
        this.$bvToast.toast("NO DUPLICATE TASKS 😡", { variant: "danger" })
        return
      }
      this.unfinished.push(this.task+"");
    },
    
  },
  computed: {
    skynet() {
      return this.$store.state.Skynet;
    },
  },
  watch: {
    unfinished: function (val, oldVal) {
      if(!val){ return }
      this.$store
        .dispatch("Skynet/save", val)
        .then((result) =>
          this.$bvToast.toast("Mysky data saved", { variant: "success" })
        )
        .catch((err) =>
          this.$bvToast.toast(err["message"], { variant: "danger" })
        );
    },
  },
  created() {
    this.$store
      .dispatch("Skynet/init")
      .then((result) => {
        this.$store
          .dispatch("Skynet/retrieve")
          .then((result) => {
            this.unfinished = result.data;
            this.$bvToast.toast("Mysky data retrieved", { variant: "success" });
          })
          .catch((err) =>
            this.$bvToast.toast(err["message"], { variant: "danger" })
          );
      })
      .catch((err) => {
        this.$bvToast.toast(err["message"], { variant: "danger" });
      });
  },
};
</script>
