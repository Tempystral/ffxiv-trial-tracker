<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const emit = defineEmits([
	"openModal"
])

function showModal() {
	emit("openModal");
}

function navigate(path: string) {
	router.push(path);
}
</script>

<template lang="pug">
.navbar 
	.navbar-menu
		.navbar-start
			.navbar-item(@click="navigate('/')")
				.title.is-4 FFXIV<br>Trial Tracker
		.navbar-item#menu-arr(@click="navigate('/ex/2')")
		.navbar-item#menu-hw(@click="navigate('/ex/3')")
		.navbar-item#menu-sb(@click="navigate('/ex/4')")
		.navbar-item#menu-shb(@click="navigate('/ex/5')")
		//-.navbar-item#menu-ew(@click="navigate('/ex/6')")
		.navbar-end
			.navbar-item
				.box#settingsButtonBox
					.image.is-48x48#settingsButton(@click='showModal')
						div.button-shine
						img(src="/assets/img/icon/settings.png")
</template>

<style lang="scss">
@use "@/assets/sass/mixins" as *;
@use "@/assets/sass/variables" as *;

.navbar {
	margin-inline: .5em;
	background-color: $navbar-bg  !important;

	@include metal-border;
	border-top: none;
	border-top-left-radius: 0;
	border-top-right-radius: 0;

	.navbar-menu {
		justify-content: center;
		background: none;

		.navbar-start .navbar-item .title {
			color: white;
			font-family: "Eurostile Regular";

		}

		.navbar-start,
		.navbar-end {
			z-index: 10;
			position: relative;
			text-align: center;

			.navbar-item {
				background: $navbar-fg;
				border-bottom-left-radius: 10px;
				cursor: pointer;
			}

			&:after {
				content: "";
				position: absolute;
				width: 75%;
				height: 100%;
				right: -.75rem;
				z-index: -1;
				background: $navbar-fg;
				border-right: solid white 2px;
				transform-origin: bottom right;
				-ms-transform: skew(-35deg, 0deg);
				-webkit-transform: skew(-35deg, 0deg);
				transform: skew(-35deg, 0deg);
			}
		}

		.navbar-end {

			.navbar-item {
				border-bottom-right-radius: 10px;
			}

			&:after {
				left: -.75rem;
				border-left: solid white 2px;
				border-right: none;
				transform-origin: top left;
			}
		}

		// SKEW MENU
		>.navbar-item {
			// Only direct descendants get skewed
			@include skew(35deg);
			z-index: 1;
			cursor: pointer;
			width: 15%; // 12 when Endwalker is added to the navbar
			border-inline: solid black 1px;

			&#menu-all {
				border-left-width: 2px;
			}

			&#menu-ew {
				border-right-width: 2px;
			}

			transition: width .25s ease;

			&#menu-all {
				width: 8%;
				//min-width: 100px;


				&::before {
					background-position: 60%;
					background-size: auto 75%;
				}

				&:hover {
					width: 12%;

					&::before {
						background-position: 50%;
					}
				}
			}

			&:hover {
				width: 20%;
			}
		}
	}

	.navbar-item {
		img {
			max-height: 4.5rem !important;
		}

		// BACKGROUNDS
		&#menu-all {
			@include backgroundGlow(lightgrey);

			&::before {
				background-image: url("@/assets/img/icon/meteor_flat.png");
			}
		}

		&#menu-arr {
			@include backgroundGlow(skyblue);

			&::before {
				background-image: url("@/assets/img/logos/FFXIV_ARR.webp");
			}
		}

		&#menu-hw {
			@include backgroundGlow(maroon);

			&::before {
				background-image: url("@/assets/img/logos/FFXIV_Heavensward.webp");
			}
		}

		&#menu-sb {
			@include backgroundGlow(orange);

			&::before {
				background-image: url("@/assets/img/logos/FFXIV_Stormblood.webp");
			}
		}

		&#menu-shb {
			@include backgroundGlow(purple);

			&::before {
				background-image: url("@/assets/img/logos/FFXIV_Shadowbringers.webp");
			}
		}

		&#menu-ew {
			@include backgroundGlow(silver);

			&::before {
				background-image: url("@/assets/img/logos/FFXIV_Endwalker.webp");
			}
		}
	}
}


#settingsButtonBox {
	background: none;
	border: none;
	transition: all 0.1s ease-in-out;

	#settingsButton {
		cursor: pointer;

		&:hover {
			transform: scale(0.95);
		}
	}

	.image {

		.button-shine {
			position: absolute;
			height: 100%;
			width: 100%;
			border-radius: 5%;
			box-shadow: inset 0px 2px 3px 0px rgb(253, 244, 218);
			z-index: 10;
		}

		img {
			border-radius: 5%;
			box-shadow: 0px 2px 0px 2px black;
		}
	}


}
</style>