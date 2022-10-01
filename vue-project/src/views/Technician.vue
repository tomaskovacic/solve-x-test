<script>
    import Footer from '../components/Footer.vue'

    export default {
        components: {
            Footer,

        },
    }
</script>

<template>
    <div class="wrapper">
        <div class="capture">
            <div class="camera"></div>
            <div class="import"></div>
        </div>
    </div>

    <Footer />
</template>

<style scoped>
    .wrapper {
        max-width: 1280px;
        margin: 0 auto;
        font-weight: normal;
        padding: 0 20px;
    }

    .camera {
        border: 1px solid black;
        width: 100%;
        height: 100%;
        max-width: 700px;
        max-height: 700px;
    }


    .capture {
        display: flex;
        justify-content: center;
        flex-flow: column;
        align-items: center;
    }
</style>