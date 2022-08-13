<script setup lang="ts">

const emit = defineEmits([
	"openModal"
])

function showModal() {
	emit("openModal");
}
</script>


<template lang="pug">

.navbar 
	.navbar-menu
		.navbar-start
			.navbar-item FFXIV Trial Tracker
			//- This is just for spacing to keep the expansion list centered
		.navbar-item#menu-arr
		.navbar-item#menu-hw
		.navbar-item#menu-sb
		.navbar-item#menu-shb
		.navbar-end
			.navbar-item
				.box#settingsButton(@click='showModal')
					.image.is-48x48
						img(src="/assets/img/icon/meteor_flat.png")

</template>

<style lang="scss">
@mixin backgroundGlow($color ) {
	background-image: radial-gradient(ellipse at center, $color 0%, transparent 100%);
}

@mixin skew {
	background-color: inherit;
	transform: skewX(-35deg);
	-ms-transform: skewX(-35deg);
	/* IE 9 */
	-webkit-transform: skewX(-35deg);
	/* Safari and Chrome */
	position: relative;
	overflow: clip;
	-webkit-transform-origin: bottom left;
	-ms-transform-origin: bottom left;
	transform-origin: bottom left;

	&::before {
		content: "";
		transform: skewX(35deg);
		-ms-transform: skewX(35deg);
		/* IE 9 */
		-webkit-transform: skewX(35deg);
		/* Safari and Chrome */
		-webkit-transform-origin: bottom left;
		-ms-transform-origin: bottom left;
		transform-origin: bottom left;

		position: absolute;
		width: 150%;
		height: 100%;
		left: 0%;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: 30%;
		transition: all .25s ease;

	}
}

.navbar-menu {
	justify-content: center;
	background: black;

	>.navbar-item {
		// Direct descendants get skewed only
		@include skew;
		cursor: pointer;
		width: 12%;
		transition: all .25s ease;

		&:hover {
			width: 25%;
		}
	}
}

.navbar-item img {
	max-height: 4.5rem !important;
}



#menu-arr {
	@include backgroundGlow(skyblue);

	&::before {
		background-image: url("@/assets/img/logos/FFXIV_ARR.webp");
	}
}

#menu-hw {
	@include backgroundGlow(maroon);

	&::before {
		background-image: url("@/assets/img/logos/FFXIV_Heavensward.webp");
	}
}

#menu-sb {
	@include backgroundGlow(orange);

	&::before {
		background-image: url("@/assets/img/logos/FFXIV_Stormblood.webp");
	}
}

#menu-shb {
	@include backgroundGlow(purple);

	&::before {
		background-image: url("@/assets/img/logos/FFXIV_Shadowbringers.webp");
	}
}

#settingsButton {
	background: none;
	border: none;
	transition: all 0.1s ease-in-out;

	&:hover {
		transform: scale(0.95);
	}

	cursor: pointer;
}
</style>