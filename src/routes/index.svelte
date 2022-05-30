<script lang="ts">
    import { logout } from '$lib/firebase/auth/auth';
    import { currentUser } from '$lib/user/userStore';
</script>

Progressive Fire Chat 🔥

Hi {$currentUser?.name}
<button class="btn" on:click={logout}>Logout</button>
