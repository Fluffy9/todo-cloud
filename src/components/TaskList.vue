<template>
  <div>
    <b-form-group >
      <b-card
        v-for="(task, i) in value"
        :key="task"
        bg-variant="dark"
        text-variant="light"
      >
        <b-form-checkbox
          :id="'checkbox-' + i"
          class="inline"
          :name="'checkbox-1' + i"
          @change="change(task)"
        >
          {{ task }}
        </b-form-checkbox>
      </b-card>
    </b-form-group>
  </div>
</template>
<script>
export default {
  props: ["value"],
  methods: {
    change(checked){
        this.removeTODO(this.value.indexOf(checked))
    },
    addTODO(item) {
      let list = Array.from(this.value);
      list.push(item);
      this.$emit("input", list);
    },
    removeTODO(index) {
      let list = Array.from(this.value);
      list.splice(index, 1);
      this.$emit("input", list);
    },
  },
};
</script>