<template>
  <div>
    welcome
  </div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
        };
    },
    mounted() {
        this.$api.find.then(res => {
            console.log(res);
        }).catch(e => {
            console.lpg(e);
        });

    }
}
</script>


<style>
</style>