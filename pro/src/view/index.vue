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
        this.$api.get('/test', {
        }, response => {
            console.log(response);
        });
    }
}
</script>


<style>
</style>