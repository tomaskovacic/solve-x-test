<script>
    import Footer from '../components/Footer.vue'
    import { mapGetters, mapActions } from 'vuex'

    export default {
        props: ["id"],
        data() {
            return {
                connected: [],
                selectedAsset: {},
                damaged: [],
            }
        },
        components: {
            Footer,
        },
        computed: {
            ...mapGetters({
                assets: 'assets/data',
                role: 'assets/role',
            }),
        },
        methods: {
            sendEmail() {
                window.open(`mailto:tehnician@solve-x.com?subject=Demaged ${this.selectedAsset.title}&body=Please fix the damaged item: ${this.selectedAsset.title}, id: ${this.selectedAsset.id}.`);
            },
            generateCSV() {
                var tempassets = Object.entries(this.selectedAsset);
                var csv = 'Text, Value\n';

                tempassets.forEach(row => {
                    csv += row.join(',');
                    csv += "\n";
                });

                var hiddenElement = document.createElement('a');
                hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
                hiddenElement.target = '_blank';
                hiddenElement.download = `asset-${this.selectedAsset.title}.csv`;
                hiddenElement.click();
            },
            checkConnection() {
                const temp = this.assets.filter(element => element.id != this.id)
                for (const property in this.selectedAsset) {
                    temp.forEach(asset => {
                        for (const assetPropertys in asset) {
                            if (assetPropertys === property) {
                                if (asset[assetPropertys] === this.selectedAsset[property]) {
                                    const tempConnected = {}
                                    tempConnected[assetPropertys] = asset[assetPropertys]
                                    tempConnected.id = asset['id']
                                    this.connected.push(tempConnected)
                                }
                            }
                        }
                    });

                }
            },
            displayConnectedItem(asset) {
                let temp = Object.keys(asset)[0]
                return `${temp}: ${asset[temp]}`
            },
            damagedAssetPhoto() {
                this.$router.push({ name: 'technician', params: { id: this.id } })
            },
            isDamagedArrayNotEmpty() {
                if (this.damaged.length !== 0) {
                    return true
                }
            },
            getAllData() {
                this.$store.dispatch('assets/setSelected', parseInt(this.id))
                this.selectedAsset = this.$store.getters['assets/selected']
                this.damaged = this.$store.getters['assets/damaged']
                this.checkConnection();
            }

        },
        created() {
            this.getAllData()
        },
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
                <div class="dynamic" v-for="(asset, name) in assets[id-1]" :key="asset">
                    <p>{{ name }}: {{ asset }}</p>
                </div>
            </div>
        </div>
        <div class="content-wrapper gap">
            <div class="left-side">
                <h3>Is asset damaged?</h3>
                <button class="dameged-button" @click="sendEmail">Inform technician</button>
                <div class="export" v-if="role == 'admin'">
                    <h3>Export to excel</h3>
                    <button @click="generateCSV">Export</button>
                </div>
                <div class="technician-wrapper" v-if="role == 'technician'">
                    <h3>Take a photo of damaged asset!</h3>
                    <button @click="damagedAssetPhoto">Take a photo</button>
                </div>
            </div>
            <div class="right-side">
                <h3>Asset is connected to:</h3>
                <div class="dynamic" v-for="(conn, name) in connected" :key="conn.id">
                    <RouterLink class="router-link" :to="{ name: 'asset', params: { id: conn.id }}">
                        <p>{{ displayConnectedItem(conn) }}</p>
                    </RouterLink>
                </div>
            </div>
        </div>
        <div class="damaged-wrapper" v-if="role == 'technician' && isDamagedArrayNotEmpty()">
            <h3>Photos of damaged asset:</h3>
            <div v-for="damage in damaged" :key="damage" class="damaged">
                <img class="damaged-photo" v-bind:src="damage" />
            </div>
        </div>
    </div>
    <Footer />
</template>

<style scoped>
    .damaged-photo {
        width: 100%;
        height: 100%;
        max-width: 500px;
        max-height: 400px;
    }

    .damaged {
        margin-top: 30px;
    }

    .damaged-wrapper {
        padding: 10px;
    }

    button {
        margin-top: 15px;
    }

    .router-link {
        text-decoration: none;
        color: #f794a4;
    }

    .router-link:hover {
        color: #c87986;
    }

    h3 {
        margin-top: 20px;
    }

    .gap {
        margin: 50px 0 100px 0;
    }

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