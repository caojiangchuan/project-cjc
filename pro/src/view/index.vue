<template>
  <div>
    <h3><router-link to='/js/sorting'>算法排序</router-link></h3>
    
  </div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            data: {
                name: 'tom',
                age: 10
            }
        };
    },
    mounted() {
        console.log(process);
        const {name, age} = this.data;
        this.$api
            .find(name, age)
            .then(res => {
                console.log(res);
            })
            .catch(e => {
                console.log(e);
            });
    }
};
</script>


<style>
</style>