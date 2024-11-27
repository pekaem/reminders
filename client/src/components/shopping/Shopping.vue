<template>
  <div id="shopping">
    <grid-layout
            :layout.sync="shoppingLists"
            :col-num="12"
            :row-height="30"
            :is-draggable="true"
            :is-resizable="true"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"
    >
        <grid-item v-for="item in shoppingLists"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i"
                   :key="item.i">
            <div class="title">
              {{item.title}}
            </div>
            <div class="item-content">
              {{item.content}}
            </div>
        </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import shoppingService from "../../services/shopping-service";
import { EventBus } from '@/event-bus';
//import ShoppingList from "./ShoppingList.vue";

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  mounted() {
    EventBus.$on('new-shopping-list', () => {
      this.createNewList();
    });
  },
  beforeDestroy() {
    // removing eventBus listener
    EventBus.$off('new-shopping-list');
  },
  methods: {
    calculateNewListPosition() {
      let lastList = this.shoppingLists[this.shoppingLists.length - 1];
      //console.log("yyy " + this.shoppingLists.length % 6);
      console.log("yyy " + lastList.y);
      return {
        x: lastList.x <= 8 ? lastList.x + 2 : 0,
        y: lastList.y,//this.shoppingLists.length % 6 === 0 ? lastList.y + 2 : lastList.y,
        w: 2,
        h: 4,
        i: this.shoppingLists.length
      }
    },
    createNewList() {
      let newList = this.calculateNewListPosition();
      newList.title = "New List";
      newList.content = "";
      console.log(newList);
      this.shoppingLists.push(newList);
      //shoppingService.create(this.newList);
    },
    editItems() {
      shoppingService.update(this.id, this.shoppingData);
    }
  },

  data() {
    return {
      shoppingLists: [
        { x: 0, y: 0, w: 2, h: 2, i: "0", title: "something0", content: "A new cat" },
        { x: 2, y: 0, w: 2, h: 2, i: "1", title: "something1", content: "" },
        { x: 4, y: 0, w: 2, h: 2, i: "2", title: "something2", content: "" },
        { x: 6, y: 0, w: 2, h: 2, i: "3", title: "something3", content: "" },
        { x: 8, y: 0, w: 2, h: 2, i: "4", title: "something4", content: "" },
        { x: 10, y: 0, w: 2, h: 2, i: "5", title: "something5", content: "" }
      ],
      shoppingListData: {
        
      },
      shoppingData: {
        id: this.id,
        items: this.items,
        owner: this.owner,
        updatedAt: this.updatedAt,
        updatedBy: this.updatedBy,
      },
    };
  },
};
</script>

<style>
  .vue-grid-item {
    background-color: wheat;
  }
  .item-content {
    text-align: left;
  }
</style>
