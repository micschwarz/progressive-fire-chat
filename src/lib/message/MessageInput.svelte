<script lang="ts">
    import Icon from '$lib/components/Icon.svelte';

    import { add } from '$lib/firebase/firestore/collections/messages';
    import { currentUser } from '$lib/user/userStore';
    import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

    $: user = $currentUser;

    let message = '';
    $: messageSendable = message.length > 0;

    let sending = false;

    const send = async () => {
        if (!messageSendable || sending) {
            return;
        }

        sending = true;

        const request = add({
            user: {
                id: user!.id,
                name: user!.name,
            },
            content: message,
            createdAt: new Date(),
        });

        message = '';
        await request;

        sending = false;
    };
</script>

<form on:submit|preventDefault={send} class="flex gap-1 w-full">
    <div class="grow">
        <input
            placeholder="Nachricht"
            class="input input-bordered w-full"
            type="text"
            bind:value={message}
            disabled={sending}
        />
    </div>
    <div class="w-12 sm:w-32">
        {#if sending}
            <button class="btn btn-primary loading sm:w-full" type="button" disabled>
                <span class="hidden sm:block">Sende</span>
            </button>
        {:else}
            <button class="btn btn-primary sm:w-full" type="submit" disabled={!messageSendable}>
                <Icon icon={faPaperPlane} />
                <span class="ml-2 hidden sm:block">Senden</span>
            </button>
        {/if}
    </div>
</form>
