<script lang="ts">
    import Icon from '$lib/components/Icon.svelte';
    import { logout } from '$lib/firebase/auth/auth';
    import { currentUser } from '$lib/user/userStore';
    import { faCog, faSignOut } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="p-3">
    <div class="navbar bg-base-200 rounded-box">
        <div class="flex-1">
            <div class="hidden sm:block">
                <a href="/" class="btn btn-ghost normal-case text-xl">Progressive Fire Chat 🔥</a>
            </div>
            <div class="block sm:hidden">
                <a href="/" class="btn btn-square btn-ghost normal-case text-xl">🔥</a>
            </div>
        </div>
        <div class="flex items-center gap-1">
            <div class="mr-2 hidden sm:block">Hi {$currentUser?.name}</div>
            <a class="btn btn-ghost btn-square" href="/settings"><Icon icon={faCog} /></a>
            <button class="btn btn-ghost" on:click={logout}><Icon icon={faSignOut} /></button>
        </div>
    </div>
</div>
