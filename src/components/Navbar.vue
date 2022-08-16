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

function toggleBurger(event: MouseEvent) {
	// Get the target from the "data-target" attribute
	const burger = event.currentTarget as HTMLButtonElement;
	const navbarMenu = burger.dataset.target;
	if (navbarMenu) {
		const $target = document.getElementById(navbarMenu) as HTMLElement;
		// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
		burger.classList.toggle('is-active');
		$target.classList.toggle('is-active');
	}
}

</script>

<template lang="pug">
.navbar 
	.navbar-brand
		.navbar-item
			.title.is-4.is-clickable(@click="navigate('/')") FFXIV Duty<br>Tracker
		a.navbar-burger(role="button", aria-label="menu" aria-expanded="false" data-target="navMenu" @click="toggleBurger")
			span(aria-hidden="true")
			span(aria-hidden="true")
			span(aria-hidden="true")
	.navbar-menu#navMenu
		.navbar-start
			.navbar-item.is-clickable#menu-arr(@click="navigate('/ex/2')") A Realm Reborn
			.navbar-item.is-clickable#menu-hw(@click="navigate('/ex/3')") Heavensward
			.navbar-item.is-clickable#menu-sb(@click="navigate('/ex/4')") Stormblood
			.navbar-item.is-clickable#menu-shb(@click="navigate('/ex/5')") Shadowbringers
			//- .navbar-item#menu-ew(@click="navigate('/ex/6')") Endwalker
		.navbar-end
			hr.m-0
			.navbar-item
				#settingsMobileButton.is-clickable(@click='showModal') Settings
				.box#settingsButtonBox
					.image.is-48x48#settingsButton.is-clickable(@click='showModal')
						div.button-shine
						img(src="/assets/img/icon/settings.png")
</template>

<style lang="scss">
@use "@/assets/sass/mixins" as *;
@use "@/assets/sass/variables" as *;
@use "../../node_modules/bulma/sass/utilities/mixins" as *;

.navbar {
	// General styling
	margin-inline: .5em;
	background-color: $navbar-bg  !important;
	@include metal-border;
	border-top: none;
	border-top-left-radius: 0;
	border-top-right-radius: 0;

	@include touch {
		background-image: $menu-gradient;
	}


	.navbar-brand {

		.title,
		a {
			color: white;
			font-family: "Jupiter Pro Regular";

			&.navbar-burger {
				border-radius: 50%;
			}
		}

		@include desktop {
			padding-right: 3%;
			flex-shrink: unset;
		}
	}

	.navbar-menu {
		background: none;

		@include desktop {
			justify-content: center;


			// SKEW MENU
			.navbar-start {
				flex-grow: 1;

				.navbar-item {
					// Only direct descendants get skewed
					@include skew(35deg);
					width: 18%; // 15 when Endwalker is added to the navbar
					border-inline: solid black 1px;
					font-size: 0;
					transition: width .25s ease;

					&:hover {
						width: 25%;
					}

					// BACKGROUNDS
					&#menu-arr {
						@include backgroundGlow(skyblue);
						border-left-width: 2px;

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
						border-right-width: 2px;

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

			// Skew menu end
			.navbar-end {
				z-index: 1;
				position: relative;
				text-align: center;

				.navbar-item {
					background: $navbar-fg;
					border-bottom-right-radius: 10px;
				}

				&:after {
					content: "";
					position: absolute;
					width: 100%;
					height: 100%;
					left: -.75rem;
					z-index: -1;
					background: $navbar-fg;
					border-left: solid white 2px;
					transform-origin: top left;
					-ms-transform: skew(-35deg, 0deg);
					-webkit-transform: skew(-35deg, 0deg);
					transform: skew(-35deg, 0deg);
				}
			}
		}
	}

	.navbar-start .navbar-item,
	.navbar-end .navbar-item {
		@include touch {
			color: white;
			@include indent-on-hover(5%, .1s);
		}
	}
}

#settingsButton,
.navbar-brand .title {
	transition: transform .1s ease-in-out;

	&:hover {
		transform: scale(0.95);
	}
}

hr {
	@include faded-hr;
}

#settingsMobileButton {
	@include desktop {
		display: none;
	}
}

#settingsButtonBox {
	@include touch {
		display: none
	}

	background: none;
	border: none;
	padding-left: 0;

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
			max-height: 4.5rem !important;
		}
	}


}
</style>