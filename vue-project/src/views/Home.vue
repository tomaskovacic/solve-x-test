<script>
  import Footer from '../components/Footer.vue'
  import { mapGetters } from 'vuex'


  export default {
    data() {
      return {
        search: ''
      }
    },
    components: {
      Footer,
    },
    computed: {
      ...mapGetters({
        assets: 'assets/data'
      }),
      filteredAssets() {
        return this.assets.filter(asset => asset.title.includes(this.search))
      }
    }
  }
</script>

<template>
  <main>
    <div class="wrapper">
      <div class="title-wrapper">
        <div class="main-title">
          Browse assets
        </div>
        <div class="sub-title">
          <input class="search" type="search" v-model="search" placeholder="Search assets">
        </div>
      </div>
      <div class="tile-wrapper">
        <div class="tile" v-for="asset in filteredAssets" :key="uniqueasset">
          <RouterLink class="router-link" :to="{ name: 'asset', params: { id: asset.id }}">
            <img class="img" src="../assets/chair.jpg">
            <div class="title">{{ asset.title}}</div>
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="pegination">
      1 2 3 4 5
    </div>
  </main>
  <Footer />
</template>

<style scoped>
  .wrapper,
  .pegination {
    max-width: 1280px;
    margin: 0 auto;
    font-weight: normal;
    padding: 100px 20px 80px 20px;
  }

  .pegination {
    display: flex;
    justify-content: center;
    padding: 0 20px 80px 20px;
  }

  .tile-wrapper {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .title {
    padding: 10px;
    font-weight: 600;
    color: #333333;
  }

  .tile:hover {
    box-shadow: 0px 8px 15px #f794a4;
    cursor: pointer;
  }

  .main-title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .sub-title {
    display: flex;
    justify-content: center;
    font-size: 15px;
    font-weight: normal;
    width: 100%;
    align-items: center;
    margin-bottom: 80px;
  }

  .title-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .search {
    width: 50%;
    height: 40px;
  }

  button {
    padding: 0;
    background: #f794a4;
    text-decoration: none;
    font-weight: 700;
    color: white;
    height: 40px;
    width: 80px;
  }

  .img {
    max-width: 300px;
    max-height: 250px;
    padding: 10px;
    width: 100%;
    height: 100%;
  }

  .tile {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    max-width: 300px;
    max-height: 250px;
    text-align: center;
    width: 100%;
    height: 100%;
  }

  .router-link {
    text-decoration: none;
    height: 100%;
    width: 100%;
  }


  @media (max-width:801px) {
    .tile {
      max-width: 300px;
      max-height: 280px;
      width: 100%;
      height: 100%;
      margin-top: 15px;
    }

    .img {
      max-width: 150px;
      max-height: 100px;
    }
  }
</style>