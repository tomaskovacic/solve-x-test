<script>
    import Footer from '../components/Footer.vue'

    export default {
        props: ["id"],
        components: {
            Footer,
        },
        data() {
            return {
                photos: [],
                toUpload: [],
                isCameraOpen: false,
                isPhotoTaken: false,
                isShotPhoto: false,
                isLoading: false,
                link: '#',
                pos: {
                    x: 0,
                    y: 0,
                },
                resized: false,
                activeId: '',
                drawing: true,
                error: '',
            }
        },
        methods: {
            toggleCamera() {
                if (this.isCameraOpen) {
                    this.isCameraOpen = false;
                    this.isPhotoTaken = false;
                    this.isShotPhoto = false;
                    this.stopCameraStream();
                    this.drawing = false;
                } else {
                    this.isCameraOpen = true;
                    this.createCameraElement();
                    this.drawing = true;
                }
            },
            createCameraElement() {
                this.isLoading = true;
                const constraints = (window.constraints = {
                    audio: false,
                    video: true
                });
                navigator.mediaDevices
                    .getUserMedia(constraints)
                    .then(stream => {
                        this.isLoading = false;
                        this.$refs.camera.srcObject = stream;
                    })
                    .catch(error => {
                        this.isLoading = false;
                        alert("Error");
                    });
            },
            stopCameraStream() {
                let tracks = this.$refs.camera.srcObject.getTracks();
                tracks.forEach(track => {
                    track.stop();
                });
            },

            takePhoto() {
                if (!this.isPhotoTaken) {
                    this.isShotPhoto = true;
                    const FLASH_TIMEOUT = 50;
                    setTimeout(() => {
                        this.isShotPhoto = false;
                    }, FLASH_TIMEOUT);
                }
                this.isPhotoTaken = !this.isPhotoTaken;
                const context = this.$refs.canvas.getContext('2d');
                context.drawImage(this.$refs.camera, 0, 0, 640, 480);
                this.draw();
            },
            savePhoto() {
                const canvastemp = document.getElementById("photoTaken").toDataURL("image/jpeg")
                    .replace("image/jpeg", "image/octet-stream");
                this.storePhoto(canvastemp);
                this.isPhotoTaken = !this.isPhotoTaken
            },
            storePhoto(photo) {
                this.photos.push(photo)
            },
            drawArrayCanvas() {
                return this.photos
            },
            draw() {
                if (this.drawing) {
                    var canvas = document.getElementById("photoTaken");
                    var ctx = canvas.getContext("2d");

                    document.addEventListener('resize', this.resize);
                    document.addEventListener('mousemove', this.drawOnCanvas);
                    document.addEventListener('mousedown', this.setPosition);
                    document.addEventListener('mouseenter', this.setPosition);
                }
            },
            setPosition(e) {
                if (this.drawing) {
                    var canvas = document.getElementById("photoTaken");
                    var ctx = canvas.getContext("2d");
                    this.pos.x = e.clientX - 852;
                    this.pos.y = e.clientY - 154;
                }
            },
            drawOnCanvas(e) {
                if (this.drawing) {
                    var canvas = document.getElementById("photoTaken");
                    var ctx = canvas.getContext("2d");

                    if (e.buttons !== 1) return;

                    ctx.beginPath();

                    ctx.lineWidth = 5;
                    ctx.lineCap = 'round';
                    ctx.strokeStyle = '#c0392b';

                    ctx.moveTo(this.pos.x, this.pos.y);
                    this.setPosition(e);
                    ctx.lineTo(this.pos.x, this.pos.y);
                    ctx.stroke();
                }
            },
            arrayCanvasEmpty() {
                if (this.photos.length != 0) {
                    return true
                }
                return false
            },
            updateSelected(item) {
                let found = undefined
                this.activeId = item
                if (this.toUpload.length === 0) {
                    this.toUpload.push(item)
                } else {
                    this.toUpload.forEach(upload => {
                        found = this.toUpload.find(upload => upload === item);
                    });
                    if (found === undefined) {
                        this.toUpload.push(item)
                    } else {
                        let index = this.toUpload.indexOf(item);
                        this.toUpload.splice(index, 1);
                    }
                }
            },
            getActiveClass(item) {
                let classes = ['']
                this.toUpload.forEach(upload => {
                    if (item === upload) {
                        classes.push("active-tile")
                    }
                });
                return classes
            },
            uploadImage() {
                if (this.toUpload.length !== 0) {
                    this.$store.dispatch('assets/damagedAsset', this.toUpload)
                    this.$router.push({ name: 'asset', params: { id: this.id } })
                    this.isCameraOpen = false;
                    this.isPhotoTaken = false;
                    this.isShotPhoto = false;
                    this.stopCameraStream();
                    this.drawing = false;
                }
                else {
                    this.error = 'Pls select image!'
                }
            },
        },
    }
</script>

<template>
    <div class="wrapper">
        <div class="capture">
            <div class="camera">
                <div class="web-camera-container">
                    <div class="camera-button">
                        <button type="button" class="button is-rounded"
                            :class="{ 'is-primary' : !isCameraOpen, 'is-danger' : isCameraOpen}" @click="toggleCamera">
                            <span v-if="!isCameraOpen">Open Camera</span>
                            <span v-else>Close Camera</span>
                        </button>
                    </div>
                    <div v-show="isCameraOpen && isLoading" class="camera-loading">
                        <ul class="loader-circle">
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div v-if="isCameraOpen" v-show="!isLoading" class="camera-box" :class="{ 'flash' : isShotPhoto }">
                        <div class="camera-shutter" :class="{'flash' : isShotPhoto}"></div>
                        <video v-show="!isPhotoTaken" ref="camera" autoplay></video>
                        <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" width="640" height="480"></canvas>
                    </div>
                    <div v-if="isCameraOpen && !isLoading" class="camera-shoot">
                        <button type="button" class="button" @click="takePhoto">
                            Take a photo!
                        </button>
                    </div>
                    <div v-if="isPhotoTaken && isCameraOpen" class="save-photo">
                        <button class="button" role="button" @click="savePhoto">
                            Save photo
                        </button>
                    </div>
                </div>
            </div>
            <div class="import">
                <div class="store">
                    <div v-for="canvas in photos" :key="canvas">
                        <img class="canvas-tile" v-bind:src="canvas" :class="getActiveClass(canvas)"
                            @click="updateSelected(canvas)" />
                    </div>
                </div>
                <div v-if="arrayCanvasEmpty()" class="button-wrapper">
                    <button type="button" class="button" @click="uploadImage">
                        Upload images
                    </button>
                </div>
                {{ error }}
            </div>
        </div>
    </div>

    <Footer />
</template>

<style scoped>
    .canvas-tile {
        width: 117px;
        height: 100px;
        border: 5px solid white;
    }

    .active-tile {
        border: 5px solid #f794a4;
    }

    .store {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        margin: 15px;
        justify-content: start;
        align-items: center;
    }

    .import {
        width: 100%;
        margin: 20px 0 100px 0;
        max-width: 700px;
        border: solid black 1px;
        border-radius: 10px;
    }

    .camera-box {
        max-width: 640px;
        max-height: 480px;
    }

    video,
    canvas {
        width: 100% !important;
        height: 100% !important;
    }

    .camera-shoot,
    .button-wrapper,
    .save-photo {
        display: flex;
        justify-content: center;
        padding: 10px 0;
    }

    .camera-button {
        display: flex;
        justify-content: center;
        padding: 10px 0;
    }

    .wrapper {
        max-width: 1280px;
        margin: 0 auto;
        font-weight: normal;
        padding: 0 20px;
    }

    .camera {
        display: flex;
        justify-content: center;
        border: 1px solid black;
        width: 100%;
        height: 100%;
        max-width: 700px;
        max-height: 700px;
        margin: 30px;
        padding: 10px 0;
        min-height: 50px;
        border-radius: 10px;
    }


    .capture {
        display: flex;
        justify-content: center;
        flex-flow: column;
        align-items: center;
    }

    @media (max-width:801px) {
        .store {
            justify-content: center;
            align-items: center;
        }
    }
</style>