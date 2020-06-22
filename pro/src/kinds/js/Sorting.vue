<template>
  <div>
      <h1>算法排序</h1>
      <div>{{arr}}</div>
      <h2 @click="sort('mp')">1.冒泡排序</h2>
      <div>思路：第一次循环，开始比较当前元素与下一个元素的大小，如果比下一个元素小或者相等，则不需要交换两个元素的值；若比下一个元素大的话，则交换两个元素的值。然后，遍历整个数组，第一次遍历完之后，相同操作遍历第二遍</div>
      <h2 @click="sort('xz')">2.选择排序</h2>
      <div>思路：第一遍，从数组中选出最小的，与第一个元素进行交换；第二遍，从第二个元素开始，找出最小的，与第二个元素进行交换；依次循环，完成排序</div>
      <h2 @click="sort('cr')">3.插入排序</h2>
      <div>思路：首先，循环原数组，然后，将当前位置的元素，后面遍历的值与之对比，交换位置</div>
      <h2  @click="kk">4.快速排序{{kk}}</h2>
      <!-- {{js.quickSort(value)}} -->
      <div>思路：首先，我们需要找到一个基数，然后将比基数小的值放在基数的左边，将比基数大的值放在基数的右边，之后进行递归那两组已经归类好的数组。</div>

  </div>
</template>

<script>
import Sort from '@/common/index';
export default {
    name: 'sorting',
    data() {
        return {
            arr: [1, 20, 10, 30, 22, 11, 55, 24, 31, 88, 12, 100, 50],
            value: [1, 20, 10, 30, 22, 11, 55, 24, 31, 88, 12, 100, 50],
            oo: {
                name: 'tom'
            }

        };
    },
    computed: {
        kk() {
            return Sort.quickSort(this.value);
        }
    },
    watch: {
        value: {
            handler(newVal, oldVal) {
                console.log(oldVal);
                console.log(newVal);
            }
        }
    },
    methods: {
        sort(type) {
            this.oo = {
                name: 'aa'
            };
            const {arr, sort} = this;
            if (type === 'mp') {
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < arr.length - 1; j++) {
                        let temp;
                        if (arr[j] > arr[j + 1]) {
                            temp = arr[j];
                            arr[j] = arr[j + 1];
                            arr[j + 1] = temp;
                        }

                    }
                }
            }
            else if (type === 'xz') {
                for (let i = 0; i < arr.length; i++) {
                    let index = i;
                    for (let j = i + 1; j < arr.length; j++) {
                        if (arr[index] > arr[j]) {
                            index = j;
                        }

                    }
                    let temp = arr[i];
                    arr[i] = arr[index];
                    arr[index] = temp;
                }
            }
            else if (type === 'cr') {
                var len = arr.length;
                for (var i = 0; i < len; i++) {
                    var key = arr[i];
                    var j = i - 1;
                    while (j >= 0 && arr[j] > key) {
                        var temp;
                        temp = arr[j + 1];
                        arr[j + 1] = arr[j];
                        arr[j] = temp;
                        j--;
                    }
                }
            }

            this.arr = Object.assign([], this.arr); // Vue 不能检测数组以及对象内部的变化 so 改变不生效
            // this.$set(this.arr, this, arr);
        }

    }
}
</script>

<style>
</style>