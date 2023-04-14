<script>
	import '../app.postcss';
	function toggle() {
		if (document.body.classList.contains("dark")) {
			document.body.classList.remove("dark");
		}
		else {
			document.body.classList.add("dark");
		}
	}
</script>

<button
on:click={toggle}
>Switch Theme</button>

<slot />