<script>
    import Footer from '../components/Footer.vue'
    import { mapGetters } from 'vuex'

    export default {
        props: ["id"],
        components: {
            Footer,
        },
        computed: {
            ...mapGetters({
                assets: 'assets/data',
            }),
        },
        methods: {
            sendEmail (){
                window.open(`mailto:tehnician@solve-x.com?subject=Demaged item&body=Please fix the damaged item.`);
            }
        }
    }
</script>

<template>
    <div class="wrapper">
        <div class="breadcrumbs">
            <RouterLink to="/" class="breadcrumbs-previous">Home</RouterLink>
            <p class="seperator">></p>
            <p class="breadcrumbs-active"> {{ assets[id-1].title }}</p>
        </div>
        <div class="title-wrapper">
            <h2 class="title">{{ assets[id-1].title }}</h2>
        </div>
        <div class="content-wrapper">
            <div class="left-side">
                <img class="img" src="../assets/chair.jpg">
            </div>
            <div class="right-side">
                <div class="dynamic" v-for="(asset, name) in assets[id-1]" :key="uniqueasset">
                    <p>{{ name }}: {{ asset }}</p>
                </div>
            </div>
        </div>
        <div class="damaged">
            <h3>Is asset demaged?</h3>
            <button class="dameged-button" @click="sendEmail">Inform technician</button>
        </div>
    </div>
    <Footer />
</template>

<style scoped>
    .img {
        max-width: 600px;
        max-height: 600px;
        width: 100%;
        height: 100%;
    }

    .content-wrapper {
        display: flex;
    }

    .right-side {
        display: flex;
        flex-flow: column;
        gap: 10px;
        font-size: 17px;
    }

    .left-side,
    .right-side {
        margin-top: 20px;
        width: 50%;
        padding: 10px;
    }

    .wrapper {
        max-width: 1280px;
        margin: 0 auto;
        font-weight: normal;
        padding: 20px 20px;
    }

    .title-wrapper {
        margin: 50px 0;
    }

    .title {
        font-weight: 600;
    }

    .breadcrumbs-previous {
        text-decoration: none;
        color: #f794a4;
    }

    .breadcrumbs {
        display: flex;
        color: rgb(158, 158, 158);
        padding-top: 30px;
        padding-bottom: 0;
    }

    .seperator {
        margin: 0 10px;
    }

    @media (max-width:801px) {
        .content-wrapper {
            flex-flow: column;
        }

        .left-side,
        .right-side {
            width: 100%;
        }
    }
</style>