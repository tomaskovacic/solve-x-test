<script>
  import Footer from '../components/Footer.vue'
  import PlusSVG from '../components/icons/Plus.vue'
  import MinusSVG from '../components/icons/Minus.vue'
  import { mapActions, mapGetters } from 'vuex'


  export default {
    components: {
      Footer,
      PlusSVG,
      MinusSVG,
    },
    methods: {
      createNewInput() {
        this.count++;
      },
      removeInput() {
        this.count--;
      },
      addAsset() {
        var tempAssetText = Object.values(this.newAssetText)
        var tempAssetValue = Object.values(this.newAssetValue)
        tempAssetText.unshift("title")
        tempAssetValue.unshift(this.titleValue)
        tempAssetText.unshift("id")
        tempAssetValue.unshift(this.id)
        tempAssetText.forEach((key, i) => this.newAsset[key] = tempAssetValue[i]);
        console.log(this.newAsset)
        this.addAssetToStore(this.newAsset)
        this.$router.push("/");
      },
      ...mapActions({
        addAssetToStore: 'assets/insertAsset'
      })
    }, data() {
      return {
        count: 0,
        active: true,
        newAssetText: [],
        newAssetValue: [],
        newAsset: {},
        titleValue: '',
      }
    },
    computed: {
      ...mapGetters({
        id: 'assets/id',
      })
    }
  }
</script>

<template>
  <div class="wrapper">
    <div class="title">
      <h2>Add new asset</h2>
    </div>
    <div class="add-wrapper">
      <div class="option-wrapper" id="option-wrapper">
        <form @submit.prevent="addAsset" id="addAsset">
          <div>
            <input type="text" value="title" class="text" readonly>
            <input v-model="titleValue" type="text" class="value" required placeholder="Title value">
          </div>
          <template v-for="key in count" :key="key">
            <div>
              <input type="text" class="text" v-model="newAssetText['dynamicText'+key]" required
                placeholder="Attribute name">
              <input type="text" class="value" v-model="newAssetValue['dynamicValue'+key]" required
                placeholder="Attribute value">
            </div>
          </template>
          <div class="button-wrapper">
            <button class="button-add" @click="createNewInput">
              Add new input
              <PlusSVG />
            </button>
            <button class="button-remove" @click="removeInput">
              Remove input
              <MinusSVG />
            </button>
          </div>
          <div class="add-asset-wrapper">
            <button value="addAsset" type="submit">Add asset</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
  .add-asset-wrapper {
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }

  .button-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .value {
    width: 200px;
  }

  input {
    height: 30px;
    text-align: center;
  }

  .button-add,
  .button-remove {
    margin-top: 30px;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    border: none;
    background-color: white;
    cursor: pointer;
    border: 1px solid black;
  }

  .option-wrapper {
    display: flex;
    justify-content: center;
    gap: 40px;
  }

  .add-wrapper {
    margin: 70px 0;
    display: flex;
    flex-flow: column;
    justify-content: center;
  }

  .wrapper {
    max-width: 1280px;
    margin: 0 auto;
    font-weight: normal;
    padding: 40px 20px;
  }

  .title {
    display: flex;
    justify-content: center;
  }

  .add-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>